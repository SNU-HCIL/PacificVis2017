
/* https://github.com/d3/d3-plugins/tree/master/hexbin Copyright 2013 Michael Bostock. */
!function(){d3.hexbin=function(){function u(n){var r={};return n.forEach(function(n,t){var a=s.call(u,n,t)/o,e=Math.round(a),c=h.call(u,n,t)/i-(1&e?.5:0),f=Math.round(c),l=a-e;if(3*Math.abs(l)>1){var v=c-f,g=f+(f>c?-1:1)/2,m=e+(e>a?-1:1),M=c-g,d=a-m;v*v+l*l>M*M+d*d&&(f=g+(1&e?1:-1)/2,e=m)}var j=f+"-"+e,p=r[j];p?p.push(n):(p=r[j]=[n],p.i=f,p.j=e,p.x=(f+(1&e?.5:0))*i,p.y=e*o)}),d3.values(r)}function a(r){var t=0,u=0;return n.map(function(n){var a=Math.sin(n)*r,e=-Math.cos(n)*r,i=a-t,o=e-u;return t=a,u=e,[i,o]})}var e,i,o,c=1,f=1,h=r,s=t;return u.x=function(n){return arguments.length?(h=n,u):h},u.y=function(n){return arguments.length?(s=n,u):s},u.hexagon=function(n){return arguments.length<1&&(n=e),"m"+a(n).join("l")+"z"},u.centers=function(){for(var n=[],r=0,t=!1,u=0;f+e>r;r+=o,t=!t,++u)for(var a=t?i/2:0,h=0;c+i/2>a;a+=i,++h){var s=[a,r];s.i=h,s.j=u,n.push(s)}return n},u.mesh=function(){var n=a(e).slice(0,4).join("l");return u.centers().map(function(r){return"M"+r+"m"+n}).join("")},u.size=function(n){return arguments.length?(c=+n[0],f=+n[1],u):[c,f]},u.radius=function(n){return arguments.length?(e=+n,i=2*e*Math.sin(Math.PI/3),o=1.5*e,u):e},u.radius(1)};var n=d3.range(0,2*Math.PI,Math.PI/3),r=function(n){return n[0]},t=function(n){return n[1]}}();

/* https://github.com/davidbau/seedrandom Copyright 2013 David Bau. */
(function(a,b,c,d,e,f){function k(a){var b,c=a.length,e=this,f=0,g=e.i=e.j=0,h=e.S=[];for(c||(a=[c++]);d>f;)h[f]=f++;for(f=0;d>f;f++)h[f]=h[g=j&g+a[f%c]+(b=h[f])],h[g]=b;(e.g=function(a){for(var b,c=0,f=e.i,g=e.j,h=e.S;a--;)b=h[f=j&f+1],c=c*d+h[j&(h[f]=h[g=j&g+b])+(h[g]=b)];return e.i=f,e.j=g,c})(d)}function l(a,b){var e,c=[],d=(typeof a)[0];if(b&&"o"==d)for(e in a)try{c.push(l(a[e],b-1))}catch(f){}return c.length?c:"s"==d?a:a+"\0"}function m(a,b){for(var d,c=a+"",e=0;c.length>e;)b[j&e]=j&(d^=19*b[j&e])+c.charCodeAt(e++);return o(b)}function n(c){try{return a.crypto.getRandomValues(c=new Uint8Array(d)),o(c)}catch(e){return[+new Date,a,a.navigator.plugins,a.screen,o(b)]}}function o(a){return String.fromCharCode.apply(0,a)}var g=c.pow(d,e),h=c.pow(2,f),i=2*h,j=d-1;c.seedrandom=function(a,f){var j=[],p=m(l(f?[a,o(b)]:0 in arguments?a:n(),3),j),q=new k(j);return m(o(q.S),b),c.random=function(){for(var a=q.g(e),b=g,c=0;h>a;)a=(a+c)*d,b*=d,c=q.g(1);for(;a>=i;)a/=2,b/=2,c>>>=1;return(a+c)/b},p},m(c.random(),b)})(this,[],Math,256,6,52);

