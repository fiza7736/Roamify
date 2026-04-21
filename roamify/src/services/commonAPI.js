import axios from 'axios'

const commonAPI = async (httpMethod, url, reqBody, reqHeader) => {
    const reqConfig = {
        method: httpMethod,
        url,
        data: reqBody,
        headers: reqHeader
    }

    try {
        return await axios(reqConfig)
    } catch (err) {
        return err.response || {
            status: 500,
            data: "Something went wrong"
        }
    }
}

export default commonAPI
