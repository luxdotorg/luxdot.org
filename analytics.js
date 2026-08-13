(() => {
  "use strict";
  const cfg = window.LUXDOT_ANALYTICS || {};
  const validCf = /^[a-f0-9]{20,64}$/i.test((cfg.cloudflareToken || "").trim());
  const validGa = /^G-[A-Z0-9]+$/i.test((cfg.ga4MeasurementId || "").trim());

  function loadCloudflare(token) {
    if (document.querySelector('script[data-luxdot-analytics="cloudflare"]')) return;
    const s = document.createElement("script");
    s.type = "module";
    s.defer = true;
    s.src = "https://static.cloudflareinsights.com/beacon.min.js";
    s.dataset.cfBeacon = JSON.stringify({ token });
    s.dataset.luxdotAnalytics = "cloudflare";
    document.head.appendChild(s);
  }

  function loadGA(id) {
    if (document.querySelector('script[data-luxdot-analytics="ga4"]')) return;
    const ext = document.createElement("script");
    ext.async = true;
    ext.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
    ext.dataset.luxdotAnalytics = "ga4";
    document.head.appendChild(ext);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ dataLayer.push(arguments); };
    gtag("js", new Date());
    gtag("config", id, {
      anonymize_ip: true,
      send_page_view: true
    });
  }

  if (cfg.provider === "cloudflare" && validCf) loadCloudflare(cfg.cloudflareToken.trim());
  else if (cfg.provider === "ga4" && validGa) loadGA(cfg.ga4MeasurementId.trim());

  window.luxdotAnalyticsStatus = () => ({
    provider: cfg.provider || "none",
    cloudflareConfigured: validCf,
    ga4Configured: validGa,
    active: (cfg.provider === "cloudflare" && validCf) || (cfg.provider === "ga4" && validGa)
  });
})();
