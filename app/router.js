import EmberRouter from '@ember/routing/router';
import config from 'mc-draft/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('draft-aspect', { path: '/draft-aspect/:hero_code' });
  this.route('draft-card', { path: '/draft-card/:hero_code' });
  this.route('finished');
});
