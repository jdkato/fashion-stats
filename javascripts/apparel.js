/* Spending
-------------------------------------------------- */
var activeState = null;
var lastBar = null;
var year2Expnd = {
    '1990': {
        'total': 1620,
        'Men (16+)': 324,
        'Boys (2 - 15)': 70,
        'Women (16+)': 586,
        'Girls (2 - 15)': 87,
        'Children (under 2)': 70,
        'Footwear': 225,
        'Other': 258
    },
    '1995': {
        'total': 1703,
        'Men (16+)': 329,
        'Boys (2 - 15)': 96,
        'Women (16+)': 559,
        'Girls (2 - 15)': 101,
        'Children (under 2)': 81,
        'Footwear': 278,
        'Other': 259
    },
    '2000': {
        'total': 1856,
        'Men (16+)': 344,
        'Boys (2 - 15)': 96,
        'Women (16+)': 607,
        'Girls (2 - 15)': 118,
        'Children (under 2)': 82,
        'Footwear': 343,
        'Other': 266
    },
    '2005': {
        'total': 1886,
        'Men (16+)': 349,
        'Boys (2 - 15)': 91,
        'Women (16+)': 633,
        'Girls (2 - 15)': 121,
        'Children (under 2)': 82,
        'Footwear': 320,
        'Other': 290
    },
    '2010': {
        'total': 1700,
        'Men (16+)': 304,
        'Boys (2 - 15)': 78,
        'Women (16+)': 562,
        'Girls (2 - 15)': 101,
        'Children (under 2)': 91,
        'Footwear': 303,
        'Other': 261
    },
    '2014': {
        'total': 1765,
        'Men (16+)': 326,
        'Boys (2 - 15)': 84,
        'Women (16+)': 551,
        'Girls (2 - 15)': 105,
        'Children (under 2)': 76,
        'Footwear': 367,
        'Other': 256
    },
};

var pieData = {
    labels: [
        'For Men (16+)',
        'For Women (16+)',
        'For Boys (2 - 15)',
        'For Girls (2 - 15)',
        'For Children (under 2)'
    ],
    datasets: [
        {
            data: [326, 551, 84, 105, 76],
            backgroundColor: [
                '#44A340',
                '#1E6823',
                '#6CC644',
                '#8CC665',
                '#D6E685'
            ],
            hoverBackgroundColor: [
                '#44A340',
                '#1E6823',
                '#6CC644',
                '#8CC665',
                '#D6E685'
            ]
        }]
};

var trendCtx = document.getElementById('avg-line-chart').getContext('2d');
var trendPieChart = new Chart(trendCtx, {
    type: 'pie',
    data: pieData,
    options: {
        tooltips: {
            enabled: true
        },
        title: {
            display: true,
            text: '2014 expenditures by demographic',
            fontColor: '#777',
            fontStyle: 'normal'
        }
    }
});

var spendData = {
    labels: ['1990', '1995', '2000', '2005', '2010', '2014'],
    datasets: [{
        type: 'bar',
        label: 'Average annual expenditures on apparel',
        backgroundColor: '#8CC665',
        hoverBackgroundColor: '#8CC665',
        data: [1620, 1703, 1856, 1886, 1700, 1765],
        borderColor: 'white',
        hoverBorderColor: '#333',
        borderWidth: 2
    }]
};

function updatePie(index) {
    year = spendData.labels[index];
    trendPieChart.options.title.text = year + ' expenditures by demographic';
    data = year2Expnd[year];
    newPieData = [
        data['Men (16+)'], data['Women (16+)'], data['Boys (2 - 15)'],
        data['Girls (2 - 15)'], data['Children (under 2)']
    ];
    trendPieChart.data.datasets[0].data = newPieData;
    trendPieChart.update();
}

var ctx = document.getElementById('avg-exp-chart').getContext('2d');
spendChart = new Chart(ctx, {
    type: 'bar',
    data: spendData,
    options: {
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Nominal Dollars ($)'
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Year'
                }
            }]
        },
        tooltips: {
            enabled: false
        },
        hover: {
            onHover: function(data) {
                if (data[0] !== undefined && lastBar !== data[0]._index) {
                    lastBar = data[0]._index;
                    updatePie(lastBar);
                }
            }
        }
    }
});

