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
  TextField,
  Snackbar,
  Alert
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { green, red } from '@material-ui/core/colors';
// utils
import { fDate } from '../../../utils/formatTime';
import { convertFirstCharacterAllWordsToUppercase } from '../../../utils/formatString';
//
import Label from '../../Label';
import { approveJob, declineJob } from '../../../apis/index';
import useFetch from '../../../apis/useFetch';
import Information from './Information';

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
    marginRight: 180,
    width: 300,
    '&:hover': {
      backgroundColor: '#66bb6a'
    }
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
  submit: {
    marginRight: 18,
    fontSize: 15,
    width: 100,
    '&:hover': {
      backgroundColor: '#45b2e6'
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
  },
  confirmButton: {
    backgroundColor: '#058714',
    '&:hover': {
      backgroundColor: '#66bb6a'
    }
  },
  no: {
    backgroundColor: '#de3521',
    '&:hover': {
      backgroundColor: '#ef5350'
    }
  }
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object
};

export default function ShopProductCard({ product, isActive }) {
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
  } = product;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [decline, setDecline] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [notifyIsOpen, setNotifyIsOpen] = useState(false);
  const [notifyType, setNotifyType] = useState('');
  const [notifyMessage, setNotifyMessage] = useState('');
  const [declineReason, setDeclineReason] = useState('');
  const [showErrors, setShowErrors] = useState(false);
  const [loading, setLoading] = useState(false);

  let logoUrl = `https://logo.clearbit.com/${companyName}.com`;

  const isError = (condition) => showErrors && condition;

  const handleClickOpen = () => {
    console.log(product);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const openConfirm = () => {
    setConfirm(true);
  };

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  async function handleAccept() {
    console.log(product);
    console.log(product._id);
    try {
      setLoading(true);
      const response = await approveJob(product._id);
      if (response.status === 200) {
        setLoading(false);
        setConfirm(false);
        setOpen(false);
        setNotifyType('success');
        console.log(response);
        setNotifyMessage('Successfully accepted');
        setNotifyIsOpen(true);
        await timeout(5000);
        window.location.reload();
      } else {
        console.log(response);
        setLoading(false);
        setNotifyType('error');
        setNotifyMessage(response.data.info);
        setNotifyIsOpen(true);
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }
  
  const closeConfirm = () => {
    setConfirm(false);
  };
  const handleDecline = () => {
    setDecline(true);
  };
  const closeDecline = () => {
    setDecline(false);
  };
  
  async function handleSubmitDecline() {
    if (declineReason.length != 0 && declineReason.length <= 1200) {
      const data = { '_id': product._id, 'letter': declineReason };
      try {
        setLoading(true);
        const response = await declineJob(data);
        if (response.status === 200) {
          setLoading(false);
          setOpen(false);
          setNotifyType('success');
          setNotifyMessage('Successfully declined');
          setNotifyIsOpen(true);
          setDecline(false);
          console.log(response);
          await timeout(5000);
          window.location.reload();
        } else {
          console.log(response);
          setLoading(false);
          setNotifyType('error');
          setNotifyMessage(response.data.info);
          setNotifyIsOpen(true);
        }
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
    } else {
      setShowErrors(true);
    }
  }
  
  const closeNotification = () => {
    setNotifyIsOpen(false);
  };

  const { error } = useFetch(`https://logo.clearbit.com/${companyName}.com`);
  // console.log(error);
  if (error) {
    logoUrl = 'https://logo.clearbit.com/hello.com';
  }

  return (
    <Card>
      <Stack spacing={2} sx={{ p: 3 }}>
        <div>
          <Snackbar
            style={{ marginTop: 50, position: 'fixed' }}
            open={notifyIsOpen}
            autoHideDuration={5000}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            onClose={closeNotification}
            outlined
          >
            <Alert severity={notifyType} onClose={closeNotification}>
              {notifyMessage}
            </Alert>
          </Snackbar>
          <Box justifyContent="center" alignItems="center" display="flex" sx={{ p: 1 }}>
            <img src={logoUrl} alt={companyName} />
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
            NZD $
            {jobSalary}
            <br />
            {convertFirstCharacterAllWordsToUppercase(jobLocation)}
          </Typography>
        </div>

        <Stack alignItems="center" justifyContent="space-between">
          {/* <ColorPreview colors={colors} /> */}
          <Typography variant="subtitle1">
            <Button variant="outlined" onClick={handleClickOpen}>
              Learn more
            </Button>
            <Information
              product={product}
              open={open}
              decline={handleDecline}
              accept={openConfirm}
              close={handleClose}
              isActive={isActive}
            />
            <Dialog
              className={classes.dialogPaper}
              open={decline}
              onClose={closeDecline}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              fullWidth
            >
              <DialogTitle disableTypography justify="center" justifyContent="center">
                <Typography variant="h5" display="inline">
                  Reasons for declining
                </Typography>
                <IconButton onClick={closeDecline} style={{ float: 'right' }}>
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent>
                <TextField
                  value={declineReason}
                  onChange={(e) => setDeclineReason(e.target.value)}
                  multiline
                  rows={8}
                  fullWidth
                  error={isError(declineReason.length === 0) || isError(declineReason.length > 1200)}
                  helperText={
                    (isError(declineReason.length === 0) && 'Please enter the reasons for declining this request') ||
                    (isError(declineReason.length > 1200) &&
                      'The description connot exceed 1200 characters')
                  }
                />
              </DialogContent>
              <DialogActions>
                <Button
                  className={classes.submit}
                  onClick={handleSubmitDecline}
                  variant="contained"
                  autoFocus
                >
                  {loading ? (
                    <CircularProgress color="inherit" size="1.5rem" />
                  ) : (
                    <>Submit</>
                  )}
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              className={classes.dialogPaper}
              open={confirm}
              onClose={closeConfirm}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              fullWidth
            >
              <DialogTitle disableTypography justify="center" justifyContent="center">
                Are you sure you want to accept?
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  This action cannot be undo after proceed.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={closeConfirm} variant="contained" className={classes.no} autoFocus>
                  Back
                </Button>
                <Button
                  onClick={handleAccept}
                  variant="contained"
                  className={classes.confirmButton}
                  autoFocus
                >
                  {loading ? (
                    <CircularProgress color="inherit" size="1.5rem" />
                  ) : (
                    <>Confirm</>
                  )}
                </Button>
              </DialogActions>
            </Dialog>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
