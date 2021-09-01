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
                <Typography variant="h2" style={{ marginTop: 30 }}>
                  Review
                </Typography>
                <Typography variant="h4" style={{ marginTop: 30 }}>
                  Company:
                </Typography>
                <Typography variant="h5" style={{ marginLeft: 10 }}>
                  {values.company}
                </Typography>
                <Typography variant="h4" style={{ marginTop: 20 }}>
                  Position:
                </Typography>
                <Typography variant="h4" style={{ marginLeft: 10 }}>
                  {values.position}
                </Typography>
                <Typography variant="h4" style={{ marginTop: 20 }}>
                  Location:
                </Typography>
                <Typography variant="h4" style={{ marginLeft: 10 }}>
                  {values.location}
                </Typography>
                <Typography variant="h4" style={{ marginTop: 20 }}>
                  Start Date:
                </Typography>
                <Typography variant="h4" style={{ marginLeft: 10 }}>
                  {values.startDate}
                </Typography>
                <Typography variant="h4" style={{ marginTop: 20 }}>
                  Closing Date:
                </Typography>
                <Typography variant="h4" style={{ marginLeft: 10 }}>
                  {values.closingDate}
                </Typography>
                <Typography variant="h4" style={{ marginTop: 20 }}>
                  Hours:
                </Typography>
                <Typography variant="h4" style={{ marginLeft: 10 }}>
                  {values.hours}
                </Typography>
                <Typography variant="h4" style={{ marginTop: 20 }}>
                  Contract:
                </Typography>
                <Typography variant="h4" style={{ marginLeft: 10 }}>
                  {values.contract}
                </Typography>
                <Typography variant="h4" style={{ marginTop: 20 }}>
                  Salary:
                </Typography>
                {values.salary == 'Market rate' ? (
                  <Typography variant="h4" style={{ marginLeft: 10 }}>
                    "Market Rate"
                  </Typography>
                ) : (
                  <Typography variant="h4" style={{ marginLeft: 10 }}>
                    $
                    {values.rate}
                    {' '}
                    {values.salary}
                  </Typography>
                )}
                <Typography variant="h4" style={{ marginTop: 20 }}>
                  About the company:
                </Typography>
                <Typography variant="subtitle1" style={{ marginLeft: 10 }}>
                  {values.ATC}
                </Typography>
                <Typography variant="h4" style={{ marginTop: 20 }}>
                  About the role:
                </Typography>
                <Typography variant="subtitle1" style={{ marginLeft: 10 }}>
                  {values.ATR}
                </Typography>
                <Typography variant="h4" style={{ marginTop: 20 }}>
                  Key Skills:
                </Typography>
                <Typography variant="subtitle1" style={{ marginLeft: 10 }}>
                  {values.keySkills}
                </Typography>
                <Typography variant="h4" style={{ marginTop: 20 }}>
                  Contact Details:
                </Typography>
                <Typography variant="subtitle1" style={{ marginLeft: 10 }}>
                  {values.contact}
                </Typography>
                <Typography variant="h4" style={{ marginTop: 20 }}>
                  Application:
                </Typography>
                <Typography variant="subtitle1" style={{ marginLeft: 10 }}>
                  {values.application}
                </Typography>
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
