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