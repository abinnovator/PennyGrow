'use client';

import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { getLoggedInUser, getUserInfo } from '@/lib/actions/user.actions';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  // Define the type for chartData
  type ChartData = {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
    }[];
  };

  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loggedIn = await getLoggedInUser();
        const userInfo = await getUserInfo({ userId: loggedIn.targets[0].userId });

        const { Transactions, Transaction_amounts, Transaction_categories } = userInfo;

        // Aggregate amounts by category
        const categoryTotals: { [category: string]: number } = {};

        Transactions.forEach((_: any, index: string | number) => {
          const category = Transaction_categories[index];
          const amount = Transaction_amounts[index];
          
          // Sum the amount for each category
          if (categoryTotals[category]) {
            categoryTotals[category] += amount;
          } else {
            categoryTotals[category] = amount;
          }
        });

        // Prepare data for the chart
        const data: ChartData = {
          labels: Object.keys(categoryTotals),
          datasets: [
            {
              label: 'Amount spent per category',
              data: Object.values(categoryTotals),
              backgroundColor: ['#0747b6', '#2265d8', '#2f91fa', '#3fd1fa', '#47e8fa'] // Add more colors if needed
            }
          ]
        };

        setChartData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading chart...</p>;
  }

  if (!chartData) {
    return <p>No data available</p>;
  }

  return (
    <Doughnut
      data={chartData}
      options={{
        cutout: '60%',
        plugins: {
          legend: { display: true }
        }
      }}
    />
  );
};

export default DoughnutChart;
