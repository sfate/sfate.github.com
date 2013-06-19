(function(){
  var background = {
    colours: ['#D7005F', '#5FD7FF', '#87FF00', '#5F5F5F'],
       maxX: (window.innerWidth + 40),
     canvas: document.getElementById('background'),
    context: null,
       bits: new Array(60),
        bit: null,

    init: function() {
      var _this = this;
      _this.canvas.width = window.innerWidth;
      _this.canvas.height = window.innerHeight;
      _this.context = _this.canvas.getContext('2d');
      _this.context.globalAlpha = 0.7;
      _this.context.shadowBlur = 6;

      for (var i = 0; i < 60; ++i) {
        _this.bit = new _this.Cell(10 + 40 * Math.random(), _this.colours[Math.floor(4 * Math.random())]);
        _this.bits[i] = _this.bit;
      }
    },

    Cell: function(size, color) {
      this.size = size;
      if (size < 20) {
        this.speed = 2.5;
      } else if(size < 30) {
        this.speed = 2.0;
      } else {
        this.speed = 1.5;
      }
      this.color = color;
      this.xpos = Math.random() * window.innerWidth - this.size;
      this.ypos = 100 + 500 * (background.canvas.width-this.xpos)/background.canvas.width + 100 * Math.sin(this.offset + this.xpos / 500);
      this.offset = new Number(100 * Math.random());
    },

    tick: function(bit) {
      if(bit.xpos > background.maxX) {
        bit.xpos = -bit.size;
        bit.offset = new Number(100 * Math.random());
      } else {
        bit.xpos += bit.speed;
      }
      bit.ypos = 100 + 500 * (background.canvas.width-bit.xpos)/background.canvas.width + 100 * Math.sin(bit.offset + bit.xpos / 500);
      background.context.shadowColor = bit.color;
      background.context.fillStyle = bit.color;
      // background.context.arc(bit.xpos, bit.ypos, bit.size, 0, 2 * Math.PI, true);
      // background.context.fill();
      background.context.fillRect(bit.xpos, bit.ypos, bit.size, bit.size);
    },

    redraw: function() {
      background.context.clearRect(0, 0, background.canvas.width, background.canvas.height);
      background.bits.map(background.tick);
    }
  }

  background.init();
  setInterval(background.redraw, 50);
})();
