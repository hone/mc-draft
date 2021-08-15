import { Card } from 'mc-draft/services/cards';
import randomCards from 'mc-draft/lib/random-cards';
import Controller from '@ember/controller';
import { action } from '@ember/object';
import RouterService from '@ember/routing/router-service';
import { inject as service } from '@ember/service';

export default class DraftHero extends Controller {
  @service declare router: RouterService;

  declare model: Array<Card>;

  get heroPool(): Array<Card> {
    const pool = this.model;
    return randomCards(pool);
  }

  @action
  select(card: Card): void {
    void this.router.transitionTo('draft-aspect', card.code);
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'draft-hero': DraftHero;
  }
}
