import axios from 'axios';
import https from 'https';
const Axios =  axios.create({
    httpsAgent: new https.Agent({  
      rejectUnauthorized: false
    })
  });
  
export default Axios;