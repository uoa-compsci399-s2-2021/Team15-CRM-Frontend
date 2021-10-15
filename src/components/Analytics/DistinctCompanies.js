import { Icon } from '@iconify/react';
import briefcaseFill from '@iconify/icons-eva/briefcase-fill';

// material
import { styled } from '@material-ui/styles';
import { Card, Typography } from '@material-ui/core';
// utils

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.info.darker,
  backgroundColor: theme.palette.info.lighter,
  height: 238
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.info.dark
}));

// ----------------------------------------------------------------------

export default function DistinctCompanies(props) {
  // so make the items array into a set of company names and then calculate the length
  let TOTAL = [...new Set(props.items.map((e) => e.companyName))].length;

  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon={briefcaseFill} width="100%" height="100%" />
      </IconWrapperStyle>
      <Typography variant="h3">{TOTAL}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Distinct Companies
      </Typography>
    </RootStyle>
  );
}
