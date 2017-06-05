var score = 0;
var highScore = 0;
var collisionCount = 0;

var updateScore = function(){
  d3.select('.scoreboard .current span').text(score);
  d3.select('.scoreboard .highscore span').text(highscore);
  d3.select('.scoreboard .collisionCount span').text(collisionCount);
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

var mouse = d3.select('.mouse').style({
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
  score = score+1;
  highscore = Math.max(score, highScore);
  updateScore();
};
setInterval(scoreTicker, 100);
