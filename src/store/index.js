import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        model:1,
        articleId: 0,
        articleName: '',
        articleTypeId: '',
        articleStatus: '',
        articleContent: ''
    },
    actions: {
        //坑！ 多个参数需要打包成对象
        changeAllValue:(ctx,productor) => {
            ctx.commit('MchangeAllValue',productor)
        }
    },
    mutations: {
        MchangeAllValue: (state,productor) => {
            state.articleId = productor.articleId
            state.articleName = productor.articleName
            state.articleTypeId = productor.articleTypeId
            state.articleStatus = productor.articleStatus
            state.articleContent = productor.articleContent

            //存储本地
            sessionStorage.articleId = productor.articleId
            sessionStorage.articleName = productor.articleName
            sessionStorage.articleTypeId = productor.articleTypeId
            sessionStorage.articleStatus = productor.articleStatus
            sessionStorage.articleContent = productor.articleContent
        }
    }
})
