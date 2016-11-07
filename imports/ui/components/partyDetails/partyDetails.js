import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';

import template from './partyDetails.html';
import { Parties } from '/imports/api/parties';
import { name as PartyUninvited } from '../partyUninvited/partyUninvited';
import { name as PartyImage } from '../partyImage/partyImage';
import { name as PartyMap } from '../partyMap/partyMap';

class PartyDetails {
  constructor($stateParams, $scope, $reactive) {
    'ngInject';

    $reactive(this).attach($scope);

    this.partyId = $stateParams.partyId;

    this.subscribe('parties');
    this.subscribe('users');

    this.helpers({
      party() {
        return Parties.findOne({
          _id: $stateParams.partyId
        });
      },
      users() {
        return Meteor.users.find({});
      },

      isLoggedIn() {
        return !!Meteor.userId();
      },

      isOwner() {
        if (!this.party) { return false; }
        return this.party.owner === Meteor.userId();
      }
    });
  }

  canInvite() {
    if (!this.party) {
      return false;
    }

    return !this.party.public && this.party.owner === Meteor.userId();
  }

  save() {
    Parties.update({
      _id: this.party._id
    }, {
      $set: {
        name: this.party.name,
        description: this.party.description,
        public: this.party.public,
        location: this.party.location
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
  uiRouter,
  PartyUninvited,
  PartyImage,
  PartyMap
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