import { Icon } from '@iconify/react';
import activityFill from '@iconify/icons-eva/activity-fill';

// material
import { styled } from '@material-ui/styles';
import { Card, Typography } from '@material-ui/core';
// utils

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.warning.darker,
  backgroundColor: theme.palette.warning.lighter
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
  color: theme.palette.warning.dark
}));

// ----------------------------------------------------------------------

export default function ApplicationStatus(props) {
  const eventDate = new Date(Date.now());
  const nonActive = props.items.filter(
    (e) => !e.isActive && new Date(e.autoExpireDate) >= eventDate
  ).length;
  const complete = props.items.filter(
    (e) => e.isCompleted && !e.isActive && new Date(e.autoExpireDate) >= eventDate
  ).length;

  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon={activityFill} width="100%" height="100%" />
      </IconWrapperStyle>
      <Typography variant="h3">{`${complete} / ${nonActive}`}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        New Jobs needs Action
      </Typography>
    </RootStyle>
  );
}
