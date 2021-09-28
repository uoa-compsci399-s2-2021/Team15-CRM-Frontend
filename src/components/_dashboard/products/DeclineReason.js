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
import { declineJob } from '../../../apis/index';
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
    backgroundColor: 'grey',
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
    backgroundColor: 'grey',
    '&:hover': {
      backgroundColor: '#4b525c'
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
  let logoUrl = `https://logo.clearbit.com/${companyName}.com`;
  const [loading, setLoading] = useState(false);
  const [openMessageBox, setOpenMessageBox] = useState(false);
  const [notifyIsOpen, setNotifyIsOpen] = useState(false);
  const [notifyType, setNotifyType] = useState('');
  const [notifyMessage, setNotifyMessage] = useState('');
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
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [closingDate, setClosingDate] = useState('');
  const [contract, setContract] = useState('');
  const [hours, setHours] = useState('');
  const [salary, setSalary] = useState('');
  const [ATC, setATC] = useState('');
  const [ATR, setATR] = useState('');
  const [keySkills, setKeySkills] = useState('');
  const [contactDetails, setContactDetails] = useState('');
  const [application, setApplication] = useState('');
  const [overallComment, setOverallComment] = useState('');
  const [openNotifyBox, setOpenNotifyBox] = useState(false);
  const [sent, setSent] = useState(false);
  const closeNotifyBox = () => {
    setOpenNotifyBox(false);
  };
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

  const closeMessageBox = () => {
    setOpenMessageBox(false);
  };

  async function handleSubmit() {
    // console.log(comments);
    if (
      company.length != 0 ||
      position.length != 0 ||
      location.length != 0 ||
      startDate.length != 0 ||
      closingDate.length != 0 ||
      hours.length != 0 ||
      contract.length != 0 ||
      salary.length != 0 ||
      ATC.length != 0 ||
      ATR.length != 0 ||
      keySkills.length != 0 ||
      contactDetails.length != 0 ||
      application.length != 0 ||
      overallComment.length != 0
    ) {
      const data = {
        _id: props.product._id,
        companyName: company,
        positionName: position,
        jobLocation: location,
        jobStartTime: startDate,
        jobClosingDate: closingDate,
        jobHours: hours,
        jobContract: contract,
        jobSalary: salary,
        companyDescription: ATC,
        jobDescription: ATR,
        jobSkill: keySkills,
        questionContactDetail: contactDetails,
        applicationContactDetail: application,
        overall: overallComment
      };
      console.log(data);
      let n = 0;
      try {
        setLoading(true);
        // call api
        const response = await declineJob(data);
        if (response.status === 200) {
          setLoading(false);
          setSent(true);
          setOpenNotifyBox(true);
          await timeout(3000);
          setOpenNotifyBox(false);
          props.close();
          props.closeDialog();
          props.setHandleEvent(!props.handleEvent);
        } else {
          setLoading(false);
          setOpenNotifyBox(true);
          await timeout(3000);
          setOpenNotifyBox(false);
        }
      } catch (e) {
        setLoading(false);
        setOpenNotifyBox(true);
        await timeout(3000);
        setOpenNotifyBox(false);
      }
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
              value={company}
              onChange={(e) => setCompany(e.target.value)}
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
              value={position}
              onChange={(e) => setPosition(e.target.value)}
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
              value={location}
              onChange={(e) => setLocation(e.target.value)}
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
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
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
              value={closingDate}
              onChange={(e) => setClosingDate(e.target.value)}
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
              value={hours}
              onChange={(e) => setHours(e.target.value)}
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
              value={contract}
              onChange={(e) => setContract(e.target.value)}
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
              {' '}
              {jobSalaryType}
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
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
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
              value={ATC}
              onChange={(e) => setATC(e.target.value)}
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
              value={ATR}
              onChange={(e) => setATR(e.target.value)}
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
              value={keySkills}
              onChange={(e) => setKeySkills(e.target.value)}
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
              value={contactDetails}
              onChange={(e) => setContactDetails(e.target.value)}
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
              value={application}
              onChange={(e) => setApplication(e.target.value)}
            />
          ) : null}
          <TextField
            style={{ marginTop: 65 }}
            label="Overall comment ..."
            multiline
            rows={5}
            fullWidth
            value={overallComment}
            onChange={(e) => setOverallComment(e.target.value)}
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
      <Dialog
        // className={classes.messageBox}
        maxWidth="xs"
        open={openNotifyBox}
        onClose={closeNotifyBox}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {!sent ? (
          <DialogContent>
            <img
              src="https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/alert-circle-orange-512.png"
              alt="Error"
              style={{ maxWidth: 100, marginLeft: 'auto', marginRight: 'auto' }}
            />
            <DialogContentText align="center" variant="h5" style={{ color: 'black', margin: 8 }}>
              Oops! Something went wrong. Please try again.
            </DialogContentText>
          </DialogContent>
        ) : (
          <DialogContent>
            <img
              src="https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/792/Tick_Mark_Dark-512.png"
              alt="Success"
              style={{ maxWidth: 100, marginLeft: 'auto', marginRight: 'auto' }}
              align="center"
            />
            <DialogContentText align="center" variant="h5" style={{ color: 'black', margin: 8 }}>
              Successfully declined
            </DialogContentText>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
