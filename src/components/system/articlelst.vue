<template>
  <div id="articlelst">
    <template>
        <router-link :to='{name: "addArticle",params: {
            model: 0
        }}'>
            <Button icon="md-add" type="dashed">新建一篇文章</Button>
        </router-link>
        
    </template>
    <br>
    <br>
    <Table :columns="columns12" :data="data">
        <!-- 文章类型转换  （待优化） -->
        <!-- <template slot-scope="{ row }" slot="articleType" v-if="row.articleTypeId == 1">
           Java
        </template>
        <template slot-scope="{ row }" slot="articleType" v-if="row.articleTypeId == 2">
           Mysql
        </template>-->
        <template slot-scope="{ row }" slot="status">
             <i-switch @on-change="updateStatus(row,$event)" style="background-color:rgb(129,216,208);border-color:rgb(129,216,208)" size="large" :value="row.articleStatus">
                <span slot="open">开启</span>
                <span slot="close">关闭</span>
            </i-switch>
        </template>
        <template slot-scope="{ row }" slot="articleType">
            <p v-if="row.articleTypeId == 1">Java</p>
            <p v-if="row.articleTypeId == 2">Mysql</p>
            <p v-if="row.articleTypeId == 3">Spring</p>
            <p v-if="row.articleTypeId == 4">Vue.js</p>
        </template>
        <template slot-scope="{ row }" slot="action">
           <!-- router-link 携带参数 -->
            <!-- <router-link :to='{name:"updateArticle", params:{
                model:1,
                articleId: row.articleId,
                articleName: row.articleName,
                articleTypeId: row.articleTypeId,
                articleStatus: row.articleStatus,
                articleContent: row.articleContent,
                }}'>
            </router-link> -->
            <Button  size="small" @click="toUpdate(row)" style="margin-right: 5px" to=''>Edit</Button>
            <Button  size="small" @click="remove(row)">Delete</Button>
        </template>
    </Table>
    <br/>
    <template>
        <Page :total="1" size="small" show-total />
    </template>
  </div>
</template>

<script>
export default {
    name: 'articlelst',
    inject: ['reload'],
    mounted () {
        // console.log("渲染之前")
        this.beforeObtainArticleAjax()
    },
    data () {
        return {
            //文章状态
            status: false,
            columns12: [
                {
                    title: '文章名称',
                    align: 'center',
                    key: 'articleName',
                    width: 270
                },
                {
                    title: '文章类型',
                    align: 'center',
                    slot: 'articleType',
                    key: 'articleTypeId'
                },
                {
                    title: '文章作者',
                    align: 'center',
                    key: 'articleAuthor'
                },
                {
                    title: '可见状态',
                    align: 'center',
                    slot: 'status',
                    key: 'articleStatus'
                    // render: (h, params) => {
                    //     //return h('元素',{元素的性质},'内容')
                    //     return h('i-switch', {
                    //             props: {
                    //                 size: "large",
                    //                 value: true
                    //             },
                    //             on: {
                    //                 'on-change': (value) => {
                    //                     params.row.status = value
                    //                     console.log(value)
                    //                     // const th = this;
                    //                     // axios.get(th.url + '/departmentType/updateStatus', {
                    //                     //     params: {
                    //                     //         dId: params.row.dId,
                    //                     //         status: value
                    //                     //     }
                    //                     // }).then(function(res) {
                    //                     //     if (res.data.code === 1028) {
                    //                     //         th.$Message.success(res.data.message);
                    //                     //     } else {
                    //                     //         th.$Message.error(res.data.message);
                    //                     //         th.changePage(1);
                    //                     //     }
                    //                     // })

                    //                 }
                    //             }
                    //         },
                    //         [h('span', {
                    //                 slot: "open",
                    //                 domProps: {
                    //                     innerHTML: '打开'
                    //                 }
                    //             }),
                    //             h('span', {
                    //                 slot: "close",
                    //                 domProps: {
                    //                     innerHTML: '关闭'
                    //                 }
                    //             }),
                    //         ]
                    //     )
                    // }
                },
                {
                    title: "点赞数",
                    align: 'center',
                    key: 'articleLikeNum',
                    sortable: true
                },
                {
                    title: "阅读数",
                    align: 'center',
                    key: 'articleReadNum',
                    sortable: true
                },
                {
                    title: '创建时间',
                    align: 'center',
                    key: 'articleCrTime'
                },
                {
                    title: 'Action',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            data: []
        }
    },
    methods: {
        //删除文章
        remove (row) {
            // this.data6.splice(index, 1);
            try {
                let params = {
                    articleId: row.articleId
                }
                let res = this.$api.unsplash.delArtilce(params)
                .then(res => {
                    if(res.resultCode == 200){
                    this.$Message.info(res.strDescribe);
                    }
                    if(res.resultCode == -100){
                        this.$Message.info(res.strDescribe);
                    }
                    this.reload()
                })
            } catch (res) {
                 this.$Message.info(res.strDescribe);
            }
        },
        //这里方法用ES6语法来写的话，会提示 $router undefined
        toUpdate (row) {
            //存储到localstorage
            this.$store.dispatch('changeAllValue',{
            "articleId":row.articleId,
            "articleName":row.articleName,
            "articleTypeId":row.articleTypeId,
            "articleStatus":row.articleStatus,
            "articleContent":row.articleContent
            })
            this.$router.push({path: '/home/articlelst/updateArticle'})
        },
        //更新可见状态
        updateStatus (row,value) {
            row.articleStatus = value
            try {
                let res = this.$api.unsplash.updateVisibleStatus({
                    articleId: row.articleId,//文章id
                    articleStatus: value?1:0//可见状态
                })
                .then(res => {
                    if(res.resultCode == 200){
                        this.$Message.info('更改可见状态成功');
                    }
                    if(res.resultCode == -100){
                        this.$Message.info('更改可见状态失败');
                    }
                })
            } catch (res) {
                this.$Message.info('更改可见状态失败');
            }
        },
        //渲染之前，文章列表请求
        beforeObtainArticleAjax () {
            try {
                let params = {
                    offset: 0,//文章id
                    limit: 10//可见状态
                }
                let res = this.$api.unsplash.articleList(params)
                .then(res => {
                    this.data = res.data
                })
            } catch (res) {
                
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
