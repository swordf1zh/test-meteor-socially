import angular from 'angular';
import angularMeteor from 'angular-meteor';
import 'angular-simple-logger';
import 'angular-google-maps';

import template from './partiesMap.html';

class PartiesMap {
  constructor() {
    this.map = {
      center: {
        latitude: 45,
        longitude: -73
      },
      zoom: 8
    };
  }
}

const name = 'partiesMap';

// create a module
export default angular.module(name, [
  angularMeteor,
  'nemLogging',
  'uiGmapgoogle-maps'
]).component(name, {
  template,
  controller: PartiesMap,
  controllerAs: name,
  bindings: {
    parties: '='
  }
});