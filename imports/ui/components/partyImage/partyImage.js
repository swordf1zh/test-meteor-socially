import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './partyImage.html';
import { Images } from '/imports/api/images';

class PartyImage {
  constructor($scope, $reactive) {
    'ngInject';

    $reactive(this).attach($scope);

    this.subscribe('images', () => [
      this.getReactively('images', true)
    ]);

    this.helpers({
      mainImage() {
        const images = this.getReactively('images', true);
        if (images) {
          return Images.findOne({
            _id: images[0]
          });
        }
      },

      allImages() {
        return Images.find({
          _id: {
            $in: this.getReactively('images', true)
          }
        });
      }
    });
  }
}

const name = 'partyImage';

export default angular.module(name, [
  angularMeteor
]).component(name, {
  template,
  controller: PartyImage,
  controllerAs: name,
  bindings: {
    images: '<',
    onlyMainImage: '@'
  }
});