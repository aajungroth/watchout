var getRandomInt = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

var move = function() {
  d3.select(this)
      .attr('transform', 'translate(' + (d3.event.x) + ',' + (d3.event.y) + ')')
      .attr('r', 25);
};

var board = d3.select('.board').style({
  height: '450px',
  width: '700px'
});

var enemies = board.selectAll('.asteroids')
  .data(d3.range(25))
  .enter()
  .append('svg')
  .attr('class', 'asteroid')
  .style('top', function(enemy) {
    return getRandomInt(0, 400);
  })
  .style('left', function(enemy) {
    return getRandomInt(0, 650);
  });
  //.each(function(enemy) {

    //if (enemy.color === 'blue') {
     // d3.select(this).call(d3.behavior.drag().on('drag', move));
    //}

    /*d3.select(this).attr({
      cx: enemy.x,
      cy: enemy.y,
      r: enemy.size,
      fill: enemy.color
    });*/
  //});

//enemies.exit().remove();

var update = function() {
  enemies.transition()
  .duration(1000)
  .style('top', function(enemy) {
    return getRandomInt(0, 400);
  })
  .style('left', function(enemy) {
    return getRandomInt(0, 650);
  });
};

update();

setInterval(function() {
  update();
}, 1000);
