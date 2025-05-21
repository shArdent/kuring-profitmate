import React from 'react';
import PropTypes from 'prop-types';
import Chart from '../../ui/Chart';

const ProfitLossChart = ({ data }) => {
  // Transform data to react-chartjs-2 format
  const labels = data.map(item => item.tanggal);

  // Helper to parse currency string to number
  const parseAmount = (amountStr) => {
    return Number(amountStr.replace(/[^0-9.-]+/g,""));
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Pendapatan',
        data: data.map(item => parseAmount(item.pendapatan)),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
        fill: false,
        pointRadius: 5,
        pointBackgroundColor: 'rgb(75, 192, 192)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2
      },
      {
        label: 'HPPn',
        data: data.map(item => parseAmount(item.hppn)),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4,
        fill: false,
        pointRadius: 5,
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2
      },
      {
        label: 'Laba Rugi',
        data: data.map(item => parseAmount(item.labaRugi)),
        borderColor: 'rgb(153, 102, 255)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        tension: 0.4,
        fill: false,
        pointRadius: 5,
        pointBackgroundColor: 'rgb(153, 102, 255)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2
      }
    ]
  };

  const options = {
    isCurrency: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 12,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            return label + context.parsed.y.toLocaleString('id-ID');
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          callback: function(value) {
            return 'Rp ' + value.toLocaleString('id-ID');
          }
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  return <Chart type="line" data={chartData} options={options} height={240} title="Grafik Laba/Rugi" />;
};

ProfitLossChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      tanggal: PropTypes.string.isRequired,
      pendapatan: PropTypes.string.isRequired,
      hppn: PropTypes.string.isRequired,
      labaRugi: PropTypes.string.isRequired
    })
  ).isRequired
};

export default ProfitLossChart;
