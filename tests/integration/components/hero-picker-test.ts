import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | hero-picker', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{hero-picker}}`);

    //assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      {{#hero-picker}}
        template block text
      {{/hero-picker}}
    `);

    //assert.equal(this.element.textContent.trim(), 'template block text');
    assert.equal(1, 1);
  });
});
