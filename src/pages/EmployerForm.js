import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Button } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Link from '@material-ui/core/Link';
import { MHidden } from '../components/@material-extend';
import AuthLayout from '../layouts/AuthLayout';
import Page from '../components/Page';

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const useStyles = makeStyles((theme) => ({
  field: {
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 30,
  },
  formControl: {
    minWidth: 200,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 10
  },
  button: {
    marginTop: 20,
    width: 50,
    marginLeft: 50
  },
  textfield: {
    marginLeft: 50
  },
  root: {
    marginTop: theme.spacing(2),
    paddingBottom: theme.spacing(5),
  },
  heading: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(10),
  },
}));
const values = {
  someDate: new Date().toISOString().substring(0, 10)
};

export default function EmployerForm() {
  const classes = useStyles();
  const [category, setCategory] = useState('');
  const [value, setValue] = useState('');
  const [contract, setContract] = useState('');
  const [salary, setSalary] = useState('');

  return (
    <RootStyle title="Login | Atech+">
      <AuthLayout>
                &nbsp;

      </AuthLayout>

      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Employer Form
          </Typography>
          <img src="/static/illustrations/illustration_register.png" alt="login" />
        </SectionStyle>
      </MHidden>

      <Container fixed>
        <form noValidate autoComplete="off">
          <Typography variant="h3" className={classes.heading}>
            Please fill in this form
          </Typography>
          <Grid container spacing={1} justify="center" className={classes.root}>
            <Grid item xs={12}>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="outlined"
                  label="Company"
                  placeholder="Employer Name"
                  fullWidth
                  required
                  className={classes.textfield}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="outlined"
                  label="Position"
                  placeholder="Job title/role"
                  fullWidth
                  required
                  className={classes.textfield}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="outlined"
                  label="Location"
                  placeholder="Company Location"
                  fullWidth
                  required
                  className={classes.textfield}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <FormControl component="fieldset" className={classes.field}>
                  <RadioGroup aria-label="gender" name="gender1" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <FormControlLabel value="Start from" control={<Radio />} label="Start from" />
                    <FormControlLabel value="TBC" control={<Radio />} label="TBC" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={8} md={5}>
                <TextField
                  label="Start Date"
                  type="date"
                  fullWidth
                  className={classes.field}
                  defaultValue={values.someDate}
                  helperText="When will the candidate start their role? Approx date or TBC if unsure"
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={8} md={5}>
                <TextField
                  label="Closing Date"
                  type="date"
                  fullWidth
                  className={classes.field}
                  defaultValue={values.someDate}
                  helperText="When do applications need to be submitted by?"
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset" className={classes.field}>
                  <FormLabel component="legend">Hours</FormLabel>
                  <RadioGroup aria-label="hour" name="hour" value={value} onChange={(e) => setValue(e.target.value)}>
                    <FormControlLabel value="Full Time" control={<Radio />} label="Full Time" />
                    <FormControlLabel value="Part Time" control={<Radio />} label="Part Time" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <FormControl className={classes.formControl}>
                <InputLabel>Contract</InputLabel>
                <Select value={contract} onChange={(e) => setContract(e.target.value)}>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Permanent">Permanent</MenuItem>
                  <MenuItem value="Fix Term">Fix Term</MenuItem>
                  <MenuItem value="Casual">Casual</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel>Salary</InputLabel>
                <Select value={salary} onChange={(e) => setSalary(e.target.value)}>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Hourly">Hourly</MenuItem>
                  <MenuItem value="Annual">Annual</MenuItem>
                  <MenuItem value="Market rate">'Market rate'</MenuItem>
                </Select>
              </FormControl>
              <Grid item xs={12} md={8}>
                <TextField
                  variant="outlined"
                  label="About the company"
                  margin="normal"
                  className={classes.textfield}
                  placeholder="Please provide key details about your company, and any information that would give students a feel for the organisation they might be working for."
                  multiline
                  helperText="A link to your website is also very useful."
                  fullWidth
                  required
                />
                <TextField
                  variant="outlined"
                  label="About the role"
                  margin="normal"
                  placeholder="Please provide details about what the student will be doing. If it is a broad role please try and provide an idea of the range of potential tasks."
                  multiline
                  className={classes.textfield}
                  fullWidth
                  required
                />
                <TextField
                  variant="outlined"
                  label="Key Skills"
                  margin="normal"
                  placeholder="The more specific you are about the skills that are required for the role, the more likely it is you will receive applications from high quality candidates who have the technical skills and qualities that you are looking for."
                  multiline
                  className={classes.textfield}
                  helperText="Please consider personal qualities and experience as well as technical skills."
                  fullWidth
                  required
                />
                <TextField
                  variant="outlined"
                  label="Contact Details"
                  margin="normal"
                  placeholder="Please provide a contact name, contact position title, email address and/or telephone number should students have any questions about the role."
                  multiline
                  className={classes.textfield}
                  fullWidth
                  required
                />
                <TextField
                  variant="outlined"
                  label="Application"
                  margin="normal"
                  placeholder="Please provide a contact name and email address to which CVs and cover letters should be sent."
                  multiline
                  className={classes.textfield}
                  fullWidth
                  required
                />
              </Grid>
              <Button
                style={{ 'minHeight': '30px', 'minWidth': '200px' }}
                onClick={() => console.log('submmited!')}
                type="submit"
                color="primary"
                variant="contained"
                className={classes.button}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </RootStyle>

  );
}
