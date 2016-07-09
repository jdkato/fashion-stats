var state2Trend = {
    'Alabama': [470, 477, 317, 152, 91, 65],
    'Alaska': [0, 0, 0, 8, 4, 4],
    'Arizona': [98, 91, 56, 43, 28, 33],
    'Arkansas': [102, 92, 59, 40, 29, 19],
    'California': [4960, 6954, 5868, 4097, 3209, 2718],
    'Colorado': [138, 114, 113, 106, 53, 55],
    'Connecticut': [107, 81, 55, 34, 19, 12],
    'Delaware': [19, 13, 8, 3, 9, 8],
    'Florida': [1037, 880, 578, 403, 271, 310],
    'Georgia': [439, 402, 265, 173, 111, 115],
    'Hawaii': [163, 117, 131, 91, 57, 58],
    'Idaho': [37, 31, 23, 26, 31, 33],
    'Illinois': [336, 351, 283, 226, 180, 205],
    'Indiana': [101, 105, 82, 82, 56, 39],
    'Iowa': [81, 85, 62, 49, 24, 19],
    'Kansas': [46, 35, 40, 38, 14, 15],
    'Kentucky': [170, 154, 114, 83, 45, 39],
    'Louisiana': [85, 101, 97, 56, 38, 39],
    'Maine': [32, 29, 32, 23, 14, 15],
    'Maryland': [127, 134, 99, 75, 45, 49],
    'Massachusetts': [335, 267, 217, 142, 94, 89],
    'Michigan': [100, 139, 146, 122, 70, 92],
    'Minnesota': [146, 137, 128, 138, 90, 75],
    'Mississippi': [234, 219, 113, 61, 40, 36],
    'Missouri': [252, 224, 186, 147, 62, 60],
    'Montana': [13, 19, 13, 13, 5, 8],
    'Nebraska': [36, 51, 34, 25, 12, 10],
    'Nevada': [26, 33, 38, 34, 13, 13],
    'New Hampshire': [60, 50, 36, 40, 20, 16],
    'New Jersey': [876, 786, 579, 311, 198, 164],
    'New Mexico': [33, 34, 24, 24, 19, 19],
    'New York': [5005, 4516, 3598, 2070, 1458, 1234],
    'North Carolina': [978, 880, 617, 382, 248, 203],
    'North Dakota': [16, 20, 9, 10, 5, 3],
    'Ohio': [186, 169, 169, 131, 88, 77],
    'Oklahoma': [152, 115, 87, 69, 39, 25],
    'Oregon': [98, 81, 84, 83, 65, 62],
    'Pennsylvania': [1235, 927, 730, 430, 260, 195],
    'Rhode Island': [0, 0, 0, 22, 13, 8],
    'South Carolina': [329, 253, 178, 90, 67, 64],
    'South Dakota': [0, 18, 19, 13, 6, 5],
    'Tennessee': [492, 442, 262, 182, 109, 96],
    'Texas': [820, 937, 680, 462, 273, 264],
    'Utah': [87, 92, 47, 47, 39, 53],
    'Vermont': [37, 43, 28, 27, 17, 10],
    'Virginia': [287, 249, 146, 115, 76, 78],
    'Washington': [191, 231, 197, 139, 87, 91],
    'West Virginia': [44, 40, 22, 14, 10, 11],
    'Wisconsin': [125, 118, 103, 94, 42, 42],
    'Wyoming': [27, 17, 17, 13, 4, 1],
};
var trendData = {
    labels: ["1990", "1995", "2000", "2005", "2010", "2015"],
    datasets: [{
        label: "Apparel Manufacturing Establishments By Year",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "#337ab7",
        borderColor: "#337ab7",
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "rgba(8, 48, 107, 1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(8, 48, 107, 1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: state2Trend.Oregon,
    }]
};
var active_state = null;
var trendCtx = document.getElementById('state-trend-chart').getContext('2d');
var trendChart = new Chart(trendCtx, {
    type: 'line',
    data: trendData,
    showTooltips: false,
    options: {
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: false,
                    labelString: '# of Establishments'
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: false,
                    labelString: 'Year'
                }
            }]
        },
        tooltips: {
            enabled: false
        }
    }
});


