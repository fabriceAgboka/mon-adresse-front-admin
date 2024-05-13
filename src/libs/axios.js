import router from '../router/index'; // Ajoutez le chemin correct
import Vue from 'vue'
// axios
import axios from 'axios'
import auth from '../helpers/auth'

// axios.defaults.baseURL = 'http://localhost:8000/api/v1'
// axios.defaults.baseURL = 'https://monadresse.cestlacom.com/api/v1'
axios.defaults.baseURL = 'https://api.monadresseplus.ca/api/v1'

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + auth.getSession()
axios.defaults.headers.common['client'] = '$2y$10$jNEnQLLrG7.7BJSAnUDhwelxLbVi2/4GJrz3YPRA3Fu2RPLCHVUWW'
axios.defaults.headers.post['content-Type'] = 'application/json'
axios.defaults.headers.post['cache-control'] = 'no-cache'
axios.defaults.headers.common['content-type'] = 'application/json';
const axiosIns = axios.create({
	// You can add your headers here
})

// Intercepteur pour gérer les erreurs
axiosIns.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response.status === 401) {
			// Rediriger vers la page de connexion
			router.push('/login');
		}
		return Promise.reject(error);
	}
);

Vue.prototype.$http = axiosIns

export default axiosIns