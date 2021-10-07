import * as React from 'react';
import * as Yup from 'yup';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Typography,
  Alert,
  Button,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Select,
  InputLabel,
  Grid,
} from '@material-ui/core';

// ----------------------------------------------------------------------
const currencies = [
  {
    value: 'realTime',
    label: 'Real Time',
  },
  {
    value: 'EUR',
    label: 'Daily Digest',
  },
  {
    value: 'Smart Digest ',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

export default function Setting() {
  const [currency, setCurrency] = React.useState('EUR');
  const [showPassword, setShowPassword] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: async () => {
      try {
        console.log(1);
      } catch (err) {
        console.log(err.response.data.error);
        setErrorMessage(err.response.data.error);
        setTimeout(() => {
          setErrorMessage('');
        }, 5000);
      }
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {errorMessage ? (
            <Alert variant="filled" severity="error">
              {errorMessage}
            </Alert>
          ) : null}
          <Typography variant="h4" gutterBottom component="div">
            Edit Email Notification
          </Typography>

          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend">For new Job vacancies:</FormLabel>
            <RadioGroup aria-label="gender" name="row-radio-buttons-group">
              <FormControlLabel value="female" control={<Radio />} label="Real Time" />
              <FormControlLabel value="female" control={<Radio />} label="Daily Digest" />
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={3}>
                  <FormControlLabel value="male" control={<Radio />} label="Smart Digest" />
                </Grid>
                <Grid item xs={9}>
                  <div>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={age}
                      label="Age"
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </div>
                </Grid>
              </Grid>

              <FormControlLabel value="other" control={<Radio />} label="No Emails" />
            </RadioGroup>
          </FormControl>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }} />

        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={9}>
            <Button
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Save Settings
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              fullWidth
              size="large"
              type="submit"
              variant="outlined"
              loading={isSubmitting}
              color="error"
            >
              Cancel
            </Button>
          </Grid>
        </Grid>

      </Form>
    </FormikProvider>
  );
}
