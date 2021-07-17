import Route from '@ember/routing/route';
import fetch from 'fetch';

export interface Card {
  name: string;
  imagesrc?: string;
  type_code: string;
  code: string;
}

export default class Index extends Route {
  async model(): Promise<Array<Card>> {
    return fetch('https://marvelcdb.com/api/public/cards/').then(function (
      response
    ) {
      return response.json();
    });
  }
}
