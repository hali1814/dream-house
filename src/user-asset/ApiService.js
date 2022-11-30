import axiosInstance from '../api-setup/SetUp';


export const login = async (data) => {
    try {
        const res = await axiosInstance.post('/api/auth/login', data);
        return res;
    }catch(err){
        console.log('ERR APISERVICE',err.response.data);
        return err.response.data;
    }
    
}



export const register = async (data) => {
    try {
        const res = await axiosInstance.post('/api/users/register', data);
        return res;
    }catch(err){
        console.log('ERR APISERVICE',err.response.data);
        return err.response.data;
    }
}