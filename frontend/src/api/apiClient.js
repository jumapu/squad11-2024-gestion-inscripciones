import axios from 'axios';
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api', //https://gestioninscripciones.us-east-2.elasticbeanstalk.com/api/v1
  httpsAgent: false, // Disable HTTPS
  headers: {
    'Content-Type': 'application/json',
  },
});
apiClient.interceptors.request.use(
    config => {
      // Add authorization token to every request
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => Promise.reject(error)
  );
export default apiClient;