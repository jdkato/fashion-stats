var cottonData = {
    labels: ['TX', 'GA', 'NC', 'MS', 'AL', 'SC', 'AR', 'MO', 'CA', 'TN', 'AZ'],
    datasets: [{
        type: 'bar',
        label: 'Acres of Cotton Planted, 2015',
        backgroundColor: '#8CC665',
        hoverBackgroundColor: '#8CC665',
        data: [4.8, 1.1, 0.4, 0.3, 0.3, 0.2, 0.2, 0.2, 0.2, 0.2, 0.1],
        borderColor: 'white',
        hoverBorderColor: '#333',
        borderWidth: 2
    }]
};

var state2Info = {
  'TX': [130000000, 4817000, 3.7],
  'GA': [9300000, 1130000, 12.2],
  'NC': [8300000, 385000, 4.6],
  'MS': [10800000, 131000, 1.2],
  'AL': [8800000, 315000, 3.6],
  'SC': [5000000, 235000, 4.7],
  'AR': [13800000, 210000, 1.5],
  'MO': [28300000, 185000, 0.7],
  'CA': [25500000, 164000, 0.6],
  'TN': [10900000, 155000, 1.4],
  'AZ': [26000000, 17500, 0.07]
}
function updateTable(index) {
    state = cottonData.labels[index];
    info = state2Info[state];
    $("#live-caption").html("Agriculture Overview: " + state);
    $("#total").html(info[0]);
    $("#cotton").html(info[1]);
    $("#percent").html(info[2]);
}

var lastBar = null;
var ctx = document.getElementById('state-cotton-chart').getContext('2d');
spendChart = new Chart(ctx, {
    type: 'bar',
    data: cottonData,
    options: {
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Millions of Acres'
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'State'
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
                    updateTable(lastBar);
                }
            }
        }
    }
});
