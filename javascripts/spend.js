year2Expnd = {
    '1990': {
        'total': 1620,
        'Men (16 ->)': 324,
        'Boys (2 - 15)': 70,
        'Women (16 ->)': 586,
        'Girls (2 - 15)': 87,
        'Children (<- 2)': 70,
        'Footwear': 225,
        'Other': 258
    },
    '1995': {
        'total': 1703,
        'Men (16 ->)': 329,
        'Boys (2 - 15)': 96,
        'Women (16 ->)': 559,
        'Girls (2 - 15)': 101,
        'Children (<- 2)': 81,
        'Footwear': 278,
        'Other': 259
    },
    '2000': {
        'total': 1856,
        'Men (16 ->)': 344,
        'Boys (2 - 15)': 96,
        'Women (16 ->)': 607,
        'Girls (2 - 15)': 118,
        'Children (<- 2)': 82,
        'Footwear': 343,
        'Other': 266
    },
    '2005': {
        'total': 1886,
        'Men (16 ->)': 349,
        'Boys (2 - 15)': 91,
        'Women (16 ->)': 633,
        'Girls (2 - 15)': 121,
        'Children (<- 2)': 82,
        'Footwear': 320,
        'Other': 290
    },
    '2010': {
        'total': 1700,
        'Men (16 ->)': 304,
        'Boys (2 - 15)': 78,
        'Women (16 ->)': 562,
        'Girls (2 - 15)': 101,
        'Children (<- 2)': 91,
        'Footwear': 303,
        'Other': 261
    },
    '2014': {
        'total': 1765,
        'Men (16 ->)': 326,
        'Boys (2 - 15)': 84,
        'Women (16 ->)': 551,
        'Girls (2 - 15)': 105,
        'Children (<- 2)': 76,
        'Footwear': 367,
        'Other': 256
    },
};

var spendData = {
    labels: ["1990", "1995", "2000", "2005", "2010", "2014"],
    datasets: [{
        type: 'bar',
        label: 'Dataset 1',
        backgroundColor: "rgba(151,187,205,0.5)",
        data: [1620, 1703, 1856, 1886, 1700, 1765],
        borderColor: 'white',
        borderWidth: 2
    }]
};

var ctx = document.getElementById("avg-exp-chart").getContext("2d");
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
        }
    }
});

radarMen = {
    'title': 'Men (16+)',
    'labels': [
        "Suits", "Sportswear", "Pants and shorts", "Tops", "Coats", 'Footwear'
    ],
    'data': [22, 26, 72, 91, 23, 101]
};
var radarData = {
    labels: radarMen.labels,
    datasets: [
        {
            label: radarMen.title,
            backgroundColor: "rgba(179,181,198,0.2)",
            borderColor: "rgba(179,181,198,1)",
            pointBackgroundColor: "rgba(179,181,198,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(179,181,198,1)",
            data: radarMen.data
        }
    ]
};
var ctx2 = document.getElementById("exp-radar-chart").getContext("2d");
var expRadarChart = new Chart(ctx2, {
    type: 'radar',
    data: radarData,
    options: {}
});