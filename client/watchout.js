// start slingin' some d3 here.
//testing comments
//we are good
/*var numbers = [1, 2, 3];
var testAsteroid = d3.select('.board')
  .data(numbers)
  .enter()
  .append('img')
  .attr('src', './asteroid.png');*/
/*
  d3.select(".board")
  .selectAll('svg')
  .data([4, 8, 15, 16, 23, 42])
  .enter().append("svg")
  .attr('src', './asteroid.png');
    //.text(function(d) { return "I’m number " + d + "!"; });
*/
/*
  d3.select(".board")
    .append('img')
    .attr('src', './asteroid.png')
    .style('transform', 'translate(100px, 100px)')
    .transition()
    .duration(5000)
    .style('transform', 'translate(400px, 400px)');
*/
    //.style('transform', 'translateY(400px)');
    //.text(function(d) { return "I’m number " + d + "!"; });

//d3.select("body").transition().duration(2050).style("background-color", "red");

// asteroid = {x:1, y:1}
var Asteroid = function(i) {

  this.size = 25;
  this.width = this.size;
  this.height = this.size;
  this.x = getRandomInt(0, 600);
  this.y = getRandomInt(0, 350);

};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

var makeAsteriods = function(numberOfAsteroids) {
  var asteroids = [];

  for (var i = 0; i < numberOfAsteroids; i++) {
    asteroids.push(new Asteroid(i));
  }
  return asteroids;
};

var asteroids = makeAsteriods(25);

var $enemies = d3.select(".board")
  .selectAll("img")
  .data(asteroids);

$enemies.enter()
  .append('img')
  .attr('src', './asteroid.png')
  .each(function(enemy){
    var top = enemy.y + 'px';
    var left = enemy.x + 'px';

    d3.select(this).attr({
      width: enemy.width,
      height: enemy.height
    });

    d3.select(this).style({
      position: 'absolute',
      top : top,
      left: left,
    });
  });

$enemies.exit().remove();

var update = function() {
   $enemies.transition()
   .duration(1000)
   .style('top', function(enemy){
      var top = getRandomInt(0, 350);
      return  top + 'px';
   }).style('left', function(enemy){
      var left = getRandomInt(0, 650);
      return  left + 'px';
   });
};

  /*.style('transform', 'translate(100px, 100px)')
  .transition()
  .duration(5000)
  .style('transform', 'translate(400px, 400px)');*/

console.log(d3);
console.log(d3.timer);

update();


setInterval(function() {
  console.log('timer');
  asteroids = makeAsteriods(26);
  update();
}, 1000);

console.log();