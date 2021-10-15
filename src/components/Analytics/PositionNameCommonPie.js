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

export default function PositionNameCommonPie(props) {
  const theme = useTheme();

  // Making the wordList
  let wordList = '';
  props.items.forEach((element) => {
    if (element.positionName) wordList += element.positionName.toLowerCase() + ' ';
  });
  // Setting up the Pie labels
  wordList = wordList.split(' ');
  const labelList = [...new Set(wordList)];
  // calculating Frequency for each label
  let freqObjectList = [];
  for (let i = 0; i < labelList.length; i++) {
    freqObjectList.push({
      positionName: labelList[i],
      freq: wordList.filter((e) => e === labelList[i]).length
    });
  }

  // cleaning Up data
  freqObjectList = freqObjectList.sort((a, b) => b.freq - a.freq).splice(0, 5);
  // Frequency data applied to Pie chart
  const CHART_DATA = freqObjectList.map((e) => e.freq);

  const chartOptions = merge(BaseOptionChart(), {
    colors: [
      theme.palette.primary.main,
      theme.palette.info.dark,
      theme.palette.warning.main,
      theme.palette.error.main,
      theme.palette.success.dark
    ],
    labels: freqObjectList.map((e) => e.positionName),
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
      <CardHeader title="Common Words for Position Names" />
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart type="pie" series={CHART_DATA} options={chartOptions} height={280} />
      </ChartWrapperStyle>
    </Card>
  );
}
