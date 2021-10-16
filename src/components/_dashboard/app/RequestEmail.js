import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Box,
  Grid,
  Container,
  Typography,
  Button,
  TextField,
  Card,
  CardHeader
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import SendIcon from '@material-ui/icons/Send';
import Alert from '@material-ui/lab/Alert';
import DoneAllIcon from '@material-ui/icons/DoneAll';

// material
//
import { sendEmailRequestToEmployer } from '../../../apis/index';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  },
  button: {
    width: '50%'
  }
}));

export default function AppWebsiteVisits({ sendEmail, setSendEmail }) {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [hasErrors, setHasErrors] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const isError = (condition) => hasErrors && condition;

  const showError = () => {
    setHasErrors(true);
    setTimeout(() => {
      setHasErrors(false);
    }, 4000);
  };

  async function handleSendRequest() {
    showError();
    const info = { email: email.toLowerCase() };
    if (email.length > 0) {
      try {
        setLoading(true);
        const response = await sendEmailRequestToEmployer(info);
        if (response.status === 200) {
          setEmail('');
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
            setLoading(false);
          }, 3000);
          setHasErrors(false);
          setSendEmail(!sendEmail);
        }
      } catch (e) {
        setLoading(false);
        setError(e.response.data.error);
        setTimeout(() => {
          setError('');
        }, 3000);
      }
    }
  }

  return (
    <Container maxWidth={false}>
      <Card>
        <CardHeader title="Send a email form to employer" subheader="Enter email below" />
        <Box sx={{ p: 3, pb: 3 }} dir="ltr">
          <div className={classes.root}>
            {error !== '' ? (
              <Alert color="error" severity="error">
                {error}
              </Alert>
            ) : null}
            <TextField
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="xxx@gmail.com"
              label="Email"
              error={isError(email.length === 0)}
              helperText={isError(email.length === 0) && 'Please enter the email'}
            />

            <Grid item xs={3}>
              <Box mt={2} pt={2}>
                <Button
                  fullWidth
                  size="large"
                  variant="contained"
                  type="submit"
                  onClick={() => handleSendRequest()}
                  className={classes.button}
                >
                  {loading ? (
                    success ? (
                      <DoneAllIcon color="inherit" size="2rem" />
                    ) : (
                      <CircularProgress color="inherit" size="2rem" />
                    )
                  ) : (
                    <>Send</>
                  )}
                </Button>
              </Box>
            </Grid>
          </div>
        </Box>
      </Card>
    </Container>
  );
}
