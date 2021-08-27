// material
import { makeStyles } from '@material-ui/styles';
import React, { useState, useEffect } from 'react';
import { Box, Grid, Container, Typography, Button, TextField } from '@material-ui/core';
// components
import Page from '../components/Page';
import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates,
  RequestEmail,
  RequestTable
} from '../components/_dashboard/app';
import { getJobInfo } from '../apis/index';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sendEmail, setSendEmail] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await getJobInfo();
      try {
        setData((response.data).reverse());
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    };
    fetchData();
  }, [sendEmail]);

  return (
    <Page title="Dashboard | Atech+">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <RequestEmail sendEmail={sendEmail} setSendEmail={setSendEmail} />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            {data !== null && (<RequestTable data={data} />)}

          </Grid>
          { /*
          <Grid item xs={12} sm={6} md={3}>
            <AppWeeklySales />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppNewUsers />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppItemOrders />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits />
          </Grid>

         <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks />
          </Grid>
          */ }

        </Grid>
      </Container>
    </Page>
  );
}
