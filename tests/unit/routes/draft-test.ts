import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import DraftRoute from 'mc-draft/routes/draft';

module('Unit | Route | draft', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:draft') as DraftRoute;
    assert.ok(route);
  });
});
