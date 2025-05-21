import React from 'react';
import PropTypes from 'prop-types';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ 
  type = 'line', 
  data, 
  options,
  height = 300,
  title
}) => {
  // Default style options
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: !!title,
        text: title || '',
        font: {
          size: 16
        }
      },
    },
    scales: type !== 'pie' ? {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            // For currency formatting
            if (options?.isCurrency) {
              return 'Rp ' + value.toLocaleString('id-ID');
            }
            return value;
          }
        }
      }
    } : undefined
  };

  // Merge default options with provided options
  const mergedOptions = {
    ...defaultOptions,
    ...options,
    plugins: { ...defaultOptions.plugins, ...(options?.plugins || {}) },
    scales: type !== 'pie' ? { 
      ...defaultOptions.scales, 
      ...(options?.scales || {}) 
    } : undefined
  };

  const renderChart = () => {
    switch (type.toLowerCase()) {
      case 'bar':
        return <Bar data={data} options={mergedOptions} height={height} />;
      case 'pie':
        return <Pie data={data} options={mergedOptions} height={height} />;
      case 'line':
      default:
        return <Line data={data} options={mergedOptions} height={height} />;
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div style={{ height: `${height}px` }}>
        {renderChart()}
      </div>
    </div>
  );
};

Chart.propTypes = {
  type: PropTypes.oneOf(['line', 'bar', 'pie']),
  data: PropTypes.shape({
    labels: PropTypes.array.isRequired,
    datasets: PropTypes.array.isRequired
  }).isRequired,
  options: PropTypes.object,
  height: PropTypes.number,
  title: PropTypes.string
};

export default Chart;