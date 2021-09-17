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
  TextField
} from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
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
  },
  comment: {
    float: 'right',
    color: 'blue',
    textDecoration: 'underline',
    fontStyle: 'italic',
    '&:hover': {
      textDecoration: 'none'
    }
  },
  cancel: {
    float: 'right',
    color: 'red',
    textDecoration: 'underline',
    fontStyle: 'italic',
    '&:hover': {
      textDecoration: 'none'
    }
  },
  submitButton: {
    backgroundColor: '#058714',
    '&:hover': {
      backgroundColor: '#66bb6a'
    },
    marginRight: 15
  },
  back: {
    backgroundColor: '#de3521',
    '&:hover': {
      backgroundColor: '#ef5350'
    }
  },
  textField: {
    marginTop: 7,
    marginBottom: 20
  },
  messageBox: {
    position: 'fixed',
    width: 600
  }
});

// ----------------------------------------------------------------------

export default function DeclineReason(props) {
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
  const [loading, setLoading] = useState(false);
  const [openMessageBox, setOpenMessageBox] = useState(false);
  const [openComment, setOpenComment] = useState({
    company: false,
    position: false,
    location: false,
    startDate: false,
    closingDate: false,
    hours: false,
    contract: false,
    salary: false,
    ATC: false,
    ATR: false,
    keySkills: false,
    contactDetails: false,
    application: false
  });
  const [comments, setComments] = useState({
    company: '',
    position: '',
    location: '',
    startDate: '',
    closingDate: '',
    hours: '',
    contract: '',
    salary: '',
    ATC: '',
    ATR: '',
    keySkills: '',
    contactDetails: '',
    application: '',
    overall: ''
  });

  const { error } = useFetch(`https://logo.clearbit.com/${companyName}.com`);
  // console.log(error);
  if (error) {
    logoUrl = 'https://logo.clearbit.com/hello.com';
  }

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }
  const handleOpenComment = (input) => (e) => {
    setOpenComment({ ...openComment, [input]: true });
  };
  const handleCloseComment = (input) => (e) => {
    setOpenComment({ ...openComment, [input]: false });
  };
  const handleChange = (input) => (e) => {
    setComments({ [input]: e.target.value });
  };
  const closeMessageBox = () => {
    setOpenMessageBox(true);
  };

  async function handleSubmit() {
    if (
      comments.company.length != 0 ||
      comments.position.length != 0 ||
      comments.location.length != 0 ||
      comments.startDate.length != 0 ||
      comments.closingDate.length != 0 ||
      comments.hours.length != 0 ||
      comments.contract.length != 0 ||
      comments.salary.length != 0 ||
      comments.ATC.length != 0 ||
      comments.ATR.length != 0 ||
      comments.keySkills.length != 0 ||
      comments.contactDetails.length != 0 ||
      comments.application.length != 0
    ) {
      console.log('Successful');
    } else {
      setOpenMessageBox(true);
      await timeout(5000);
      setOpenMessageBox(false);
    }
  }

  return (
    <div>
      <Dialog
        className={classes.dialogPaper}
        open={props.open}
        onClose={props.close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle variant="h5">
          Reasons for declining
          <img
            style={{ float: 'right', maxWidth: 50 }}
            src={props.logo}
            alt="https://benti-energies.com/asset/images/clients/logo-default.svg"
          />
        </DialogTitle>
        <DialogContent>
          <Typography variant="h6" style={{ marginLeft: 5 }}>
            Job overview
          </Typography>
          <hr style={{ marginBottom: 5 }} />
          <DialogContentText variant="subtitle1" className={classes.subtitle} display="inline">
            Company
          </DialogContentText>
          <DialogContentText display="inline" style={{ marginLeft: 90 }}>
            {convertFirstCharacterAllWordsToUppercase(companyName)}
          </DialogContentText>
          {!openComment.company ? (
            <Typography onClick={handleOpenComment('company')} className={classes.comment}>
              comment
            </Typography>
          ) : (
            <Typography
              onClick={handleCloseComment('company')}
              className={classes.cancel}
              display="inline"
            >
              cancel
            </Typography>
          )}
          {openComment.company ? (
            <TextField
              multiline
              rows={2}
              size="small"
              className={classes.textField}
              fullWidth
              value={comments.company}
              onChange={handleChange('company')}
            />
          ) : null}
          <br />
          <DialogContentText variant="subtitle1" className={classes.subtitle} display="inline">
            Position
          </DialogContentText>
          <DialogContentText display="inline" style={{ marginLeft: 100 }}>
            {convertFirstCharacterAllWordsToUppercase(positionName)}
          </DialogContentText>
          {!openComment.position ? (
            <Typography onClick={handleOpenComment('position')} className={classes.comment}>
              comment
            </Typography>
          ) : (
            <Typography
              onClick={handleCloseComment('position')}
              className={classes.cancel}
              display="inline"
            >
              cancel
            </Typography>
          )}
          {openComment.position ? (
            <TextField
              size="small"
              fullWidth
              multiline
              rows={2}
              className={classes.textField}
              value={comments.position}
              onChange={handleChange('position')}
            />
          ) : null}
          <br />
          <DialogContentText variant="subtitle1" className={classes.subtitle} display="inline">
            Location
          </DialogContentText>
          <DialogContentText display="inline" style={{ marginLeft: 96 }}>
            {convertFirstCharacterAllWordsToUppercase(jobLocation)}
          </DialogContentText>
          {!openComment.location ? (
            <Typography onClick={handleOpenComment('location')} className={classes.comment}>
              comment
            </Typography>
          ) : (
            <Typography
              onClick={handleCloseComment('location')}
              className={classes.cancel}
              display="inline"
            >
              cancel
            </Typography>
          )}
          {openComment.location ? (
            <TextField
              size="small"
              fullWidth
              multiline
              rows={2}
              className={classes.textField}
              value={comments.location}
              onChange={handleChange('location')}
            />
          ) : null}
          <br />
          <DialogContentText variant="subtitle1" className={classes.subtitle} display="inline">
            Start date
          </DialogContentText>
          <DialogContentText display="inline" style={{ marginLeft: 83 }}>
            {convertFirstCharacterAllWordsToUppercase(jobStartTime)}
          </DialogContentText>
          {!openComment.startDate ? (
            <Typography onClick={handleOpenComment('startDate')} className={classes.comment}>
              comment
            </Typography>
          ) : (
            <Typography
              onClick={handleCloseComment('startDate')}
              className={classes.cancel}
              display="inline"
            >
              cancel
            </Typography>
          )}
          {openComment.startDate ? (
            <TextField
              size="small"
              fullWidth
              multiline
              rows={2}
              className={classes.textField}
              value={comments.startDate}
              onChange={handleChange('startDate')}
            />
          ) : null}
          <br />
          <DialogContentText variant="subtitle1" className={classes.subtitle} display="inline">
            Closing date
          </DialogContentText>
          <DialogContentText display="inline" style={{ marginLeft: 65 }}>
            {convertFirstCharacterAllWordsToUppercase(jobClosingDate)}
          </DialogContentText>
          {!openComment.closingDate ? (
            <Typography onClick={handleOpenComment('closingDate')} className={classes.comment}>
              comment
            </Typography>
          ) : (
            <Typography
              onClick={handleCloseComment('closingDate')}
              className={classes.cancel}
              display="inline"
            >
              cancel
            </Typography>
          )}
          {openComment.closingDate ? (
            <TextField
              size="small"
              fullWidth
              multiline
              rows={2}
              className={classes.textField}
              value={comments.closingDate}
              onChange={handleChange('closingDate')}
            />
          ) : null}
          <br />
          <DialogContentText variant="subtitle1" className={classes.subtitle} display="inline">
            Hours
          </DialogContentText>
          <DialogContentText display="inline" style={{ marginLeft: 114 }}>
            {convertFirstCharacterAllWordsToUppercase(jobHours)}
          </DialogContentText>
          {!openComment.hours ? (
            <Typography onClick={handleOpenComment('hours')} className={classes.comment}>
              comment
            </Typography>
          ) : (
            <Typography
              onClick={handleCloseComment('hours')}
              className={classes.cancel}
              display="inline"
            >
              cancel
            </Typography>
          )}
          {openComment.hours ? (
            <TextField
              size="small"
              fullWidth
              multiline
              rows={2}
              className={classes.textField}
              value={comments.hours}
              onChange={handleChange('hours')}
            />
          ) : null}
          <br />
          <DialogContentText variant="subtitle1" className={classes.subtitle} display="inline">
            Contract
          </DialogContentText>
          <DialogContentText display="inline" style={{ marginLeft: 93 }}>
            {convertFirstCharacterAllWordsToUppercase(jobContract)}
          </DialogContentText>
          {!openComment.contract ? (
            <Typography onClick={handleOpenComment('contract')} className={classes.comment}>
              comment
            </Typography>
          ) : (
            <Typography
              onClick={handleCloseComment('contract')}
              className={classes.cancel}
              display="inline"
            >
              cancel
            </Typography>
          )}
          {openComment.contract ? (
            <TextField
              size="small"
              multiline
              rows={2}
              className={classes.textField}
              fullWidth
              value={comments.contract}
              onChange={handleChange('contract')}
            />
          ) : null}
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
          {!openComment.salary ? (
            <Typography onClick={handleOpenComment('salary')} className={classes.comment}>
              comment
            </Typography>
          ) : (
            <Typography
              onClick={handleCloseComment('salary')}
              className={classes.cancel}
              display="inline"
            >
              cancel
            </Typography>
          )}
          {openComment.salary ? (
            <TextField
              size="small"
              fullWidth
              multiline
              rows={2}
              className={classes.textField}
              value={comments.salary}
              onChange={handleChange('salary')}
            />
          ) : null}
          <hr style={{ marginBottom: 25, opacity: 0 }} />
          <DialogContentText variant="h6" className={classes.subtitle} display="inline">
            About the company
          </DialogContentText>
          {!openComment.ATC ? (
            <Typography onClick={handleOpenComment('ATC')} className={classes.comment}>
              comment
            </Typography>
          ) : (
            <Typography
              onClick={handleCloseComment('ATC')}
              className={classes.cancel}
              display="inline"
            >
              cancel
            </Typography>
          )}
          <hr style={{ marginBottom: 5 }} />
          <DialogContentText className={classes.body}>{companyDescription}</DialogContentText>
          {openComment.ATC ? (
            <TextField
              fullWidth
              size="small"
              multiline
              rows={2}
              className={classes.textField}
              value={comments.ATC}
              onChange={handleChange('ATC')}
            />
          ) : null}
          <hr style={{ marginBottom: 25, opacity: 0 }} />
          <DialogContentText
            variant="h6"
            className={classes.subtitle}
            style={{ marginTop: 25 }}
            display="inline"
          >
            About the role
          </DialogContentText>
          {!openComment.ATR ? (
            <Typography onClick={handleOpenComment('ATR')} className={classes.comment}>
              comment
            </Typography>
          ) : (
            <Typography
              onClick={handleCloseComment('ATR')}
              className={classes.cancel}
              display="inline"
            >
              cancel
            </Typography>
          )}
          <hr style={{ marginBottom: 5 }} />
          <DialogContentText className={classes.body}>{jobDescription}</DialogContentText>
          {openComment.ATR ? (
            <TextField
              fullWidth
              size="small"
              multiline
              rows={2}
              className={classes.textField}
              value={comments.ATR}
              onChange={handleChange('ATR')}
            />
          ) : null}
          <hr style={{ marginBottom: 25, opacity: 0 }} />
          <DialogContentText
            variant="h6"
            className={classes.subtitle}
            style={{ marginTop: 25 }}
            display="inline"
          >
            Key skills
          </DialogContentText>
          {!openComment.keySkills ? (
            <Typography onClick={handleOpenComment('keySkills')} className={classes.comment}>
              comment
            </Typography>
          ) : (
            <Typography
              onClick={handleCloseComment('keySkills')}
              className={classes.cancel}
              display="inline"
            >
              cancel
            </Typography>
          )}
          <hr style={{ marginBottom: 5 }} />
          <DialogContentText>{jobSkill}</DialogContentText>
          {openComment.keySkills ? (
            <TextField
              fullWidth
              size="small"
              multiline
              rows={2}
              className={classes.textField}
              value={comments.keySkills}
              onChange={handleChange('keySkills')}
            />
          ) : null}
          <hr style={{ marginBottom: 25, opacity: 0 }} />
          <DialogContentText
            variant="h6"
            className={classes.subtitle}
            style={{ marginTop: 25 }}
            display="inline"
          >
            Contact Details
          </DialogContentText>
          {!openComment.contactDetails ? (
            <Typography onClick={handleOpenComment('contactDetails')} className={classes.comment}>
              comment
            </Typography>
          ) : (
            <Typography
              onClick={handleCloseComment('contactDetails')}
              className={classes.cancel}
              display="inline"
            >
              cancel
            </Typography>
          )}
          <hr style={{ marginBottom: 5 }} />
          <DialogContentText className={classes.body}>{questionContactDetail}</DialogContentText>
          {openComment.contactDetails ? (
            <TextField
              // label="Please leave your comments here ..."
              size="small"
              fullWidth
              multiline
              rows={2}
              className={classes.textField}
              value={comments.contactDetails}
              onChange={handleChange('contactDetails')}
            />
          ) : null}
          <hr style={{ marginBottom: 25, opacity: 0 }} />
          <DialogContentText
            variant="h6"
            className={classes.subtitle}
            style={{ marginTop: 25 }}
            display="inline"
          >
            Application Details
          </DialogContentText>
          {!openComment.application ? (
            <Typography onClick={handleOpenComment('application')} className={classes.comment}>
              comment
            </Typography>
          ) : (
            <Typography
              onClick={handleCloseComment('application')}
              className={classes.cancel}
              display="inline"
            >
              cancel
            </Typography>
          )}
          <hr style={{ marginBottom: 5 }} />
          <DialogContentText className={classes.body}>{applicationContactDetail}</DialogContentText>
          {openComment.application ? (
            <TextField
              fullWidth
              size="small"
              multiline
              rows={2}
              className={classes.textField}
              value={comments.application}
              onChange={handleChange('application')}
            />
          ) : null}
          <TextField
            style={{ marginTop: 65 }}
            label="Overall comment ..."
            multiline
            rows={5}
            fullWidth
            value={comments.overall}
            onChange={handleChange('overall')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close} variant="contained" className={classes.back} autoFocus>
            Back
          </Button>
          <Button
            variant="contained"
            className={classes.submitButton}
            onClick={handleSubmit}
            autoFocus
          >
            {loading ? <CircularProgress color="inherit" size="1.5rem" /> : <>Send</>}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        // className={classes.messageBox}
        maxWidth="xs"
        open={openMessageBox}
        onClose={closeMessageBox}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText align="center" style={{ color: 'black', margin: 8 }}>
            Please comment on at least on of the field or leave a overall comment.
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
