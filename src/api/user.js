import axios from '../utils/axios'

export const login = (user) => {
  return axios({
    url: '/user/login',
    method: 'post',
    data: user,
  })
}

export const showUserByUid=(uid)=>{
  return axios({
    url: `/user/${uid}`,
    method: 'get',
  })
}
export const  updateUser=(userInfo)=>{
  return axios({
    url:`/user`,
    method:`put`,
    data:userInfo
  })
}