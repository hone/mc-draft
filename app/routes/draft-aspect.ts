import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import CardsService, { Card, Faction } from 'mc-draft/services/cards';

interface Params {
  hero_code: string;
}

export interface Model {
  cards: Array<Card>;
  hero: Card;
}

export default class DraftAspect extends Route {
  @service declare cards: CardsService;

  async model(params: Params): Promise<Model> {
    await this.cards.load();

    const cards = [
      this.cards.aspect(Faction.Aggression),
      this.cards.aspect(Faction.Justice),
      this.cards.aspect(Faction.Leadership),
      this.cards.aspect(Faction.Protection),
    ].map((aspectCards) => {
      const index = Math.floor(Math.random() * aspectCards.length);
      return aspectCards[index];
    });
    const hero = this.cards.card(params.hero_code);

    return {
      cards,
      hero,
    };
  }
}
