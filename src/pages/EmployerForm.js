import React, { Component } from 'react';
import { styled } from '@material-ui/core/styles';
// import { loadReCaptcha, ReCaptcha } from 'react-recaptcha-google';
import FirstPage from '../components/form/FirstPage';
import SecondPage from '../components/form/SecondPage';
import Review from '../components/form/Review';
import Success from '../components/form/Success';

export default class EmployerForm extends Component {
  constructor() {
    super();
    this.state = {
      step: 1,
      company: '',
      position: '',
      location: 'Other',
      startDate: '',
      closingDate: '',
      startTBC: false,
      closeTBC: false,
      hours: '',
      contract: '',
      rate: '',
      salary: 'Annual',
      ATC: '',
      ATR: '',
      keySkills: '',
      contact: '',
      application: '',
      logoUrl: null,
    };
  }

  // go back to previous step
  prevStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
    window.scrollTo(0, 0);
  };

  // proceed to the next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
    window.scrollTo(0, 0);
  };

  // handle field change
  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  handleOtherLocation = () => {
    this.setState({ [location]: '' });
  };

  handleStartChecked = (input) => (e) => {
    this.setState({ [input]: e.target.checked });
    if (e.target.checked) {
      this.setState({ startDate: 'TBC' });
    }
  };

  handleCloseChecked = (input) => (e) => {
    this.setState({ [input]: e.target.checked });
    if (e.target.checked) {
      this.setState({ closingDate: 'TBC' });
    }
  };

  render() {
    const { step } = this.state;
    const {
      company,
      position,
      location,
      startDate,
      closingDate,
      startTBC,
      closeTBC,
      hours,
      contract,
      rate,
      salary,
      ATC,
      ATR,
      keySkills,
      contact,
      application,
      logoUrl
    } = this.state;
    const values = {
      company,
      position,
      location,
      startDate,
      closingDate,
      startTBC,
      closeTBC,
      hours,
      contract,
      rate,
      salary,
      ATC,
      ATR,
      keySkills,
      contact,
      application,
      logoUrl
    };

    switch (step) {
      default:
        return <h1>User Forms not working. Enable Javascript!</h1>;
      case 1:
        return (
          <FirstPage
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            handleStartChecked={this.handleStartChecked}
            handleCloseChecked={this.handleCloseChecked}
            handleOtherLocation={this.handleOtherLocation}
            handleShowError={this.handleShowError}
            values={values}
          />
        );
      case 2:
        return (
          <SecondPage
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            handleShowError={this.handleShowError}
            values={values}
          />
        );
      case 3:
        return (
          <Review
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            handleShowError={this.handleShowError}
            loadingOff={this.handleLoadingOff}
            values={values}
          />
        );
      //
      case 4:
        return <Success />;
    }
  }
}
