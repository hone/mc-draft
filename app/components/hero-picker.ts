import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import RouterService from '@ember/routing/router-service';
import { Card } from 'mc-draft/services/cards';
import { assert } from '@ember/debug';

interface HeroPickerArgs {
  cards: Array<Card>;
}

export default class HeroPicker extends Component<HeroPickerArgs> {
  @service declare router: RouterService;
  @tracked selectedHero = 'draft';

  get heroes(): Array<Card> {
    return this.args.cards;
  }

  @action
  submit(): void {
    if (this.selectedHero != 'draft') {
      void this.router.transitionTo('draft-aspect', this.selectedHero);
    }
  }

  @action
  selectHero(event: InputEvent): void {
    assert(
      'expecting HTMLSelectElement',
      event.target instanceof HTMLSelectElement
    );
    this.selectedHero = event.target.value;
  }
}
