import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles, styled } from '@material-ui/styles';
// material
import { Box, Card, Link, Typography, Stack, Button, CardContent, CardActions } from '@material-ui/core';
// utils
import { fDate } from '../../../utils/formatTime';
import { convertFirstCharacterAllWordsToUppercase } from '../../../utils/formatString';
//
import Label from '../../Label';

// ----------------------------------------------------------------------

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object
};

export default function ShopProductCard({ product }) {
  const { positionName, companyName, jobHours, jobStartTime, jobLocation, priceSale } = product;
  const classes = useStyles();

  return (
    <Card>

      <Stack spacing={2} sx={{ p: 3 }}>

        <div>
          <Typography color="textSecondary" gutterBottom>
            {convertFirstCharacterAllWordsToUppercase(companyName)}
          </Typography>
          <Typography variant="h5" component="h2">
            {convertFirstCharacterAllWordsToUppercase(positionName)}
          </Typography>
          <Typography color="textSecondary">
            {convertFirstCharacterAllWordsToUppercase(jobHours)}
          </Typography>
          <Typography variant="body2" component="p">
            {fDate(jobStartTime)}
            <br />
            {jobLocation}
          </Typography>
        </div>

        <Stack alignItems="center" justifyContent="space-between">
          {/* <ColorPreview colors={colors} /> */}
          <Typography variant="subtitle1">
            <Button variant="outlined">Learn more</Button>
          </Typography>

        </Stack>
      </Stack>
    </Card>

  );
}
