# Knowledge Inventory & Reconciliation --- v4.16.3

## Inventory result

-   Research-folder HTML pages: **3**
-   Selected top-level research/atlas/memory/timeline/library/project
    surfaces: **35**
-   Candidate structured records recovered from
    `research-manifest.json`: **172**
-   Existing taxonomy JSON: **yes**
-   Machine-readable inventory: `data/knowledge-inventory-v4.16.3.json`

## Reconciliation rule

The current website remains the implementation baseline. Recovered
Obsidian concepts are mapped into it only after checking for an existing
canonical route/node.

### Status semantics

-   **KEEP** existing canonical implementation
-   **MERGE** combine duplicate concepts/data
-   **MIGRATE** move older material into current canonical object
-   **UPGRADE** keep object but enrich metadata/provenance/relationships
-   **ARCHIVE** retain historically, remove from active navigation
-   **MISSING** recovered concept not found in current build
-   **ALREADY IMPLEMENTED** no migration required
-   **VERIFY** implementation exists but behavior/content requires QA

## Current route inventory

  -----------------------------------------------------------------------------------------------------
  Route                                           HTML title        Status            Note
  ----------------------------------------------- ----------------- ----------------- -----------------
  `/alawi-nusayri-research.html`                  ---               VERIFY            Existing web
                                                                                      surface

  `/audio-library.html`                           LuxDot · المكتبة  VERIFY            Existing web
                                                  المسموعة                            surface

  `/belief-violence-memory.html`                  ---               VERIFY            Existing web
                                                                                      surface

  `/brabant-research-architecture.html`           Historic Brabant  VERIFY            Existing web
                                                  Research                            surface
                                                  Architecture ·                      
                                                  LuxDot                              

  `/brother-roger-memory.html`                    ---               VERIFY            Existing web
                                                                                      surface

  `/chaam-sacred-memory.html`                     Chaam: Churches & VERIFY            Existing web
                                                  Memory · LuxDot                     surface

  `/denhaag-deportation-memory.html`              ---               VERIFY            Existing web
                                                                                      surface

  `/deportation-memory.html`                      ---               VERIFY            Existing web
                                                                                      surface

  `/genetics-memory-hypothesis.html`              التشفير الجيني    VERIFY            Existing web
                                                  وفرضية الذاكرة                      surface
                                                  عبر الأجيال ·                       
                                                  LuxDot                              

  `/ghouta-chemical-memory.html`                  21 آب 2013 ---    VERIFY            Existing web
                                                  الغوطة: ملف                         surface
                                                  السارين · LuxDot                    

  `/hank-raamsdonk-war-memory.html`               ---               VERIFY            Existing web
                                                                                      surface

  `/humanitarian-day-memory.html`                 LuxDot Memory     VERIFY            Existing web
                                                                                      surface

  `/indies-memory.html`                           ---               VERIFY            Existing web
                                                                                      surface

  `/jewish-research-center.html`                  Jewish Research · VERIFY            Existing web
                                                  LuxDot                              surface

  `/kevelaer-chaam-timeline.html`                 Kevelaer Chaam    VERIFY            Existing web
                                                  Timeline · LuxDot                   surface

  `/laws-principles-atlas.html`                   أطلس القوانين     VERIFY            Existing web
                                                  والمبادئ · LuxDot                   surface

  `/library.html`                                 Library · LuxDot  VERIFY            Existing web
                                                                                      surface

  `/memory-submit.html`                           LuxDot · أرسل     VERIFY            Existing web
                                                  ذاكرة                               surface

  `/memory.html`                                  Memory · LuxDot   VERIFY            Existing web
                                                                                      surface

  `/messianic-names-numbers-atlas.html`           LuxDot ·          VERIFY            Existing web
                                                  Messianic Names &                   surface
                                                  Numbers Atlas                       

  `/name-truth-memory.html`                       ---               VERIFY            Existing web
                                                                                      surface

  `/projects.html`                                Projects · LuxDot VERIFY            Existing web
                                                                                      surface

  `/research/circle-of-care-25km-original.html`   Circle Of Care    VERIFY            Existing web
                                                  25Km Original ·                     surface
                                                  LuxDot                              

  `/research/global-savior-atlas.html`            Global Savior     VERIFY            Existing web
                                                  Atlas · LuxDot                      surface

  `/research/shaam-breda.html`                    Shaam--Breda ·    VERIFY            Existing web
                                                  LuxDot                              surface

  `/research.html`                                LuxDot · الأبحاث  VERIFY            Existing web
                                                  الحيّة · Live                        surface
                                                  Research                            

  `/sacred-25km-atlas.html`                       LuxDot network    VERIFY            Existing web
                                                  moved                               surface

  `/saint-genis-memory.html`                      LuxDot Memory     VERIFY            Existing web
                                                                                      surface

  `/savior-atlas.html`                            Savior Atlas ·    VERIFY            Existing web
                                                  LuxDot                              surface

  `/savior-deepening.html`                        تعميق أطلس المخلّص VERIFY            Existing web
                                                  · لوكسدوت                           surface

  `/st-bartholomew-memory.html`                   ---               VERIFY            Existing web
                                                                                      surface

  `/stazzema-memory.html`                         ---               VERIFY            Existing web
                                                                                      surface

  `/timeline.html`                                LuxDot · الخط     VERIFY            Existing web
                                                  الزمني                              surface

  `/totalitarian-victims-memory.html`             ---               VERIFY            Existing web
                                                                                      surface

  `/visual-library.html`                          LuxDot · المكتبة  VERIFY            Existing web
                                                  المرئية                             surface

  `/war-reconstruction-memory.html`               War,              VERIFY            Existing web
                                                  Reconstruction &                    surface
                                                  Memory · LuxDot                     

  `/west-brabant-family-memory-network.html`      West Brabant      VERIFY            Existing web
                                                  Networks ---                        surface
                                                  Land, Family,                       
                                                  Faith & Memory ·                    
                                                  LuxDot                              

  `/westerweel-memory.html`                       ---               VERIFY            Existing web
                                                                                      surface
  -----------------------------------------------------------------------------------------------------

## Next data-model action

Use the inventory JSON as the seed for stable IDs and provenance
metadata. Do not duplicate a research subject merely because it belongs
to several clusters; use typed relationships.
