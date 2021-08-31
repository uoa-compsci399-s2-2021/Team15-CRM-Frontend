import axios from 'axios';
import useFetch from './useFetch';

// https://cs399-team15.herokuapp.com/api/admin

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
export { sendEmailRequestToEmployer, getJobInfo };
