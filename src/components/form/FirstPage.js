import React, { Component } from 'react';
import { Button, TextField, Typography, Container, Grid } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Checkbox from '@material-ui/core/Checkbox';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

export class FirstPage extends Component {
  constructor() {
    super();
    this.state = { showErrors: false, selectOtherLocation: false, locationWidth: 200 };
  }

  handleContinue = (e) => {
    e.preventDefault();
    if (
      this.props.values.company.length != 0 &&
      this.props.values.position.length != 0 &&
      this.props.values.location.length != 0 &&
      this.props.values.hours.length != 0 &&
      this.props.values.contract.length != 0 &&
      (this.props.values.startDate != 0 || this.props.values.startTBC) &&
      (this.props.values.closingDate != 0 || this.props.values.closeTBC) &&
      (!isNaN(this.props.values.rate) || this.props.values.salary == 'Market rate') &&
      (this.props.values.rate.length != 0 || this.props.values.salary == 'Market rate') &&
      ((this.props.values.rate > 20 && this.props.values.rate < 500000) ||
        this.props.values.salary == 'Market rate')
    ) {
      this.props.nextStep();
      window.scrollTo(0, 0);
    } else {
      this.setState({ showErrors: true });
      window.scrollTo(0, 0);
    }
  };

  selectOther = () => {
    this.setState({ selectOtherLocation: true });
    this.setState({ locationWidth: 15 });
  };

  deselectOther = () => {
    this.setState({ selectOtherLocation: false });
    this.setState({ locationWidth: 200 });
  };

