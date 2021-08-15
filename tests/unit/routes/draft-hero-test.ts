import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | draft-hero', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:draft-hero');
    assert.ok(route);
  });
});
