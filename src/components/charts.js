/** @jsx jsx */
import * as React from "react";
import { jsx, Text } from "theme-ui";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

const id2color = {
  Cases: '#357DED',
  "New Cases": '#FFBF00',
  Deaths: '#F7567C',
  Asymptomatic: '#B7C0EE',
  Symptomatic: '#861388',
  Vaccinated: '#84DCC6',
};

function getChartConfig(data, yType) {
  const { times, values } = data;

  const yLabel = `# ${yType}`;

  const chartJSOptions = {
    responsive: true,
    fill: true,
    plugins: {
      title: {
        display: false,
        text: "Covid History",
      },
    },
    elements: {
      point: {
        radius: 1,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "# of Days",
        },
      },
      y: {
        title: {
          display: true,
          text: yLabel,
        },
      },
    },
  };
  const chartJSData = {
    spanGaps: true,
    labels: times,
    datasets: [
      {
        label: "Cases",
        data: values,
        borderColor: id2color[yType],
        backgroundColor: `${id2color[yType]}A0`,
      },
    ],
  };

  return {
    options: chartJSOptions,
    data: chartJSData,
  };
}

const DiseaseChart = ({ data, options, ...props }) => (
  <React.Fragment>
    {data && options ? (
      <Line data={data} options={options} {...props} />
    ) : (
      <Text {...props}>Loading</Text>
    )}
  </React.Fragment>
);

export {
  DiseaseChart,
  getChartConfig,
  id2color
}
