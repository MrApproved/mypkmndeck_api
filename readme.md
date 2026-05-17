# My Pokémon Deck - API

A NodeJS Express WebApi which hosts the entire list of Pokémon cards to date (05/2026), a few GET methods are exposed which lists the series, sets, types, colours, stages, cards and the card image.

## Running Application

Execute the following within the src folder.

- npm install
- node app.js (this will run the application on localhost under port 3000)

## Methods

/series

- Returns a list of series. A series contains a list of sets.

/types

- Returns a list of unique types extracted from the Pokémon cards.

/colours

- Returns a list of unique colours extracted from the Pokémon cards.

/stages

- Returns a list of unique stages extracted from the Pokémon cards.

/cards

- Retruns a list of Pokémon cards which supports the following filters. Parameter values are URI decoded.
  - ?name = Filter all cards which contain that value as part of the name.
  - ?series = Filter all cards which are part of the specified series. Comma seperated value to allow multiple series filtering.
  - ?sets = Filter all cards which are part of the specified set. Comma seperated value to allow multiple set filtering.
  - ?types = Filter all cards which are of the specified type. Comma seperated value to allow multiple type filtering.
  - ?colours = Filter all cards which are of the specified colour. Comma seperated value to allow multiple colour filtering.
  - ?stages = Filter all cards which are of the specified stage. Comma seperated value to allow multiple stage filtering.

/resources/:series/:set/images/:cardnumber

- Returns an image file using the series, set and card number + .jpg

## Examples

- http://localhost:3000/cards/?name=pikachu - Return all cards which contain pikachu in the name.
- http://localhost:3000/cards/?series=black-%26-white - Return all cards which are part of the Black & White series.
- http://localhost:3000/cards/?name=pikachu&series=promos&types=Pok%25C3%25A9mon&colours=Metal&stages=Basic - Return all cards which contain pikachu in the name, part of the promos series, is of type Pokémon, the colour of the card is metal and the stage of the card is basic.
