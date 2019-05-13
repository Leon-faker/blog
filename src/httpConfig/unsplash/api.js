 const baseUrl = 'http://118.25.155.229:9000' 
// const baseUrl = 'http://localhost:9000'


export default {
    checkLoginStatus: baseUrl + '/federik/checkLogin',//检查登录状态
    login: baseUrl + '/federik/loginuser', //登录接口
    addArticle: baseUrl + '/article/addArticle',//添加文章
    articleList: baseUrl + '/article/findArticlelst',//文章列表
    updateVisibleStatus: baseUrl + '/article/updateArticle',//更改文章可见状态
    findArticleType: baseUrl + '/articleType/findAll',//查找文章类型
    updateArticle: baseUrl + '/article/updateArticle',//修改文章
    delArtilce: baseUrl + '/article/delArticle',//删除文章
    articleTypeList: baseUrl + '/articleType/findAll',//文章类型列表
    addArticleType: baseUrl + '/articleType/addArticleType',//添加文章类型
    updateArticlType: baseUrl + '/articleType/updateArticleType',//修改文章类型
    delArticleType: baseUrl + '/articleType/removeArticleType',//删除文章类型
}