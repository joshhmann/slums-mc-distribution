# Slums MC Changelog

## 1.1.5 - 2026-09-29

### Added

Four **CC:Tweaked display and peripheral** mods, all `client_and_server` side, all verified dependency-clean against the shipped 1.1.4 roster:

- **CC:DirectGPU** (`directgpu-1.0.24-neoforge-1.21.1.jar`, project `y2LA8uQE`, version `kxl9oeha`) — hardware-accelerated monitor rendering. True 24-bit colour, up to **164×164 px per block** (656×656 at 4× scaling), monitor arrays up to 16×16, mouse/keyboard input on the monitor surface, JPEG/PNG/GIF decode. Note: Fabric/Forge builds are discontinued — **NeoForge 1.21.1 is now the exclusive target**, which is exactly this pack's stack.
- **CC: Spatial Projector** (`cc_spatial_projector-0.1.0.jar`, project `vcgbtkpD`, version `U5woeSNw`) — in-world holograms for CC:Tweaked: lines, boxes, markers, overlays drawn in world space and viewed through Spatial Goggles. Overlays only — it does not place blocks or affect collisions. Pairs directly with turtle fleet debugging.
- **CC: Terminals** (`ccterminals-1.21.1-forge-0.1.1.jar`, project `mbjglPPW`, version `VT1i1B2`, file `3VT1i1B2`) — GUI-based terminal peripheral blocks for CC:Tweaked.
- **Classic Peripherals** (`classicperipherals-neoforge-1.21.1-0.6.5.jar`, project `F0AMrDjl`, version `gh1FbBVy`) — adds a set of peripherals to CC:Tweaked.

### Why these four

Chosen to close the "can a computer *see* and *display*?" gap for the turtle fleet work. With these, a CC computer can render high-resolution graphics (DirectGPU), project in-world markers for debugging (Spatial Projector), and expose a broader peripheral surface (Terminals, Classic Peripherals).

There is **no true camera or LIDAR peripheral for CC:Tweaked** on this version. The closest thing to volumetric vision is **Advanced Peripherals' Geo Scanner** (`scan(radius)` returns every block with name/tags/x/y/z), which is **already installed**. `CameraCraft` exists but is a separate CCTV system that does not expose a CC peripheral — deliberately not added.

### Compatibility verified

| Requirement | Needed by | Pack has | Result |
|---|---|---|---|
| `computercraft >= 1.117.1` | DirectGPU | 1.120.2 | OK |
| `computercraft >= 1.120.0` | Spatial Projector, Classic Peripherals | 1.120.2 | OK |
| `create [6.0.10, 6.1.0)` | Spatial Projector | 6.0.10 | OK |
| `neoforge [21.1, 21.2)` | CC: Terminals | 21.1.248 | OK |
| `neoforge >= 21.1.228` | Classic Peripherals | 21.1.248 | OK |

Optional dependencies only, neither able to bite: `ccgraphics` (absent from the pack, and declared `optional` + `incompatible` below 0.2.1, so its absence is harmless) and `curios` 9.5.1 (present, range `*`).

### Verification performed

- **Both trees installed end-to-end** with the real `packwiz-installer-bootstrap` (headless): client `Finished successfully!` (329 jars), server `Finished successfully!` (303 jars).
- **All four jars hash-verified (sha512)** against their metafiles after install.
- **Zero duplicate mod ids** introduced. The pre-existing `cupboard` and `lootintegrations*` duplicate pairs (old + new halves) are present on the live server and in the base source tree — **unchanged** by this release, not caused by it.
- **Client/server roster parity**: no server-only jars beyond the pre-existing baseline set.
- **Superset check**: candidate is a strict superset of shipped 1.1.4 — **zero project removals**, exactly four additions.

### Fixed (tooling / source tree)

- The **server source tree was stale**: it was missing `routers-1.21.1-1.1.9.jar` (BBL Routers, shipped to the client in 1.1.4). A server pack rebuilt from that tree would have **silently removed BBL Routers from the live server**. Added it to both the server tree and this candidate; the live server's existing jar hash matches the metafile exactly.

