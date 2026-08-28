# Operational Risk Matrix

| Area | Default risk | Production rule |
|---|---|---|
| Documentation/typos | LOW | QA + diff review |
| Sourced research/content | LOW | QA + source/label review |
| Translation | LOW | QA + language review where consequential |
| CSS/UI | MEDIUM | QA + diff/primary-path review |
| Navigation/shared JS | MEDIUM | QA + functional review |
| New page/feature | MEDIUM | QA + functional review |
| Authentication | HIGH | explicit human approval |
| Supabase schema/RLS | HIGH | explicit human approval |
| DNS/Cloudflare/deployment | HIGH | explicit human approval |
| Bulk deletion/migration | HIGH | explicit human approval + rollback |
| Security-control changes | HIGH | explicit human approval |

Risk may be raised when a nominally small change has unusually broad impact.
