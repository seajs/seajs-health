define(function(require, exports) {

  // set up SVG for D3
  var width  = 1280,
      height = 500,
      colors = d3.scale.category10();

  var svg = d3.select('#seajs-health-console')
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  // set up initial nodes and links
  //  - nodes are known by 'id', not by index in array.
  //  - reflexive edges are indicated on the node (as a bold black circle).
  //  - links are always source < target; edge directions are set by 'left' and 'right'.

  var force = d3.layout.force()
      .size([width, height])
      .linkDistance(150)
      .charge(-500)

  var nodes = []
  var links = []


  // define arrow markers for graph links
  svg.append('svg:defs').append('svg:marker')
      .attr('id', 'end-arrow')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 6)
      .attr('markerHeight', 3)
      .attr('orient', 'auto')
    .append('svg:path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#000')

  // handles to link and node element groups
  var path = svg.append('svg:g').selectAll('path')
  var circle = svg.append('svg:g').selectAll('g')

  // mouse event vars
  var selected_link = null

  // update force layout (called automatically each iteration)
  function tick() {
    // draw directed edges with proper padding from node centers
    path.attr('d', function(d) {
      var deltaX = d.target.x - d.source.x,
          deltaY = d.target.y - d.source.y,
          dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY),
          normX = deltaX / dist,
          normY = deltaY / dist,
          sourcePadding = d.left ? 17 : 12,
          targetPadding = d.right ? 17 : 12,
          sourceX = d.source.x + (sourcePadding * normX),
          sourceY = d.source.y + (sourcePadding * normY),
          targetX = d.target.x - (targetPadding * normX),
          targetY = d.target.y - (targetPadding * normY);
      return 'M' + sourceX + ',' + sourceY + 'L' + targetX + ',' + targetY;
    });

    circle.attr('transform', function(d) {
      return 'translate(' + d.x + ',' + d.y + ')';
    });
  }

  // update graph (called when needed)
  function restart() {

       // init D3 force layout
    force.nodes(nodes).links(links).on('tick', tick)

    // path (link) group
    path = path.data(links);

    // update existing links
    path.style('marker-start', function(d) { return d.left ? 'url(#start-arrow)' : ''; })
      .style('marker-end', function(d) { return d.right ? 'url(#end-arrow)' : ''; });


    // add new links
    path.enter().append('svg:path')
      .attr('class', 'link')
      .style('marker-start', function(d) { return d.left ? 'url(#start-arrow)' : ''; })
      .style('marker-end', function(d) { return d.right ? 'url(#end-arrow)' : ''; })

    // remove old links
    path.exit().remove();


    // circle (node) group
    // NB: the function arg is crucial here! nodes are known by id, not by index!
    circle = circle.data(nodes, function(d) { return d.key; });

    // add new nodes
    var g = circle.enter().append('svg:g');

    g.append('svg:circle')
      .attr('class', 'node')
      .attr('r', 12)
      .style('fill', function(d) { return colors(d.key); })
      .style('stroke', function(d) { return d3.rgb(colors(d.key)).darker().toString(); })

    // show node IDs
    g.append('svg:text')
        .attr('x', 0)
        .attr('y', 6)
        .attr('class', 'id')
        .text(function(d) { return d.key; });

    // remove old nodes
    circle.exit().remove();

    // set the graph in motion
    force.start();
  }

  exports.start = function(_nodes, _links, circles) {
var n1 = {key: 'arale/widget/1.2.0/widget'}
var n2 = {key: 'alipay/contacts/1.0.2/contacts'}
var n3 =  {key: 'arale/base/1.0.1/base'}
    nodes = _nodes

    /**
    links = [
      {source: n1, target: n3, left: false, right: true },
      {source: n3, target: n1, left: false, right: true },
      {source: n2, target: n3, left: false, right: true }]
      **/
    links = _links

    restart()
  }
})
