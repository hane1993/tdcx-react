import Chart from 'react-apexcharts';

export const PieChart = (props) => {
  const options = {
    series: [props.completedTasks, props.totalTasks],
    fill: {
      colors: ['#5285ec','#e8ecec']
    },
    options: {
      chart: {
        type: 'pie',
      },
      labels: ['Tasks Completed', 'In-Complete Tasks'],
    },
  };

  return (
    <Chart
      options={options.options}
      series={options.series}
      type='pie'
      width={300}
    />
  );
};
