# WITNESS backend blueprint — NOT YET ACTIVE

Recommended separation:
- intake_private: encrypted testimony envelope, identity, consent, access log
- evidence_vault: immutable originals, object-level encryption, SHA-256, malware scanning
- editorial_graph: people/place/event links using pseudonymous IDs
- public_witness: redacted publishable records only
- consent_ledger: append-only consent changes and withdrawal requests

Roles:
- Intake reviewer: can see submissions, not export vault originals by default
- Verifier: sees redacted working copies
- Publisher: can publish only records with explicit publish consent
- Security admin: infrastructure, not editorial identity access unless break-glass logged

Before activation:
DPIA / GDPR legal basis; retention/deletion policy; encryption at rest/in transit; backups; rate limiting; abuse/spam controls; CSAM/illegal-content handling; child safeguarding; reporter-risk assessment; audit logs; breach response; export/deletion workflow; terms/privacy notice; independent security review.
