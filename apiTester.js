import axios, { AxiosError } from 'axios';
// const name = (params) => {
    
// }
try {
    const { data, status } = await axios.get(`http://localhost:5800/quiz/3`);
    console.log(data);
} catch (error) {
    console.log(error.message);
}


