(function(global) {
  'use strict';

  var cordova = global.cordova;

  var comet = {
    initialize: function() {
      this.isMobileApp = typeof(cordova) !== 'undefined';

      if(this.isMobileApp) {
        this._setStatus('loading');
        global.document.addEventListener('deviceready', this._onDeviceReady.bind(this), false);
      }
      else {
        this._setStatus('loaded');
      }
    },

    _onDeviceReady: function() {
      this.isDeviceReady = true;
      this._setStatus('loaded');
    },

    _setStatus: function(status) {
      var cl = document.body.classList;
      var statuses = ['loading', 'loaded'];

      if(statuses.indexOf(status) === -1) return;

      DOMTokenList.prototype.remove.apply(cl, statuses);
      cl.add(status);
    },

    isDeviceReady: false,
    onDeviceReady: function(callback) {
      if(this.isDeviceReady === true) {
        callback();
      }
      else {
        global.document.addEventListener('deviceready', callback, false);
      }
    }
  }

  global.comet = comet;

})(this);
