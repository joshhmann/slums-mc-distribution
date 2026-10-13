// Reduce duplicate/template clutter in EMI without hiding usable ingredients.
// Keep one canonical flour/dough/cheese display while preserving the actual
// items for recipes, loot, and existing player inventories.
// EMI does not expose EMIEvents by itself. Keep this optional so the pack
// remains compatible with clients that do not install a KubeJS-EMI bridge.
if (typeof EMIEvents !== 'undefined') {
  EMIEvents.removeEntries(event => {
    event.remove('bakery:sweet_dough')
    event.remove('meadow:cheese_wheel')
    event.remove('meadow:goat_cheese_wheel')
    event.remove('meadow:buffalo_cheese_wheel')
    event.remove('meadow:grain_cheese_wheel')
    event.remove('meadow:sheep_cheese_wheel')
    event.remove('meadow:warped_cheese_wheel')
    event.remove('meadow:amethyst_cheese_wheel')
  })
} else {
  console.info('EMIEvents is unavailable; leaving EMI entries unchanged.')
}
