import React, { Component } from 'react';
import { Button, Typography, Container, Grid, Snackbar, Alert } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { submitForm } from '../../apis/index';

export class Review extends Component {
  constructor() {
    super();
    this.state = {
      notifyIsOpen: false,
      notifyMessage: '',
      notifyType: 'error',
      loading: false,
    };
  }

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  handleClose = () => {
    this.setState({ 'notifyIsOpen': false });
  };

  handleSubmit = async () => {
    const data = {
      companyName: this.props.values.company,
      positionName: this.props.values.position,
      jobLocation: this.props.values.location,
      jobStartTime: this.props.values.startDate,
      jobClosingDate: this.props.values.closingDate,
      jobHours: this.props.values.hours,
      jobContract: this.props.values.contract,
      jobSalary: this.props.values.rate,
      companyDescription: this.props.values.ATC,
      jobDescription: this.props.values.ATR,
      jobSkill: this.props.values.keySkills,
      questionContactDetail: this.props.values.contact,
      applicationContactDetail: this.props.values.application
    };
    try {
      this.setState({ 'loading': true });
      const pathname = window.location.pathname;
      const res = await submitForm(pathname.substr(pathname.lastIndexOf('/') + 1), data);
      if (res.status === 200) {
        this.props.nextStep();
      }
    } catch (e) {
      this.setState({ 'loading': false });
      // console.log(e.response.data.error);
      this.setState({ 'notifyIsOpen': true });
      this.setState({ 'notifyMessage': e.response.data.error });
    }
  };

  render() {
    const { values } = this.props;
    const { notifyIsOpen, notifyMessage, notifyType } = this.state;

    return (
      <Grid
        container
        style={{
          backgroundImage: 'url(https://i.ibb.co/XFj5fnQ/73121630274494-pic-hd.png)',
          backgroundSize: 'cover'
        }}
      >
        <Container fixed>
          <div noValidate autoComplete="off">
            <Grid container spacing={1} justify="center" justifyContent="center">
              <Snackbar
                style={{ marginTop: 20 }}
                open={notifyIsOpen}
                autoHideDuration={4000}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                onClose={this.handleClose}
              >
                <Alert severity={notifyType} onClose={this.handleClose}>
                  {notifyMessage}
                </Alert>
              </Snackbar>
              <Grid item xs={12} sm={12} md={9}>
                <Typography variant="h2" style={{ marginTop: 30, color: '#595b75' }}>
                  Review
                </Typography>
                <Typography variant="h4" style={{ marginTop: 30, marginLeft: 15 }}>
                  Job overview
                </Typography>
                <hr style={{ marginBottom: 20 }} />
                <Typography variant="h6" style={{ marginTop: 30, marginLeft: 15 }} display="inline">
                  Company
                </Typography>
                <Typography style={{ marginLeft: 150 }} display="inline">
                  {values.company}
                </Typography>
                <hr style={{ opacity: 0 }} />
                <Typography variant="h6" style={{ marginTop: 20, marginLeft: 15 }} display="inline">
                  Position
                </Typography>
                <Typography style={{ marginLeft: 161 }} display="inline">
                  {values.position}
                </Typography>
                <hr style={{ opacity: 0 }} />
                <Typography variant="h6" style={{ marginTop: 30, marginLeft: 15 }} display="inline">
                  Location
                </Typography>
                <Typography style={{ marginLeft: 158 }} display="inline">
                  {values.location}
                </Typography>
                <hr style={{ opacity: 0 }} />
                <Typography variant="h6" style={{ marginTop: 30, marginLeft: 15 }} display="inline">
                  Start Date
                </Typography>
                <Typography style={{ marginLeft: 142 }} display="inline">
                  {values.startDate}
                </Typography>
                <hr style={{ opacity: 0 }} />
                <Typography variant="h6" style={{ marginTop: 30, marginLeft: 15 }} display="inline">
                  Closing Date
                </Typography>
                <Typography style={{ marginLeft: 122 }} display="inline">
                  {values.closingDate}
                </Typography>
                <hr style={{ opacity: 0 }} />
                <Typography variant="h6" style={{ marginTop: 30, marginLeft: 15 }} display="inline">
                  Hours
                </Typography>
                <Typography style={{ marginLeft: 180 }} display="inline">
                  {values.hours}
                </Typography>
                <hr style={{ opacity: 0 }} />
                <Typography variant="h6" style={{ marginTop: 30, marginLeft: 15 }} display="inline">
                  Contract
                </Typography>
                <Typography style={{ marginLeft: 155 }} display="inline">
                  {values.contract}
                </Typography>
                <hr style={{ opacity: 0 }} />
                <Typography variant="h6" style={{ marginTop: 30, marginLeft: 15 }} display="inline">
                  Salary
                </Typography>
                {values.salary == 'Market rate' ? (
                  <Typography style={{ marginLeft: 173 }} display="inline">
                    "Market Rate"
                  </Typography>
                ) : (
                  <Typography style={{ marginLeft: 173 }} display="inline">
                    $
                    {values.rate}
                    {' '}
                    {values.salary}
                  </Typography>
                )}
                <hr style={{ opacity: 0 }} />
                <Typography variant="h4" style={{ marginTop: 30, marginLeft: 15 }}>
                  About the company
                </Typography>
                <hr style={{ marginBottom: 20 }} />
                <Typography style={{ marginLeft: 15, whiteSpace: 'pre-line' }}>
                  {values.ATC}
                </Typography>
                <Typography variant="h4" style={{ marginTop: 40, marginLeft: 15 }}>
                  About the role
                </Typography>
                <hr style={{ marginBottom: 20 }} />
                <Typography style={{ marginLeft: 15, whiteSpace: 'pre-line' }}>
                  {values.ATR}
                </Typography>
                <Typography variant="h4" style={{ marginTop: 40, marginLeft: 15 }}>
                  Key Skills
                </Typography>
                <hr style={{ marginBottom: 20 }} />
                <Typography style={{ marginLeft: 15, whiteSpace: 'pre-line' }}>
                  {values.keySkills}
                </Typography>
                <Typography variant="h4" style={{ marginTop: 40, marginLeft: 15 }}>
                  Contact Details
                </Typography>
                <hr style={{ marginBottom: 20 }} />
                <Typography style={{ marginLeft: 15, whiteSpace: 'pre-line' }}>
                  {values.contact}
                </Typography>
                <Typography variant="h4" style={{ marginTop: 40, marginLeft: 15 }}>
                  Application
                </Typography>
                <hr style={{ marginBottom: 20 }} />
                <Typography style={{ marginLeft: 15, whiteSpace: 'pre-line' }}>
                  {values.application}
                </Typography>
                <hr style={{ marginBottom: 40, opacity: 0 }} />
                <Button
                  style={{
                    background: '#169905',
                    color: '#FFFFFF',
                    marginTop: 30,
                    marginBottom: 50,
                    float: 'right',
                    marginRight: 5
                  }}
                  label="Submit"
                  onClick={this.handleSubmit}
                >
                  {this.state.loading ? (
                    <CircularProgress color="inherit" size="1.5rem" />
                  ) : (
                    <>Submit</>
                  )}
                </Button>
                <Button
                  style={{
                    background: '#EE3B55',
                    color: '#FFFFFF',
                    marginTop: 30,
                    marginRight: 5,
                    marginBottom: 50,
                    // float: 'right'
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

export default Review;
