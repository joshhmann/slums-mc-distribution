# Packwiz Sync Worklog — 1.0.3

Date: 2026-09-20

## Scope

Compared the Packwiz source at `stable/client` with the tested instance:

`Slums MC - update 1/`

The tested instance was treated as the source of truth for the additions made
during testing. Packwiz metadata was generated from official Modrinth or
CurseForge records and pinned to the exact tested file where available.

## Work performed

1. Started from the existing 1.0.2 Packwiz source.
2. Ran `packwiz modrinth add`/`packwiz curseforge add` for tested additions.
3. Ran `packwiz update --all -y` to update existing Packwiz-managed entries.
4. Ran `packwiz refresh` after every metadata change.
5. Removed duplicate Create and Create Diesel Generators dependency metafiles
   created by dependency discovery. The retained entries are the richer
   Modrinth entries with update metadata.
6. Recomputed the index hash and wrote it to `stable/client/pack.toml`.
7. Bumped the pack version from 1.0.2 to 1.0.3.

## Exact tested additions represented in Packwiz

- Better Advanced Tooltips
- Controlling
- Create Central Kitchen
- Create Gunpowder
- Create Immersive TaCZ Integration
- Create Simple Ore Doubling
- Create Sophisticated Backpacks Compat
- Create Stuff 'N Additions Tank Fix
- Don't Punch My TACZ
- Extreme Sound Muffler
- KubeJS
- KubeJS Additions
- KubeJS Create
- KubeJS Delight
- KubeJS Diesel Generators
- LootJS
- MCPitanLib
- Mod Sound Volume Options
- Net Music
- PonderJS
- Punchy
- Rhino
- Searchables
- Sophisticated Backpacks
- Sophisticated Backpacks Create Integration
- Sophisticated Core
- Sophisticated Inventory Interactions
- Sophisticated Storage
- Sophisticated Storage Create Integration
- Visual Workbench

## Manifest-only tooling decision

`ProbeJS-8.0.3.jar` was present in the supplied canonical manifest and was
therefore added. If the final player pack should exclude development tooling,
remove its metafile deliberately and refresh the index; do not leave the JAR
unmanaged in the client.

## Manual JARs resolved during this pass

These files were present in the tested instance but were not represented by a
matching entry in the old Packwiz TOML. Every file below was resolved by
project and exact version and is now represented in the source index:

- `copycats-3.0.9+mc.1.21.1-neoforge.jar`
- `create_compatible_storage-2.13.0-mc1.21.1-neoforge.jar`
- `create_connected-1.3.3-mc1.21.1.jar`
- `creategoggles-1.21.1-6.1.1-[NEOFORGE].jar`
- `createliquidfuel-3.0.0-1.21.1.jar`
- `createoreexcavation-1.21-1.6.8.jar`
- `cupboard-1.21.1-4.2.jar`
- `DistantHorizons-3.3.1-1.21.1.jar`
- `DnDesires-1.21.1-2.3a-BETA.jar`
- `fastasyncworldsave-1.21-2.6.jar`
- `framework-neoforge-1.21.1-0.13.11.jar`
- `ftb-essentials-neoforge-2101.1.10.jar`
- `ftb-library-neoforge-2101.1.36.jar`
- `lootintegration_townsandtowers-1.5.jar`
- `lootintegration_wda-1.8.jar`
- `lootintegrations_ctov-1.6.jar`
- `lootintegrations_integrated-1.6.jar`
- `lootintegrations_moog-2.2.jar`
- `lootintegrations_vanilla-1.8.jar`
- `lootintegrations_yungs-1.6.jar`
- `lootintegrations-1.21.1-4.7.jar`
- `maidbeacon-1.0.1-bugfix.jar`
- `MaidUseHandCrank_1.6.2-neoforge_21.1.219-1.21.1.jar`
- `powergrid-mc1.21.1-0.6.2.jar`
- `refurbished_furniture-neoforge-1.21.1-1.0.22.jar`
- `structureessentials-1.21.1-5.0.jar`
- `tidemaid-1.2.2-neoforge+mc1.21.1.jar`
- `toms_storage-1.21-2.4.2.jar`
- `touhoulittlemaid-1.5.3-neoforge+mc1.21.1.jar`
- `ysm-2.6.5-neoforge-1.21.1-release.jar`

The source was refreshed after import and checked for duplicate filenames. The
only filename discrepancy is Distant Horizons: the manifest says
`DistantHorizons-3.3.1-1.21.1.jar`, but the official file is
`DistantHorizons-3.3.1-1.21.1-fabric-neoforge.jar`; the source uses the
official filename.
# 2026-09-20 — Packwiz hash normalization fix

- Reproduced the fresh-install failure: Packwiz reported hundreds of failed
  configuration downloads and specifically rejected `yacl.json5`,
  `yes_steve_model/blacklist.txt`, and `yigd.json` with invalid hashes.
- Root cause: the Windows Packwiz refresh generated hashes from CRLF worktree
  bytes, while GitHub served the repository’s LF blob bytes.
- Recalculated 354 configuration entries from exact Git blob bytes, rebuilt
  `index.toml`, and updated `pack.toml` to the new index SHA-256.
- Kept the correction limited to index metadata; no configuration content was
  changed.
# 2026-09-20 — Optional EMI KubeJS integration guard

- Reproduced the client log error `ReferenceError: "EMIEvents" is not defined` with EMI 1.1.24 and KubeJS 2101.7.2.
- Confirmed EMI is installed, but no KubeJS-EMI bridge is present to register `EMIEvents`.
- Wrapped the duplicate-entry cleanup script in a `typeof EMIEvents` guard. EMI remains usable and the script becomes informational instead of aborting client-script loading when the optional bridge is absent.
- Refreshed the Packwiz index and manifest hash.

# 2026-09-20 — Packwiz metadata CRLF/LF repair

- Rechecked all 313 client mod metadata entries against the bytes served by
  GitHub Raw.
- Found 197 stale metadata hashes caused by Windows CRLF worktree bytes being
  hashed while GitHub Raw served LF bytes; one additional entry was corrected
  during normalization.
- Recalculated the metadata hashes from LF bytes, rebuilt `index.toml`, and
  updated `pack.toml` to index hash
  `4312b63a0d32c33723cd770e34ae0f6cbd68a60b08dea422b95a5d2c22ae5213`.
- Added `.gitattributes` rules forcing Packwiz metadata, `index.toml`, and
  `pack.toml` to LF so future Windows refreshes cannot recreate this failure.
- Verified all 313 published metadata hashes against GitHub Raw: 313 checked,
  0 mismatches.

# 2026-09-20 — Remaining nine Packwiz file hashes

- Reproduced the final nine download failures after the metadata repair.
- Corrected the hashes for the NoChatReports README, Konkrete language files,
  structure layout optimizer config, Creeper Overhaul configs, EMI CSS, and
  Creeper Overhaul language/config files.
- Updated `pack.toml` to index hash
  `6aaf06372d43eb1e1447d508f8e2d681fc68d728f7edd26d0bd38c159dc2b61c`.
