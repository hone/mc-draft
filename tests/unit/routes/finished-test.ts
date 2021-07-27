import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | finished', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:finished');
    assert.ok(route);
  });
});
