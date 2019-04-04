import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        model:1,
        articleId: 0,
        articleName: localStorage.articleName || '上海',
        articleTypeId: '',
        articleStatus: '',
        articleContent: ''
    },
    actions: {
        //坑！ 多个参数需要打包成对象
        changeAllValue:(ctx,productor) => {
            console.log(productor)
            ctx.commit('MchangeAllValue',productor)
        }
    },
    mutations: {
        MchangeAllValue: (state,productor) => {
            state.model = productor.model
            state.articleId = productor.articleId
            state.articleName = productor.articleName
            state.articleTypeId = productor.articleTypeId
            state.articleStatus = productor.articleStatus
            state.articleContent = productor.articleContent

            //存储本地
            localStorage.model = productor.model
            localStorage.articleId = productor.articleId
            localStorage.articleName = productor.articleName
            localStorage.articleTypeId = productor.articleTypeId
            localStorage.articleStatus = productor.articleStatus
            localStorage.articleContent = productor.articleContent
        }
    }
})
