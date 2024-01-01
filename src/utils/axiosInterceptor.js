import axios from 'axios';

const axiosInterceptor = () =>{
    var user_data=JSON.parse(localStorage.getItem('user_data'));
    const defaultOptions = {
        headers: {
        'tenant-code': user_data.data.tenant,
        }
    };
    let instance = axios.create(defaultOptions);
    // Set the AUTH token for any request
    instance.interceptors.request.use(function (config) {
        // const token = localStorage.getItem('token');
        config.headers.Authorization =  "sss";
        return config;
    });
    return instance;
};
export default axiosInterceptor();