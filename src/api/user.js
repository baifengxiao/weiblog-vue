import axios from '../utils/axios'

export const login = (user) => {
  return axios({
    url: '/user/login',
    method: 'post',
    data: user,
  })
}
