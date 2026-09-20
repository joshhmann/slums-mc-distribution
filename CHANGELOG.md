# Slums MC Changelog

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
