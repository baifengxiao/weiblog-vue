import axios from '../utils/axios'

export const listArticle = (article) => {
  return axios({
    url: '/article/showAll',
    method: 'post',
    data: article,
  })
}

export const showArticle = (id) => {
  return axios({
    url: `/article/${id}`,
    method: 'get',
  })
}

export const listArticleByUid = (uid) => {
  return axios({
    url: `/article/showAllByUid/${uid}`,
    method: 'get',
  })
}

export const updataArticleById = (article) => {
  return axios({
    url: `/article/`,
    method: 'put',
    data: article,
  })
}

export const insertArticle = (article) => {
  return axios({
    url: `/article/`,
    method: 'post',
    data: article,
  })
}

export const deleteArticleById = (id) => {
  return axios({
    url: `/article/${id}`,
    method: 'delete',
    data: id,
  })
}
