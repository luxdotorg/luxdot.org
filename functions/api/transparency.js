const RELEASE = {
  version: "4.3.125",
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
  const query=`query Pulse($zoneTag:string,$f15:filter,$f24:filter,$f7:filter,$fp:filter){
    viewer{
      zones(filter:{zoneTag:$zoneTag}){
        live15:httpRequestsAdaptiveGroups(limit:1000,filter:$f15){sum{visits edgeResponseBytes}}
        last24:httpRequestsAdaptiveGroups(limit:1000,filter:$f24){sum{visits edgeResponseBytes} dimensions{datetimeHour}}
        last7:httpRequestsAdaptiveGroups(limit:1000,filter:$f7){sum{visits edgeResponseBytes}}
        paths:httpRequestsAdaptiveGroups(limit:100,filter:$fp){sum{visits edgeResponseBytes} dimensions{clientRequestPath}}
      }
    }
  }`;
  const common=(start)=>({
    datetime_geq:start,
    datetime_lt:new Date().toISOString(),
    clientRequestHTTPHost:host,
    requestSource:"eyeball"
  });
  const variables={
    zoneTag:env.CF_ZONE_ID,
    f15:common(isoAgo(15*60*1000)),
    f24:common(isoAgo(24*60*60*1000)),
    f7:common(isoAgo(7*24*60*60*1000)),
    fp:common(isoAgo(24*60*60*1000))
  };

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
      return json({...base,analytics:{configured:true,status:"temporarily_unavailable"}},200,"no-store");
    }
    const zone=body?.data?.viewer?.zones?.[0];
    if(!zone) return json({...base,analytics:{configured:true,status:"no_zone_data"}},200,"no-store");

    const live15=sumGroups(zone.live15);
    const last24=sumGroups(zone.last24);
    const last7=sumGroups(zone.last7);
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
