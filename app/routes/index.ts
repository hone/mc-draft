import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import CardsService, { Card } from 'mc-draft/services/cards';

const SPIDER_WOMAN_CODE = '04031a';
const GAMORA_CODE = '18001a';
const EXCLUDE_HEROES = [SPIDER_WOMAN_CODE, GAMORA_CODE];

export default class Index extends Route {
  @service declare cards: CardsService;

  async model(): Promise<Array<Card>> {
    await this.cards.load();

    return this.cards.collection.filter(
      (card) => card.type_code === 'hero' && !EXCLUDE_HEROES.includes(card.code)
    );
  }
}
