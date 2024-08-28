// import { fetchEndpoint1, postEndpoint2 } from './apiService';
// import apiClient from './apiClient';

// const userLogin = async (data,navigate) => {    
    
//     fetchEndpoint1()
//         .then(response => console.log(response.data))
//         .catch(error => console.error(error));
//     postEndpoint2(data)
//         .then(response => console.log(response.data))
//         .catch(error => console.error(error));
            
//     try {
//         const response = await apiClient.post('/auth/authentication');
//         console.log(response.data);
//         if (data.rol === "admin") {
//             navigate("/admindash");
//           } else if (data.rol === "mentor") {
//             navigate("/mentordash");
//           } else if (data.rol === "student") {
//             navigate("/egresadodash");
//           } else {
//             navigate("/home");
//           }
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// };
// export default userLogin;