/* Item Summary
-------------------------------------------------- */

/*
 * Creates tooltip with provided id that
 * floats on top of visualization.
 * Most styling is expected to come from CSS
 * so check out bubble_chart.css for more details.
 */
function floatingTooltip(tooltipId, width) {
  // Local variable to hold tooltip div for
  // manipulation in other functions.
  var tt = d3.select('body')
    .append('div')
    .attr('class', 'tooltip')
    .attr('id', tooltipId)
    .style('pointer-events', 'none');

  // Set a width if it is provided.
  if (width) {
    tt.style('width', width);
  }

  // Initially it is hidden.
  hideTooltip();

  /*
   * Display tooltip with provided content.
   *
   * content is expected to be HTML string.
   *
   * event is d3.event for positioning.
   */
  function showTooltip(content, event) {
    tt.style('opacity', 1.0)
      .html(content);

    updatePosition(event);
  }

  /*
   * Hide the tooltip div.
   */
  function hideTooltip() {
    tt.style('opacity', 0.0);
  }

  /*
   * Figure out where to place the tooltip
   * based on d3 mouse event.
   */
  function updatePosition(event) {
    var xOffset = 20;
    var yOffset = 10;

    var ttw = tt.style('width');
    var tth = tt.style('height');

    var wscrY = window.scrollY;
    var wscrX = window.scrollX;

    var curX = (document.all) ? event.clientX + wscrX : event.pageX;
    var curY = (document.all) ? event.clientY + wscrY : event.pageY;
    var ttleft = ((curX - wscrX + xOffset * 2 + ttw) > window.innerWidth) ?
                 curX - ttw - xOffset * 2 : curX + xOffset;

    if (ttleft < wscrX + xOffset) {
      ttleft = wscrX + xOffset;
    }

    var tttop = ((curY - wscrY + yOffset * 2 + tth) > window.innerHeight) ?
                curY - tth - yOffset * 2 : curY + yOffset;

    if (tttop < wscrY + yOffset) {
      tttop = curY + yOffset;
    }

    tt.style({ top: tttop + 'px', left: ttleft + 'px' });
  }

  return {
    showTooltip: showTooltip,
    hideTooltip: hideTooltip,
    updatePosition: updatePosition
  };
}

