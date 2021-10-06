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
  CardActions,
  Fab
} from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import EditIcon from '@material-ui/icons/Edit';
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
    fontSize: 20,
    width: 150,
    marginRight: 15,
    '&:hover': {
      backgroundColor: '#66bb6a'
    }
  },
  decline: {
    backgroundColor: 'red',
    fontSize: 20,
    width: 150,
    '&:hover': {
      backgroundColor: '#ef5350'
    }
  },
  dialogPaper: {
    height: '100vh',
    position: 'fixed',
  },
  subtitle: {
    color: 'black',
    marginRight: 5,
    marginLeft: 5
  },
  body: {
    marginLeft: 5,
    whiteSpace: 'pre-line'
  },
  confirmButton: {
    backgroundColor: '#058714',
    '&:hover': {
      backgroundColor: '#66bb6a'
    },
    marginLeft: 20,
  },
  no: {
    backgroundColor: '#de3521',
    '&:hover': {
      backgroundColor: '#ef5350'
    }
  }
});

// ----------------------------------------------------------------------

export default function Information(props) {
  const {
    positionName,
    companyName,
    jobHours,
    jobSalary,
    jobSalaryType,
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
          alt="not found"
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
          {positionName}
        </DialogContentText>
        <br />
        <DialogContentText variant="subtitle1" className={classes.subtitle} display="inline">
          Location
        </DialogContentText>
        <DialogContentText display="inline" style={{ marginLeft: 96 }}>
          {jobLocation}
        </DialogContentText>
        <br />
        <DialogContentText variant="subtitle1" className={classes.subtitle} display="inline">
          Start date
        </DialogContentText>
        <DialogContentText display="inline" style={{ marginLeft: 84 }}>
          {jobStartTime}
        </DialogContentText>
        <br />
        <DialogContentText variant="subtitle1" className={classes.subtitle} display="inline">
          Closing date
        </DialogContentText>
        <DialogContentText display="inline" style={{ marginLeft: 66 }}>
          {jobClosingDate}
        </DialogContentText>
        <br />
        <DialogContentText variant="subtitle1" className={classes.subtitle} display="inline">
          Hours
        </DialogContentText>
        <DialogContentText display="inline" style={{ marginLeft: 116 }}>
          {jobHours}
        </DialogContentText>
        <br />
        <DialogContentText variant="subtitle1" className={classes.subtitle} display="inline">
          Contract
        </DialogContentText>
        <DialogContentText display="inline" style={{ marginLeft: 95 }}>
          {jobContract}
        </DialogContentText>
        <br />
        <DialogContentText variant="subtitle1" className={classes.subtitle} display="inline">
          Salary(NZD)
        </DialogContentText>
        {jobSalaryType == 'Market rate' ? (
          <DialogContentText style={{ marginLeft: 66 }} display="inline">
            "Market Rate"
          </DialogContentText>
        ) : (
          <DialogContentText style={{ marginLeft: 66 }} display="inline">
            $
            {jobSalary}
            {' '}
            {jobSalaryType}
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
          Application Details
        </DialogContentText>
        <hr style={{ marginBottom: 5 }} />
        <DialogContentText className={classes.body}>
          {applicationContactDetail}
        </DialogContentText>
      </DialogContent>
      {!props.isActive ? (
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="baseline"
          spacing={{ xs: 1, sm: 2, md: 4 }}
          style={{ margin: '2vh' }}
        >
          <div>
            <Fab color="primary" aria-label="edit" onClick={props.openEditMode} size="small">
              <EditIcon />
            </Fab>
          </div>

          <div>
            <Button onClick={props.decline} variant="contained" className={classes.no}>
              Decline
            </Button>
            <Button
              onClick={props.accept}
              className={classes.confirmButton}
              variant="contained"
            >
              Accept
            </Button>
          </div>
        </Stack>
      ) : null}
    </Dialog>
  );
}
