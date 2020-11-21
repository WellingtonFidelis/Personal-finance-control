import React from 'react';
import Chart from 'react-google-charts';
import './styles.css';

export default function PieChart({ dataCategories }) {
  const pieOptions = {
    pieHole: 0.5,
    legend: {
      position: 'rigth',
      alignment: 'center',
      textStyle: {
        color: '233238',
        fontSize: 14,
      },
    },
    tooltip: {
      showColorCode: true,
    },
    chartArea: {
      left: 150,
      top: 10,
      width: '100%',
      height: '80%',
    },
    width: '100%',
  };

  const pieData = [['Category', 'Value'], ...dataCategories];
  return (
    <div id="pie-chart" className="center">
      <span className="font-large">By category</span>
      <Chart chartType="PieChart" data={pieData} options={pieOptions} />
    </div>
  );
}
