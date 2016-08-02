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
        }
    }
});
