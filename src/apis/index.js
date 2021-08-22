import axios from "axios";


async function sendEmailRequestToEmployer(info) {
    const response = await axios(
        "https://cs399-team15.herokuapp.com/api/admin/send-request-email",
        {
            headers: {
                "Content-type": "application/json",
            },
            data: info,
            method: "POST",
        }
    );
    return response;
}


export default sendEmailRequestToEmployer;