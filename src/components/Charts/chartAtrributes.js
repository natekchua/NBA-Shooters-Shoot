const options = {
  title: {
    display: true,
    text: `Shooting Efficiency for Players in the 2020 NBA Season`,
    fontSize: 25,
    fontColor: 'white',

  },
  legend: {
    display: false
  },
  maintainAspectRatio: false,
  scales: {
    yAxes: [{
      ticks: {
        fontColor: 'white'
    },
    }],
    xAxes: [{
      ticks: {
        fontColor: 'white'
      },
    }]
  } 
};

const optionsPCT = {
  title: {
    display: true,
    text: 'Field Goal % of these Players',
    fontSize: 25,
    fontColor: 'white',

  },
  legend: {
    display: true,
    position: 'right',
    labels: {
      fontColor: 'white'
    }
  },
  maintainAspectRatio: false,
  scales: {
    yAxes: [{
      ticks: {
        fontColor: 'white'
    },
    }],
    xAxes: [{
      ticks: {
        fontColor: 'white'
      },
    }]
  } 
};

const colorArr = [
  '#00FFFF',
  '#7FFF00',
  '#DC143C',
  '#FF8C00',
  '#FF00FF',
  '#4B0082',
  '#20B2AA',
  '#0000CD',
  '#8B4513',
  '#6A5ACD',
  '#FFFF00',
  '#C0C0C0',
  '#DA70D6',
  '#1E90FF',
  '#BDB76B'
];

module.exports = {
  options,
  optionsPCT,
  colorArr
};
