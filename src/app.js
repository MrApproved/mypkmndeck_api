const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const port = process.env.PORT || "3000";

// For localhost
const corsOptions = {
 origin: "*",
 optionsSuccessStatus: 200,
};

const Series = {
 name: String,
 sets: [],
};

const cards = [];
const series = [];
const types = [];
const colours = [];
const stages = [];

const jsonFiles = [
 // Black & White
 "resources/black-&-white/black-&-white/cards.json",
 "resources/black-&-white/black-&-white-energy/cards.json",
 "resources/black-&-white/black-&-white-promos/cards.json",
 "resources/black-&-white/black-&-white-trainer-kit—excadrill/cards.json",
 "resources/black-&-white/black-&-white-trainer-kit—zoroark/cards.json",
 "resources/black-&-white/boundaries-crossed/cards.json",
 "resources/black-&-white/dark-explorers/cards.json",
 "resources/black-&-white/dragon-vault/cards.json",
 "resources/black-&-white/dragons-exalted/cards.json",
 "resources/black-&-white/emerging-powers/cards.json",
 "resources/black-&-white/legendary-treasures/cards.json",
 "resources/black-&-white/mcdonald’s-collection-2011/cards.json",
 "resources/black-&-white/mcdonald’s-collection-2012/cards.json",
 "resources/black-&-white/next-destinies/cards.json",
 "resources/black-&-white/noble-victories/cards.json",
 "resources/black-&-white/plasma-blast/cards.json",
 "resources/black-&-white/plasma-freeze/cards.json",
 "resources/black-&-white/plasma-storm/cards.json",
 // Classic
 "resources/classic/base-set/cards.json",
 "resources/classic/base-set-2/cards.json",
 "resources/classic/fossil/cards.json",
 "resources/classic/jungle/cards.json",
 "resources/classic/team-rocket/cards.json",
 // Diamond-&-Pearl
 "resources/diamond-&-pearl/diamond-&-pearl/cards.json",
 "resources/diamond-&-pearl/diamond-&-pearl-promos/cards.json",
 "resources/diamond-&-pearl/diamond-&-pearl-trainer-kit—lucario/cards.json",
 "resources/diamond-&-pearl/diamond-&-pearl-trainer-kit—manaphy/cards.json",
 "resources/diamond-&-pearl/great-encounters/cards.json",
 "resources/diamond-&-pearl/legends-awakened/cards.json",
 "resources/diamond-&-pearl/majestic-dawn/cards.json",
 "resources/diamond-&-pearl/mysterious-treasures/cards.json",
 "resources/diamond-&-pearl/pop-series-6/cards.json",
 "resources/diamond-&-pearl/pop-series-7/cards.json",
 "resources/diamond-&-pearl/pop-series-8/cards.json",
 "resources/diamond-&-pearl/secret-wonders/cards.json",
 "resources/diamond-&-pearl/stormfront/cards.json",
 // e-card
 "resources/e-card/aquapolis/cards.json",
 "resources/e-card/expedition/cards.json",
 "resources/e-card/skyridge/cards.json",
 // ex
 "resources/ex/crystal-guardians/cards.json",
 "resources/ex/delta-species/cards.json",
 "resources/ex/deoxys/cards.json",
 "resources/ex/dragon/cards.json",
 "resources/ex/dragon-frontiers/cards.json",
 "resources/ex/emerald/cards.json",
 "resources/ex/ex-trainer-kit—latias/cards.json",
 "resources/ex/ex-trainer-kit—latios/cards.json",
 "resources/ex/ex-trainer-kit—minun/cards.json",
 "resources/ex/ex-trainer-kit—plusle/cards.json",
 "resources/ex/firered-&-leafgreen/cards.json",
 "resources/ex/hidden-legends/cards.json",
 "resources/ex/holon-phantoms/cards.json",
 "resources/ex/legend-maker/cards.json",
 "resources/ex/nintendo-black-star-promos/cards.json",
 "resources/ex/pop-series-1/cards.json",
 "resources/ex/pop-series-2/cards.json",
 "resources/ex/pop-series-3/cards.json",
 "resources/ex/pop-series-4/cards.json",
 "resources/ex/pop-series-5/cards.json",
 "resources/ex/power-keepers/cards.json",
 "resources/ex/ruby-&-sapphire/cards.json",
 "resources/ex/sandstorm/cards.json",
 "resources/ex/team-magma-vs-team-aqua/cards.json",
 "resources/ex/team-rocket-returns/cards.json",
 "resources/ex/unseen-forces/cards.json",
 // gym
 "resources/gym/gym-challenge/cards.json",
 "resources/gym/gym-heroes/cards.json",
 // heartgold & soulsilver
 "resources/heartgold-&-soulsilver/call-of-legends/cards.json",
 "resources/heartgold-&-soulsilver/heartgold-&-soulsilver/cards.json",
 "resources/heartgold-&-soulsilver/heartgold-&-soulsilver-promos/cards.json",
 "resources/heartgold-&-soulsilver/hs-energy/cards.json",
 "resources/heartgold-&-soulsilver/hs-trainer-kit—gyarados/cards.json",
 "resources/heartgold-&-soulsilver/hs-trainer-kit—raichu/cards.json",
 "resources/heartgold-&-soulsilver/triumphant/cards.json",
 "resources/heartgold-&-soulsilver/undaunted/cards.json",
 "resources/heartgold-&-soulsilver/unleashed/cards.json",
 // mega-evolution
 "resources/mega-evolution/ascended-heroes/cards.json",
 "resources/mega-evolution/mega-evolution/cards.json",
 "resources/mega-evolution/mega-evolution-energy/cards.json",
 "resources/mega-evolution/mega-evolution-promos/cards.json",
 "resources/mega-evolution/perfect-order/cards.json",
 "resources/mega-evolution/phantasmal-flames/cards.json",
 // misc
 "resources/misc/pokémon-trading-card-game-classic—blastoise/cards.json",
 "resources/misc/pokémon-trading-card-game-classic—charizard/cards.json",
 "resources/misc/pokémon-trading-card-game-classic—venusaur/cards.json",
 // neo
 "resources/neo/neo-destiny/cards.json",
 "resources/neo/neo-discovery/cards.json",
 "resources/neo/neo-genesis/cards.json",
 "resources/neo/neo-revelation/cards.json",
 // other
 "resources/other/best-of-game/cards.json",
 "resources/other/box-topper/cards.json",
 "resources/other/legendary-collection/cards.json",
 "resources/other/mcdonald’s-collection-2011/cards.json",
 "resources/other/mcdonald’s-collection-2012/cards.json",
 "resources/other/mcdonald’s-collection-2016/cards.json",
 "resources/other/mcdonald’s-collection-2019/cards.json",
 "resources/other/mcdonald’s-collection-2021/cards.json",
 "resources/other/mcdonald’s-collection-2022/cards.json",
 "resources/other/miscellaneous/cards.json",
 "resources/other/rumble/cards.json",
 "resources/other/southern-islands/cards.json",
 "resources/other/victory-medals/cards.json",
 "resources/other/world-collection/cards.json",
 // platinum
 "resources/platinum/arceus/cards.json",
 "resources/platinum/platinum/cards.json",
 "resources/platinum/pop-series-9/cards.json",
 "resources/platinum/rising-rivals/cards.json",
 "resources/platinum/rumble/cards.json",
 "resources/platinum/supreme-victors/cards.json",
 // pop
 "resources/pop/pop-series-1/cards.json",
 "resources/pop/pop-series-2/cards.json",
 "resources/pop/pop-series-3/cards.json",
 "resources/pop/pop-series-4/cards.json",
 "resources/pop/pop-series-5/cards.json",
 "resources/pop/pop-series-6/cards.json",
 "resources/pop/pop-series-7/cards.json",
 "resources/pop/pop-series-8/cards.json",
 "resources/pop/pop-series-9/cards.json",
 // promos
 "resources/promos/black-&-white-promos/cards.json",
 "resources/promos/diamond-&-pearl-promos/cards.json",
 "resources/promos/heartgold-&-soulsilver-promos/cards.json",
 "resources/promos/mega-evolution-promos/cards.json",
 "resources/promos/nintendo-black-star-promos/cards.json",
 "resources/promos/pokémon-futsal-promos-2020/cards.json",
 "resources/promos/scarlet-&-violet-promos/cards.json",
 "resources/promos/sun-&-moon-promos/cards.json",
 "resources/promos/sword-&-shield-promos/cards.json",
 "resources/promos/wizards-black-star-promos/cards.json",
 "resources/promos/xy-promos/cards.json",
 // scarlet & violet
 "resources/scarlet-&-violet/151/cards.json",
 "resources/scarlet-&-violet/black-bolt/cards.json",
 "resources/scarlet-&-violet/destined-rivals/cards.json",
 "resources/scarlet-&-violet/journey-together/cards.json",
 "resources/scarlet-&-violet/mcdonald’s-match-battle-2023/cards.json",
 "resources/scarlet-&-violet/obsidian-flames/cards.json",
 "resources/scarlet-&-violet/paldea-evolved/cards.json",
 "resources/scarlet-&-violet/paldean-fates/cards.json",
 "resources/scarlet-&-violet/paradox-rift/cards.json",
 "resources/scarlet-&-violet/prismatic-evolutions/cards.json",
 "resources/scarlet-&-violet/scarlet-&-violet/cards.json",
 "resources/scarlet-&-violet/scarlet-&-violet-energy/cards.json",
 "resources/scarlet-&-violet/scarlet-&-violet-promos/cards.json",
 "resources/scarlet-&-violet/shrouded-fable/cards.json",
 "resources/scarlet-&-violet/stellar-crown/cards.json",
 "resources/scarlet-&-violet/surging-sparks/cards.json",
 "resources/scarlet-&-violet/temporal-forces/cards.json",
 "resources/scarlet-&-violet/twilight-masquerade/cards.json",
 "resources/scarlet-&-violet/white-flare/cards.json",
 // sun & moon
 "resources/sun-&-moon/burning-shadows/cards.json",
 "resources/sun-&-moon/celestial-storm/cards.json",
 "resources/sun-&-moon/cosmic-eclipse/cards.json",
 "resources/sun-&-moon/crimson-invasion/cards.json",
 "resources/sun-&-moon/detective-pikachu/cards.json",
 "resources/sun-&-moon/dragon-majesty/cards.json",
 "resources/sun-&-moon/forbidden-light/cards.json",
 "resources/sun-&-moon/guardians-rising/cards.json",
 "resources/sun-&-moon/hidden-fates/cards.json",
 "resources/sun-&-moon/lost-thunder/cards.json",
 "resources/sun-&-moon/mcdonald’s-collection-2019/cards.json",
 "resources/sun-&-moon/shining-legends/cards.json",
 "resources/sun-&-moon/sun-&-moon/cards.json",
 "resources/sun-&-moon/sun-&-moon-energy/cards.json",
 "resources/sun-&-moon/sun-&-moon-promos/cards.json",
 "resources/sun-&-moon/sun-&-moon-trainer-kit—alolan-raichu/cards.json",
 "resources/sun-&-moon/sun-&-moon-trainer-kit—lycanroc/cards.json",
 "resources/sun-&-moon/team-up/cards.json",
 "resources/sun-&-moon/ultra-prism/cards.json",
 "resources/sun-&-moon/unbroken-bonds/cards.json",
 "resources/sun-&-moon/unified-minds/cards.json",
 // sword & shield
 "resources/sword-&-shield/astral-radiance/cards.json",
 "resources/sword-&-shield/battle-styles/cards.json",
 "resources/sword-&-shield/brilliant-stars/cards.json",
 "resources/sword-&-shield/celebrations/cards.json",
 "resources/sword-&-shield/champion’s-path/cards.json",
 "resources/sword-&-shield/chilling-reign/cards.json",
 "resources/sword-&-shield/crown-zenith/cards.json",
 "resources/sword-&-shield/darkness-ablaze/cards.json",
 "resources/sword-&-shield/evolving-skies/cards.json",
 "resources/sword-&-shield/fusion-strike/cards.json",
 "resources/sword-&-shield/lost-origin/cards.json",
 "resources/sword-&-shield/mcdonald’s-collection-2022/cards.json",
 "resources/sword-&-shield/pokémon-futsal-promos-2020/cards.json",
 "resources/sword-&-shield/pokémon-go/cards.json",
 "resources/sword-&-shield/rebel-clash/cards.json",
 "resources/sword-&-shield/shining-fates/cards.json",
 "resources/sword-&-shield/silver-tempest/cards.json",
 "resources/sword-&-shield/sword-&-shield/cards.json",
 "resources/sword-&-shield/sword-&-shield-energy/cards.json",
 "resources/sword-&-shield/sword-&-shield-promos/cards.json",
 "resources/sword-&-shield/vivid-voltage/cards.json",
 // trainer kits
 "resources/trainer-kits/black-&-white-trainer-kit—excadrill/cards.json",
 "resources/trainer-kits/black-&-white-trainer-kit—zoroark/cards.json",
 "resources/trainer-kits/diamond-&-pearl-trainer-kit—lucario/cards.json",
 "resources/trainer-kits/diamond-&-pearl-trainer-kit—manaphy/cards.json",
 "resources/trainer-kits/ex-trainer-kit—latias/cards.json",
 "resources/trainer-kits/ex-trainer-kit—latios/cards.json",
 "resources/trainer-kits/ex-trainer-kit—minun/cards.json",
 "resources/trainer-kits/ex-trainer-kit—plusle/cards.json",
 "resources/trainer-kits/hs-trainer-kit—gyarados/cards.json",
 "resources/trainer-kits/hs-trainer-kit—raichu/cards.json",
 "resources/trainer-kits/sun-&-moon-trainer-kit—alolan-raichu/cards.json",
 "resources/trainer-kits/sun-&-moon-trainer-kit—lycanroc/cards.json",
 "resources/trainer-kits/xy-trainer-kit—bisharp/cards.json",
 "resources/trainer-kits/xy-trainer-kit—latias/cards.json",
 "resources/trainer-kits/xy-trainer-kit—latios/cards.json",
 "resources/trainer-kits/xy-trainer-kit—noivern/cards.json",
 "resources/trainer-kits/xy-trainer-kit—pikachu-libre/cards.json",
 "resources/trainer-kits/xy-trainer-kit—suicune/cards.json",
 "resources/trainer-kits/xy-trainer-kit—sylveon/cards.json",
 "resources/trainer-kits/xy-trainer-kit—wigglytuff/cards.json",
 // xy
 "resources/xy/ancient-origins/cards.json",
 "resources/xy/breakpoint/cards.json",
 "resources/xy/breakthrough/cards.json",
 "resources/xy/double-crisis/cards.json",
 "resources/xy/evolutions/cards.json",
 "resources/xy/fates-collide/cards.json",
 "resources/xy/flashfire/cards.json",
 "resources/xy/furious-fists/cards.json",
 "resources/xy/generations/cards.json",
 "resources/xy/kalos-starter-set/cards.json",
 "resources/xy/mcdonald’s-collection-2016/cards.json",
 "resources/xy/phantom-forces/cards.json",
 "resources/xy/primal-clash/cards.json",
 "resources/xy/roaring-skies/cards.json",
 "resources/xy/steam-siege/cards.json",
 "resources/xy/xy/cards.json",
 "resources/xy/xy-energy/cards.json",
 "resources/xy/xy-promos/cards.json",
 "resources/xy/xy-trainer-kit—bisharp/cards.json",
 "resources/xy/xy-trainer-kit—latias/cards.json",
 "resources/xy/xy-trainer-kit—latios/cards.json",
 "resources/xy/xy-trainer-kit—noivern/cards.json",
 "resources/xy/xy-trainer-kit—pikachu-libre/cards.json",
 "resources/xy/xy-trainer-kit—suicune/cards.json",
 "resources/xy/xy-trainer-kit—sylveon/cards.json",
 "resources/xy/xy-trainer-kit—wigglytuff/cards.json",
];

