import Component from '@glimmer/component';
import { action } from '@ember/object';
import { Card } from 'mc-draft/routes/index';

interface HeroPickerArgs {
  cards: Array<Card>;
}

const SPIDER_WOMAN_CODE = '04031a';
const GAMORA_CODE = '18001a';
const EXCLUDE_HEROES = [SPIDER_WOMAN_CODE, GAMORA_CODE];

export default class HeroPicker extends Component<HeroPickerArgs> {
  get heroes(): Array<Card> {
    return this.args.cards.filter(
      (card) => card.type_code === 'hero' && !EXCLUDE_HEROES.includes(card.code)
    );
  }

  @action
  submit() {}
}
