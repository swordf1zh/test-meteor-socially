import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './partyRsvpList.html';
import { name as PartyRsvpUsers } from '../partyRsvpUsers/partyRsvpUsers';

class PartyRsvpList {}

const name = 'partyRsvpList';

export default angular.module(name, [
  angularMeteor,
  PartyRsvpUsers
]).component(name, {
  template,
  controller: PartyRsvpList,
  controllerAs: name,
  bindings: {
    rsvps: '<'
  }
});