### Note

- Client pack: 335 → **339** mod entries. Server pack: 300 → **305** (299 jars + 2 `.disabled` + metafiles).
- Nothing was deployed. The live server was read-only throughout; all install verification ran against local candidate trees.

## 1.1.4 - 2026-09-29

### Added

- **BBL Routers** (`routers-1.21.1-1.1.9.jar`, project `g69ApBz2`, version `P57vcvrr`) — a fully wireless item, **fluid**, and energy transportation mod. Adds the **Importer** (attaches to a target inventory), the **Exporter** (connected to a source), and the **Router Connector** that links them wirelessly. Filters accept item and fluid stacks, including JEI drag. Also integrates with Mekanism gases and Ars Source.
- Declared requirements (`neoforge >=21.1.203`, `minecraft [1.21.1,1.22)`, optional `jei`) are all satisfied by the current pack. This is the first mod in the pack that can move **fluids** without pipes or adjacent tanks.

### Changed

- **`config/computercraft-server.toml`** — added two narrow HTTP allow rules so CC:Tweaked computers can reach the local CC development/WebSocket bridge on port `8765`:
  - `host = "192.168.0.128", port = 8765` → allow
  - `host = "172.18.0.1", port = 8765` → allow
- These are inserted **above** the bundled `$private` deny rule, because CC rules are evaluated in order and the earlier match wins. `$private` matches *all* private ranges (localhost, 192.168.0.0/16, 10/8, 172.16/12), which is why the bridge was unreachable even though `http.enabled` and `http.websocket_enabled` were already on.
- Both rules carry websocket-sized caps (`max_websocket_message = 131072`, `max_download = 16777216`, `max_upload = 4194304`). One host, one port — the rest of the LAN stays denied.
- Applied to **both** sides: the server pack override *and* the client config, so the setting survives restarts and re-deploys on both ends.

### Note

- Server `mods/` now holds 299 jars + 2 `.disabled`. Verified boot: `Done (8.552s)`, `BBL Routers 1.1.9 (routers)` discovered, zero install errors.
- Diagnosed and recovered from a transient DNS outage mid-deploy: the first boot failed with `UnknownHostException: Failed to resolve 'cdn.modrinth.com'` and the container exited. No mods were lost (all 300 pre-existing files intact). Re-running the boot after DNS recovered completed cleanly.

## 1.1.3 - 2026-09-28

### Fixed

- **Removed six redundant raw mod jars** that duplicated a mod already supplied by a Packwiz metafile. In each pair the raw jar was an *older* copy and the metafile downloaded a newer one, so every client ended up holding two versions of the same mod. NeoForge resolves these by picking the higher version (the server has booted on them for weeks), but they are duplicate deliverables in the index and duplicate mod ids in every player's `mods/` folder:
  - `cupboard-1.21.1-4.0.jar` — superseded by `cupboard.pw.toml` → `cupboard-1.21.1-4.2.jar`
  - `lootintegration_townsandtowers-1.4.jar` — superseded by `loot-integrations-towns-and-towers.pw.toml` → `lootintegration_townsandtowers-1.5.jar`
  - `lootintegrations_ctov-1.4.jar` — superseded by `loot-integrations-choicetheorems-overhauled.pw.toml` → `lootintegrations_ctov-1.6.jar`
  - `lootintegrations_integrated-1.5.jar` — superseded by `loot-integrations-integrated-dungeons-villages.pw.toml` → `lootintegrations_integrated-1.6.jar`
  - `lootintegrations_moog-2.1.jar` — superseded by `loot-integrations-moogs-voyager-soaring-end-nether.pw.toml` → `lootintegrations_moog-2.2.jar`
  - `lootintegrations_vanilla-1.7.jar` — superseded by `vanilla-loot-addon-for-loot-integrations.pw.toml` → `lootintegrations_vanilla-1.8.jar`

### Note

- Client-only change; no server restart required and no server mod removed. The live server still carries older copies of these same jars in its `mods/` dir — harmless (NeoForge loads the newest) but worth mirroring during a future maintenance window. This was **not** the cause of the 1.1.0/1.1.1 launch failures; those were the JEI conflict fixed in 1.1.2.

