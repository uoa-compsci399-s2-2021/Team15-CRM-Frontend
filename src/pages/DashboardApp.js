// material
import { makeStyles } from '@material-ui/styles';
import React, { useState, useEffect } from 'react';
import { Grid, Container } from '@material-ui/core';
// components
import Page from '../components/Page';
import {
  RequestEmail,
  RequestTable
} from '../components/_dashboard/app';
import { getJobInfo } from '../apis/index';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'column wrap',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

export default function DashboardApp() {
  const classes = useStyles();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [sendEmail, setSendEmail] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getJobInfo();
      try {
        setData(response.data.reverse());
      } catch (e) {
        setError(e);
      }
    };
    fetchData();
  }, [sendEmail]);

  return (
    <Page title="Dashboard | Atech+">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <RequestEmail sendEmail={sendEmail} setSendEmail={setSendEmail} />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            {data === null ? (
              <div className={classes.root}>
                <img src="/images/waiting.gif" alt="loading" />
              </div>
            ) : (
              <RequestTable data={data} />
            )}
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
