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
var Asteroid = function(color) {

  this.size = 25;
  this.width = this.size;
  this.height = this.size;
  this.x = getRandomInt(0, 600);
  this.y = getRandomInt(0, 350);
  this.color = color;
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

var makeAsteriods = function(numberOfAsteroids) {
  var asteroids = [];

  for (var i = 0; i < numberOfAsteroids; i++) {
    asteroids.push(new Asteroid('red'));
  }
  return asteroids;
};

var asteroids = makeAsteriods(25);
asteroids.push(new Asteroid('blue'));
//var svg = d3.select('.board').append('svg');
var $enemies = d3.select(".board")
  //.selectAll("circle")
  .append('svg')
  .selectAll("circle")
  .data(asteroids);

$enemies.enter()
  //.append('svg')
  //.attr('src', './asteroid.png')
  .append("circle")
  .each(function(enemy){
    //var top = enemy.y + 'px';
    //var left = enemy.x + 'px';

    if (enemy.color === 'blue') {
      d3.select(this).call(d3.behavior.drag().on("drag", move));
    }


    d3.select(this).attr({
      //width: enemy.width,
      //height: enemy.height
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
  .attr('cx', function(enemy){
    if (enemy.color !== 'blue') {
      return getRandomInt(0, 650);
    }
    //return enemy.x;
  })
  .attr('cy', function(enemy){
    if (enemy.color !== 'blue') {
      return getRandomInt(0, 350);
    }
    //return enemy.y;
  })
  /*.style('top', function(enemy){
    var top = getRandomInt(0, 350);
    return  top + 'px';
  }).style('left', function(enemy){
    var left = getRandomInt(0, 650);
    return  left + 'px';
  });*/
};

  /*.style('transform', 'translate(100px, 100px)')
  .transition()
  .duration(5000)
  .style('transform', 'translate(400px, 400px)');*/

//console.log(svg);
/*
var svg = d3.select('.board').append('svg');

svg.append("circle")
    .attr("cx", getRandomInt(0, 650))
    .attr("cy", getRandomInt(0, 360))
    .attr("r", 10)
    .style('cursor', 'pointer')
    .call(d3.behavior.drag().on("drag", move));
*/

function move() {
  d3.select(this)
      .attr("transform", "translate(" + (d3.event.x) + "," + (d3.event.y) + ")")
      .attr("r", 25);
}



//console.log(d3.timer);

update();


setInterval(function() {
  console.log('timer');
  //asteroids = makeAsteriods(26);
  update();
}, 1000);

console.log();