import { Game } from "./lib/Game";

const blackjack = new Game().addPlayers("Nicolas", "Thibault", "Christophe", "Valentin");

const [nicolas, thibault, christophe, valentin] = blackjack.players;

blackjack.start();

// nicolas.stand();
// thibault.hit();
// // thibault.stand();
// christophe.double();
// valentin.split();
