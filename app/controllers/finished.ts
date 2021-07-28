import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import CardsService, { Card } from 'mc-draft/services/cards';
import { tracked } from '@glimmer/tracking';
import { Model } from 'mc-draft/routes/finished';

export default class Finished extends Controller {
  @service declare cards: CardsService;

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
  @tracked selectedCards: string[] = [];

  get selectedCardObjects(): Array<Card> {
    return this.selectedCards.map((code) => this.cards.card(code));
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    finished: Finished;
  }
}
