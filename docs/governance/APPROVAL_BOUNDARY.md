# Explicit Approval Boundary

A request to build or prepare a HIGH-risk change authorizes branch work and analysis, not production merge. Production merge authorization must be explicit and contemporaneous with the reviewed change.

Examples requiring explicit production approval: DNS, Cloudflare/deployment settings, authentication, Supabase RLS/schema, credential handling, destructive migrations, and disabling/bypassing repository safety controls.
