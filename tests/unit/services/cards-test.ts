import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import CardsService from 'mc-draft/services/cards';

module('Unit | Service | cards', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    const service = this.owner.lookup('service:cards') as CardsService;
    assert.ok(service);
  });
});
