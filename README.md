# flatiron-project-4-frontend

# The Lenormand Phrasebook

The Lenormand Phrasebook is a JavaScript Single Page Application utilitizing data from a separate API built using Ruby on Rails (which is also on GitHub here: https://github.com/cailinkless/flatiron-project-4-backend ). It allows users to practice reading Lenormand cards (a fortune telling system similar in some ways to the better known Tarot cards) by letting them pull three cards from a digital deck, read some simple suggestions for reading them in combination, and submit their own interpretation. The three card spread (a "vignette" in Lenormand terminology) is saved, along with the interpretation, so that future users can browse a library of vignettes and their possible meanings, as well as add ideas of their own.

The initial screen welcomes users and offers links at the top to start a reading, browse past saved vignettes, and look through a listing of the 36 Lenormand cards and their individual meanings.

1.) Home

  Will take the user back to the Welcome screen at any time.

2.) Practice Reading

  Displays a blank spread of three cards that the user must "pull" (by clicking a button) in order. As cards are drawn at random, simple definitions of the cards will start to appear (both as 3 individual cards and as 2 pairs). When all three cards are drawn, some general advice on combining the meanings is given and a button appears inviting the user to submit their interpretation. Only vignettes with at least one submitted interpretation will be saved to the vignette library.

  Eventually, I would like to add the option for users to directly choose each card in their vignette from a drop-down list so that they can input readings done on their own physical card decks.

3.) Community Interpretations

  Takes the user to a list of all saved vignettes, arranged alphabetically. A user can click an individual vignette to get full details initially provided when the spread was first drawn, as well as all previously submitted interpretations. The user is also given a form to add an interpretation of their own.

4.) Card Dictionary

  Displays a list of the 36 traditional Lenormand cards. Clicking on one will take the user to that card's show page with information on its meaning and symbology, as well as a list of all possible 2 card pairings with it as the first card. These pairings can all be clicked for ideas on how to read the cards together. Eventually, users will be able to add ideas for these interpretations as well.

## Installation

Fork this repo and download a clone-- you can run the app on your local server. You will also need the Lenormand Database at https://github.com/cailinkless/flatiron-project-4-backend . 

## Usage

You will need Ruby on Rails in order to run the backend API. Navigate to the backend folder in your terminal and run 'rails s' - then, from the frontend folder, pull up index.html in your chosen browser.

## License

The MIT License (MIT)

Copyright (c) 2021 'Cailín Kless'

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