var bubbleData = [
    {"id": 1, "group": "medium", "demo": "Men's", "item": "Suits", "cost": 21.59},
    {"id": 2, "group": "low", "demo": "Men's", "item": "Sportcoats & tailored jackets", "cost": 8.24},
    {"id": 3, "group": "medium", "demo": "Men's", "item": "Coats & jackets", "cost": 23.26},
    {"id": 4, "group": "high", "demo": "Men's", "item": "Shirts, sweaters & vests", "cost": 91.38},
    {"id": 5, "group": "medium", "demo": "Men's", "item": "Sportswear", "cost": 25.76},
    {"id": 6, "group": "medium", "demo": "Men's", "item": "Underwear", "cost": 31.14},
    {"id": 7, "group": "low", "demo": "Men's", "item": "Nightwear", "cost": 1.75},
    {"id": 8, "group": "high", "demo": "Men's", "item": "Pants & shorts", "cost": 72.27},
    {"id": 9, "group": "medium", "demo": "Women's", "item": "Coats and jackets", "cost": 42.46},
    {"id": 10, "group": "high", "demo": "Women's", "item": "Dresses", "cost": 88.59},
    {"id": 11, "group": "low", "demo": "Women's", "item": "Sportcoats & tailored jackets", "cost": 3.06},
    {"id": 12, "group": "high", "demo": "Women's", "item": "Sweaters, shirts, tops & vests", "cost": 147.21},
    {"id": 13, "group": "low", "demo": "Women's", "item": "Skirts", "cost": 11.2},
    {"id": 14, "group": "high", "demo": "Women's", "item": "Pants & shorts", "cost": 82.35},
    {"id": 15, "group": "medium", "demo": "Women's", "item": "Sportswear", "cost": 25.54},
    {"id": 16, "group": "medium", "demo": "Women's", "item": "Sleepwear", "cost": 22.05},
    {"id": 17, "group": "medium", "demo": "Women's", "item": "Undergarments", "cost": 33.53},
    {"id": 18, "group": "low", "demo": "Boys'", "item": "Coats & jackets", "cost": 5.21},
    {"id": 19, "group": "medium", "demo": "Boys'", "item": "Shirts & sweaters", "cost": 22.43},
    {"id": 20, "group": "low", "demo": "Boys'", "item": "Underwear", "cost": 11.68},
    {"id": 21, "group": "low", "demo": "Boys'", "item": "Nightwear", "cost": 1.33},
    {"id": 22, "group": "medium", "demo": "Boys'", "item": "Pants & shorts", "cost": 23.65},
    {"id": 23, "group": "low", "demo": "Boys'", "item": "Sportswear", "cost": 1.46},
    {"id": 24, "group": "low", "demo": "Girls'", "item": "Coats & jackets", "cost": 5.21},
    {"id": 25, "group": "medium", "demo": "Girls'", "item": "Dresses & suits", "cost": 14.06},
    {"id": 26, "group": "medium", "demo": "Girls'", "item": "Shirts, blouses, sweaters & vests  ", "cost": 28.01},
    {"id": 27, "group": "medium", "demo": "Girls'", "item": "Skirts, pants & shorts", "cost": 23.45},
    {"id": 28, "group": "low", "demo": "Girls'", "item": "Sportswear", "cost": 10.13},
    {"id": 29, "group": "low", "demo": "Girls'", "item": "Underwear & sleepwear", "cost": 9.69}
];

/* bubbleChart creation function. Returns a function that will
 * instantiate a new bubble chart given a DOM element to display
 * it in and a dataset to visualize.
 *
 * Organization and style inspired by:
 * https://bost.ocks.org/mike/chart/
 *
 */
