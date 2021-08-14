import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import CardsService, { Card, Faction } from 'mc-draft/services/cards';
import RouterService from '@ember/routing/router-service';
import { tracked } from '@glimmer/tracking';
import { Model } from 'mc-draft/routes/draft-card';
import shuffle from 'lodash.shuffle';

const DECK_LIMIT = 25;

export default class DraftCard extends Controller {
  @service declare cards: CardsService;
  @service declare router: RouterService;

  declare model: Model;

  queryParams = [
    'faction',
    {
      selectedCards: {
        replace: true,
        type: 'array' as const,
      },
    },
  ];

  faction = 'aggression';
  @tracked selectedCards: Array<string> = [];

  get selectedCardObjects(): Array<Card> {
    return this.selectedCards.map((code) => this.cards.card(code));
  }

  cardPool(): Array<Card> {
    const cards = this.cards
      .aspect(this.faction as Faction)
      .concat(this.cards.aspect(Faction.Basic))
      .flatMap((card: Card) => {
        if (card.is_unique) {
          return card;
        } else {
          return [card, card, card];
        }
      });
    const index = cards.findIndex((card) =>
      this.selectedCards.includes(card.code)
    );
    cards.splice(index, 1);

    return shuffle(cards);
  }

  get cardSelection(): Array<Card> {
    const pool = this.cardPool();

    return [...Array(4).keys()]
      .map(() => {
        return pool.pop();
      })
      .filter((maybeCard) => maybeCard !== undefined) as Card[];
  }

  @action
  select(card: Card): void {
    const selectedCards = [card.code].concat(this.selectedCards);
    let routeName;

    if (selectedCards.length < DECK_LIMIT) {
      routeName = 'draft-card';
    } else {
      routeName = 'finished';
    }

    void this.router.transitionTo(routeName, this.model.hero.code, {
      queryParams: {
        faction: this.faction,
        selectedCards,
      },
    });
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'draft-card': DraftCard;
  }
}
