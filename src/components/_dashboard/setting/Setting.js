import * as React from 'react';
import * as Yup from 'yup';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import { useFormik, Form, FormikProvider } from 'formik';

// material
import {
  Link,
  Stack,
  FormControlLabel,
  Typography,
  Card,
  CardContent,
  Button,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Select,
  InputLabel,
  Grid,
  CircularProgress
} from '@material-ui/core';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import { setEmailNotification } from '../../../apis';

export default function Setting() {
  const [errorMessage, setErrorMessage] = React.useState('');
  const [loading, setloading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      picked: 'real',
      time: ''
    },
    onSubmit: async (values) => {
      setloading(true);
      try {
        const info = { 'message': values.picked };
        const res = await setEmailNotification(info);
        console.log(res);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setloading(false);
        }, 3000);
      } catch (err) {
        console.log(err.response.data.error);
        setErrorMessage(err.response.data.error);
        setTimeout(() => {
          setErrorMessage('');
        }, 5000);
      }
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, setFieldValue } = formik;

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <Typography variant="h4" gutterBottom component="div">
                Edit Email Notification
              </Typography>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend">For new Job vacancies:</FormLabel>
                <RadioGroup aria-label="gender" name="row-radio-buttons-group" defaultValue="real">
                  <FormControlLabel value="real" control={<Radio />} onChange={() => setFieldValue('picked', true)} label="Real Time" />
                  <FormControlLabel name="picked" value="noEmails" type="radio" control={<Radio />} onChange={() => setFieldValue('picked', false)} label="No Emails" />
                </RadioGroup>
              </FormControl>
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }} />

            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  {loading ? (
                    success ? (
                      <DoneAllIcon color="inherit" size="2rem" />
                    ) : (
                      <CircularProgress color="inherit" size="2rem" />
                    )
                  ) : (
                    <>Save Settings</>
                  )}
                </Button>
              </Grid>
            </Grid>

          </Form>
        </FormikProvider>
      </CardContent>
    </Card>
  );
}
