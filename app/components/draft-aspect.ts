import Component from '@glimmer/component';
import { Card } from 'mc-draft/services/cards';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import RouterService from '@ember/routing/router-service';

interface DraftAspectArgs {
  cards: Array<Card>;
  hero: Card;
}

export default class DraftAspect extends Component<DraftAspectArgs> {
  @service declare router: RouterService;

  get cards(): Array<Card> {
    return this.args.cards;
  }

  get hero(): Card {
    return this.args.hero;
  }

  @action
  select(card: Card): void {
    console.log('Select');
    void this.router.transitionTo('draft-card', this.args.hero.code, {
      queryParams: {
        faction: card.faction_code,
        selectedCards: [card.code],
      },
    });
  }
}
