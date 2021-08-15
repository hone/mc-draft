import { Card } from 'mc-draft/services/cards';
import shuffle from 'lodash.shuffle';

const DEFAULT = 4;

export default function randomCards(
  cards: Array<Card>,
  quantity: number = DEFAULT
): Array<Card> {
  cards = shuffle(cards);

  return [...Array(quantity).keys()]
    .map(() => cards.pop())
    .filter((maybeCard) => maybeCard !== undefined) as Array<Card>;
}
