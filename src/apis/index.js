import axios from 'axios';
import useFetch from './useFetch';

// https://cs399-team15.herokuapp.com/api/admin

async function sendEmailRequestToEmployer(info) {
  const response = await axios(
    'http://localhost:5000/api/admin/send-request-email',
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
    'http://localhost:5000/api/admin/get-job-info',
    {
      headers: {
        'Content-type': 'application/json',
      },
      method: 'GET',
    }
  );
  return response;
}
export { sendEmailRequestToEmployer, getJobInfo, submitForm };
