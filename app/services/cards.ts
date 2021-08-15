import Service from '@ember/service';
import fetch from 'fetch';

export interface Card {
  name: string;
  imagesrc?: string;
  type_code: string;
  code: string;
  faction_code: string;
  deck_limit: number;
  card_set_type_name_code: string;
  cost: number;
}

export enum Faction {
  Basic = 'basic',
  Aggression = 'aggression',
  Justice = 'justice',
  Leadership = 'leadership',
  Protection = 'protection',
  Hero = 'hero',
}

const CARD_API = 'https://marvelcdb.com/api/public/cards/';
const SPIDER_WOMAN_CODE = '04031a';
const GAMORA_CODE = '18001a';
const EXCLUDE_HEROES = [SPIDER_WOMAN_CODE, GAMORA_CODE];

export default class CardsService extends Service {
  collection: Array<Card>;

  constructor() {
    super();
    this.collection = new Array<Card>();
  }

  async load(): Promise<Array<Card>> {
    if (this.collection.length <= 0) {
      const response = await fetch(CARD_API);
      this.collection = (await response.json()) as Card[];
    }

    return this.collection;
  }

  aspect(name: Faction): Array<Card> {
    return this.collection.filter(
      (card) =>
        card.faction_code === name &&
        card.imagesrc !== undefined &&
        card.card_set_type_name_code != 'hero'
    );
  }

  card(code: string): Card {
    return this.collection.filter((card) => card.code === code)[0];
  }

  heroes(excludes: string[] = EXCLUDE_HEROES): Array<Card> {
    return this.collection.filter(
      (card) => card.type_code === 'hero' && !excludes.includes(card.code)
    );
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  export default interface Registry {
    cards: CardsService;
  }
}
