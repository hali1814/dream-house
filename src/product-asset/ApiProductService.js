import axiosInstance from '../api-setup/SetUp'
import axios from 'axios';



export const getFullProduct = async () => {
    try {
        const response = await axiosInstance.get('/api/products');
        return response.data;
    }catch(e) {
        console.log(e.response);
        return e.response.data;
    }
}

export const insertProduct = async (data) => {
    try {
        const response = await axiosInstance.post('/api/products', data);
        console.log(response.data, 'api-service');
        return response.data;
    }catch(e) {
        console.log(e.response);
        return e.response.data;
    }
}

export const upLoadImage = async (image) => {
    try {
        const formData = new FormData();
        formData.append('image', image);
        const response = await axios.post('https://fpoly-hcm.herokuapp.com/api/media/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data.data;
    }catch(e) {
        console.log('loi',e);
        return e;
    }
}


export const deleteProduct = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/products/${id}/delete`);
        return response.data;
    }catch(e) {
        console.log(e.response);
        return e.response.data;
    }
}

export const updateProduct = async (data, id) => {
    try {
        const response = await axiosInstance.put(`/api/products/${id}/update`, data);
        return response.data;
    }catch(e) {
        console.log(e.response);
        return e.response.data;
    }
}

export const updateUser = async (data) => {
    try {
        const response = await axiosInstance.post('/api/users/update-profile', data);
        return response.data;
    }catch(e) {
        console.log(e.response);
        return e.response.data;
    }
}

export const logOut = async () => {
    try {
        const response = await axiosInstance.get('/api/auth/logout');
        return response.data;
    }catch(e) {
        console.log(e.response);
        return e.response.data;
    }
}