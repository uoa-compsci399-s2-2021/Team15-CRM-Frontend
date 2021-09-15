import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles, styled } from '@material-ui/styles';
// material
import {
  Box,
  Card,
  Link,
  Typography,
  Stack,
  Button,
  CardContent,
  CardActions
} from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { green, red } from '@material-ui/core/colors';
// utils
import { fDate } from '../../../utils/formatTime';
import { convertFirstCharacterAllWordsToUppercase } from '../../../utils/formatString';
//
import Label from '../../Label';
import useFetch from '../../../apis/useFetch';

// ----------------------------------------------------------------------

const useStyles = makeStyles({
  root: {
    minWidth: 275
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  accept: {
    backgroundColor: 'green',
    marginLeft: 100,
    fontSize: 20,
    width: 300,
    '&:hover': {
      backgroundColor: '#66bb6a'
    }
  },
  decline: {
    backgroundColor: 'red',
    fontSize: 20,
    marginRight: 180,
    width: 300,
    '&:hover': {
      backgroundColor: '#ef5350'
    }
  },
  dialogPaper: {
    height: '100vh',
    position: 'fixed'
  },
  subtitle: {
    color: 'black',
    marginRight: 5,
    marginLeft: 5
  },
  body: {
    marginLeft: 5,
    whiteSpace: 'pre-line'
  }
});

// ----------------------------------------------------------------------

export default function Information(props) {
  const {
    positionName,
    companyName,
    jobHours,
    jobSalary,
    jobLocation,
    jobContract,
    jobStartTime,
    jobClosingDate,
    companyDescription,
    jobDescription,
    jobSkill,
    questionContactDetail,
    applicationContactDetail
  } = props.product;
  const classes = useStyles();
  let logoUrl = `https://logo.clearbit.com/${companyName}.com`;

  const { error } = useFetch(`https://logo.clearbit.com/${companyName}.com`);
  // console.log(error);
  if (error) {
    logoUrl = 'https://logo.clearbit.com/hello.com';
  }

  return (
    <Dialog
      className={classes.dialogPaper}
      open={props.open}
      onClose={props.close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      <DialogTitle variant="h5">
        Request Information
        <img
          style={{ float: 'right', maxWidth: 50 }}
          src={props.logo}
          alt="https://benti-energies.com/asset/images/clients/logo-default.svg"
        />
      </DialogTitle>
      <DialogContent>
        <Typography variant="h6" style={{ marginLeft: 5 }}>Job overview</Typography>
        <hr style={{ marginBottom: 5 }} />
        <DialogContentText variant="subtitle1" className={classes.subtitle} display="inline">
          Company
        </DialogContentText>
        <DialogContentText display="inline" style={{ marginLeft: 90 }}>
          {convertFirstCharacterAllWordsToUppercase(companyName)}
        </DialogContentText>
        <br />
        <DialogContentText variant="subtitle1" className={classes.subtitle} display="inline">
          Position
        </DialogContentText>
        <DialogContentText display="inline" style={{ marginLeft: 100 }}>
          {convertFirstCharacterAllWordsToUppercase(positionName)}
        </DialogContentText>
        <br />
        <DialogContentText variant="subtitle1" className={classes.subtitle} display="inline">
          Location
        </DialogContentText>
        <DialogContentText display="inline" style={{ marginLeft: 96 }}>
          {convertFirstCharacterAllWordsToUppercase(jobLocation)}
        </DialogContentText>
        <br />
        <DialogContentText variant="subtitle1" className={classes.subtitle} display="inline">
          Start date
        </DialogContentText>
        <DialogContentText display="inline" style={{ marginLeft: 83 }}>
          {convertFirstCharacterAllWordsToUppercase(jobStartTime)}
        </DialogContentText>
        <br />
        <DialogContentText variant="subtitle1" className={classes.subtitle} display="inline">
          Closing date
        </DialogContentText>
        <DialogContentText display="inline" style={{ marginLeft: 65 }}>
          {convertFirstCharacterAllWordsToUppercase(jobClosingDate)}
        </DialogContentText>
        <br />
        <DialogContentText variant="subtitle1" className={classes.subtitle} display="inline">
          Hours
        </DialogContentText>
        <DialogContentText display="inline" style={{ marginLeft: 114 }}>
          {convertFirstCharacterAllWordsToUppercase(jobHours)}
        </DialogContentText>
        <br />
        <DialogContentText variant="subtitle1" className={classes.subtitle} display="inline">
          Contract
        </DialogContentText>
        <DialogContentText display="inline" style={{ marginLeft: 93 }}>
          {convertFirstCharacterAllWordsToUppercase(jobContract)}
        </DialogContentText>
        <br />
        <DialogContentText variant="subtitle1" className={classes.subtitle} display="inline">
          Salary(NZD)
        </DialogContentText>
        {jobSalary == 'Market rate' ? (
          <DialogContentText style={{ marginLeft: 65 }} display="inline">
            "Market Rate"
          </DialogContentText>
        ) : (
          <DialogContentText style={{ marginLeft: 65 }} display="inline">
            $
            {jobSalary}
          </DialogContentText>
        )}
        <DialogContentText variant="h6" className={classes.subtitle} style={{ marginTop: 25 }}>
          About the company
        </DialogContentText>
        <hr style={{ marginBottom: 5 }} />
        <DialogContentText className={classes.body}>{companyDescription}</DialogContentText>
        <DialogContentText variant="h6" className={classes.subtitle} style={{ marginTop: 25 }}>
          About the role
        </DialogContentText>
        <hr style={{ marginBottom: 5 }} />
        <DialogContentText className={classes.body}>{jobDescription}</DialogContentText>
        <DialogContentText variant="h6" className={classes.subtitle} style={{ marginTop: 25 }}>
          Key skills
        </DialogContentText>
        <hr style={{ marginBottom: 5 }} />
        <DialogContentText>{jobSkill}</DialogContentText>
        <DialogContentText variant="h6" className={classes.subtitle} style={{ marginTop: 25 }}>
          Contact Details
        </DialogContentText>
        <hr style={{ marginBottom: 5 }} />
        <DialogContentText className={classes.body}>{questionContactDetail}</DialogContentText>
        <DialogContentText variant="h6" className={classes.subtitle} style={{ marginTop: 25 }}>
          Application
        </DialogContentText>
        <hr style={{ marginBottom: 5 }} />
        <DialogContentText className={classes.body}>
          {applicationContactDetail}
        </DialogContentText>
      </DialogContent>
      {!props.isActive ? (
        <DialogActions>
          <Button className={classes.decline} onClick={props.decline} variant="contained" autoFocus>
            Decline
          </Button>
          <Button
            onClick={props.accept}
            color="primary"
            className={classes.accept}
            disableElevation
            variant="contained"
          >
            Accept
          </Button>
        </DialogActions>
      ) : null}
    </Dialog>
  );
}
