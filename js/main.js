(function(window, document) {
  var Audio = function(options) {
    this.options = options

    this.initialize().initEvents()
  }

  Audio.prototype.initialize = function() {
    this.audio && this.audio.stop() && (this.audio.currentTime = 0)
    this.audio = document.createElement('audio')
    this.setNext()

    this.pauseEl = document.getElementById('toggle_sound')

    return this
  }

  Audio.prototype.play = function() {
    if (this.isPaused()) {
      this.audio.play()
      this.pauseEl.setAttribute('class', '')
    }

    return this
  }

  Audio.prototype.stop = function() {
    if (!this.isPaused()) {
      this.audio.pause()
      this.audio.currentTime = 0
      this.pauseEl.setAttribute('class', 'muted')
    }

    return this
  }

  Audio.prototype.isPaused = function() {
    return !this.audio.currentTime || this.audio.paused
  }

  Audio.prototype.initEvents = function() {
    this.audio.addEventListener('ended', function() {
      this.stop().setNext().play()
    }.bind(this))

    this.pauseEl.addEventListener('ontouchstart' in window ? 'touchstart':'mousedown', function() {
      this.isPaused() ? this.play():this.stop()
    }.bind(this))

    return this
  }

  Audio.prototype.setNext = function() {
    this.audio.src = this.options.source + this.getRandomSourceID()

    return this
  }

  Audio.prototype.getCurrendSourceID = function() {
    return this.audio.src && this.audio.src.match(/&id=(|\d+)$/)[1]
  }

  Audio.prototype.getRandomSourceID = function() {
    var index = ~~(window.Math.random() * (this.options.sourceIDs.length - 1))
    return this.options.sourceIDs[index] === this.getCurrendSourceID() ? this.getRandomSourceID() : this.options.sourceIDs[index]
  }

  var Profile = function(options) {
    this.options = options
    this.initialize()
  }

  Profile.prototype.initialize = function() {
    fetch('https://api.github.com/users/' + this.options.user)
      .then(response => response.json())
      .then(profile => {
        document.title = profile.name;
        document.querySelector('.header span').innerHTML = profile.name;
        document.querySelector('#content #placeholder').classList.add('hidden');

        var contentTable = document.querySelector('#content table');
        bioLines = profile.bio.split("\r\n")
        bioLines.forEach((el, i) => {
          var tr = document.createElement('tr')
          tr.classList.add('centered');
          tr.innerHTML = el;
          contentTable.appendChild(tr);

          if (i != bioLines.length -1) {
            var sep = document.createElement('tr');
            sep.classList.add('centered');
            sep.innerHTML = '<img src="./images/skull.png">'
            contentTable.appendChild(sep);
          }
        })
      });
  }

  window.onload = function() {
    var player = new Audio({
      source    : 'http://popplers5.bandcamp.com/download/track?enc=mp3-128&stream=1&ts=1419776082.0&id=',
      sourceIDs : ['2399518563', '1931306333', '421356602', '735867900']
    })
    player.stop()

    var profile = new Profile({
      user: 'sfate'
    })
  }
})(window, window.document)
