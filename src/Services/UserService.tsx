import axiosInstance from "../Interceptor/AxiosInterceptor";

const base_url = "http://localhost:8080/users/"

const registerUser = async (user:any)=>{
    return axiosInstance.post(`/users/register`, user)
    .then(res=>res.data)
    .catch(error=>{throw error;});
}

const loginUser = async (login:any)=>{
    return axiosInstance.post(`/users/login`, login)
    .then(res=>res.data)
    .catch(error=>{throw error;});
}

const sendOtp = async (email:any)=>{
    return axiosInstance.post(`/users/send-otp/${email}`)
    .then(res=>res.data)
    .catch(error=>{throw error;});
}

const verifyOtp = async (email:any, otp:any)=>{
    return axiosInstance.get(`/users/verify-otp/${email}/${otp}`)
    .then(res=>res.data)
    .catch(error=>{throw error;});
}

const changePassword = async (email:string, password:string)=>{
    const changePassData={email, password}
    return axiosInstance.post(`/users/change-pass`,changePassData)
    .then(res=>res.data)
    .catch(error=>{throw error;});
}

export {registerUser, loginUser, sendOtp, verifyOtp, changePassword};