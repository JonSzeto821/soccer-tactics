var holder = d3.select("#soccerField") // select the 'body' element
      .append("svg")           // append an SVG element to the body
      .attr("width", 1050)
      .attr("height", 680)
      .attr("viewBox", "0 0 1050 680")
      .attr("preserveAspectRatio", "none");


// draw a rectangle - pitch
holder.append("rect")        // attach a rectangle
    .attr("x", 0)         // position the left of the rectangle
    .attr("y", 0)          // position the top of the rectangle
    .attr("height", 680)    // set the height
    .attr("width", 1050)    // set the width
    .style("stroke-width", 5)    // set the stroke width
    .style("stroke", "#001400")    // set the line colour
    .style("fill", "#80B280");    // set the fill colour


// draw a rectangle - halves
holder.append("rect")        // attach a rectangle
    .attr("x", 0)         // position the left of the rectangle
    .attr("y", 0)          // position the top of the rectangle
    .attr("height", 680)    // set the height
    .attr("width", 525)    // set the width
    .style("stroke-width", 5)    // set the stroke width
    .style("stroke", "#001400")    // set the line colour
    .style("fill", "#80B280");    // set the fill colour


// draw a circle - center circle
holder.append("circle")          // attach a circle
    .attr("cx", 525)             // position the x-centre
    .attr("cy", 340)             // position the y-centre
    .attr("r", 91.5)               // set the radius
    .style("stroke-width", 5)    // set the stroke width
    .style("stroke", "#001400")      // set the line colour
    .style("fill", "none");      // set the fill colour


// draw a rectangle - penalty area 1
holder.append("rect")        // attach a rectangle
    .attr("x", 0)         // position the left of the rectangle
    .attr("y", 138.5)          // position the top of the rectangle
    .attr("height", 403)    // set the height
    .attr("width", 165)    // set the width
    .style("stroke-width", 5)    // set the stroke width
    .style("stroke", "#001400")    // set the line colour
    .style("fill", "#80B280");    // set the fill colour


// draw a rectangle - penalty area 2
holder.append("rect")        // attach a rectangle
    .attr("x", 885)         // position the left of the rectangle
    .attr("y", 138.5)          // position the top of the rectangle
    .attr("height", 403)    // set the height
    .attr("width", 165)    // set the width
    .style("stroke-width", 5)    // set the stroke width
    .style("stroke", "#001400")    // set the line colour
    .style("fill", "#80B280");    // set the fill colour

// draw a rectangle - six yard box 1
holder.append("rect")        // attach a rectangle
    .attr("x", 0)         // position the left of the rectangle
    .attr("y", 248.5)          // position the top of the rectangle
    .attr("height", 183)    // set the height
    .attr("width", 55)    // set the width
    .style("stroke-width", 5)    // set the stroke width
    .style("stroke", "#001400")    // set the line colour
    .style("fill", "#80B280");    // set the fill colour

// draw a rectangle - six yard box 2
holder.append("rect")        // attach a rectangle
    .attr("x", 995)         // position the left of the rectangle
    .attr("y", 248.5)          // position the top of the rectangle
    .attr("height", 183)    // set the height
    .attr("width", 55)    // set the width
    .style("stroke-width", 5)    // set the stroke width
    .style("stroke", "#001400")    // set the line colour
    .style("fill", "#80B280");    // set the fill colour


// draw a circle - penalty spot 1
holder.append("circle")        // attach a circle
    .attr("cx", 110)           // position the x-centre
    .attr("cy", 340)           // position the y-centre
    .attr("r", 5)             // set the radius
    .style("fill", "#001400");     // set the fill colour

// draw a circle - penalty spot 2
holder.append("circle")        // attach a circle
    .attr("cx", 940)           // position the x-centre
    .attr("cy", 340)           // position the y-centre
    .attr("r", 5)             // set the radius
    .style("fill", "#001400");     // set the fill colour

// draw a circle - center spot
holder.append("circle")        // attach a circle
    .attr("cx", 525)           // position the x-centre
    .attr("cy", 340)           // position the y-centre
    .attr("r", 5)             // set the radius
    .style("fill", "#001400");     // set the fill colour


// penalty box semi-circle 1
var vis = d3.select("body").append("svg")
var pi = Math.PI;

var arc = d3.svg.arc()
    .innerRadius(89)
    .outerRadius(94)
    .startAngle(0.64) //radians
    .endAngle(2.5) //just radians

var arc2 = d3.svg.arc()
    .innerRadius(89)
    .outerRadius(94)
    .startAngle(-0.64) //radians
    .endAngle(-2.5) //just radians
    holder.append("path")
    .attr("d", arc)
    .attr("fill", "#001400")
    .attr("transform", "translate(110,340)")
    holder.append("path")
    .attr("d", arc2)
    .attr("fill", "#001400")
    .attr("transform", "translate(940,340)");


// Dragging circles

var color = d3.scale.ordinal().range(["blue", "white", "white"]);
var color1 = d3.scale.ordinal().range(["mediumturquoise", "red", "black"]);
var size = d3.scale.ordinal().range([16, 16, 12]);

//var color = d3.scale.category10();

var drag = d3.behavior.drag()
    .origin(d => d)
    .on("dragstart", dragstarted)
    .on("drag", dragged)
    .on("dragend", dragended);

d3.csv("../javascript/dots.txt", dottype, (error, oldDots) => {
  dot = holder.append("g")
      .attr("class", "dot")
    .selectAll("circle")
      .data(dots)
    .enter().append("circle")
      .attr("r", d => size(d.team))
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .style("fill", d => color(d.team))
      .style("stroke", d => color1(d.team))
  		.style("stroke-width", 3)
      .call(drag);
});



// functions for above...

function dottype(d) {
  d.x = +d.x;
  d.y = +d.y;
  return d;
}


function dragstarted(d) {
  d3.event.sourceEvent.stopPropagation();
  // editDot(d);
  d3.select(this)
  //.classed("dragging", true);
}

function dragged(d) {
  d3.select(this)
  .attr("cx", d.x = d3.event.x)
  .attr("cy", d.y = d3.event.y)
  .style("opacity", .5);
}

function dragended(d) {
  updateDots(d);
  d3.select(this)
  .style("opacity", 1);
  modified = true;
}

function addDot() {
  holder.selectAll('circle').remove();
  console.log(dots);
  dot = holder.append("g")
      .attr("class", "dot")
    .selectAll("circle")
      .data(dots)
    .enter().append("circle")
      .attr("r", d => size(d.team))
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .style("fill", d => color(d.team))
      .style("stroke", d => color1(d.team))
      .style("stroke-width", 3)
      .call(drag);
  modified = true;
}
