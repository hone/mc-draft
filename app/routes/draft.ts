import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import CardsService, { Card } from 'mc-draft/services/cards';

interface DraftParams {
  hero_code: string;
}

export interface DraftModel {
  hero_code: string;
  cards: Array<Card>;
}

export default class Draft extends Route {
  @service declare cards: CardsService;

  async model(params: DraftParams): Promise<DraftModel> {
    await this.cards.load();

    return {
      hero_code: params.hero_code,
      cards: this.cards.collection,
    };
  }
}
