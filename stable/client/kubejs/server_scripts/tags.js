// Slums MC ingredient unification.
// These are common tags, not replacements for the original items. Existing
// recipes and player inventories therefore remain compatible across updates.
ServerEvents.tags('item', event => {
  event.add('c:doughs', [
    'farmersdelight:wheat_dough',
    'bakery:dough',
    'bakery:sweet_dough',
    'farm_and_charm:dough'
  ])

  event.add('c:flours', [
    'create:wheat_flour',
    'farm_and_charm:flour'
  ])

  event.add('c:butters', [
    'farm_and_charm:butter'
  ])

  event.add('c:cheeses', [
    'meadow:cheese_slice',
    'meadow:cheese_wheel',
    'meadow:goat_cheese_slice',
    'meadow:goat_cheese_wheel',
    'meadow:buffalo_cheese_slice',
    'meadow:buffalo_cheese_wheel',
    'meadow:grain_cheese_slice',
    'meadow:grain_cheese_wheel',
    'meadow:sheep_cheese_slice',
    'meadow:sheep_cheese_wheel',
    'meadow:warped_cheese_slice',
    'meadow:warped_cheese_wheel',
    'meadow:amethyst_cheese_slice',
    'meadow:amethyst_cheese_wheel'
  ])

  event.add('c:milks', [
    'minecraft:milk_bucket',
    'farmersdelight:milk_bottle',
    'meadow:wooden_milk_bucket',
    'meadow:wooden_goat_milk_bucket',
    'meadow:wooden_buffalo_milk_bucket',
    'meadow:wooden_sheep_milk_bucket',
    'meadow:wooden_grain_milk_bucket',
    'meadow:wooden_warped_milk_bucket',
    'meadow:wooden_amethyst_milk_bucket'
  ])

  event.add('c:nuggets/iron', 'minecraft:iron_nugget')
})

// Create fuel interoperability. The dedicated fuel mods already provide
// their own tags; these aliases let addons that only understand a common
// Create/NeoForge fuel tag see the same source fluids.
ServerEvents.tags('fluid', event => {
  const fuels = [
    'createdieselgenerators:diesel',
    'createdieselgenerators:biodiesel',
    'createdieselgenerators:ethanol',
    'createdieselgenerators:plant_oil',
    'createdieselgenerators:gasoline',
    'createaddition:bioethanol',
    'createaddition:seed_oil'
  ]

  fuels.forEach(fluid => {
    event.add('c:fuels', fluid)
  })

  ;[
    'createdieselgenerators:diesel',
    'createdieselgenerators:gasoline'
  ].forEach(fluid => event.add('c:diesel', fluid))

  ;[
    'createdieselgenerators:biodiesel',
    'createdieselgenerators:ethanol',
    'createdieselgenerators:plant_oil',
    'createaddition:bioethanol',
    'createaddition:seed_oil'
  ].forEach(fluid => event.add('c:biofuel', fluid))
})
