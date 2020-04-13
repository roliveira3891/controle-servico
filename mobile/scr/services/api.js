import axios from 'axios';
import urlconfig from '../../url';


const api = axios.create({
    baseURL: urlconfig.url,
});

export default api;