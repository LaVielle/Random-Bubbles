/*
*	Use the following command in Terminal to allow cross origin policy override in Chorme:
*	/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --user-data-dir="/tmp/chrome_dev_session" --disable-web-security
*/

var dataArray = []

function bub(ident, valeur){
	this.id = ident;
	this.val = valeur;
}

function add(x){
	for(i=0; i<x; i++){
		dataArray.push(new bub(dataArray.length+1, (Math.floor(Math.random() * 1000) + 100 )));
		//dataArray.push(Math.floor(Math.random() * 1000) + 100 );
	}
}

function log(){
	console.log(dataArray);
}

launch = 0;

function l(x){
	if (x == 1){
		launch = setInterval(start, 1000);
	}
	else {
		launch = clearInterval(launch);
	}
	return launch;
}

function start(){
	var x = (Math.floor(Math.random() * 5));
	add(x);
	//log();
	console.log("Added: " + x);
	console.log("Size: " + dataArray.length);
	return launch;
}

function log(){
	console.log(dataArray);
}

////////////////////////////////////////////////////////////////
// Making Bubbles
////////////////////////////////////////////////////////////////


var diameter = 800,
	color = d3.scale.category20();

var bubble = d3.layout.pack()
	.sort(null)
	.size([diameter, diameter])
	.value(function(d){ return d.size;})
	.padding(5);

/////////////////////////////////////////
//Check here to resize chart container
/////////////////////////////////////////
var svg = d3.select('#chart').append('svg')
	.attr('width', diameter)
	.attr('height', diameter)
	.attr('class', 'bubble')

d3.csv('rand_data.csv', function(error, data) {

	for (i=0;i<data.length;i++){
		dataArray.push(data[i])
	}

	//Converting values into Int data type
	for (i=0;i<dataArray.length;i++){
		dataArray[i].id = parseInt(dataArray[i].id, 10);
		dataArray[i].val = parseInt(dataArray[i].val, 10)
	}

	data = data.map(function(d){ d.value = +d["val"]; return d; });

	console.log(dataArray);

	//Formating nodes
	var nodes = bubble.nodes({children:data}).filter(function(d){
		return !d.children;
	});

	//Setting up chart
	var bubbles = svg.append('g')
		.attr('transforme', 'translate(0,0)')
		.selectAll('.bubble')
		.data(nodes)
		.enter();

	var rScale = d3.scale.linear()
		.domain([d3.min(data, function(d) {return dataArray.val;})*0.75, d3.max(data, function(d) {return dataArray.val;})])
		//Change 400 here
		.range([0, 400])

console.log([d3.min(data, function(d) {return d.val;})*0.75, d3.max(data, function(d) {return d.val;})])

	//Creating bubbles
	bubbles.append('circle')
		.attr('r', function(d){return d.rScale;})
		.attr('cx', function(d){return 10;})
		.attr('cy', function(d){return 20;})
		//Check color function, maybe data input wrong
		//.style('fill', function(d){return color(d.value);})
		.style('fill', "#fff")

});




