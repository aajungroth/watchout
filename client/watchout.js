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
    return getRandomInt(0, 400);
  })
  .style('left', function(enemy) {
    return getRandomInt(0, 650);
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