jsonFiles.forEach((f) => {
 JSON.parse(fs.readFileSync(f, "utf8")).forEach((c) => {
  cards.push(c);
 });
});

cards.forEach((c) => {
 // Series
 if (!series.map((s) => s.name).includes(c.series)) {
  let newSeries = Object.create(Series);
  newSeries.name = c.series;
  newSeries.sets = [];
  newSeries.sets.push(c.set);
  series.push(newSeries);
 }
 // Sets
 let currentSeries = series.filter((s) => s.name == c.series)[0];
 if (!currentSeries.sets.includes(c.set)) currentSeries.sets.push(c.set);

 // Types
 if (!types.includes(c.type)) types.push(c.type);

 // Colours
 if (c.colours !== undefined) {
  c.colours.forEach((colour) => {
   if (!colours.includes(colour)) colours.push(colour);
  });
 }

 // Stages
 if (!stages.includes(c.stage) && c.stage !== undefined) stages.push(c.stage);
});
types.sort();
colours.sort();
stages.sort();

app.use(cors(corsOptions));

app.get("/series", (req, res) => {
 res.send(series);
});

app.get("/types", (req, res) => {
 res.send(types);
});

app.get("/colours", (req, res) => {
 res.send(colours);
});

app.get("/stages", (req, res) => {
 res.send(stages);
});

