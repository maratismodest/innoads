import axios from 'axios';

const baseURL = process.env.SOME_API_URL || 'http://localhost:1337';

const ApiClient = () => {
    const defaultOptions = {
        // baseURL,
    };

    const instance = axios.create(defaultOptions);

    instance.interceptors.request.use((request) => {
        request.headers = {
            secret: `${process.env.NEXT_PUBLIC_SECRET}`
        }
        // request.headers.Authorization = `Bearer ${session.jwt}`;
        return request;
    });

    instance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            console.log(`error`, error);
        },
    );

    return instance;
};

export default ApiClient();
