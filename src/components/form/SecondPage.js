import React, { Component } from 'react';
import { Button, TextField, Typography, Container, Grid } from '@material-ui/core';

export class SecondPage extends Component {
  constructor() {
    super();
    this.state = { showErrors: false };
  }

  handleContinue = (e) => {
    e.preventDefault();
    if (
      this.props.values.ATC.length != 0 &&
      this.props.values.ATR.length != 0 &&
      this.props.values.keySkills.length != 0 &&
      this.props.values.contact.length != 0 &&
      this.props.values.application.length != 0
    ) {
      this.props.nextStep();
      window.scrollTo(0, 0);
    } else {
      this.setState({ 'showErrors': true });
    }
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, handleChange } = this.props;
    const isError = (condition) => this.state.showErrors && condition;

    return (
      <Grid
        container
        style={{
          backgroundImage: 'url(https://i.ibb.co/XFj5fnQ/73121630274494-pic-hd.png)',
          backgroundSize: 'cover',
        }}
      >
        <Container fixed>
          <div noValidate autoComplete="off">
            <Grid container spacing={1} justify="center" justifyContent="center">
              <Grid item xs={12} sm={10} md={7}>
                <Typography style={{ marginTop: 50 }}>
                  Please provide key details about your company, and any information that would give
                  students a feel for the organisation they might be working for. A link to your
                  website is also very useful.
                </Typography>
                <TextField
                  variant="outlined"
                  label="About the company"
                  margin="normal"
                  value={values.ATC}
                  onChange={handleChange('ATC')}
                  // placeholder="Please provide key details about your company, and any information that would give students a feel for the organisation they might be working for."
                  multiline
                  rows={4}
                  // helperText="A link to your website is also very useful."
                  fullWidth
                  required
                  error={isError(values.ATC.length === 0)}
                  helperText={
                    isError(values.ATC.length === 0) && 'Please tell us about your company'
                  }
                />
                <Typography style={{ marginTop: 40 }}>
                  Please provide details about what the student will be doing. If it is a broad role
                  please try and provide an idea of the range of potential tasks.
                </Typography>
                <TextField
                  variant="outlined"
                  label="About the role"
                  margin="normal"
                  value={values.ATR}
                  onChange={handleChange('ATR')}
                  // placeholder="Please provide details about what the student will be doing. If it is a broad role please try and provide an idea of the range of potential tasks."
                  multiline
                  rows={4}
                  fullWidth
                  required
                  error={isError(values.ATR.length === 0)}
                  helperText={isError(values.ATR.length === 0) && 'Please tell us about the role'}
                />
                <Typography style={{ marginTop: 40 }}>
                  The more specific you are about the skills that are required for the role, the
                  more likely it is you will receive applications from high quality candidates who
                  have the technical skills and qualities that you are looking for. Please consider
                  personal qualities and experience as well as technical skills.
                </Typography>
                <TextField
                  variant="outlined"
                  label="Key Skills"
                  margin="normal"
                  value={values.keySkills}
                  onChange={handleChange('keySkills')}
                  // placeholder="The more specific you are about the skills that are required for the role, the more likely it is you will receive applications from high quality candidates who have the technical skills and qualities that you are looking for."
                  multiline
                  rows={4}
                  // helperText="Please consider personal qualities and experience as well as technical skills."
                  fullWidth
                  required
                  error={isError(values.keySkills.length === 0)}
                  helperText={
                    isError(values.keySkills.length === 0) &&
                    'Please tell us the key skills required for the position'
                  }
                />
                <Typography style={{ marginTop: 40 }}>
                  Please provide a contact name, contact position title, email address and/or
                  telephone number should students have any questions about the role.
                </Typography>
                <TextField
                  variant="outlined"
                  label="Contact Details"
                  margin="normal"
                  value={values.contact}
                  onChange={handleChange('contact')}
                  // placeholder="Please provide a contact name, contact position title, email address and/or telephone number should students have any questions about the role."
                  multiline
                  rows={4}
                  fullWidth
                  required
                  error={isError(values.contact.length === 0)}
                  helperText={
                    isError(values.contact.length === 0) && 'Please provide the contact detail'
                  }
                />
                <Typography style={{ marginTop: 40 }}>
                  Please provide a contact name and email address to which CVs and cover letters
                  should be sent.
                </Typography>
                <TextField
                  variant="outlined"
                  label="Application"
                  margin="normal"
                  value={values.application}
                  onChange={handleChange('application')}
                  // placeholder="Please provide a contact name and email address to which CVs and cover letters should be sent."
                  multiline
                  rows={4}
                  fullWidth
                  required
                  error={isError(values.application.length === 0)}
                  helperText={
                    isError(values.application.length === 0) &&
                    'Please provide the application details'
                  }
                />
                <Button
                  style={{
                    background: '#2E3B55',
                    color: '#FFFFFF',
                    marginTop: 25,
                    marginBottom: 50,
                    float: 'right',
                    marginRight: 5
                  }}
                  label="Continue"
                  onClick={this.handleContinue}
                >
                  Continue
                </Button>
                <Button
                  style={{
                    background: '#EE3B55',
                    color: '#FFFFFF',
                    marginTop: 25,
                    marginRight: 5,
                    marginBottom: 50,
                  }}
                  label="Back"
                  onClick={this.back}
                >
                  Back
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </Grid>
    );
  }
}

export default SecondPage;