function bubbleChart() {
  // Constants for sizing
  var width = 940;
  var height = 600;

  // tooltip for mouseover functionality
  var tooltip = floatingTooltip('gates_tooltip', 240);

  // Locations to move bubbles towards, depending
  // on which view mode is selected.
  var center = { x: width / 2, y: height / 2 };

  var demoCenters = {
    "Men's": { x: width / 3, y: height / 2 },
    "Women's": { x: width / 2, y: height / 2 },
    "Boys'": { x: 2.1 * width / 3, y: height / 2 },
    "Girls'": { x: 2.1 * width / 3, y: height / 2 }
  };

  // X locations of the year titles.
  var demoTitleX = {
    "Men's": 160,
    "Women's": width / 2,
    "Boys'": width - 160,
    "Girls'": width - 160
  };

  // Used when setting up force and
  // moving around nodes
  var damper = 0.102;

  // These will be set in create_nodes and create_vis
  var svg = null;
  var bubbles = null;
  var nodes = [];

  // Charge function that is called for each node.
  // Charge is proportional to the diameter of the
  // circle (which is stored in the radius attribute
  // of the circle's associated data.
  // This is done to allow for accurate collision
  // detection with nodes of different sizes.
  // Charge is negative because we want nodes to repel.
  // Dividing by 8 scales down the charge to be
  // appropriate for the visualization dimensions.
  function charge(d) {
    return -Math.pow(d.radius, 2.0) / 8;
  }

  // Here we create a force layout and
  // configure it to use the charge function
  // from above. This also sets some contants
  // to specify how the force layout should behave.
  // More configuration is done below.
  var force = d3.layout.force()
    .size([width, height])
    .charge(charge)
    .gravity(-0.01)
    .friction(0.9);


  // Nice looking colors - no reason to buck the trend
  var fillColor = d3.scale.ordinal()
    .domain(['low', 'medium', 'high'])
    .range(['#E4B7B2', '#EE9586', '#D84B2A']);

  // Sizes bubbles based on their area instead of raw radius
  var radiusScale = d3.scale.pow()
    .exponent(0.5)
    .range([2, 85]);

  /*
   * This data manipulation function takes the raw data from
   * the CSV file and converts it into an array of node objects.
   * Each node will store data and visualization values to visualize
   * a bubble.
   *
   * rawData is expected to be an array of data objects, read in from
   * one of d3's loading functions like d3.csv.
   *
   * This function returns the new node array, with a node in that
   * array for each element in the rawData input.
   */
  function createNodes(rawData) {
    // Use map() to convert raw data into node data.
    // Checkout http://learnjsdata.com/ for more on
    // working with data.
    var myNodes = rawData.map(function (d) {
      return {
        id: d.id,
        radius: radiusScale(+d.cost),
        value: d.cost,
        demo: d.demo,
        item: d.item,
        group: d.group,
        x: Math.random() * 900,
        y: Math.random() * 800
      };
    });

    // sort them to prevent occlusion of smaller nodes.
    myNodes.sort(function (a, b) { return b.value - a.value; });

    return myNodes;
  }

  /*
   * Main entry point to the bubble chart. This function is returned
   * by the parent closure. It prepares the rawData for visualization
   * and adds an svg element to the provided selector and starts the
   * visualization creation process.
   *
   * selector is expected to be a DOM element or CSS selector that
   * points to the parent element of the bubble chart. Inside this
   * element, the code will add the SVG continer for the visualization.
   *
   * rawData is expected to be an array of data objects as provided by
   * a d3 loading function like d3.csv.
   */
  var chart = function chart(selector, rawData) {
    // Use the max total_amount in the data as the max in the scale's domain
    // note we have to ensure the total_amount is a number by converting it
    // with `+`.
    var maxAmount = d3.max(rawData, function (d) { return +d.cost; });
    radiusScale.domain([0, maxAmount]);

    nodes = createNodes(rawData);
    // Set the force's nodes to our newly created nodes array.
    force.nodes(nodes);

    // Create a SVG element inside the provided selector
    // with desired size.
    svg = d3.select(selector)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // Bind nodes data to what will become DOM elements to represent them.
    bubbles = svg.selectAll('.bubble')
      .data(nodes, function (d) { return d.id; });

    // Create new circle elements each with class `bubble`.
    // There will be one circle.bubble for each object in the nodes array.
    // Initially, their radius (r attribute) will be 0.
    bubbles.enter().append('circle')
      .classed('bubble', true)
      .attr('r', 0)
      .attr('fill', function (d) { return fillColor(d.group); })
      .attr('stroke', function (d) { return d3.rgb(fillColor(d.group)).darker(); })
      .attr('stroke-width', 2)
      .on('mouseover', showDetail)
      .on('mouseout', hideDetail);

    // Fancy transition to make bubbles appear, ending with the
    // correct radius
    bubbles.transition()
      .duration(2000)
      .attr('r', function (d) { return d.radius; });

    // Set initial layout to single group.
    groupBubbles();
  };

  /*
   * Sets visualization in "single group mode".
   * The year labels are hidden and the force layout
   * tick function is set to move all nodes to the
   * center of the visualization.
   */
  function groupBubbles() {
    hideDemo();

    force.on('tick', function (e) {
      bubbles.each(moveToCenter(e.alpha))
        .attr('cx', function (d) { return d.x; })
        .attr('cy', function (d) { return d.y; });
    });

    force.start();
  }

  /*
   * Helper function for "single group mode".
   * Returns a function that takes the data for a
   * single node and adjusts the position values
   * of that node to move it toward the center of
   * the visualization.
   *
   * Positioning is adjusted by the force layout's
   * alpha parameter which gets smaller and smaller as
   * the force layout runs. This makes the impact of
   * this moving get reduced as each node gets closer to
   * its destination, and so allows other forces like the
   * node's charge force to also impact final location.
   */
  function moveToCenter(alpha) {
    return function (d) {
      d.x = d.x + (center.x - d.x) * damper * alpha;
      d.y = d.y + (center.y - d.y) * damper * alpha;
    };
  }

  /*
   * Sets visualization in "split by year mode".
   * The year labels are shown and the force layout
   * tick function is set to move nodes to the
   * yearCenter of their data's year.
   */
  function splitBubbles() {
    showDemo();

    force.on('tick', function (e) {
      bubbles.each(moveToDemo(e.alpha))
        .attr('cx', function (d) { return d.x; })
        .attr('cy', function (d) { return d.y; });
    });

    force.start();
  }

  /*
   * Helper function for "split by year mode".
   * Returns a function that takes the data for a
   * single node and adjusts the position values
   * of that node to move it the year center for that
   * node.
   *
   * Positioning is adjusted by the force layout's
   * alpha parameter which gets smaller and smaller as
   * the force layout runs. This makes the impact of
   * this moving get reduced as each node gets closer to
   * its destination, and so allows other forces like the
   * node's charge force to also impact final location.
   */
  function moveToDemo(alpha) {
    return function (d) {
      var target = demoCenters[d.demo];
      d.x = d.x + (target.x - d.x) * damper * alpha * 1.1;
      d.y = d.y + (target.y - d.y) * damper * alpha * 1.1;
    };
  }

  /*
   * Hides Year title displays.
   */
  function hideDemo() {
    svg.selectAll('.demo').remove();
  }

  /*
   * Shows Year title displays.
   */
  function showDemo() {
    // Another way to do this would be to create
    // the year texts once and then just hide them.
    var demoData = d3.keys(demoTitleX);
    var demo = svg.selectAll('.demo')
      .data(demoData);

    demo.enter().append('text')
      .attr('class', 'demo')
      .attr('x', function (d) { return demoTitleX[d]; })
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .text(function (d) {
        if (d === "Boys'") {
            return "Boys' & Girls'";
        } else if (d === "Girls'") {
            return "";
        }
        return d;
    });
  }


  /*
   * Function called on mouseover to display the
   * details of a bubble in the tooltip.
   */
  function showDetail(d) {
    // change outline to indicate hover state.
    d3.select(this).attr('stroke', 'black');

    var content = '<span class="name">Classification: </span><span class="value">' +
                  d.demo +
                  '</span><br/>' +
                  '<span class="name">Item: </span><span class="value">' +
                  d.item +
                  '</span><br/>' +
                  '<span class="name">Cost: </span><span class="value">$' +
                  d.value +
                  '</span>';
    tooltip.showTooltip(content, d3.event);
  }

  /*
   * Hides tooltip
   */
  function hideDetail(d) {
    // reset outline
    d3.select(this)
      .attr('stroke', d3.rgb(fillColor(d.group)).darker());

    tooltip.hideTooltip();
  }

  /*
   * Externally accessible function (this is attached to the
   * returned chart function). Allows the visualization to toggle
   * between "single group" and "split by demo" modes.
   *
   * displayName is expected to be a string and either 'demo' or 'all'.
   */
  chart.toggleDisplay = function (displayName) {
    if (displayName === 'all') {
      groupBubbles();
    } else {
      splitBubbles();
    }
  };


  // return the chart function from closure.
  return chart;
}

/*
 * Below is the initialization code as well as some helper functions
 * to create a new bubble chart instance, load the data, and display it.
 */

var myBubbleChart = bubbleChart();

/*
 * Sets up the layout buttons to allow for toggling between view modes.
 */
function setupButtons() {
  d3.select('#toolbar')
    .selectAll('.button')
    .on('click', function () {
        d3.event.preventDefault();
        // Remove active class from all buttons
        d3.selectAll('.button').classed('active', false);
        // Find the button just clicked
        var button = d3.select(this);

        // Set it as the active button
        button.classed('active', true);

        // Get the id of the button
        var buttonId = button.attr('id');

        // Toggle the bubble chart based on
        // the currently clicked button.
        myBubbleChart.toggleDisplay(buttonId);
    });
}

// Load the data.
myBubbleChart('#bubble-vis', bubbleData);

// setup the buttons.
setupButtons();
