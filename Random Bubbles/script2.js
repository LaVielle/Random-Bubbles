var width = 960,
    height = 500;

var palette = {
      "lightgray": "#819090",
      "gray": "#708284",
      "mediumgray": "#536870",
      "darkgray": "#475B62",

      "darkblue": "#0A2933",
      "darkerblue": "#042029",

      "paleryellow": "#FCF4DC",
      "paleyellow": "#EAE3CB",
      "yellow": "#A57706",
      "orange": "#BD3613",
      "red": "#D11C24",
      "pink": "#C61C6F",
      "purple": "#595AB7",
      "blue": "#2176C7",
      "green": "#259286",
      "yellowgreen": "#738A05"
  }

var color = d3.scale.category10();

var nodes = [],
    links = [];

var force = d3.layout.force()
    .nodes(nodes)
    .links(links)
    .charge(-10)
    //.linkDistance(120)
    .size([width, height])
    .on("tick", tick);

var svg = d3.select(".container").append("svg")
    .attr("width", width)
    .attr("height", height);

var node = svg.selectAll(".node"),
    link = svg.selectAll(".link");

function bub(ident, valeur){
    this.id = ident;
    this.val = valeur;
}

var colorScale = d3.scale.linear()
    .domain([0, d3.max(nodes)])
    .range(['#FF3B3B', '#5536B7'])


// 1. Add three nodes and three links.

setInterval(function l() {
    rand = (Math.floor(Math.random()*10));
    for (i=0; i<rand; i++) {
        nodes.push(new bub(nodes.length+1, (Math.floor(Math.random() * 1000) + 100 )));
    }
  console.log("added: " + rand);
  start();
}, 250);

// 2. Remove node B and associated links.
setInterval(function() {
  nodes.splice((Math.floor(Math.random() * nodes.length) )); // remove b
  //links.shift(); // remove a-b
  //links.pop(); // remove b-c
  start();
}, ((Math.floor(Math.random() * 5) + .5) * 1000));

/*
function bub() {
    rand = (Math.floor(Math.random()*5));
    for (i=0; i<rand; i++) {
        nodes.push(new bub(nodes.length+1, (Math.floor(Math.random() * 1000) + 100 )));
    }
    console.log("added: " + rand);
    start();
};
*/
function start() {
  link = link.data(force.links(), function(d) { return d.source.id + "-" + d.target.id; });
  link.enter().insert("line", ".node").attr("class", "link");
  link.exit().remove();

  node = node.data(force.nodes(), function(d) { return d.id;});
  node.enter().append("circle")
  .attr("class", function(d) { return "node " + d.id; })
  .attr("r", (Math.floor(Math.random() * 7) + 2 ))
  .attr("fill", function(d,i){
    var rand = Math.random();
        for (x=0; x<nodes.length; x++){
        if (rand < .05) {return '#ffffff'}
        else if (rand < .1){return palette.pink}
        else if (rand < .2) {return palette.blue}
        else if (rand < .3) {return palette.yellow}
        else if (rand < .4) {return palette.orange}
        else if (rand < .5) {return palette.purple}
        else if (rand < .6) {return palette.darkerblue}
        else if (rand < .7) {return palette.gray}
        else if (rand < .8) {return palette.red}
        else if (rand < .9) {return palette.yellowgreen}
        else {return palette.green}
        } 
  });
  node.exit().remove();

  force.start();
}

/*
launch = 0;

function l(x){
    if (x == 1){
        launch = setInterval(bub, 1000);
    }
    else {
        launch = clearInterval(launch);
    }
    return launch;
}
*/

function tick() {
  node.attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })

  link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });
}