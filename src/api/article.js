import axios from '../utils/axios'

export const listArticle = (article) => {
  return axios({
    url: '/article/showAll',
    method: 'post',
    data: article,
  })
}
