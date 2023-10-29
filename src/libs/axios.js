import Vue from 'vue'
// axios
import axios from 'axios'
import auth from '../helpers/auth'

axios.defaults.baseURL = 'http://localhost:8000/api/v1'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + auth.getSession()
axios.defaults.headers.common['client'] = '$2y$10$jNEnQLLrG7.7BJSAnUDhwelxLbVi2/4GJrz3YPRA3Fu2RPLCHVUWW'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

const axiosIns = axios.create({
	// You can add your headers here
})

Vue.prototype.$http = axiosIns

export default axiosIns