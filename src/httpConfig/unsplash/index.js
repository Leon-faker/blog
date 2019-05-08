import request from '../request'
import api from './api'

const header = {
    'Authorization': 'Client-ID xxxxxxx'
}

export default {
    checkLoginStatus (params) {
        return request.post(api.checkLoginStatus,params,header)
    },
    login (params) {
        return request.post(api.login,params,header)
    },
    addArticle (params) {
        return request.post(api.addArticle,params,header)
    },
    articleList (params) {
        return request.post(api.articleList,params,header)
    },
    updateVisibleStatus (params) {
        return request.post(api.updateVisibleStatus,params,header)
    },
    findArticleType (params) {
        return request.post(api.findArticleType,params,header)
    },
    updateArticle (params) {
        return request.post(api.updateArticle,params,header)
    },
    delArtilce (params) {
        return request.post(api.delArtilce,params,header)
    },
    articleTypeList (params) {
        return request.post(api.articleTypeList,params,header)
    },
    addArticleType (params) {
        return request.post(api.addArticleType,params,header)
    },
    updateArticlType (params) {
        return request.post(api.updateArticlType,params,header)
    },
    delArticleType (params) {
        return request.post(api.delArticleType,params,header)
    }
}