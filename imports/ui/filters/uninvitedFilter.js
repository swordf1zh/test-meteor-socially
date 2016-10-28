import angular from 'angular';
import _ from 'underscore';

const name = 'uninvitedFilter';

function UninvitedFilter(users, party) {
  if (!party) { return false; }

  return users.filter((user) => {
    let notOwner = user._id !== party.owner;
    let notInvited = !_.contains(party.invited, user._id);
    return notOwner && notInvited;
  });
}

export default angular.module(name, [])
  .filter(name, () => UninvitedFilter);