## 1.1.2 - 2026-09-28

### Fixed

- **Removed `tmrv` (TooManyRecipeViewers)** — added in 1.1.0, it broke client launch. TMRV declares its own `modId = "jei"` **stub at version `19.27.0.343`**. Because JEI plugins from `sophisticatedcore` and `polymorph` were already in the pack, TMRV made JEI *present but under-versioned*, and those mods' optional-but-present JEI requirement failed:
  - `sophisticatedcore` (and the Sophisticated Create integrations) require JEI ≥ `19.32.0.359`
  - `polymorph` requires JEI ≥ `19.52.0.421`
- **Diagnosis note:** the JEI requirement in those mods is `type = "optional"`, which means *absent* is fine but *present-and-old* is a hard error. TMRV's stub was the only reason a JEI version conflict could occur at all.
- Keeping JEI `19.57.0.449` (added in 1.1.1); removing TMRV resolves the duplicate-mod collision. Verified by a full installer run from a 1.1.0 instance: `Deleted toomanyrecipeviewers-0.9.0+mc.21.1.jar (removed from pack)`.

## 1.1.1 - 2026-09-28

### Fixed

- **Added JEI `19.57.0.449`** (`jei-1.21.1-neoforge-19.57.0.449.jar`) to satisfy the JEI dependency errors introduced by TMRV in 1.1.0. This resolved the version complaint but produced a duplicate-mod conflict (`Mod jei is present in multiple files`), because TMRV bundles its own JEI stub. Superseded by 1.1.2.
- Client-only change; no server restart required.

## 1.1.0 - 2026-09-28

### Added

- `tmrv` (TooManyRecipeViewers) — a JEI-plugin compatibility layer for EMI. **Reverted in 1.1.2**: its bundled JEI stub (`19.27.0.343`) conflicts with the JEI versions required by `sophisticatedcore` and `polymorph`.
- `shulkerboxtooltip` (Shulker Box Tooltip) `5.1.9+1.21.1`.

### Note

- 1.1.0 and 1.1.1 were both broken client releases. Friends updating to either will hit a mod-loading error; **1.1.2 is the first working version**.

## 1.0.8 - 2026-09-27

### Removed

- **PMWeather stack** (server + client): `pmweather`, `pmwextra`, `easaddon`, `villagersrun` (Villagers Take Cover), `windmeter` (Elton's Wind Meter). Three of the four addons declare PMWeather as a *required* dependency, so the whole stack had to go together. Seasons, tornadoes, wildfires, log-rotting and block weather-damage are gone with it; reinforced concrete and rotted wood are no longer obtainable.
- **`create-ccbr`** — it silently replaced 20 of CC:Tweaked's core recipes with Create-gated versions (`minecraft:stone` → `create:andesite_alloy`) and had no config toggle. Vanilla CC:Tweaked recipes are native again. The server-side `slums-cc-vanilla-recipes` world datapack is retained as a guard in case ccbr is ever reintroduced.

### Changed

- Server mod count 306 → 298; PMWeather-family configs removed from both trees.

## 1.0.8-hotfix1 - 2026-09-27

### Removed

- **`pmshaders` (PMShaders)** from the client distribution — it provides shader support for ProtoManly's weather mod (PMWeather), which was removed in 1.0.8. It was a dead dependency with no remaining purpose. Client-only mod; no server change or restart required, and no other mod depends on it.

## 1.0.4-hotfix2 - 2026-09-20

### Changed

- Removed the three Packwiz-managed EMI configuration files from the client distribution; the EMI mods remain installed.
- Refreshed the Packwiz index and bumped the client hotfix version.

## 1.0.4-hotfix1 - 2026-09-20

### Fixed

- Pinned the newly added CurseForge-backed client mods to verified ForgeCDN URLs instead of runtime CurseForge metadata resolution.
- Corrected the encoded `+` in the Net Music filename URL.
- Refreshed the Packwiz index after the updated metadata files so client hash verification matches the repository contents.

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
