import Component from '@glimmer/component';
import { Card } from 'mc-draft/services/cards';

export interface CardQuantity {
  card: Card;
  quantity: number;
}

interface DeckArgs {
  cards: Array<Card>;
}

export default class Deck extends Component<DeckArgs> {
  get cardQuantities(): Array<CardQuantity> {
    const cardMap: Map<Card, number> = new Map();

    this.args.cards.forEach((card) => {
      const entry = cardMap.get(card);
      if (entry === undefined) {
        cardMap.set(card, 1);
      } else {
        cardMap.set(card, entry + 1);
      }
    });

    return Array.from(cardMap.entries(), ([card, quantity]) => {
      return {
        card,
        quantity,
      };
    });
  }
}
