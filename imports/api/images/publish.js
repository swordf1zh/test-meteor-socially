import { Meteor } from 'meteor/meteor';
import { Thumbs, Images } from './collection';

if (Meteor.isServer) {
  Meteor.publish('thumbs', function(ids) {
    return Thumbs.find({
      originalStore: 'images',
      originalId: {
        $in: ids
      }
    });
  });

  Meteor.publish('images', function(ids) {
    console.info('ids', ids);
    if (ids) {
      return Images.find({
        _id: {
          $in: ids
        }
      });
    }
  });
}