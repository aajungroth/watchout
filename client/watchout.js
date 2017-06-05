var mouse = {
  x: window.innerWidth / 2,
  y: window.innnerHeight / 2
};
var score = 0;
var highScore = 0;
var collisionCount = 0;

var updateScore = function() {
  d3.select('.scoreboard .current span').text(score);
  d3.select('.scoreboard .highscore span').text(highScore);
  d3.select('.scoreboard .collisions span').text(collisionCount);
};

var getRandomInt = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

var board = d3.select('.board').style({
  height: '450px',
  width: '700px'
});

d3.select('.mouse').style({
  top: '225px',
  left: '350px',
  width: '30px',
  height: '30px',
  'border-radius': '30px'
});

var enemies = board.selectAll('.asteroids')
  .data(d3.range(25))
  .enter()
  .append('svg')
  .attr('class', 'asteroid')
  .style('top', function(enemy) {
    return getRandomInt(0, 420);
  })
  .style('left', function(enemy) {
    return getRandomInt(0, 670);
  });

board.on('mouseover', function() {
  var loc = d3.mouse(this);
  mouse = {
    x: loc[0],
    y: loc[1]
  };
  d3.select('.mouse').style({
    top: (mouse.y - 15) + 'px',
    left: (mouse.x - 15) + 'px'
  });
});

var update = function(enemies) {
  enemies.transition()
  .duration(1000)
  .style('top', function(enemy) {
    return getRandomInt(0, 420);
  })
  .style('left', function(enemy) {
    return getRandomInt(0, 670);
  }).each('end', function() {
    update( d3.select(this) );
  });
};

update(enemies);

var scoreTicker = function() {
  score = score + 1;
  highScore = Math.max(score, highScore);
  updateScore();
};
setInterval(scoreTicker, 100);

var prevCollision = false;

var detectCollisions = function() {
  var collision = false;

  enemies.each(function() {
    var cx = Math.round(Number(this.style.left.slice(0, this.style.left.length - 2))) + 15;
    var cy = Math.round(Number(this.style.top.slice(0, this.style.left.length - 2))) + 15;
    var x = cx - mouse.x;
    var y = cy - mouse.y;
    if (Math.sqrt(x * x + y * y) < 30 ) {
      collision = true;
    }
  });

  if (collision) {
    board.style('background-color', 'red');
    score = 0;
    if (prevCollision !== collision) {
      collisionCount++;
    }
  } else {
    board.style('background-color', 'white');
  }
  prevCollision = collision;
};

d3.timer(detectCollisions);
