import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import CardsService, { Card } from 'mc-draft/services/cards';

interface Params {
  hero_code: string;
}

export interface Model {
  hero: Card;
}

export default class Finished extends Route {
  @service declare cards: CardsService;

  async model(params: Params): Promise<Model> {
    await this.cards.load();

    return {
      hero: this.cards.card(params.hero_code),
    };
  }
}
