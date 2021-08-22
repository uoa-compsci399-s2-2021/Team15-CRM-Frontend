// material
import { makeStyles } from "@material-ui/styles";
import React, { useState, useEffect } from "react";
import { Box, Grid, Container, Typography, Button, TextField } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from "axios";
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
  AppConversionRates
} from '../components/_dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const [email, setEmail] = useState('');
  const [hasErrors, setHasErrors] = useState(false);
  const [loading, setLoading] = useState(false);
  const isError = (condition) => hasErrors && condition;

  const showError = () => {
    setHasErrors(true);
    setTimeout(() => {
      setHasErrors(false);
    }, 4000);
  }

  async function sendRequest(info) {
    const response = await axios(
      "https://cs399-team15.herokuapp.com/api/admin/send-request-email",
      {
        headers: {
          "Content-type": "application/json",
        },
        data: info,
        method: "POST",
      }
    );
    return response;
  }

  async function handleSendRequest() {
    showError();
    const info = {email: email.toLowerCase()}
    if (email.length > 0) {
      try {
        setLoading(true);
        const response = await sendRequest(info);
        if (response.status === 200) {
          setEmail('');
          setLoading(false);
          setHasErrors(false);
        }
        console.log(response);
      } catch (e) {
        setLoading(false);
        console.log(e.response.data.error)
      }
    }
  }

  return (
    <Page title="Dashboard | Atech+">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>
        <Grid item xs={8} sm={6} md={5}>
          <div
            style={{
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <TextField 
              fullWidth
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="xxx@gmail.com"
              label="Email"
              error={isError(email.length === 0)}
              helperText={isError(email.length === 0) && "Please enter the email"}
            />
            <Box mt={1} pt={2}>
              <Button 
                variant="contained"
                type="submit"
                onClick={() => handleSendRequest()}
              >
                {loading ? (
                  <CircularProgress color="inherit" size="2rem" />
                ) : (
                    <>Send</>
                  )}
              </Button>
            </Box>
          </div>
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
