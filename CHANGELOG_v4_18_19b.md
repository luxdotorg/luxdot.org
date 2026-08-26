# LuxDot v4.18.19b — Persistent Radio Shell (rebuilt)

- Rebuilt from the available v4.18.18 full-replace package.
- Added a persistent top-level player shell.
- The radio audio element remains in the parent shell while content pages change.
- Framed pages do not instantiate a second radio engine.
- Direct page visits are routed into the persistent shell.
- Browser Back/Forward remains synchronized with framed navigation.
- Keeps the v4.18.18 wall-clock schedule, rotation, source failover and anti-loop fixes.
