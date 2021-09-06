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
    minHeight: '600px',
    maxHeight: '600px',
    position: 'fixed',
    top: 50
  },
  subtitle: {
    color: 'black',
    marginRight: 5
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
      <DialogTitle variant="h5">Request Information</DialogTitle>
      <DialogContent>
        <DialogContentText variant="h6" className={classes.subtitle} display="inline">
          Name:
        </DialogContentText>
        <DialogContentText display="inline">
          {convertFirstCharacterAllWordsToUppercase(companyName)}
        </DialogContentText>
        <br />
        <DialogContentText variant="h6" className={classes.subtitle} display="inline">
          Position:
        </DialogContentText>
        <DialogContentText display="inline">
          {convertFirstCharacterAllWordsToUppercase(positionName)}
        </DialogContentText>
        <br />
        <DialogContentText variant="h6" className={classes.subtitle} display="inline">
          Location:
        </DialogContentText>
        <DialogContentText display="inline">
          {convertFirstCharacterAllWordsToUppercase(jobLocation)}
        </DialogContentText>
        <br />
        <DialogContentText variant="h6" className={classes.subtitle} display="inline">
          Start date:
        </DialogContentText>
        <DialogContentText display="inline">
          {convertFirstCharacterAllWordsToUppercase(jobStartTime)}
        </DialogContentText>
        <br />
        <DialogContentText variant="h6" className={classes.subtitle} display="inline">
          Closing date:
        </DialogContentText>
        <DialogContentText display="inline">
          {convertFirstCharacterAllWordsToUppercase(jobClosingDate)}
        </DialogContentText>
        <br />
        <DialogContentText variant="h6" className={classes.subtitle} display="inline">
          Hours:
        </DialogContentText>
        <DialogContentText display="inline">
          {convertFirstCharacterAllWordsToUppercase(jobHours)}
        </DialogContentText>
        <br />
        <DialogContentText variant="h6" className={classes.subtitle} display="inline">
          Contract:
        </DialogContentText>
        <DialogContentText display="inline">
          {convertFirstCharacterAllWordsToUppercase(jobContract)}
        </DialogContentText>
        <br />
        <DialogContentText variant="h6" className={classes.subtitle} display="inline">
          Salary(NZD):
        </DialogContentText>
        <DialogContentText display="inline">
          $
          {jobSalary}
        </DialogContentText>
        <DialogContentText variant="h6" className={classes.subtitle}>
          About the company:
        </DialogContentText>
        <DialogContentText>{companyDescription}</DialogContentText>
        <DialogContentText variant="h6" className={classes.subtitle}>
          About the role:
        </DialogContentText>
        <DialogContentText>{jobDescription}</DialogContentText>
        <DialogContentText variant="h6" className={classes.subtitle}>
          Key skills:
        </DialogContentText>
        <DialogContentText>{jobSkill}</DialogContentText>
        <DialogContentText variant="h6" className={classes.subtitle}>
          Contact Details:
        </DialogContentText>
        <DialogContentText>{questionContactDetail}</DialogContentText>
        <DialogContentText variant="h6" className={classes.subtitle}>
          Application:
        </DialogContentText>
        <DialogContentText>{applicationContactDetail}</DialogContentText>
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
