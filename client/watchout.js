// asteroid = {x:1, y:1}
var Asteroid = function(color) {

  this.size = 25;
  this.width = this.size;
  this.height = this.size;
  this.x = getRandomInt(0, 600);
  this.y = getRandomInt(0, 350);
  this.color = color;
};

var getRandomInt = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

var makeAsteriods = function(numberOfAsteroids) {
  var asteroids = [];

  for (var i = 0; i < numberOfAsteroids; i++) {
    asteroids.push(new Asteroid('red'));
  }
  return asteroids;
};

var move = function() {
  d3.select(this)
      .attr('transform', 'translate(' + (d3.event.x) + ',' + (d3.event.y) + ')')
      .attr('r', 25);
};

var asteroids = makeAsteriods(25);
asteroids.push(new Asteroid('blue'));

var $enemies = d3.select('.board')
  .append('svg')
  .selectAll('circle')
  .data(asteroids);

$enemies.enter()
  .append('circle')
  .each(function(enemy) {

    if (enemy.color === 'blue') {
      d3.select(this).call(d3.behavior.drag().on('drag', move));
    }

    d3.select(this).attr({
      cx: enemy.x,
      cy: enemy.y,
      r: enemy.size,
      fill: enemy.color
    });
  });

$enemies.exit().remove();

var update = function() {
  $enemies.transition()
  .duration(1000)
  .attr('cx', function(enemy) {
    if (enemy.color !== 'blue') {
      return getRandomInt(0, 650);
    }
  })
  .attr('cy', function(enemy) {
    if (enemy.color !== 'blue') {
      return getRandomInt(0, 350);
    }
  });
};

update();

setInterval(function() {
  update();
}, 1000);
