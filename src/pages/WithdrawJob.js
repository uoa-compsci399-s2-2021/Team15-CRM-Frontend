// material
import { makeStyles, styled } from '@material-ui/styles';
import React, { useState } from 'react';
import { Box, Button, Typography, Container, Grid, TextField } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
// components
import { MotionContainer, varBounceIn } from '../components/animate';
import Page from '../components/Page';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center'
}));

const useStyles = makeStyles({
  root: {
    // display: 'flex',
    flexDirection: 'column',
    marginTop: '20vh'
  },
  text: {
    paddingLeft: 50,
    paddingRight: 50
  },
  textField: {
    paddingLeft: 50,
    paddingRight: 50,
  },
  button: {
    marginTop: 20,
    width: 150,
    marginRight: 50,
    float: 'right',
    '&:hover': {
      backgroundColor: '#5a92ed'
    }
  }
});
// ----------------------------------------------------------------------

export default function WithdrawJob() {
  const classes = useStyles();
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [submited, setSubmited] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function wait(timeout) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  }
  async function handleSubmit() {
    setShowError(true);
    if (reason.length != 0) {
      setLoading(true);
      await wait(2000);
      setLoading(false);
      setSubmited(true);
    }
  }
  return (
    <RootStyle title="Withdraw Job | Atech+">
      {!submited ? (
        <Grid container spacing={2}>
          <Grid container justify="center" justifyContent="center" style={{ marginTop: 150 }}>
            <Grid item xs={12} sm={10} md={7}>
              <Typography variant="h5" className={classes.text} style={{ marginBottom: 10 }}>
                Please enter the reason for withdrawing this position from the job listing
              </Typography>
              <Typography color="error" className={classes.text}>
                {errorMessage}
              </Typography>
              <TextField
                className={classes.textField}
                multiline
                fullWidth
                rows={4}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                error = {reason.length === 0 && showError}
                helperText={(reason.length === 0 && showError) && 'Please enter the reason for withdrawing this position'}
              />
              <br />
              <Button className={classes.button} variant="contained" onClick={handleSubmit}>
                {loading ? <CircularProgress color="inherit" size="1.5rem" /> : <>Submit</>}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2}>
          <Grid container justify="center" justifyContent="center" style={{ marginTop: 70 }}>
            <Grid item>
              <img
                src="https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/792/Tick_Mark_Dark-512.png"
                alt="Success"
                style={{ maxWidth: '50vw', height: 'auto' }}
              />
            </Grid>
          </Grid>
          <Grid container justify="center" justifyContent="center">
            <Grid item align="center" xs={10} sm={10} md={7}>
              <Typography variant="h3">Successfully submited!</Typography>
            </Grid>
            <Grid item align="center" xs={10} sm={10} md={7}>
              <Typography variant="h3">
                The postion will be removed from the job listing.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      )}
    </RootStyle>
  );
}