var data = 
[{url:"http://ieeexplore.ieee.org/document/4475454" ,title: "Dynamic Shader Generation for Flexible Multi-Volume Visualization"},
{url:"http://ieeexplore.ieee.org/document/4475459" ,title: "Energy-Based Hierarchical Edge Clustering of Graphs"},
{url:"http://ieeexplore.ieee.org/document/4475462" ,title: "Illustrative Streamline Placement and Visualization"},
{url:"http://ieeexplore.ieee.org/document/4475471" ,title: "FanLens: A Visual Toolkit for Dynamically Exploring the Distribution of Hierarchical Attributes"},
{url:"http://ieeexplore.ieee.org/document/4475474" ,title: "MobiVis: A Visualization System for Exploring Mobile Data"},
{url:"http://ieeexplore.ieee.org/document/4475475" ,title: "Interactive Visual Analysis of the NSF Funding Information"},
{url:"http://ieeexplore.ieee.org/document/4475476" ,title: "StarGate: A Unified, Interactive Visualization of Software Projects"},
{url:"http://ieeexplore.ieee.org/document/4475477" ,title: "Map Warping for the Annotation of Metro Maps"},
{url:"http://ieeexplore.ieee.org/document/4475478" ,title: "Multiple Uncertainties in Time-Variant Cosmological Particle Data"},
{url:"http://ieeexplore.ieee.org/document/4475479" ,title: "ZAME: Interactive Large-Scale Graph Visualization"},
{url:"http://ieeexplore.ieee.org/document/4475481" ,title: "A Treemap Based Method for Rapid Layout of Large Graphs"},
{url:"http://ieeexplore.ieee.org/document/4906832" ,title: "Dual streamline seeding"},
{url:"http://ieeexplore.ieee.org/document/4906835" ,title: "Visualizing metrics on areas of interest in software architecture diagrams"},
{url:"http://ieeexplore.ieee.org/document/4906836" ,title: "HiMap: Adaptive visualization of large-scale online social networks"},
{url:"http://ieeexplore.ieee.org/document/4906841" ,title: "Point-based tree representation: A new approach for large hierarchies"},
{url:"http://ieeexplore.ieee.org/document/4906844" ,title: "A self-adaptive treemap-based technique for visualizing hierarchical data in 3D"},
{url:"http://ieeexplore.ieee.org/document/4906845" ,title: "TugGraph: Path-preserving hierarchies for browsing proximity and paths in graphs"},
{url:"http://ieeexplore.ieee.org/document/4906846" ,title: "A hybrid space-filling and force-directed layout method for visualizing multiple-category graphs"},
{url:"http://ieeexplore.ieee.org/document/4906853" ,title: "Visualization of signal transduction processes in the crowded environment of the cell"},
{url:"http://ieeexplore.ieee.org/document/4906855" ,title: "Contextual picking of volumetric structures"},
{url:"http://ieeexplore.ieee.org/document/4906856" ,title: "Structure-aware viewpoint selection for volume visualization"},
{url:"http://ieeexplore.ieee.org/document/4906857" ,title: "Moment curves"},
{url:"http://ieeexplore.ieee.org/document/5429596" ,title: "Motion track: Visualizing variations of human motion data"},
{url:"http://ieeexplore.ieee.org/document/5429597" ,title: "Adaptive proxy geometry for direct volume manipulation"},
{url:"http://ieeexplore.ieee.org/document/5429600" ,title: "Context preserving dynamic word cloud visualization"},
{url:"http://ieeexplore.ieee.org/document/5429601" ,title: "Visual analysis of high dimensional point clouds using topological landscapes"},
{url:"http://ieeexplore.ieee.org/document/5429602" ,title: "CycleStack: Inferring periodic behavior via temporal sequence visualization in ultrasound video"},
{url:"http://ieeexplore.ieee.org/document/5429607" ,title: "A layer-oriented interface for visualizing time-series data from oscilloscopes"},
{url:"http://ieeexplore.ieee.org/document/5429609" ,title: "Caleydo: Design and evaluation of a visual analysis framework for gene expression data in its biological context"},
{url:"http://ieeexplore.ieee.org/document/5429610" ,title: "Visualizing field-measured seismic data"},
{url:"http://ieeexplore.ieee.org/document/5429612" ,title: "Volume exploration using ellipsoidal Gaussian transfer functions"},
{url:"http://ieeexplore.ieee.org/document/5429613" ,title: "Stack zooming for multi-focus interaction in time-series data visualization"},
{url:"http://ieeexplore.ieee.org/document/5429615" ,title: "Volume visualization based on statistical transfer-function spaces"},
{url:"http://ieeexplore.ieee.org/document/5742355" ,title: "Full-resolution interactive CPU volume rendering with coherent BVH traversal"},
{url:"http://ieeexplore.ieee.org/document/5742367" ,title: "Context-aware volume navigation"},
{url:"http://ieeexplore.ieee.org/document/5742368" ,title: "Multi-dimensional transfer function design based on flexible dimension projection embedded in parallel coordinates"},
{url:"http://ieeexplore.ieee.org/document/5742370" ,title: "The Neuron Navigator: Exploring the information pathway through the neural maze"},
{url:"http://ieeexplore.ieee.org/document/5742372" ,title: "Loose capacity-constrained representatives for the qualitative visual analysis in molecular dynamics"},
{url:"http://ieeexplore.ieee.org/document/5742375" ,title: "Edge maps: Representing flow with bounded error"},
{url:"http://ieeexplore.ieee.org/document/5742379" ,title: "Impact of group size on spatial structure understanding tasks"},
{url:"http://ieeexplore.ieee.org/document/5742380" ,title: "Collaborative information linking: Bridging knowledge gaps between users by linking across applications"},
{url:"http://ieeexplore.ieee.org/document/5742384" ,title: "Interactive visualization of multivariate trajectory data with density maps"},
{url:"http://ieeexplore.ieee.org/document/5742388" ,title: "Dynamic network visualization in 1.5D"},
{url:"http://ieeexplore.ieee.org/document/5742391" ,title: "An advanced network visualization system for financial crime detection"},
{url:"http://ieeexplore.ieee.org/document/6183557" ,title: "Topological analysis and visualization of cyclical behavior in memory reference traces"},
{url:"http://ieeexplore.ieee.org/document/6183569" ,title: "A network-based interface for the exploration of high-dimensional data spaces"},
{url:"http://ieeexplore.ieee.org/document/6183570" ,title: "Progressive parallel coordinates"},
{url:"http://ieeexplore.ieee.org/document/6183579" ,title: "Effects of illumination, texture, and motion on task performance in 3D tensor-field streamtube visualizations"},
{url:"http://ieeexplore.ieee.org/document/6183580" ,title: "Visual 4D MRI blood flow analysis with line predicates"},
{url:"http://ieeexplore.ieee.org/document/6183583" ,title: "Dense flow visualization using wave interference"},
{url:"http://ieeexplore.ieee.org/document/6183584" ,title: "Output-coherent image-space LIC for surface flow visualization"},
{url:"http://ieeexplore.ieee.org/document/6183590" ,title: "Intelligent cutaway illustrations"},
{url:"http://ieeexplore.ieee.org/document/6183591" ,title: "Uncertainty visualization in HARDI based on ensembles of ODFs"},
{url:"http://ieeexplore.ieee.org/document/6183594" ,title: "Implicit representation of molecular surfaces"},
{url:"http://ieeexplore.ieee.org/document/6183596" ,title: "Centerline reformations of complex vascular structures"},
{url:"http://ieeexplore.ieee.org/document/6596121" ,title: "Circular-arc cartograms"},
{url:"http://ieeexplore.ieee.org/document/6596122" ,title: "Exploring entities in text with descriptive non-photorealistic rendering"},
{url:"http://ieeexplore.ieee.org/document/6596123" ,title: "Constrained optimization for disoccluding geographic landmarks in 3D urban maps"},
{url:"http://ieeexplore.ieee.org/document/6596128" ,title: "Visual summaries for graph collections"},
{url:"http://ieeexplore.ieee.org/document/6596131" ,title: "Evaluation of Depth of Field for depth perception in DVR"},
{url:"http://ieeexplore.ieee.org/document/6596137" ,title: "Illustrative visualization of cardiac and aortic blood flow from 4D MRI data"},
{url:"http://ieeexplore.ieee.org/document/6596138" ,title: "iTree: Exploring time-varying data using indexable tree"},
{url:"http://ieeexplore.ieee.org/document/6596144" ,title: "Visual analysis of uncertainties in ocean forecasts for planning and operation of off-shore structures"},
{url:"http://ieeexplore.ieee.org/document/6596146" ,title: "Visualizing edge-edge relations in graphs"},
{url:"http://ieeexplore.ieee.org/document/6596152" ,title: "Visualizing linear neighborhoods in non-linear vector fields"},
{url:"http://ieeexplore.ieee.org/document/6596154" ,title: "Automatic, tensor-guided illustrative vector field visualization"},
{url:"http://ieeexplore.ieee.org/document/6787133" ,title: "FlowTour: An Automatic Guide for Exploring Internal Flow Features"},
{url:"http://ieeexplore.ieee.org/document/6787134" ,title: "Scalable Lagrangian-Based Attribute Space Projection for Multivariate Unsteady Flow Data"},
{url:"http://ieeexplore.ieee.org/document/6787137" ,title: "An Edge-Bundling Layout for Interactive Parallel Coordinates"},
{url:"http://ieeexplore.ieee.org/document/6787140" ,title: "Using Entropy-Related Measures in Categorical Data Visualization"},
{url:"http://ieeexplore.ieee.org/document/6787143" ,title: "Improved Optimal and Approximate Power Graph Compression for Clearer Visualisation of Dense Graphs"},
{url:"http://ieeexplore.ieee.org/document/6787157" ,title: "Maps of Computer Science"},
{url:"http://ieeexplore.ieee.org/document/6787159" ,title: "Image Flows Visualization for Inter-media Comparison"},
{url:"http://ieeexplore.ieee.org/document/6787164" ,title: "A Mobile Visual Analytics Approach for Law Enforcement Situation Awareness"},
{url:"http://ieeexplore.ieee.org/document/6787170" ,title: "Manipulating Bilevel Feature Space for Category-Aware Image Exploration"},
{url:"http://ieeexplore.ieee.org/document/6787173" ,title: "A New Type of Web Graph for Personalized Visualization"},
{url:"http://ieeexplore.ieee.org/document/6787196" ,title: "Analytical Visualization of Large-Scale Data of 3D Cultural Objects"},
{url:"http://ieeexplore.ieee.org/document/7156350" ,title: "Moment invariants for 3D flow fields via normalization"},
{url:"http://ieeexplore.ieee.org/document/7156357" ,title: "Spherical layout and rendering methods for immersive graph visualization"},
{url:"http://ieeexplore.ieee.org/document/7156360" ,title: "Variational circular treemaps for interactive visualization of hierarchical data"},
{url:"http://ieeexplore.ieee.org/document/7156365" ,title: "Extending Dimensions in Radviz based on mean shift"},
{url:"http://ieeexplore.ieee.org/document/7156368" ,title: "SentiCompass: Interactive visualization for exploring and comparing the sentiments of time-varying twitter data"},
{url:"http://ieeexplore.ieee.org/document/7156372" ,title: "Computation-to-core mapping strategies for iso-surface volume rendering on GPUs"},
{url:"http://ieeexplore.ieee.org/document/7156376" ,title: "Can twitter really save your life? A case study of visual social media analytics for situation awareness"},
{url:"http://ieeexplore.ieee.org/document/7156378" ,title: "SketchInsight: Natural data exploration on interactive whiteboards leveraging pen and touch interaction"},
{url:"http://ieeexplore.ieee.org/document/7156379" ,title: "Clutter-aware label layout"},
{url:"http://ieeexplore.ieee.org/document/7156383" ,title: "Advanced lighting for unstructured-grid data visualization"},
{url:"http://ieeexplore.ieee.org/document/7156385" ,title: "Coverage-based opacity estimation for interactive Depth of Field in molecular visualization"},
{url:"http://ieeexplore.ieee.org/document/7156390" ,title: "Improving the fidelity of contextual data layouts using a Generalized Barycentric Coordinates framework"},
{url:"http://ieeexplore.ieee.org/document/7465246" ,title: "Spot-tracking lens: A zoomable user interface for animated bubble charts"},
{url:"http://ieeexplore.ieee.org/document/7465248" ,title: "Interactive visual co-cluster analysis of bipartite graphs"},
{url:"http://ieeexplore.ieee.org/document/7465250" ,title: "An integrated visualization system for interactive analysis of large, heterogeneous cosmology data"},
{url:"http://ieeexplore.ieee.org/document/7465258" ,title: "Accelerated visualization of transparent molecular surfaces in molecular dynamics"},
{url:"http://ieeexplore.ieee.org/document/7465262" ,title: "Geo word clouds"},
{url:"http://ieeexplore.ieee.org/document/7465267" ,title: "Multilayer graph edge bundling"},
{url:"http://ieeexplore.ieee.org/document/7465271" ,title: "Screen-space silhouettes for visualizing ensembles of 3D isosurfaces"},
{url:"http://ieeexplore.ieee.org/document/7465275" ,title: "A visual analytics approach for exploring individual behaviors in smartphone usage data"},
{url:"http://ieeexplore.ieee.org/document/7465277" ,title: "STAC: Enhancing stacked graphs for time series analysis"},
{url:"http://ieeexplore.ieee.org/document/7465278" ,title: "Semantic word cloud generation based on word embeddings"},
{url:"http://ieeexplore.ieee.org/document/7465280" ,title: "Bookwall: Visualizing books online based on user experience in physical bookstores"}];

