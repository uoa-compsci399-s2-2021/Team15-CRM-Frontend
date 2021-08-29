import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Button } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
// import { loadReCaptcha, ReCaptcha } from 'react-recaptcha-google';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Checkbox from '@material-ui/core/Checkbox';
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
    // marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: 10
  },
  text: {
    marginTop: 10,
    // marginLeft: theme.spacing(1),
    marginBottom: 10
  },
  text2: {
    marginTop: 40,
    // marginLeft: theme.spacing(1)
  },
  formControl: {
    width: 200,
    // marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: 10,
  },
  button: {
    marginTop: 20,
    marginLeft: theme.spacing(1)
  },
  textfield: {
    marginTop: 10,
  },
  root: {
    marginTop: theme.spacing(2),
    paddingBottom: theme.spacing(5),
    overflow: 'auto',
    flexDirection: 'column'
  },
  startD: {
    display: 'flex',
    overflow: 'auto'
  },
  image: {
    backgroundImage: 'url(/images/formBackground/bg1.png)',
    backgroundSize: 'contain',
  },
  image2: {
    backgroundImage: 'url(/images/formBackground/bg1.png)',
    backgroundSize: 'contain',
  },
}));
const values = {
  currentDate: new Date().toISOString().substring(0, 10)
};

export default function EmployerForm() {
  const classes = useStyles();
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [closingDate, setClosingDate] = useState('');
  const [startTBC, setStartTBC] = useState(false);
  const [closeTBC, setCloseTBC] = useState(false);
  const [hours, setHours] = useState('');
  const [contract, setContract] = useState('');
  const [rate, setRate] = useState('');
  const [salary, setSalary] = useState('Annual');
  const [ATC, setATC] = useState('');
  const [ATR, setATR] = useState('');
  const [keySkills, setKeySkills] = useState('');
  const [contact, setContact] = useState('');
  const [application, setApplication] = useState('');
  const [showErrors, setShowErrors] = useState(false);

  const handleCheckStart = (event) => {
    setStartTBC(event.target.checked);
    if (event.target.checked) {
      setStartDate('TBC');
    }
  };

  const handleCheckClose = (event) => {
    setCloseTBC(event.target.checked);
    if (event.target.checked) {
      setClosingDate('TBC');
    }
  };
  async function handleSubmit() {
    setShowErrors(true);
  }

  const isError = (condition) => showErrors && condition;

  return (
    <RootStyle title="Login | Atech+">
      {/* <AuthLayout>
                &nbsp;

      </AuthLayout> */}

      {/* <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Employer Form
          </Typography>
          <img src="/static/illustrations/illustration_register.png" alt="login" />
        </SectionStyle>
      </MHidden> */}
      <Grid container className={classes.image}>
        <Container fixed>
          <div noValidate autoComplete="off">
            <Grid container spacing={1} justify="center" className={classes.root}>
              <Grid item xs={12}>
                <Typography variant="h3" className={classes.text}>
                  Please fill in this form
                </Typography>
              </Grid>
              <Grid item xs={12} sm={10} md={7}>
                <TextField
                  variant="outlined"
                  label="Company"
                  placeholder="Employer Name"
                  fullWidth
                  required
                  className={classes.textfield}
                  margin="normal"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  InputLabelProps={{
                    shrink: true
                  }}
                  error={isError(company.length === 0)}
                  helperText={isError(company.length === 0) && "Please enter the employer's name"}
                />
              </Grid>
              <Grid item xs={12} sm={10} md={7}>
                <TextField
                  variant="outlined"
                  label="Position"
                  placeholder="Job title/role"
                  fullWidth
                  required
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className={classes.textfield}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true
                  }}
                  error={isError(position.length === 0)}
                  helperText={isError(position.length === 0) && 'Please enter the position'}
                />
              </Grid>
              <Grid item xs={12} sm={10} md={7}>
                <TextField
                  variant="outlined"
                  label="Location"
                  placeholder="Company Location"
                  fullWidth
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className={classes.textfield}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true
                  }}
                  error={isError(position.length === 0)}
                  helperText={isError(position.length === 0) && 'Please enter the location'}
                />
              </Grid>
              {/* <Grid item xs={12} md={5}>
                  <FormControl component="fieldset" className={classes.field}>
                    <RadioGroup aria-label="gender" name="gender1" value={category} onChange={(e) => setCategory(e.target.value)}>
                      <FormControlLabel value="Start from" control={<Radio />} label="Start from" />
                      <FormControlLabel value="TBC" control={<Radio />} label="TBC" />
                    </RadioGroup>
                  </FormControl>
                </Grid> */}
              <Grid item xs={12}>
                <Typography className={classes.text}>
                  When will the candidate start their role? Approx date or TBC if unsure
                </Typography>
              </Grid>
              <Grid item xs={12} className={classes.startD}>
                <TextField
                  label="Start Date"
                  type="date"
                  disabled={startTBC}
                  className={classes.field}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  //   helperText="When will the candidate start their role? Approx date or TBC if unsure"
                  InputLabelProps={{
                    shrink: true
                  }}
                  error={isError(startDate.length === 0)}
                  helperText={isError(startDate.length === 0) && 'Please either select a date of checked TBC if unsure'}
                />
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox color="default" checked={startTBC} onChange={handleCheckStart} />
                    }
                    label="TBC"
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={12}>
                <Typography className={classes.text}>
                  When do applications need to be submitted by? Approx date or TBC if unsure
                </Typography>
              </Grid>
              <Grid item xs={12} className={classes.startD}>
                <TextField
                  label="Closing Date"
                  type="date"
                  // fullWidth
                  className={classes.field}
                  disabled={closeTBC}
                  value={closingDate}
                  onChange={(e) => setClosingDate(e.target.value)}
                  // helperText="When do applications need to be submitted by?"
                  InputLabelProps={{
                    shrink: true
                  }}
                  error={isError(closingDate.length === 0)}
                  helperText={isError(closingDate.length === 0) && 'Please either select a date of checked TBC if unsure'}
                />
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox color="default" checked={closeTBC} onChange={handleCheckClose} />
                    }
                    label="TBC"
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  component="fieldset"
                  className={classes.field}
                  required
                  error={isError(hours.length === 0)}
                >
                  <FormLabel component="legend">Hours</FormLabel>
                  <RadioGroup
                    row
                    aria-label="hour"
                    name="hour"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                  >
                    <FormControlLabel value="Full Time" control={<Radio />} label="Full Time" />
                    <FormControlLabel value="Part Time" control={<Radio />} label="Part Time" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl className={classes.formControl} error={isError(contract.length === 0)}>
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
              </Grid>
              <Grid item xs={12}>
                <Typography className={classes.text}>
                  Salary
                </Typography>
                <FormControl
                  fullWidth
                  className={classes.formControl}
                  variant="outlined"
                  required
                  disabled={salary == 'None' || salary == 'Market rate'}
                >
                  {/* <InputLabel htmlFor="outlined-adornment-amount">Rate</InputLabel> */}
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    error={isError(rate.length === 0) || isError(rate.isNaN)}
                  />
                </FormControl>
                <FormControl className={classes.formControl}>
                  {/* <InputLabel>Salary</InputLabel> */}
                  <Select value={salary} onChange={(e) => setSalary(e.target.value)}>
                    <MenuItem value="None">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="Hourly">Hourly</MenuItem>
                    <MenuItem value="Annual">Annual</MenuItem>
                    <MenuItem value="Market rate">"Market rate"</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={10} md={8}>
                <Typography className={classes.text2}>
                  Please provide key details about your company, and any information that would give
                  students a feel for the organisation they might be working for. A link to your
                  website is also very useful.
                </Typography>
                <TextField
                  variant="outlined"
                  label="About the company"
                  margin="normal"
                  className={classes.textfield}
                  value={ATC}
                  onChange={(e) => setATC(e.target.value)}
                  // placeholder="Please provide key details about your company, and any information that would give students a feel for the organisation they might be working for."
                  multiline
                  rows={4}
                  // helperText="A link to your website is also very useful."
                  fullWidth
                  required
                  error={isError(ATC.length === 0)}
                  helperText={isError(ATC.length === 0) && 'Please tell us about your company'}
                />
                <Typography className={classes.text2}>
                  Please provide details about what the student will be doing. If it is a broad role
                  please try and provide an idea of the range of potential tasks.
                </Typography>
                <TextField
                  variant="outlined"
                  label="About the role"
                  margin="normal"
                  value={ATR}
                  onChange={(e) => setATR(e.target.value)}
                  // placeholder="Please provide details about what the student will be doing. If it is a broad role please try and provide an idea of the range of potential tasks."
                  multiline
                  rows={4}
                  className={classes.textfield}
                  fullWidth
                  required
                  error={isError(ATR.length === 0)}
                  helperText={isError(ATR.length === 0) && 'Please tell us about the role'}
                />
                <Typography className={classes.text2}>
                  The more specific you are about the skills that are required for the role, the
                  more likely it is you will receive applications from high quality candidates who
                  have the technical skills and qualities that you are looking for. Please consider
                  personal qualities and experience as well as technical skills.
                </Typography>
                <TextField
                  variant="outlined"
                  label="Key Skills"
                  margin="normal"
                  value={keySkills}
                  onChange={(e) => setKeySkills(e.target.value)}
                  // placeholder="The more specific you are about the skills that are required for the role, the more likely it is you will receive applications from high quality candidates who have the technical skills and qualities that you are looking for."
                  multiline
                  rows={4}
                  className={classes.textfield}
                  // helperText="Please consider personal qualities and experience as well as technical skills."
                  fullWidth
                  required
                  error={isError(keySkills.length === 0)}
                  helperText={isError(keySkills.length === 0) && 'Please tell us the key skills required for the position'}
                />
                <Typography className={classes.text2}>
                  Please provide a contact name, contact position title, email address and/or
                  telephone number should students have any questions about the role.
                </Typography>
                <TextField
                  variant="outlined"
                  label="Contact Details"
                  margin="normal"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  // placeholder="Please provide a contact name, contact position title, email address and/or telephone number should students have any questions about the role."
                  multiline
                  rows={4}
                  className={classes.textfield}
                  fullWidth
                  required
                  error={isError(contact.length === 0)}
                  helperText={isError(contact.length === 0) && 'Please provide the contact detail'}
                />
                <Typography className={classes.text2}>
                  Please provide a contact name and email address to which CVs and cover letters
                  should be sent.
                </Typography>
                <TextField
                  variant="outlined"
                  label="Application"
                  margin="normal"
                  value={application}
                  onChange={(e) => setApplication(e.target.value)}
                  // placeholder="Please provide a contact name and email address to which CVs and cover letters should be sent."
                  multiline
                  rows={4}
                  className={classes.textfield}
                  fullWidth
                  required
                  error={isError(application.length === 0)}
                  helperText={isError(application.length === 0) && 'Please provide the application details'}
                />
              </Grid>
              <Grid item>
                <Button
                  style={{ minHeight: '30px', minWidth: '200px' }}
                  onClick={() => handleSubmit()}
                  type="submit"
                  color="primary"
                  variant="contained"
                  className={classes.button}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </Grid>
    </RootStyle>
  );
}
