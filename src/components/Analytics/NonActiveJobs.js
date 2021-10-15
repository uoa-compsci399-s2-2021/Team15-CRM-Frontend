import { Icon } from '@iconify/react';
import closeCircleFill from '@iconify/icons-eva/close-circle-fill';

// material
import { styled } from '@material-ui/styles';
import { Card, Typography } from '@material-ui/core';
// utils

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.error.darker,
  backgroundColor: theme.palette.error.lighter
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
  color: theme.palette.error.dark
}));

// ----------------------------------------------------------------------

export default function ActiveJobs(props) {
  const TOTAL = props.items.filter((e) => !e.isActive).length;

  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon={closeCircleFill} width="100%" height="100%" />
      </IconWrapperStyle>
      <Typography variant="h3">{TOTAL}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Jobs Seeking Approval
      </Typography>
    </RootStyle>
  );
}
