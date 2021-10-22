import axios from 'axios';

// https://cs399-team15.herokuapp.com/api/admin

// Config header
const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  },
};

// AUTH
async function login(loginInfo) {
  const response = await axios(
    'https://cs399-team15.herokuapp.com/api/auth/login',
    {
      headers: {
        'Content-type': 'application/json',
      },
      data: loginInfo,
      method: 'POST',
    }
  );
  return response;
}

async function getUserInfo(registerInfo) {
  const response = await axios.get(
    'https://cs399-team15.herokuapp.com/api/private/get-user-info',
    config
  );

  return response;
}

async function sendEmailRequestToEmployer(info) {
  const response = await axios(
    'https://cs399-team15.herokuapp.com/api/admin/send-request-email',
    {
      headers: {
        'Content-type': 'application/json',
      },
      data: info,
      method: 'POST',
    }
  );
  return response;
}

async function submitForm(pathname, info) {
  // console.log(info);
  const response = await axios(
    `https://cs399-team15.herokuapp.com/api/admin/send-back-requested-email/${pathname}`,
    {
      headers: {
        'Content-type': 'application/json',
      },
      data: info,
      method: 'PUT',
    }
  );
  return response;
}

async function getJobInfo() {
  const response = await axios(
    'https://cs399-team15.herokuapp.com/api/admin/get-job-info',
    {
      headers: {
        'Content-type': 'application/json',
      },
      method: 'GET',
    }
  );
  return response;
}

async function approveJob(id) {
  const response = await axios(
    'https://cs399-team15.herokuapp.com/api/admin/approve-job',
    {
      headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Credentials': true
      },
      data: { '_id': id },
      method: 'POST',
    }
  );
  return response;
}

async function declineJob(info) {
  const response = await axios(
    'https://cs399-team15.herokuapp.com/api/admin/decline-job',
    {
      headers: {
        'Content-type': 'application/json',
      },
      data: info,
      method: 'DELETE',
    }
  );
  return response;
}

// https://cs399-team15.herokuapp.com/api/admin/update-job-info/${info._id}

async function modifyJob(info) {
  const response = await axios(
    `https://cs399-team15.herokuapp.com/api/admin/update-job-info/${info._id}`,
    {
      headers: {
        'Content-type': 'application/json',
      },
      data: info,
      method: 'PUT',
    }
  );
  return response;
}

async function getEmpolyerDeleteInfo() {
  const response = await axios(
    'https://cs399-team15.herokuapp.com/api/admin/get-employer-delete-info',
    {
      headers: {
        'Content-type': 'application/json',
      },
      method: 'GET',
    }
  );
  return response;
}

async function deleteJob(info) {
  const response = await axios(
    'https://cs399-team15.herokuapp.com/api/admin/employer-delete-job',
    {
      headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Credentials': true
      },
      data: info,
      method: 'POST',
    }
  );
  return response;
}

async function setEmailNotification(info) {
  const response = await axios(
    'https://cs399-team15.herokuapp.com/api/admin/set-email-notification',
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
      data: info,
      method: 'POST',
    }
  );
  return response;
}

export {
  sendEmailRequestToEmployer, getJobInfo,
  submitForm, approveJob, declineJob, modifyJob, login,
  getUserInfo, getEmpolyerDeleteInfo, deleteJob, setEmailNotification
};