data.forEach(function(d, i) {
  d.i = i % 10;
  d.j = i / 10 | 0;
});

//  Math.seedrandom(+d3.timeHour(new Date));

d3.shuffle(data);

var height = 460,
    imageWidth = 132,
    imageHeight = 152,
    radius = 75,
    depth = 4;

var currentFocus = [innerWidth / 2, height / 2],
    desiredFocus,
    idle = true;

var style = document.body.style,
    transform = ("webkitTransform" in style ? "-webkit-"
        : "MozTransform" in style ? "-moz-"
        : "msTransform" in style ? "-ms-"
        : "OTransform" in style ? "-o-"
        : "") + "transform";

var hexbin = d3.hexbin()
    .radius(radius);

if (!("ontouchstart" in document)) d3.select("#examples")
    .on("mousemove", mousemoved);

var deep = d3.select("#examples-deep");

var canvas = deep.append("canvas")
    .attr("height", height);

var context = canvas.node().getContext("2d");

var svg = deep.append("svg")
    .attr("height", height);

var mesh = svg.append("path")
    .attr("class", "example-mesh");

var anchor = svg.append("g")
    .attr("class", "example-anchor")
  .selectAll("a");

var graphic = deep.selectAll("svg,canvas");

var image = new Image;
image.src = "2.jpg";
image.onload = resized;

