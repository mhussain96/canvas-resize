document.addEventListener('DOMContentLoaded', function() {
  var canvas = document.querySelector('canvas');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var c = canvas.getContext('2d');


  // c.fillStyle = 'rgba(255, 0, 0, 0.5)';
  // c.fillRect(100, 100, 100, 100);
  // c.fillStyle = 'rgba(0, 0, 255, 0.5)';
  // c.fillRect(300, 300, 100, 100);
  // c.fillStyle = 'rgba(0, 255, 0, 0.5)';
  // c.fillRect(400, 100, 100, 100);
  // console.log(canvas);
  
  // // line

  // c.beginPath();
  // c.moveTo(50, 300);
  // c.lineTo(300, 50);
  // c.lineTo(400, 300);
  // c.strokeStyle = 'pink';
  // c.stroke();

  // // Arc/circle
  // for (let i = 0; i < 10; i++) {
  //   var x = Math.random() * window.innerWidth;
  //   var y = Math.random() * window.innerHeight;
  //   c.beginPath();
  //   c.arc(x, y, 30, 0, Math.PI * 2, false);
  //   c.strokeStyle = 'blue';
  //   c.stroke();   
  // }  

    var mouse = {
      x: undefined,
      y: undefined
    }

    var maxRadius = 40;
    var minRadius = 2;
    var colorArray = [
      '#ffaa33',
      '#99ffaa',
      '#00ff00',
      '#ff1100',
    ];

    document.addEventListener('mousemove', function(event) {
      mouse.y = event.y;
      mouse.x = event.x;
    });

    function Circle(x, y, dx, dy, radius) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.radius = radius;
      this.minRadius = minRadius;
      this.maxRadius = maxRadius;
      this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

      this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color
        c.fill();
      }

      this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
          this.dx = -this.dx;
        } 
  
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
          this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        // interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
          if (this.radius < maxRadius) {
            this.radius += 1;
          }
        } else if (this.radius > this.minRadius) {
          this.radius -= 1;
        }
        this.draw();
      }
    }

    // var x = Math.random() * innerWidth;
    // var y = Math.random() * innerHeight;
    // var dy = (Math.random() - 0.5) * 16;
    // var dx = (Math.random() - 0.5) * 16;
    // var radius = 30;

    var circleArr = [];
    for (var i = 0; i < 3000; i++) {
      var radius = Math.random() * 3 + 1;
      var x = Math.random() * (innerWidth - radius * 2) + radius;
      var y = Math.random() * (innerHeight - radius * 2) + radius;
      var dy = (Math.random() - 0.5);
      var dx = (Math.random() - 0.5);
      circleArr.push(new Circle(x, y, dx, dy, radius));

    }

    function animate() {
      requestAnimationFrame(animate);
      c.clearRect(0, 0, innerWidth, innerHeight);
      
      for (var i = 0; i < circleArr.length; i++) {
        circleArr[i].update(); 
      }
    }

    animate();
});