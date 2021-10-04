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
import DeclineReason from './DeclineReason';
import EditMode from './EditMode';

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
    float: 'right',
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
    position: 'fixed',
    top: 20
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

export default function ShopProductCard({ product, isActive, setHandleEvent, handleEvent }) {
  // console.log(product);
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
    applicationContactDetail,
    companyLogoURL
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
  const [editMode, setEditMode] = useState(false);

  let logoUrl = '';
  if (companyLogoURL) {
    logoUrl = companyLogoURL;
  } else {
    const { error } = useFetch(`https://logo.clearbit.com/${companyName}.com`);
    // console.log(error);
    if (error) {
      logoUrl = 'https://benti-energies.com/asset/images/clients/logo-default.svg';
    } else {
      logoUrl = `https://logo.clearbit.com/${companyName}.com`;
    }
  }

  const isError = (condition) => showErrors && condition;

  const handleClickOpen = () => {
    // console.log(product);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const openConfirm = () => {
    setConfirm(true);
  };
  const openEditMode = () => {
    setEditMode(true);
  };
  const closeEdit = () => {
    setEditMode(false);
  };

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  async function handleAccept() {
    // console.log(product);
    // console.log(product._id);
    try {
      setLoading(true);
      const response = await approveJob(product._id);
      if (response.status === 200) {
        setLoading(false);
        setConfirm(false);
        setOpen(false);
        // console.log(response);
        setHandleEvent(!handleEvent);
        setNotifyType('success');
        setNotifyMessage('Successfully accepted');
        setNotifyIsOpen(true);
        await timeout(5000);
        // window.location.reload();
      } else {
        console.log(response);
        setLoading(false);
        setNotifyType('error');
        setNotifyMessage(response.data.info);
        setNotifyIsOpen(true);
      }
    } catch (e) {
      setLoading(false);
      setConfirm(false);
      setOpen(false);
      setNotifyType('error');
      setNotifyMessage('Server Error');
      setNotifyIsOpen(true);
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
      const data = { _id: product._id, letter: declineReason };
      try {
        setLoading(true);
        // call api
        const response = await declineJob(data);
        if (response.status === 200) {
          setLoading(false);
          setOpen(false);
          setHandleEvent(!handleEvent);
          setNotifyType('success');
          setNotifyMessage('Successfully declined');
          setNotifyIsOpen(true);
          setDecline(false);
          // console.log(response);
          await timeout(5000);
          // window.location.reload();
        } else {
          // console.log(response);
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
            <img src={logoUrl} alt="not found" style={{ width: '8em' }} />
          </Box>
          <Typography color="textSecondary" gutterBottom>
            {convertFirstCharacterAllWordsToUppercase(companyName)}
          </Typography>
          <Typography variant="h5" component="h2">
            {convertFirstCharacterAllWordsToUppercase(positionName)}
          </Typography>
          <Typography color="textSecondary" variant="subtitle1">
            {convertFirstCharacterAllWordsToUppercase(jobHours)}
          </Typography>
          <Typography color="textSecondary">
            {convertFirstCharacterAllWordsToUppercase(jobContract)}
          </Typography>
          <Typography variant="subtitle1" component="p">
            {jobSalaryType != 'Market rate' ? (
              <>
                NZD $
                {jobSalary}
                {' '}
                {jobSalaryType}
              </>
            ) : (
              <>Market rate</>
            )}
          </Typography>
          <Typography color="textSecondary">
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
              logo={logoUrl}
              openEditMode={openEditMode}
            />
            <EditMode
              product={product}
              open={editMode}
              back={closeEdit}
              close={closeEdit}
              logo={logoUrl}
              setHandleEvent={setHandleEvent}
              handleEvent={handleEvent}
            />
            <DeclineReason
              product={product}
              open={decline}
              close={closeDecline}
              closeDialog={handleClose}
              logo={logoUrl}
              setHandleEvent={setHandleEvent}
              handleEvent={handleEvent}
            />
            <Dialog
              className={classes.dialogPaper}
              open={confirm}
              onClose={closeConfirm}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              fullWidth
            >
              <DialogTitle disableTypography justify="center" justifyContent="center">
                Do you want to accept this request?
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
                  {loading ? <CircularProgress color="inherit" size="1.5rem" /> : <>Confirm</>}
                </Button>
              </DialogActions>
            </Dialog>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
