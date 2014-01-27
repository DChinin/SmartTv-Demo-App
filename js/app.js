(function () {
  "use strict";

  window.App = {
    currentScene: null,
    scenes: {},
    isShown: true,

    initialize: function () {
      this.$wrap = $('.wrap');
      var $bg = $('.bg');

      Player.init();
      Player.on('ready', function () {
        $bg.hide();
        $$log('player ready');
      });
      Player.on('stop', function () {
        $bg.show();
        $$log('player stop');
      });
      this.setEvents();

      // start navigation
      $$nav.on();
    },

    setEvents: function () {
      var self = this;

      // click on menu item
      $('.menu').on('click', '.menu-item', function ( e ) {
        var scene = e.currentTarget.getAttribute('data-content');
        self.showContent(scene);
      });

      $(document.body).on({
        // on keyboard 'd' by default
        'nav_key:blue': _.bind(this.toggleView, this)
      })
    },

    toggleView: function () {
      if (this.isShown) {
        this.$wrap.hide();
      } else {
        this.$wrap.show();
      }
      this.isShown = !this.isShown;
    },

    showContent: function ( scene ) {
      var cur = this.currentScene,
        newScene = this.scenes[scene];

      if ( cur !== newScene ) {
        if ( !newScene ) {
          $$error('Scene ' + scene + ' doesn\'t exist');
        } else {
          if ( cur ) {
            cur.hide();
          }
          newScene.show();
          this.currentScene = newScene;
        }
      }
    }
  };

  // main app initialize when smartbox ready
  SB.ready(_.bind(App.initialize, App));
})();