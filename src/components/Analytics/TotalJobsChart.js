import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Box, Card, CardHeader } from '@material-ui/core';
// utils
import { fNumber } from '../../utils/formatNumber';
//
import { BaseOptionChart } from '../charts';

// ----------------------------------------------------------------------

export default function TotalJobsChart(props) {
  // Get Dates
  const datesList = props.items
    .map((item) => item.requestedEmailTime.substring(0, 10))
    .reverse()
    .splice(0, 7);
  // Make a list of unique Dates
  const datesLabel = [...new Set(datesList)].splice(0, 7);
  let freqObjectList = [];
  // Make a Object with Date and the Frequency of it
  for (let i = 0; i < datesLabel.length; i++) {
    freqObjectList.push({
      date: datesLabel[i],
      freq: datesList.filter((e) => e === datesLabel[i]).length
    });
  }
  // Map the data into a array for the graph to display
  const CHART_DATA = [{ data: freqObjectList.map((e) => e.freq) }];
  const chartOptions = merge(BaseOptionChart(), {
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `${seriesName} `
        }
      }
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: '28%', borderRadius: 2 }
    },
    xaxis: {
      categories: datesLabel
    }
  });

  return (
    <Card>
      <CardHeader title="Jobs Inflow by Day" />
      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart type="bar" series={CHART_DATA} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
