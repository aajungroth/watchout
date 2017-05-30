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
var Asteroid = function() {
  this.x = getRandomInt(100, 700);
  this.y = getRandomInt(100, 450);
  this.width = 50;
  this.height = 50;
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

var makeAsteriods = function(numberOfAsteroids) {
  var asteroids = [];

  for (var i = 0; i < numberOfAsteroids; i++) {
    asteroids.push(new Asteroid());
  }
  return asteroids;
};

var data = makeAsteriods(20);

console.log(data);

d3.select(".board")
  .selectAll("img")
  .data(makeAsteriods(20))
  .enter()
  .append('img')
  .attr('src', './asteroid.png')
  .attr('top', function(asteroid){
    return this.y;
  })
  .attr('left', function(asteroid){
    return this.x;
  });
  /*.style('transform', 'translate(100px, 100px)')
  .transition()
  .duration(5000)
  .style('transform', 'translate(400px, 400px)');*/

console.log();