# Slums MC Changelog

## 1.0.5 - 2026-09-20

### Fixed

- Rebuilt configuration-file hashes in `index.toml` from the exact GitHub-served
  LF bytes. This fixes Packwiz `Invalid mod file hash` failures on Windows
  clients for configuration files such as YACL, YIGD, and Yes Steve Model.
- Updated the `pack.toml` index SHA-256 to match the corrected index.

## 1.0.4 - 2026-09-20

### Fixed

- Pinned KubeJS Diesel Generators and Create Sophisticated Backpacks Compat to
  verified public ForgeCDN URLs so clean Packwiz exports and fresh installs do
  not depend on a pre-populated CurseForge cache.

## 1.0.3 - 2026-09-20

### Added

- Reconciled the Packwiz source against the tested `Slums MC - update 1`
  instance.
- Added the tested KubeJS stack: KubeJS, Rhino, KubeJS Create, KubeJS Additions,
  KubeJS Delight, KubeJS Diesel Generators, LootJS, and PonderJS.
- Added the tested Create and TACZ integrations: Create Gunpowder, Create
  Central Kitchen, Create Simple Ore Doubling, Create Immersive TaCZ
  Integration, and Don't Punch My TACZ.
- Added the tested Sophisticated Backpacks/Storage integrations and supporting
  libraries: Sophisticated Backpacks, Sophisticated Core, Sophisticated Storage,
  their Create integrations, Sophisticated Inventory Interactions, and MCPitanLib.
- Added the tested utility/client mods: Controlling, Extreme Sound Muffler,
  Punchy, Visual Workbench, Better Advanced Tooltips, Searchables, and Mod
  Sound Volume Options.
- Added the tested Create Sophisticated Backpacks compatibility mod, Create SA
  Tank Fix, Net Music, and the tested KubeJS Diesel Generators release.

### Changed

- Updated Packwiz-managed existing mod metadata using `packwiz update --all`
  and rebuilt `index.toml`.
- Pinned the new additions to the exact tested files instead of selecting
  unverified latest versions.
- Removed duplicate dependency metafiles for Create and Create Diesel
  Generators; each JAR is represented once in the Packwiz index.
- Updated the Packwiz index SHA-256 in `pack.toml`.

### Verification notes

- ProbeJS was included because it is present in the supplied canonical tested
  manifest. It can be removed later if the pack is finalized without
  development tooling.
- The manual JARs identified during comparison were resolved from their
  Modrinth or CurseForge project records and added by exact filename.
- Distant Horizons is represented by its official
  `DistantHorizons-3.3.1-1.21.1-fabric-neoforge.jar` filename; the supplied
  manifest used a shortened filename that does not exist in the official
  Modrinth/CurseForge file record.

## 1.0.2 - 2026-09-20

### Added

- Added Packwiz-managed KubeJS server scripts for shared ingredient tags:
  - `c:doughs`
  - `c:flours`
  - `c:butters`
  - `c:cheeses`
  - `c:milks`
- Added verified Create fuel compatibility tags for diesel, biodiesel,
  ethanol, plant oil, gasoline, Create Addition bioethanol, and seed oil:
  - `c:fuels`
  - `c:diesel`
  - `c:biofuel`
- Added an additional Create wheat-to-flour milling recipe.
- Added Create sequenced-assembly TACZ cartridge recipes for 9mm, 5.56x45,
  7.62x39, and 12 gauge ammunition.
- TACZ cartridge assembly uses copper-sheet casings, primers, gunpowder, and
  iron projectile nuggets, and writes the correct TACZ `AmmoId` component.
- Added EMI display cleanup for duplicate/template dough and Meadow cheese
  wheel entries.

### Changed

- Changed Yes Steve Model’s default server model to the built-in Steve model
  (`misc_2_steve`) so new players begin with the standard Steve appearance.
- Updated the Packwiz index to include the KubeJS scripts and configuration
  changes.
- Updated `pack.toml` to the new `index.toml` SHA-256 hash.

### Removed

- Removed the incompatible `taczaddon` Packwiz metafile and its KubeJS/config
  entry. This prevents the Sophisticated Backpacks compatibility
  `NoSuchMethodError` crash.

### Compatibility notes

- Existing recipes remain available. The KubeJS recipe additions do not remove
  furnace, smoker, cutting-board, Create, Farmer’s Delight, Bakery, Meadow, or
  Vinery recipes.
- Polymorph remains available to resolve duplicate recipe outputs.
- EMI cleanup only hides selected display entries; it does not remove items or
  recipes from the game.
- The current distribution has no registered lead-nugget item, so iron nuggets
  are used as the portable projectile-material fallback for cartridge recipes.
- Existing compatibility mods such as CompatDelight, LetsDoCompat,
  EveryCompat, Create Central Kitchen, and the Create ore integrations remain
  installed and were not replaced by the KubeJS scripts.
