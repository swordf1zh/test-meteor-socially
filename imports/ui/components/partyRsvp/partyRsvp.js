import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import template from './partyRsvp.html';
import { name as UninvitedFilter } from '/imports/ui/filters/uninvitedFilter';
import { name as DisplayNameFilter } from '/imports/ui/filters/displayNameFilter';

class PartyRsvp {
  yes() { this.answer('yes'); }
  maybe() { this.answer('maybe'); }
  no() { this.answer('no'); }

  answer(answer) {
    Meteor.call('rsvp', this.party._id, answer, (error) => {
      if (error) {
        console.error('Oops, unable to rsvp!');
      } else {
        console.log('RSVP done!');
      }
    });
  }
}

const name = 'partyRsvp';

export default angular.module(name, [
    angularMeteor
]).component(name, {
  template,
  controller: PartyRsvp,
  controllerAs: name,
  bindings: {
    party: '<'
  }
});