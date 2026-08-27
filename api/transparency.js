const RELEASE = {
  version: "4.3.126",
  updated: "2026-08-21T00:00:00Z",
  recentChanges: [
    { title: "LuxDot Pulse", detail: "Live transparency panel added to the global information drawer." },
    { title: "Timeline", detail: "Now / Next project milestones remain visible in one public vertical timeline." },
    { title: "Memory", detail: "Victim-memory flag and symbolic blood mark system added for remembrance cartridges." },
    { title: "Research", detail: "SKY / UNIVERSE / CIRCUIT selector moved into the research canvas." },
    { title: "Radio", detail: "Floating radio stays ghosted until the visitor approaches or interacts." }
  ]
};

function isoAgo(ms){ return new Date(Date.now()-ms).toISOString(); }
function sumGroups(groups){
  return (groups||[]).reduce((a,g)=>({
    visits:a.visits+(Number(g?.sum?.visits)||0),
    bytes:a.bytes+(Number(g?.sum?.edgeResponseBytes)||0)
  }),{visits:0,bytes:0});
}
function json(data,status=200,cache="public, max-age=60, stale-while-revalidate=120"){
  return new Response(JSON.stringify(data),{
    status,
    headers:{
      "content-type":"application/json; charset=utf-8",
      "cache-control":cache,
      "x-content-type-options":"nosniff",
      "referrer-policy":"no-referrer"
    }
  });
}
export async function onRequestGet(context){
  const env=context.env||{};
  const base={
    ok:true,
    service:"LuxDot Pulse",
    release:RELEASE,
    privacy:{
      mode:"aggregated",
      statement:"Public metrics are aggregated. This endpoint does not expose visitor identities, IP addresses, cookies, or individual browsing histories.",
      visitorIdentity:false,
      ipAddresses:false
    },
    generatedAt:new Date().toISOString()
  };

  if(!env.CF_ANALYTICS_TOKEN || !env.CF_ZONE_ID){
    return json({
      ...base,
      analytics:{
        configured:false,
        status:"setup_required",
        note:"Live traffic is intentionally hidden until the encrypted Cloudflare analytics secret and zone ID are configured."
      }
    },200,"no-store");
  }

  const host=env.SITE_HOST || "luxdot.org";
  // Cloudflare Free can limit httpRequestsAdaptiveGroups to a 24h query window.
  // Keep every dataset slice below that limit and aggregate the seven daily slices here.
  const nowMs=Date.now();
  const endIso=new Date(nowMs-2*60*1000).toISOString(); // small ingestion/limit safety margin
  const filter=(startMs,endMs)=>({
    datetime_geq:new Date(startMs).toISOString(),
    datetime_lt:new Date(endMs).toISOString(),
    clientRequestHTTPHost:host,
    requestSource:"eyeball"
  });
  const day=24*60*60*1000;
  const query=`query Pulse($zoneTag:string,$f15:filter,$f24:filter,$fp:filter,$d0:filter,$d1:filter,$d2:filter,$d3:filter,$d4:filter,$d5:filter,$d6:filter){
    viewer{
      zones(filter:{zoneTag:$zoneTag}){
        live15:httpRequestsAdaptiveGroups(limit:1000,filter:$f15){sum{visits edgeResponseBytes}}
        last24:httpRequestsAdaptiveGroups(limit:1000,filter:$f24,orderBy:[datetimeHour_ASC]){sum{visits edgeResponseBytes} dimensions{datetimeHour}}
        paths:httpRequestsAdaptiveGroups(limit:100,filter:$fp,orderBy:[sum_visits_DESC]){sum{visits edgeResponseBytes} dimensions{clientRequestPath}}
        d0:httpRequestsAdaptiveGroups(limit:1000,filter:$d0){sum{visits edgeResponseBytes}}
        d1:httpRequestsAdaptiveGroups(limit:1000,filter:$d1){sum{visits edgeResponseBytes}}
        d2:httpRequestsAdaptiveGroups(limit:1000,filter:$d2){sum{visits edgeResponseBytes}}
        d3:httpRequestsAdaptiveGroups(limit:1000,filter:$d3){sum{visits edgeResponseBytes}}
        d4:httpRequestsAdaptiveGroups(limit:1000,filter:$d4){sum{visits edgeResponseBytes}}
        d5:httpRequestsAdaptiveGroups(limit:1000,filter:$d5){sum{visits edgeResponseBytes}}
        d6:httpRequestsAdaptiveGroups(limit:1000,filter:$d6){sum{visits edgeResponseBytes}}
      }
    }
  }`;
  const effectiveEnd=nowMs-2*60*1000;
  const variables={
    zoneTag:env.CF_ZONE_ID,
    f15:filter(effectiveEnd-15*60*1000,effectiveEnd),
    f24:filter(effectiveEnd-day,effectiveEnd),
    fp:filter(effectiveEnd-day,effectiveEnd)
  };
  for(let i=0;i<7;i++){
    const chunkEnd=effectiveEnd-i*day;
    const chunkStart=chunkEnd-day+60*1000; // 23h59m: safely below a 24h maximum window
    variables[`d${i}`]=filter(chunkStart,chunkEnd);
  }

  try{
    const r=await fetch("https://api.cloudflare.com/client/v4/graphql",{
      method:"POST",
      headers:{
        "authorization":`Bearer ${env.CF_ANALYTICS_TOKEN}`,
        "content-type":"application/json",
        "accept":"application/json"
      },
      body:JSON.stringify({query,variables})
    });
    const body=await r.json();
    if(!r.ok || body?.errors?.length){
      const msg=String(body?.errors?.[0]?.message||"").toLowerCase();
      const diagnostic=msg.includes("duration")||msg.includes("older") ? "analytics_window_limit" :
        msg.includes("permission")||msg.includes("access")||r.status===403 ? "analytics_access" :
        msg.includes("field")||msg.includes("argument")||msg.includes("type") ? "analytics_schema" : "analytics_query_rejected";
      return json({...base,analytics:{configured:true,status:"temporarily_unavailable",diagnostic,httpStatus:r.status}},200,"no-store");
    }
    const zone=body?.data?.viewer?.zones?.[0];
    if(!zone) return json({...base,analytics:{configured:true,status:"no_zone_data"}},200,"no-store");

    const live15=sumGroups(zone.live15);
    const last24=sumGroups(zone.last24);
    const last7=sumGroups([0,1,2,3,4,5,6].flatMap(i=>zone[`d${i}`]||[]));
    const hourly=(zone.last24||[]).map(x=>({
      hour:x?.dimensions?.datetimeHour,
      visits:Number(x?.sum?.visits)||0
    })).filter(x=>x.hour).sort((a,b)=>a.hour.localeCompare(b.hour));

    const topPages=(zone.paths||[])
      .map(x=>({
        path:x?.dimensions?.clientRequestPath||"/",
        visits:Number(x?.sum?.visits)||0,
        bytes:Number(x?.sum?.edgeResponseBytes)||0
      }))
      .filter(x=>!x.path.startsWith("/api/"))
      .sort((a,b)=>b.visits-a.visits)
      .slice(0,5);

    return json({
      ...base,
      analytics:{
        configured:true,
        status:"live",
        measurement:"Cloudflare aggregated HTTP visit metrics",
        windows:{
          last15m:{visits:live15.visits,bytes:live15.bytes},
          last24h:{visits:last24.visits,bytes:last24.bytes},
          last7d:{visits:last7.visits,bytes:last7.bytes}
        },
        hourly24h:hourly,
        topPages
      }
    });
  }catch{
    return json({...base,analytics:{configured:true,status:"temporarily_unavailable"}},200,"no-store");
  }
}
