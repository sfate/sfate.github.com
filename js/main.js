(function() {
  var musicID = 'https://soundcloud.com/devolverdigital/sets/hotline-miami-official';
  var artID = 'http://dataerase.tumblr.com/post/84866886989/sorry-i-got-bored-of-anime-girls-dataerase-will';

  var loadSC = function() {
    var widgetSC,
        tapAction      = ('ontouchstart' in window) ? 'touchstart':'mousedown',
        soundToggleEl  = document.getElementById('toggle-sound'),
        widgetIframeEl = document.getElementById('sc-widget');

    widgetIframeEl.src = 'https://w.soundcloud.com/player/?url=' + musicID;
    widgetSC = SC.Widget(widgetIframeEl);

    widgetSC.bind(SC.Widget.Events.READY, function() {
      var soundToggle = function() {
        var newState = !!~String(soundToggleEl.getAttribute('class')).indexOf('muted') ? '':'muted';
        soundToggleEl.setAttribute('class', newState);
        widgetSC.toggle();
      };

      var getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };

      widgetSC.getSounds(function(sounds) {
        widgetSC.skip(getRandomInt(0, sounds.length - 1));
      });

      widgetSC.bind(SC.Widget.Events.FINISH, function() {
        widgetSC.load(musicID, {});
      });

      soundToggle();
      soundToggleEl.addEventListener(tapAction, soundToggle);
    });
  };

  window.onload = loadSC;
})();
