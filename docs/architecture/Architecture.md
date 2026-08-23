# LuxDot Knowledge Architecture

## Architectural principle

LuxDot should behave as a knowledge system first and a visual website
second. Visualizations are views over canonical knowledge objects.

## Canonical hierarchy

`Universe → Galaxy → Cluster → Node → Cartridge → Evidence`

A node is canonical and may appear in multiple clusters through
relationships; it should not be duplicated merely to appear in another
view.

## Obsidian-to-Web mapping

  Obsidian               LuxDot Web
  ---------------------- ---------------------------------
  Note                   Node
  Folder                 Galaxy / Domain
  Tag                    Filter / Facet
  Wikilink / Backlink    Typed Relationship
  YAML Frontmatter       Node Metadata
  Graph View             Research Sky / Universe
  Canvas / curated map   Constellation / curated cluster
  Dated note             Timeline event
  Attachment             Evidence / Media
  Approved note          Canonical Library
  Draft note             Living Research
  Git history            Provenance / Version History

## Core node metadata

-   stable_id
-   title / localized_titles
-   node_type
-   domains / clusters
-   people / places / dates
-   summary
-   source_type
-   evidence_status
-   confidence
-   relationships
-   language_status
-   created_at / updated_at
-   introduced_in_version
-   verification_status

## Evidence states

Keep distinct: 1. externally verified fact 2. primary/contemporaneous
evidence 3. user recollection 4. interpretation 5. hypothesis 6.
symbolic association 7. disputed/uncertain 8. falsified/rejected

## Biography separation

Personal biography may link to research nodes, but biographical
testimony is not automatically research evidence. Every biography event
should retain provenance and date confidence.

## Institutional memory

No essential project knowledge should depend on one conversation, one
person, or one visualization. Canonical Markdown/structured data,
release history, and the Master Backlog form the durable memory layer.
