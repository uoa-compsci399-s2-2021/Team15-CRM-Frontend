import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import PositionNameCommonPie from '../components/Analytics/PositionNameCommonPie';
import ApplicationStatus from '../components/Analytics/ApplicationStatus';
import DistinctCompanies from '../components/Analytics/DistinctCompanies';
import ActiveJobs from '../components/Analytics/ActiveJobs';
import NonActiveJobs from '../components/Analytics/NonActiveJobs';
import TotalJobsChart from '../components/Analytics/TotalJobsChart';
import JobByLocationPie from '../components/Analytics/JobsByLocationPie';

const useStyles = makeStyles((theme) => ({
  root: { flexGrow: 1 }
}));

export default function component(props) {
  const classes = useStyles();
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('https://cs399-team15.herokuapp.com/api/admin/get-job-info')
      .then((res) => res.json())
      .then(
        (result) => {
          // console.log(result);
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          console.log(error);
          setIsLoaded(true);
        }
      );
  }, []);

  return (
    <>
      <h2>Hello, Welcome Back to your Dashboard!</h2>
      <Grid container spacing={3} sx={{ width: '90%', margin: 'auto', justifyContent: 'center' }}>
        <Grid item xs={12} sm={6} md={3}>
          <ActiveJobs items={items} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <NonActiveJobs items={items} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ApplicationStatus items={items} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DistinctCompanies items={items} />
        </Grid>
        <Grid item xs={12} md={6} lg={8}>
          <TotalJobsChart items={items} />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <JobByLocationPie items={items} />
        </Grid>
      </Grid>
    </>
  );
}
