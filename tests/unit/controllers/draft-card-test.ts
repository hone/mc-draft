import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | draft-card', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    const controller = this.owner.lookup('controller:draft-card');
    assert.ok(controller);
  });
});
