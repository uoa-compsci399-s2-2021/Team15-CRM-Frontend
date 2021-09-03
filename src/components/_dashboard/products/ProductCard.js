import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles, styled } from '@material-ui/styles';
// material
import { Box, Card, Link, Typography, Stack, Button, CardContent, CardActions } from '@material-ui/core';
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
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  accept: {
    backgroundColor: 'green',
    fontSize: 20,
    marginRight: 180,
    width: 300,
    '&:hover': {
      backgroundColor: '#66bb6a'
    },
  },
  decline: {
    backgroundColor: 'red',
    marginLeft: 100,
    fontSize: 20,
    width: 300,
    '&:hover': {
      backgroundColor: '#ef5350'
    }
  },
  dialogPaper: {
    minHeight: '600px',
    maxHeight: '600px',
    position: 'fixed',
    top: 150,
  },
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object
};

export default function ShopProductCard({ product }) {
  const { positionName, companyName, jobHours, jobSalary, jobLocation, jobContract, jobStartTime, jobClosingDate, companyDescription, jobDescription, jobSkill, questionContactDetail, applicationContactDetail } = product;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  let logoUrl = (`https://logo.clearbit.com/${companyName}.com`);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { error } = useFetch(`https://logo.clearbit.com/${companyName}.com`);
  // console.log(error);
  if (error) {
    logoUrl = ('https://logo.clearbit.com/hello.com');
  }

  return (
    <Card>
      <Stack spacing={2} sx={{ p: 3 }}>
        <div>
          <Box justifyContent="center" alignItems="center" display="flex" sx={{ p: 1 }}>
            <img
              src={logoUrl}
              alt={companyName}
            />
          </Box>
          <Typography color="textSecondary" gutterBottom>
            {convertFirstCharacterAllWordsToUppercase(companyName)}
          </Typography>
          <Typography variant="h5" component="h2">
            {convertFirstCharacterAllWordsToUppercase(positionName)}
          </Typography>
          <Typography color="textSecondary">
            {convertFirstCharacterAllWordsToUppercase(jobHours)}
          </Typography>
          <Typography color="textSecondary">
            {convertFirstCharacterAllWordsToUppercase(jobContract)}
          </Typography>
          <Typography variant="body2" component="p">
            NZD$
            {' '}
            {' '}
            {jobSalary}
            <br />
            {convertFirstCharacterAllWordsToUppercase(jobLocation)}
          </Typography>
        </div>

        <Stack alignItems="center" justifyContent="space-between">
          {/* <ColorPreview colors={colors} /> */}
          <Typography variant="subtitle1">
            <Button variant="outlined" onClick={handleClickOpen}>Learn more</Button>
            <Dialog
              className = {classes.dialogPaper}
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              fullWidth
            >
              <DialogTitle id="alert-dialog-title">Company Information</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {'Name: '}
                  {convertFirstCharacterAllWordsToUppercase(companyName)}
                </DialogContentText>
                <DialogContentText id="alert-dialog-description">
                  {'Position: '}
                  {convertFirstCharacterAllWordsToUppercase(positionName)}
                </DialogContentText>
                <DialogContentText id="alert-dialog-description">
                  {'Location: '}
                  {convertFirstCharacterAllWordsToUppercase(jobLocation)}
                </DialogContentText>
                <DialogContentText id="alert-dialog-description">
                  {'Start date: '}
                  {convertFirstCharacterAllWordsToUppercase(jobStartTime)}
                </DialogContentText>
                <DialogContentText id="alert-dialog-description">
                  {'Closing date: '}
                  {convertFirstCharacterAllWordsToUppercase(jobClosingDate)}
                </DialogContentText>
                <DialogContentText id="alert-dialog-description">
                  {'Hours: '}
                  {convertFirstCharacterAllWordsToUppercase(jobHours)}
                </DialogContentText>
                <DialogContentText id="alert-dialog-description">
                  {'Contract: '}
                  {convertFirstCharacterAllWordsToUppercase(jobContract)}
                </DialogContentText>
                <DialogContentText id="alert-dialog-description">
                  <Typography color="textSecondary" gutterBottom>
                    {'Salary(NZD): $  '}
                    {jobSalary}
                  </Typography>
                </DialogContentText>
                <DialogContentText id="alert-dialog-description">
                  <Typography color="textSecondary" gutterBottom>
                    {'About the company: '}
                    {companyDescription}
                  </Typography>
                </DialogContentText>
                <DialogContentText id="alert-dialog-description">
                  <Typography color="textSecondary" gutterBottom>
                    {'About the role: '}
                    {jobDescription}
                  </Typography>
                </DialogContentText>
                <DialogContentText id="alert-dialog-description">
                  <Typography color="textSecondary" gutterBottom>
                    {'Key skills: '}
                    {jobSkill}
                  </Typography>
                </DialogContentText>
                <DialogContentText id="alert-dialog-description">
                  <Typography color="textSecondary" gutterBottom>
                    {'Contact Details: '}
                    {questionContactDetail}
                  </Typography>
                </DialogContentText>
                <DialogContentText id="alert-dialog-description">
                  <Typography color="textSecondary" gutterBottom>
                    {'Application: '}
                    {applicationContactDetail}
                  </Typography>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary" className = {classes.accept} disableElevation variant = "contained">
                  Accept
                </Button>
                <Button className = {classes.decline} onClick={handleClose} variant = "contained" autoFocus>
                  Decline
                </Button>
              </DialogActions>
            </Dialog>
          </Typography>

        </Stack>
      </Stack>
    </Card>

  );
}
