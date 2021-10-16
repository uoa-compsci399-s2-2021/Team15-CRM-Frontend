import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { useTheme, styled } from '@material-ui/styles';
import { Card, CardHeader } from '@material-ui/core';
// utils
import { fNumber } from '../../utils/formatNumber';
//
import { BaseOptionChart } from '../charts';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible'
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
  }
}));

// ----------------------------------------------------------------------

export default function JobByLocationPie(props) {
  const theme = useTheme();
  const pieChartObj = [
    { location: 'Auckland', freq: 0 },
    { location: 'Wellington', freq: 0 },
    { location: 'Christchurch', freq: 0 },
    { location: 'Remote', freq: 0 },
    { location: 'Other', freq: 0 }
  ];

  props.items.forEach((item) => {
    if (!['Auckland', 'Christchurch', 'Wellington', 'Remote'].includes(item.jobLocation)) {
      pieChartObj[4].freq += 1;
    } else {
      pieChartObj.forEach((locationObj) => {
        if (locationObj.location === item.jobLocation) {
          locationObj.freq += 1;
        }
      });
    }
  });
  const CHART_DATA = pieChartObj.map((locationObj) => locationObj.freq);

  const chartOptions = merge(BaseOptionChart(), {
    colors: [
      theme.palette.primary.main,
      theme.palette.info.dark,
      theme.palette.warning.main,
      theme.palette.error.main,
      theme.palette.success.dark
    ],
    labels: pieChartObj.map((locationObj) => locationObj.location),
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: 'center' },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `#${seriesName}`
        }
      }
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } } }
    }
  });

  return (
    <Card>
      <CardHeader title="Jobs By Location All Job listings" />
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart type="pie" series={CHART_DATA} options={chartOptions} height={280} />
      </ChartWrapperStyle>
    </Card>
  );
}
