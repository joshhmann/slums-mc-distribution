# Slums MC testing (not live)

Packwiz client manifest:
https://raw.githubusercontent.com/joshhmann/slums-mc-distribution/refs/heads/main/testing/client/pack.toml

Use the separate **Slums MC Testing** Prism instance. Its pre-launch updater installs this channel, not stable. The managed server list contains the QA endpoint only (`192.168.0.187:25574`); check QA availability before playing.

Testing publication is not release clearance. Do not change this channel during an active test. Publish complete snapshots and verify served manifest/index hashes. Preserve `stable/client/` unchanged until explicit release acceptance.

Current client packaging version: `1.9.1-testing.1` (1.9.1 candidate content plus QA-only server list). Addons One is beta. Elixirum and Defender excluded. Gameplay/quest UI/moving-structure acceptance is still pending.

No server runtime, worlds, player data or credentials belong in this directory.
