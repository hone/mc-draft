import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import CardsService, { Card, Faction } from 'mc-draft/services/cards';
import randomCards from 'mc-draft/lib/random-cards';
import RouterService from '@ember/routing/router-service';
import { tracked } from '@glimmer/tracking';
import { Model } from 'mc-draft/routes/draft-card';

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

  get cardsLeft(): number {
    return DECK_LIMIT - this.selectedCards.length;
  }

  get selectedCardObjects(): Array<Card> {
    return this.selectedCards.map((code) => this.cards.card(code));
  }

  cardPool(): Array<Card> {
    const cards = this.cards
      .aspect(this.faction as Faction)
      .concat(this.cards.aspect(Faction.Basic))
      .flatMap((card: Card) => {
        return Array(card.deck_limit).fill(card) as Array<Card>;
      });
    this.selectedCards.forEach((selectedCard) => {
      const index = cards.findIndex((card) => selectedCard === card.code);
      cards.splice(index, 1);
    });

    return cards;
  }

  get cardSelection(): Array<Card> {
    const pool = this.cardPool();
    return randomCards(pool);
  }

  @action
  select(card: Card): void {
    const selectedCards = [card.code].concat(this.selectedCards);
    // need to do this to get tracked to work
    this.selectedCards = selectedCards;

    if (this.selectedCards.length >= DECK_LIMIT) {
      void this.router.transitionTo('finished', this.model.hero.code, {
        queryParams: {
          faction: this.faction,
          selectedCards: this.selectedCards,
        },
      });
    }
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'draft-card': DraftCard;
  }
}