app.get("/cards", (req, res) => {
 var filteredCards = cards;

 filteredCards =
  req.query.name !== undefined
   ? filteredCards.filter((c) =>
      c.name?.toLowerCase().includes(req.query.name.toLowerCase()),
     )
   : filteredCards;

 let seriesFilter =
  req.query.series != undefined
   ? decodeURIComponent(req.query.series.split(","))
   : [];

 let setsFilter =
  req.query.sets != undefined
   ? decodeURIComponent(req.query.sets).split(",")
   : [];

  if (seriesFilter.length > 0 || setsFilter.length > 0) {
  filteredCards = filteredCards.filter((c) => {
   return (
    seriesFilter.includes(c.series) ||
    setsFilter.includes(c.set)
   );
  });
 }

 if (req.query.types !== undefined) {
  var queryTypes = decodeURIComponent(req.query.types).split(",");
  filteredCards = filteredCards.filter((c) => queryTypes.includes(c.type));
 }

 if (req.query.colours !== undefined) {
  var queryColours = decodeURIComponent(req.query.colours).split(",");
  filteredCards = filteredCards.filter((x) => {
   if (x.colours !== undefined)
    return queryColours.some((r) => x.colours.includes(r));
   return false;
  });
 }

 if (req.query.stages !== undefined) {
  var queryStages = decodeURIComponent(req.query.stages).split(",");
  filteredCards = filteredCards.filter((c) => queryStages.includes(c.stage));
 }

 res.send(filteredCards);
});

app.get(
 "/resources/:series/:set/images/:cardnumber",
 async function (req, res) {
  let image = await fs.readFileSync(
   `resources/${req.params.series}/${req.params.set}/images/${req.params.cardnumber}`,
  );
  image = Buffer.from(image, "base64");

  res.writeHead(200, {
   "Content-Type": "image/jpg",
   "Content-Length": image.length,
  });
  res.end(image);
 },
);

app.listen(port, () => {
 console.log(`Example app listening on port ${port}`);
});
