import SERVER_URL from './serverURL'
import commonAPI from './commonAPI'

export const registerAPI=async(reqBody)=>{
    return await commonAPI('POST',`${SERVER_URL}/register`,reqBody)
}

export const loginAPI=async(reqBody)=>{
    return await commonAPI('POST',`${SERVER_URL}/login`,reqBody)
}

