import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import DraftAspect from 'mc-draft/routes/draft-aspect';

module('Unit | Route | draft-aspect', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:draft-aspect') as DraftAspect;
    assert.ok(route);
  });
});
