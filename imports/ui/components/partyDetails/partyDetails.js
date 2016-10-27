import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';

import template from './partyDetails.html';
import { Parties } from '/imports/api/parties';

class PartyDetails {
  constructor($stateParams, $scope, $reactive) {
    'ngInject';

    $reactive(this).attach($scope);

    this.partyId = $stateParams.partyId;

    this.helpers({
      party() {
        return Parties.findOne({
          _id: $stateParams.partyId
        });
      }
    });
  }

  save() {
    Parties.update({
      _id: this.party._id
    }, {
      $set: {
        name: this.party.name,
        description: this.party.description
      }
    }, (error) => {
      if (error) {
        console.log('Oops, unable to update the party...');
      } else {
        console.log('Done!');
      }
    });
  }
}

const name = 'partyDetails';

export default angular.module(name, [
  angularMeteor,
  uiRouter
])
.component(name, {
  template,
  controllerAs: name,
  controller: PartyDetails
})
.config(config)
.run(run);

function config($stateProvider) {
  'ngInject';

  $stateProvider
  .state('partyDetails', {
    url: '/parties/:partyId',
    template: '<party-details></party-details>',
    resolve: {
      currentUser($q) {
        return (Meteor.userId() === null)
               ? $q.reject('AUTH_REQUIRED')
               : $q.resolve();
      }
    }
  });
}

function run($rootScope, $state) {
  'ngInject';

  $rootScope.$on('$stateChangeError',
    (event, toState, toParams, fromState, fromParams, error) => {
      if (error === 'AUTH_REQUIRED') {
        $state.go('parties');
      }
    }
  );
}