d3.select(window)
    .on("resize", resized)
    .each(resized);

function drawImage(d) {
  context.save();
  context.beginPath();
  context.moveTo(0, -radius);

  for (var i = 1; i < 6; ++i) {
    var angle = i * Math.PI / 3,
        x = Math.sin(angle) * radius,
        y = -Math.cos(angle) * radius;
    context.lineTo(x, y);
  }

  context.clip();
  context.drawImage(image,
      imageWidth * d.i, imageHeight * d.j,
      imageWidth, imageHeight,
      -imageWidth / 2, -imageHeight / 2,
      imageWidth, imageHeight);
  context.restore();
}

function resized() {
  var deepWidth = innerWidth * (depth + 1) / depth,
      deepHeight = height * (depth + 1) / depth,
      centers = hexbin.size([deepWidth, deepHeight]).centers();

  desiredFocus = [innerWidth / 2, height / 2];
  moved();

  graphic
      .style("left", Math.round((innerWidth - deepWidth) / 2) + "px")
      .style("top", Math.round((height - deepHeight) / 2) + "px")
      .attr("width", deepWidth)
      .attr("height", deepHeight);

  centers.forEach(function(center, i) {
    center.j = Math.round(center[1] / (radius * 1.5));
    center.i = Math.round((center[0] - (center.j & 1) * radius * Math.sin(Math.PI / 3)) / (radius * 2 * Math.sin(Math.PI / 3)));
    context.save();
    context.translate(Math.round(center[0]), Math.round(center[1]));
    drawImage(center.example = data[(center.i % 10) + ((center.j + (center.i / 10 & 1) * 5) % 10) * 10]);
    context.restore();
  });

  mesh.attr("d", hexbin.mesh);

  anchor = anchor.data(centers, function(d) { return d.i + "," + d.j; });

  anchor.exit().remove();

  var anchorEnter = anchor.enter().append("a")
      .attr("xlink:href", function(d) { return d.example.url; })
      .attr("xlink:title", function(d) { return d.example.title; });

  anchorEnter.append("path")
      .attr("d", hexbin.hexagon());

  anchor = anchorEnter.merge(anchor)
      .attr("transform", function(d) { return "translate(" + d + ")"; });
}

function mousemoved() {
  var m = d3.mouse(this);

  desiredFocus = [
    Math.round((m[0] - innerWidth / 2) / depth) * depth + innerWidth / 2,
    Math.round((m[1] - height / 2) / depth) * depth + height / 2
  ];

  moved();
}

function moved() {
  if (idle) d3.timer(function() {
    if (idle = Math.abs(desiredFocus[0] - currentFocus[0]) < .5 && Math.abs(desiredFocus[1] - currentFocus[1]) < .5) currentFocus = desiredFocus;
    else currentFocus[0] += (desiredFocus[0] - currentFocus[0]) * .14, currentFocus[1] += (desiredFocus[1] - currentFocus[1]) * .14;
    deep.style(transform, "translate(" + (innerWidth / 2 - currentFocus[0]) / depth + "px," + (height / 2 - currentFocus[1]) / depth + "px)");
    return idle;
  });
}
