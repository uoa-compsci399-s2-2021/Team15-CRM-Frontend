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
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green, red } from '@material-ui/core/colors';
// utils
import { fDate } from '../../../utils/formatTime';
import { convertFirstCharacterAllWordsToUppercase } from '../../../utils/formatString';
//
import Label from '../../Label';
import { modifyJob } from '../../../apis/index';
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
  save: {
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
  dialogPaper: {
    height: '100vh',
    position: 'fixed'
  },
  subtitle: {
    color: 'black',
    padding: 0,
    marginRight: 5,
    marginLeft: 5,
    fontSize: 18
  },
  body: {
    marginLeft: 5,
    whiteSpace: 'pre-line'
  },
  textField: {
    width: 180
  }
});

// ----------------------------------------------------------------------

export default function EditMode(props) {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
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
  const [editCompany, setEditCompany] = useState(capitalizeFirstLetter(companyName));
  const [editPosition, SetEditPosition] = useState(capitalizeFirstLetter(positionName));
  const [editLocation, SetEditLocation] = useState(capitalizeFirstLetter(jobLocation));
  const [editStart, SetEditStart] = useState(jobStartTime);
  const [editClose, SetEditClose] = useState(jobClosingDate);
  const [editHours, SetEditHours] = useState(jobHours);
  const [editContract, SetEditContract] = useState(capitalizeFirstLetter(jobContract));
  const [editSalary, SetEditSalary] = useState(jobSalary);
  const [editSalaryType, SetEditSalaryType] = useState(capitalizeFirstLetter(jobSalaryType));
  const [editCompanyDescription, SetEditCompanyDescription] = useState(
    capitalizeFirstLetter(companyDescription)
  );
  const [editJobDescription, SetEditJobDescription] = useState(
    capitalizeFirstLetter(jobDescription)
  );
  const [editJobSkill, SetEditJobSkill] = useState(capitalizeFirstLetter(jobSkill));
  const [editQuestionContactDetail, SetEditQuestionContactDetail] = useState(
    capitalizeFirstLetter(questionContactDetail)
  );
  const [editApplication, SetEditApplication] = useState(
    capitalizeFirstLetter(applicationContactDetail)
  );

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  const [openMessageBox, setOpenMessageBox] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const closeMessageBox = () => {
    setOpenMessageBox(false);
  };

  async function handleSave() {
    const data = {
      _id: props.product._id,
      companyName: editCompany,
      positionName: editCompany,
      jobLocation: editLocation,
      jobStartTime: editStart,
      jobClosingDate: editClose,
      jobHours: editHours,
      jobContract: editContract,
      jobSalary: editSalary,
      jobSalaryType: editSalaryType,
      companyDescription: editCompanyDescription,
      jobDescription: editJobDescription,
      jobSkill: editJobSkill,
      questionContactDetail: editQuestionContactDetail,
      applicationContactDetail: editApplication
    };
    console.log(data);
    try {
      setLoading(true);
      // call api
      const response = await modifyJob(data);
      console.log(response);
      if (response.status === 200) {
        console.log(response);
        setLoading(false);
        props.setHandleEvent(!props.handleEvent);
        setSaved(true);
        setOpenMessageBox(true);
        await timeout(2000);
        setOpenMessageBox(false);
        setSaved(false);
        props.back();
      } else {
        console.log(response);
        setLoading(false);
        setOpenMessageBox(true);
        await timeout(2000);
        setOpenMessageBox(false);
      }
    } catch (e) {
      console.log('error');
      setLoading(false);
      setOpenMessageBox(true);
      await timeout(2000);
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
          Edit Mode
          <img style={{ float: 'right', maxWidth: 50 }} src={props.logo} alt="not found" />
        </DialogTitle>
        <DialogContent>
          <Typography variant="h5" style={{ marginLeft: 5 }}>
            Job overview
          </Typography>
          <hr style={{ marginBottom: 15 }} />
          <DialogContentText variant="subtitle1" className={classes.subtitle} display="inline">
            Company
          </DialogContentText>
          <TextField
            size="small"
            className={classes.textField}
            display="inline"
            value={editCompany}
            onChange={(e) => setEditCompany(e.target.value)}
            style={{ marginLeft: 90, fontSize: 8 }}
          />
          <hr style={{ margin: 5, opacity: 0 }} />
          <DialogContentText variant="subtitle1" className={classes.subtitle} display="inline">
            Position
          </DialogContentText>
          <TextField
            size="small"
            className={classes.textField}
            display="inline"
            style={{ marginLeft: 101 }}
            value={editPosition}
            onChange={(e) => SetEditPosition(e.target.value)}
          />
          <hr style={{ margin: 5, opacity: 0 }} />
          <DialogContentText variant="subtitle1" className={classes.subtitle} display="inline">
            Location
          </DialogContentText>
          <TextField
            size="small"
            className={classes.textField}
            display="inline"
            style={{ marginLeft: 96 }}
            value={editLocation}
            onChange={(e) => SetEditLocation(e.target.value)}
          />
          <hr style={{ margin: 5, opacity: 0 }} />
          <DialogContentText variant="subtitle1" className={classes.subtitle} display="inline">
            Start date
          </DialogContentText>
          <TextField
            size="small"
            className={classes.textField}
            display="inline"
            style={{ marginLeft: 83 }}
            value={editStart}
            onChange={(e) => SetEditStart(e.target.value)}
          />
          <hr style={{ margin: 5, opacity: 0 }} />
          <DialogContentText variant="subtitle1" className={classes.subtitle} display="inline">
            Closing date
          </DialogContentText>
          <TextField
            size="small"
            className={classes.textField}
            display="inline"
            style={{ marginLeft: 62 }}
            value={editClose}
            onChange={(e) => SetEditClose(e.target.value)}
          />
          <hr style={{ margin: 5, opacity: 0 }} />
          <DialogContentText variant="subtitle1" className={classes.subtitle} display="inline">
            Hours
          </DialogContentText>
          <TextField
            size="small"
            className={classes.textField}
            display="inline"
            style={{ marginLeft: 117 }}
            value={editHours}
            onChange={(e) => SetEditHours(e.target.value)}
          />
          <hr style={{ margin: 5, opacity: 0 }} />
          <DialogContentText variant="subtitle1" className={classes.subtitle} display="inline">
            Contract
          </DialogContentText>
          <TextField
            size="small"
            className={classes.textField}
            display="inline"
            style={{ marginLeft: 93 }}
            value={editContract}
            onChange={(e) => SetEditContract(e.target.value)}
          />
          <hr style={{ margin: 5, opacity: 0 }} />
          {jobSalaryType != 'Market rate' ? (
            <div>
              <DialogContentText variant="subtitle1" className={classes.subtitle} display="inline">
                Salary(NZD)
              </DialogContentText>
              <OutlinedInput
                size="small"
                style={{ width: 120, marginLeft: 61 }}
                value={editSalary}
                onChange={(e) => SetEditSalary(e.target.value)}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                display="inline"
              />
              <TextField
                size="small"
                display="inline"
                style={{ width: 100, marginLeft: 5 }}
                value={editSalaryType}
                onChange={(e) => SetEditSalaryType(e.target.value)}
              />
            </div>
          ) : (
            <div>
              <DialogContentText variant="subtitle1" className={classes.subtitle} display="inline">
                Salary(NZD)
              </DialogContentText>
              <TextField
                size="small"
                display="inline"
                style={{ width: 180, marginLeft: 60 }}
                value={editSalaryType}
                onChange={(e) => SetEditSalaryType(e.target.value)}
              />
            </div>
          )}
          <DialogContentText variant="h6" className={classes.subtitle} style={{ marginTop: 40 }}>
            About the company
          </DialogContentText>
          <hr style={{ marginBottom: 5 }} />
          <TextField
            fullWidth
            size="small"
            multiline
            rows={4}
            value={editCompanyDescription}
            onChange={(e) => SetEditCompanyDescription(e.target.value)}
          />
          <DialogContentText variant="h6" className={classes.subtitle} style={{ marginTop: 40 }}>
            About the role
          </DialogContentText>
          <hr style={{ marginBottom: 5 }} />
          <TextField
            fullWidth
            size="small"
            multiline
            rows={4}
            value={editJobDescription}
            onChange={(e) => SetEditJobDescription(e.target.value)}
          />
          <DialogContentText variant="h6" className={classes.subtitle} style={{ marginTop: 40 }}>
            Key skills
          </DialogContentText>
          <hr style={{ marginBottom: 5 }} />
          <TextField
            fullWidth
            size="small"
            multiline
            rows={4}
            value={editJobSkill}
            onChange={(e) => SetEditJobSkill(e.target.value)}
          />
          <DialogContentText variant="h6" className={classes.subtitle} style={{ marginTop: 40 }}>
            Contact Details
          </DialogContentText>
          <hr style={{ marginBottom: 5 }} />
          <TextField
            fullWidth
            size="small"
            multiline
            rows={4}
            value={editQuestionContactDetail}
            onChange={(e) => SetEditQuestionContactDetail(e.target.value)}
          />
          <DialogContentText variant="h6" className={classes.subtitle} style={{ marginTop: 40 }}>
            Application Details
          </DialogContentText>
          <hr style={{ marginBottom: 5 }} />
          <TextField
            fullWidth
            size="small"
            multiline
            rows={4}
            value={editApplication}
            onChange={(e) => SetEditApplication(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button className={classes.back} onClick={props.back} variant="contained" autoFocus>
            Back
          </Button>
          <Button
            onClick={handleSave}
            className={classes.save}
            disableElevation
            variant="contained"
          >
            {loading ? <CircularProgress color="inherit" size="1.5rem" /> : <>Save</>}
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
        {!saved ? (
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
              Saved
            </DialogContentText>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
