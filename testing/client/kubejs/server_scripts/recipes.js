// Slums MC recipe policy.
// Keep this file focused on recipe policy so it is safe to update without
// touching worlds, options.txt, keybindings, or player-owned config files.

ServerEvents.recipes(event => {
  // Create Immersive TaCZ 1.6 ships four casing-fill recipes using the old
  // `fluid_stack` nested-recipe format. NeoForge/Create 6.0.10 rejects those
  // nested recipes during KubeJS inspection. Remove only the broken addon
  // recipes; the four Slums MC replacements below preserve the same gameplay
  // path without touching the addon casing recipes or other ammo recipes.
  [
    'createimmersivetacz:ammo/pneumatic_pistol_casing_fill',
    'createimmersivetacz:ammo/rimmed_blunt_ap_casing_fill',
    'createimmersivetacz:ammo/slap_casing_fill',
    'createimmersivetacz:ammo/twelve_gauge_shell_fill'
  ].forEach(id => event.remove({ id: id }))

  // Canonical ingredient policy. Original food items remain valid in tags and
  // inventories; this does not rewrite or delete player-owned item stacks.
  // Standard Create flour output from wheat. Other flour-producing recipes
  // should use #c:flours as an input rather than introducing another output.
  event.recipes.create.milling('create:wheat_flour', 'minecraft:wheat')

  // Common TACZ cartridge assemblies. The casing is made from a copper sheet,
  // then receives a primer, powder, and a lead/iron projectile. The result is
  // the TACZ ammo item with its AmmoId component, which TACZ reads at runtime.
  const cartridge = (id, ammoId, casing, nuggetTag, loops = 1) => {
    event.custom({
      type: 'create:sequenced_assembly',
      ingredient: { item: 'create:copper_sheet' },
      loops: loops,
      results: [{
        id: 'tacz:ammo',
        count: 1,
        components: { 'minecraft:custom_data': { AmmoId: ammoId } }
      }],
      sequence: [
        {
          type: 'create:cutting',
          ingredients: [{ item: 'create:copper_sheet' }],
          results: [{ id: casing }]
        },
        {
          type: 'create:deploying',
          ingredients: [{ item: casing }, { item: 'createimmersivetacz:primer' }],
          results: [{ id: casing }]
        },
        {
          type: 'create:deploying',
          ingredients: [{ item: casing }, { item: 'minecraft:gunpowder' }],
          results: [{ id: casing }]
        },
        {
          type: 'create:deploying',
          ingredients: [{ item: casing }, { tag: nuggetTag }],
          results: [{ id: casing }]
        }
      ],
      transitional_item: { id: casing }
    }).id(`slums_mc:${id}`)
  }

  cartridge('9mm_cartridge', 'tacz:9mm', 'createimmersivetacz:pneumatic_pistol_casing', 'c:nuggets/iron', 8)
  // The current distribution has no registered lead-nugget item, so iron is
  // the portable fallback. A future lead mod can add c:nuggets/lead and these
  // ingredients can be switched to that tag without changing recipe IDs.
  cartridge('556x45_cartridge', 'tacz:556x45', 'createimmersivetacz:slap_casing', 'c:nuggets/iron', 4)
  cartridge('762x39_cartridge', 'tacz:762x39', 'createimmersivetacz:rimmed_blunt_ap_casing', 'c:nuggets/iron', 4)
  cartridge('12g_cartridge', 'tacz:12g', 'createimmersivetacz:twelve_gauge_shell', 'c:nuggets/iron', 4)
})