var map = new Datamap({
    scope: 'usa',
    element: document.getElementById('nation-est-chart'),
    done: function(datamap) {
        datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
            $('#modal-title').html(geography.properties.name);
            $("#myModal").modal();
            trendChart.update();
        });
    },
    responsive: true,
    geographyConfig: {
        popupTemplate: function(geography, data) {
            if (active_state !== geography.properties.name) {
                active_state = geography.properties.name;
                trendChart.data.datasets[0].data = state2Trend[active_state];
                trendChart.update();
            }
            return '<div class="hoverinfo">' +
                geography.properties.name + ': ' +
                (data.est || '0') +
                ' establishments (click for more info)' +
                '</div>';
        },
        highlightBorderWidth: 3,
        highlightFillColor: '#444',
        highlightBorderColor: '#333',
    },
    legend: true,
    fills: {
        'bin0': '#f3f7fc', // 0 - 10
        'bin1': '#deebf7', // 11 - 25
        'bin2': '#c6dbef', // 33 - 42
        'bin3': '#9ecae1', // 49 - 60
        'bin4': '#6baed6', // 62 - 77
        'bin5': '#4292c6', // 78- 96
        'bin6': '#2171b5', // 115 - 195
        'bin7': '#08519c', // 200 - 400
        'bin8': '#08306b', // 1000+
        defaultFill: '#EDDC4E'
    },
    data: {
        "AZ": {
            "fillKey": "bin2",
            "est": 33
        },
        "CO": {
            "fillKey": "bin3",
            "est": 55
        },
        "DE": {
            "fillKey": "bin0",
            "est": 8
        },
        "FL": {
            "est": 310,
            "fillKey": "bin7"
        },
        "GA": {
            "fillKey": "bin6",
            "est": 115
        },
        "HI": {
            "fillKey": "bin3",
            "est": 58
        },
        "ID": {
            "fillKey": "bin2",
            "est": 33
        },
        "IL": {
            "fillKey": "bin7",
            "est": 205
        },
        "IN": {
            "fillKey": "bin2",
            "est": 39
        },
        "IA": {
            "fillKey": "bin1",
            "est": 19
        },
        "KS": {
            "fillKey": "bin1",
            "est": 15
        },
        "KY": {
            "fillKey": "bin2",
            "est": 39
        },
        "LA": {
            "fillKey": "bin2",
            "est": 39
        },
        "MD": {
            "fillKey": "bin3",
            "est": 49
        },
        "ME": {
            "fillKey": "bin1",
            "est": 15
        },
        "MA": {
            "fillKey": "bin5",
            "est": 89
        },
        "MN": {
            "fillKey": "bin4",
            "est": 75
        },
        "MI": {
            "fillKey": "bin5",
            "est": 92
        },
        "MS": {
            "fillKey": "bin2",
            "est": 36
        },
        "MO": {
            "fillKey": "bin3",
            "est": 60
        },
        "MT": {
            "fillKey": "bin0",
            "est": 8
        },
        "NC": {
            "fillKey": "bin7",
            "est": 203
        },
        "NE": {
            "fillKey": "bin0",
            "est": 10
        },
        "NV": {
            "fillKey": "bin1",
            "est": 13
        },
        "NH": {
            "fillKey": "bin1",
            "est": 16
        },
        "NJ": {
            "fillKey": "bin6",
            "est": 164
        },
        "NY": {
            "fillKey": "bin8",
            "est": 1234
        },
        "ND": {
            "fillKey": "bin0",
            "est": 3
        },
        "NM": {
            "fillKey": "bin1",
            "est": 19
        },
        "OH": {
            "est": 77,
            "fillKey": "bin4"
        },
        "OK": {
            "fillKey": "bin1",
            "est": 25
        },
        "OR": {
            "fillKey": "bin4",
            "est": 62
        },
        "PA": {
            "fillKey": "bin6",
            "est": 195
        },
        "RI": {
            "fillKey": "bin0",
            "est": 2
        },
        "SC": {
            "fillKey": "bin4",
            "est": 64
        },
        "SD": {
            "fillKey": "bin3",
            "est": 55
        },
        "TN": {
            "fillKey": "bin5",
            "est": 96
        },
        "TX": {
            "fillKey": "bin7",
            "est": 264
        },
        "UT": {
            "fillKey": "bin3",
            "est": 53
        },
        "WI": {
            "fillKey": "bin2",
            "est": 42
        },
        "VA": {
            "fillKey": "bin5",
            "est": 78
        },
        "VT": {
            "fillKey": "bin0",
            "est": 10
        },
        "WA": {
            "fillKey": "bin5",
            "est": 91
        },
        "WV": {
            "fillKey": "bin1",
            "est": 11
        },
        "WY": {
            "fillKey": "bin0",
            "est": 1
        },
        "CA": {
            "fillKey": "bin8",
            "est": 2718
        },
        "CT": {
            "fillKey": "bin1",
            "est": 12
        },
        "AK": {
            "fillKey": "bin0",
            "est": 4
        },
        "AR": {
            "fillKey": "bin1",
            "est": 19
        },
        "AL": {
            "fillKey": "bin4",
            "est": 65
        }
    }
});

$(window).on('resize', function() {
    map.resize();
});
