import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngFileUpload from 'ng-file-upload';
import 'angular-sortable-view';
import 'ng-img-crop/compile/minified/ng-img-crop';
import 'ng-img-crop/compile/minified/ng-img-crop.css';

import { Meteor } from 'meteor/meteor';

import template from './partyUpload.html';
import { Images, Thumbs, upload } from '/imports/api/images';

class PartyUpload {
  constructor($scope, $reactive) {
    'ngInject';

    $reactive(this).attach($scope);

    this.uploaded = [];

    this.subscribe('images', () => [
      this.getReactively('files', true) || []
    ]);

    this.subscribe('thumbs', () => [
      this.getReactively('files', true) || []
    ]);

    this.helpers({
      thumbs() {
        return Thumbs.find({
          originalStore: 'images',
          originalId: {
            $in: this.getReactively('files', true) || []
          }
        });
      },

      images() {
        return Images.find({
          _id: {
            $in: this.getReactively('files', true) || []
          }
        });
      },

      micro() { return Thumbs.find({}); },
      macro() { return Images.find({}); }
    });
  }

  addImages(files) {
    if (files.length) {
      this.currentFile = files[0];

      const reader = new FileReader;

      reader.onload = this.$bindToContext((event) => {
        this.cropImgSrc = event.target.result;
        this.myCroppedImage = '';
      });

      reader.readAsDataURL(files[0]);
    }

    else {
      this.cropImgSrc = undefined;
    }
  }

  save() {
    upload(
      this.myCroppedImage,
      this.currentFile.name,
      this.$bindToContext((file) => {
        this.uploaded.push(file);

        if (!this.files || !this.files.length) {
          this.files = [];
        }
        this.files.push(file._id);

        this.reset();
      }),
      (e) => { console.log('Oops, something went wrong', e); }
    );
  }

  reset() {
    this.cropImgSrc = undefined;
    this.myCroppedImage = '';
  }
}

const name = 'partyUpload';

export default angular.module(name, [
  angularMeteor,
  ngFileUpload,
  'ngImgCrop',
  'angular-sortable-view'
])
.component(name, {
  template,
  controller: PartyUpload,
  controllerAs: name,
  bindings: {
    files: '=?'
  }
});