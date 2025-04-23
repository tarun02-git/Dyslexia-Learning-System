import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface DataPoint {
  date: string;
  score: number;
}

interface ProgressChartProps {
  data: DataPoint[];
  title?: string;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ 
  data,
  title = 'Progress Over Time'
}) => {
  const chartData = {
    labels: data.map(item => item.date),
    datasets: [
      {
        label: 'Score',
        data: data.map(item => item.score),
        fill: false,
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 0.8)',
        tension: 0.1,
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 7,
      }
    ]
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 18,
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#333',
        bodyColor: '#333',
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 10,
        boxPadding: 4,
        usePointStyle: true,
        callbacks: {
          title: (tooltipItems) => {
            return `Date: ${tooltipItems[0].label}`;
          },
          label: (context) => {
            return `Score: ${context.parsed.y}`;
          },
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: 'Date',
        }
      },
      y: {
        min: 0,
        max: 100,
        title: {
          display: true,
          text: 'Score',
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        }
      }
    },
    animation: {
      duration: 2000,
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ProgressChart;