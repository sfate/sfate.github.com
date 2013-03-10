var area = {
  canvas : null,
  ctx    : null,
  cloud  : null,
  cloudX : null,
  background : null,

  init: function() {
    this.canvas = document.getElementById("background");
    this.ctx    = this.canvas.getContext("2d");
    this.cloud  = this.createImg('images/cloud.png');
    this.cloudX = -409;
    this.background = this.createImg('images/forest.png');
    this.cloud.onload = function() {
      this.cloudX = -area.cloud.width;
    }

    return setInterval(function() {
      area.draw();
      area.updateCloudPosition();
    }, 10);
  },

  createImg: function(src) {
    var image = new Image();
    image.src = src;
    return image;
  },

  updateCloudPosition: function() {
    this.cloudX += 0.3;
    if (this.cloudX > window.innerWidth) {
      this.cloudX = -this.cloud.width;
    }
  },
 
  draw: function() {
    var pattern = this.ctx.createPattern(this.background, "repeat");
    this.ctx.fillStyle = pattern;
    this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    this.ctx.drawImage(this.cloud, this.cloudX, 70);
  },

  resizeCanvas: function() {
    area.canvas.width = window.innerWidth;
    area.canvas.height = window.innerHeight;
    area.draw();
    area.updateCloudPosition();
  }
};

window.onload = function() {
  area.init();
  area.resizeCanvas();
  window.addEventListener('resize', area.resizeCanvas, false);
};