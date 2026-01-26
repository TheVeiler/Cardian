# Cardian

⚠ **WORK IN PROGRESS**

## Description

**Cardian** is an utility library to help you making apps using cards.

The library gives you access to the following exported classes, and all of them are also included in the default export.

## How to use

Once the package downloaded, you could start by loading the standard52 plugin and play with that:

```js
import { Decklist, plugins } from "cardian";

const cardlist = new Decklist(plugins.decklists.standard52);
const deck = cardlist.defaultStorage;

console.log(deck.top.name); // should display a king

deck.shuffle();

console.log(deck.top.name); // should display a random card
```

## To-do

- Add unit tests
