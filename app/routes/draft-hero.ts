import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import CardsService, { Card } from 'mc-draft/services/cards';

export default class DraftHero extends Route {
  @service declare cards: CardsService;

  async model(): Promise<Array<Card>> {
    await this.cards.load();

    return this.cards.heroes();
  }
}