  render() {
    const { values, handleChange, handleStartChecked, handleCloseChecked } = this.props;
    const isError = (condition) => this.state.showErrors && condition;

    return (
      <Grid
        container
        style={{
          backgroundImage: 'url(https://i.ibb.co/XFj5fnQ/73121630274494-pic-hd.png)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <Container fixed>
          <div noValidate autoComplete="off">
            <Grid container spacing={1} justify="center" justifyContent="center">
              <Grid item xs={12} sm={10} md={7}>
                <Typography variant="h3" style={{ marginTop: 30 }}>
                  Please fill in this form
                </Typography>
              </Grid>
              <Grid item xs={12} sm={10} md={7}>
                <TextField
                  variant="outlined"
                  label="Company"
                  placeholder="Company Name"
                  fullWidth
                  margin="normal"
                  value={values.company}
                  onChange={handleChange('company')}
                  InputLabelProps={{
                    shrink: true
                  }}
                  error={
                    isError(values.company.length === 0) || isError(values.company.length > 30)
                  }
                  helperText={
                    (isError(values.company.length === 0) && 'Please enter the company name') ||
                    (isError(values.company.length > 30) &&
                      'The name of the company cannot be over 30 characters')
                  }
                />
              </Grid>
              <Grid item xs={12} sm={10} md={7}>
                <TextField
                  variant="outlined"
                  label="Position"
                  placeholder="Job title/role"
                  fullWidth
                  value={values.position}
                  onChange={handleChange('position')}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true
                  }}
                  error={isError(values.position.length === 0)}
                  helperText={
                    (isError(values.position.length === 0) && 'Please enter the position') ||
                    (isError(values.position.length > 30) &&
                      'The job title cannot be over 30 characters')
                  }
                />
              </Grid>
              <Grid item xs={12} sm={10} md={7}>
                {/* <TextField
                  variant="outlined"
                  label="Location"
                  placeholder="Company Location"
                  fullWidth
                  value={values.location}
                  onChange={handleChange('location')}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true
                  }}
                  error={isError(values.position.length === 0)}
                  helperText={isError(values.position.length === 0) && 'Please enter the location'}
                /> */}
                <Typography style={{ marginTop: 20, marginBottom: 5 }}>Location</Typography>
                <FormControl
                  error={
                    isError(values.location == 'Other') || isError(values.location.length === 0)
                  }
                  style={{ minWidth: this.state.locationWidth, marginRight: 15 }}
                >
                  <Select value={values.location} onChange={handleChange('location')}>
                    <MenuItem value="Auckland" onClick={() => this.deselectOther()}>
                      Auckland
                    </MenuItem>
                    <MenuItem value="Wellington" onClick={() => this.deselectOther()}>
                      Wellington
                    </MenuItem>
                    <MenuItem value="Chrischurch" onClick={() => this.deselectOther()}>
                      Chrischurch
                    </MenuItem>
                    <MenuItem value="Remote" onClick={() => this.deselectOther()}>
                      Remote
                    </MenuItem>
                    <MenuItem label="Other" value="" onClick={() => this.selectOther()}>
                      Other
                    </MenuItem>
                  </Select>
                </FormControl>
                {this.state.selectOtherLocation ? (
                  <TextField
                    label="Other location"
                    style={{ marginRight: 20 }}
                    value={values.location}
                    onChange={handleChange('location')}
                    error={
                      isError(values.location.length > 20) || isError(values.location.length === 0)
                    }
                    helperText={
                      (isError(values.location.length == 0) && 'Please enter the other location') ||
                      (isError(values.location.length > 20) &&
                        'The location cannot be over 20 characters')
                    }
                  />
                ) : null}
              </Grid>
              <Grid item xs={12} sm={10} md={7}>
                <Typography style={{ marginTop: 20, marginBottom: 10 }}>
                  When will the candidate start their role? Approx date or TBC if unsure
                </Typography>
              </Grid>
              <Grid item xs={12} sm={10} md={7} style={{ display: 'flex', overflow: 'auto' }}>
                <TextField
                  label="Start Date"
                  type="date"
                  disabled={values.startTBC}
                  style={{ marginRight: 20, width: 200 }}
                  value={values.startDate}
                  onChange={handleChange('startDate')}
                  //   helperText="When will the candidate start their role? Approx date or TBC if unsure"
                  InputLabelProps={{
                    shrink: true
                  }}
                  inputProps={{
                    min: new Date().toISOString().substring(0, 10)
                  }}
                  error={isError(values.startDate.length === 0)}
                  helperText={
                    isError(values.startDate.length === 0) &&
                    'Please either select a date of checked TBC if unsure'
                  }
                />
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="default"
                        checked={values.startTBC}
                        onChange={handleStartChecked('startTBC')}
                      />
                    }
                    label="TBC"
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={12} sm={10} md={7}>
                <Typography style={{ marginTop: 25, marginBottom: 10 }}>
                  When do applications need to be submitted by? Approx date or TBC if unsure. The
                  default will be 30 days after the role is published
                </Typography>
              </Grid>
              <Grid item xs={12} sm={10} md={7} style={{ display: 'flex', overflow: 'auto' }}>
                <TextField
                  label="Closing Date"
                  type="date"
                  // fullWidth
                  style={{ marginRight: 20, width: 200 }}
                  disabled={values.closeTBC}
                  value={values.closingDate}
                  onChange={handleChange('closingDate')}
                  // helperText="When do applications need to be submitted by?"
                  InputLabelProps={{
                    shrink: true
                  }}
                  inputProps={{
                    min: new Date().toISOString().substring(0, 10)
                  }}
                  error={isError(values.closingDate.length === 0)}
                  helperText={
                    isError(values.closingDate.length === 0) &&
                    'Please either select a date of checked TBC if unsure. The the default will be 30 days'
                  }
                />
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="default"
                        checked={values.closeTBC}
                        onChange={handleCloseChecked('closeTBC')}
                      />
                    }
                    label="TBC"
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={12} sm={10} md={7}>
                <FormControl
                  component="fieldset"
                  style={{ marginTop: 20 }}
                  error={isError(values.hours.length === 0)}
                >
                  <FormLabel component="legend">Hours</FormLabel>
                  <RadioGroup
                    row
                    aria-label="hours"
                    name="hours"
                    value={values.hours}
                    onChange={handleChange('hours')}
                  >
                    <FormControlLabel value="Full Time" control={<Radio />} label="Full Time" />
                    <FormControlLabel value="Part Time" control={<Radio />} label="Part Time" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={10} md={7}>
                <Typography style={{ marginTop: 20, marginBottom: 5 }}>Contract</Typography>
                <FormControl
                  error={isError(values.contract.length === 0)}
                  style={{ minWidth: 200 }}
                >
                  <Select value={values.contract} onChange={handleChange('contract')}>
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="Permanent">Permanent</MenuItem>
                    <MenuItem value="Fix Term">Fix Term</MenuItem>
                    <MenuItem value="Casual">Casual</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={10} md={7}>
                <Typography style={{ marginTop: 25, marginBottom: 5 }}>
                  Salary - the range must be between $20.00 to $500,000
                </Typography>
                <FormControl
                  variant="outlined"
                  disabled={values.salary == 'Market rate'}
                  style={{ maxWidth: 180 }}
                >
                  {/* <InputLabel htmlFor="outlined-adornment-amount">Rate</InputLabel> */}
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    value={values.rate}
                    onChange={handleChange('rate')}
                    style={{ marginBlockEnd: 20, marginRight: 10 }}
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    error={
                      isError(values.rate.length === 0) ||
                      isError(isNaN(values.rate)) ||
                      isError(values.rate < 20) ||
                      isError(values.rate > 500000)
                    }
                  />
                </FormControl>
                <FormControl>
                  {/* <InputLabel>Salary</InputLabel> */}
                  <Select value={values.salary} onChange={handleChange('salary')}>
                    {/* <MenuItem value="None">
                      <em>None</em>
                    </MenuItem> */}
                    <MenuItem value="Hourly">Hourly</MenuItem>
                    <MenuItem value="Annual">Annual</MenuItem>
                    <MenuItem value="Market rate">"Market rate"</MenuItem>
                  </Select>
                </FormControl>
                <hr style={{ marginBottom: 40, opacity: 0 }} />
                <Button
                  style={{
                    background: '#2E3B55',
                    color: '#FFFFFF',
                    float: 'right',
                    marginLeft: 'auto',
                    marginBottom: 50
                  }}
                  label="Continue"
                  onClick={this.handleContinue}
                >
                  Continue
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </Grid>
    );
  }
}

export default FirstPage;
