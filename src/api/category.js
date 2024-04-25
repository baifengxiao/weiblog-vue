import axios from '../utils/axios'

//专门发送ajax请求
export const listCategory = () => {
  return axios({
    url: '/category',
    method: 'get',
  })
}

export const listCategoryByPage = (pageIndex, pageSize, category) => {
  return axios({
    url: `/category/${pageIndex}/${pageSize}`,
    method: 'post',
    data: category,
  })
}
