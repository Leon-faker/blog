<template>
    <div id="articleType">
        <template>
            <Button @click="addDialog = true" icon="md-add" type="dashed">新建一个分类</Button>
        </template>
        <br>
        <br>
        <Table :border="true"  :columns="columns12" :data="data">
            <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
            </template>
            <template slot-scope="{ row }" slot="action">
                <Button  size="small" style="margin-right: 5px" @click="edit(row)">Edit</Button>
                <Button  size="small" @click="remove(row)">Delete</Button>
            </template>
        </Table>
        <br>
         <template>
            <Page :total="2" size="small" show-total />
        </template>
        <!-- 新建文章类型名称Dialog -->
        <Modal
            v-model="addDialog"
            title="新建文章类型">
            <div style="margin-left: 100px">
                <b>名称：</b>
                <Input v-model="articleTypeName" placeholder="Enter Article Title" style="width:200px;" />
            </div>
            <div slot="footer">
                <Button type="text" size="large" @click="addDialog = false">取消</Button>
                <Button type="primary" size="large" :loading="loading" @click="save()">确定</Button>
            </div>
        </Modal>
        <!-- 修改文章类型名称Dialog -->
        <Modal
            v-model="updateDialog"
            title="修改文章类型名称"
            @on-ok="update()">
            <div style="margin-left: 100px">
                <b>名称：</b>
                <input type="hidden" v-model="articleTypeId"/>
                <Input v-model="articleTypeName" placeholder="Enter Article Title" style="width:200px;" />
            </div>
            <div slot="footer">
                <Button type="text" size="large" @click="updateDialog = false">取消</Button>
                <Button type="primary" size="large" @click="update()">确定</Button>
            </div>
        </Modal>
       
    </div>
</template>



<script>
export default {
    name: "articleType",
    inject: ['reload'],
    mounted () {
        this.beforeObtainArticleTypeAjax()
    },
    data () {
        return{
            updateDialog: false,
            addDialog: false,
            loading: false,
            //类型名称
            articleTypeId: 0,
            articleTypeName: '',
            columns12: [
                {
                    title: '分类名称',
                    align: 'center',
                    key: 'articleTypeName'
                },
                {
                    title: '创建时间',
                    align: 'center',
                    key: 'articleCrTime'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            data: []
        }
    },
    methods: {
        edit (row) {
            this.articleTypeName = row.articleTypeName
            this.articleTypeId = row.articleTypeId
            this.updateDialog = true;
        },
        //删除文章类型
        remove (row) {
            this.$ajax.post
            (
                this.$global.serverPath+'/articleType/removeArticleType',
                JSON.stringify({
                    articleTypeId: row.articleTypeId//文章id
                }),
                {headers: {'Content-type': 'application/json;charset=UTF-8'}}
            )
            .then(function(res){
                if(res.data.resultCode == 200){
                    this.$Message.info(res.data.strDescribe);
                    this.reload()
                }
                if(res.data.resultCode == -100){
                    this.$Message.info(res.data.strDescribe);
                }
            }.bind(this))
            .catch(function(res){
                console.log(res)
            })
        },
        //保存文章类型
        save () {
            if(this.articleTypeName == ""){
                this.$Message.info("请输入类型名称")
                // setTimeout(() => {
                //     this.loading = false
                // }, 2000)
                return
            }
            this.$ajax.post
            (
                this.$global.serverPath+'/articleType/addArticleType',
                JSON.stringify({
                    articleTypeName: this.articleTypeName//文章id
                }),
                {headers: {'Content-type': 'application/json;charset=UTF-8'}}
            )
            .then(function(res){
                if(res.data.resultCode == 200){
                    this.reload()
                    this.$Message.info(res.data.strDescribe);
                    this.addDialog = false
                }
                if(res.data.resultCode == -100){
                    this.$Message.info(res.data.strDescribe);
                }
            }.bind(this))
            .catch(function(res){
                console.log(res)
            })
        },
        //修改文章类型
        update () {
            this.$ajax.post
            (
                this.$global.serverPath+'/articleType/updateArticleType',
                JSON.stringify({
                    articleTypeId: this.articleTypeId,//文章id
                    articleTypeName: this.articleTypeName // 文章类型名称
                }),
                {headers: {'Content-type': 'application/json;charset=UTF-8'}}
            )
            .then(function(res){
                if(res.data.resultCode == 200){
                    this.reload()
                    this.$Message.info(res.data.strDescribe);
                }
                if(res.data.resultCode == -100){
                    this.$Message.info(res.data.strDescribe);
                }
            }.bind(this))
            .catch(function(res){
                console.log(res)
            })
        },
        //渲染之前，文章列表请求
        beforeObtainArticleTypeAjax () {
            this.$ajax.post
            (
                this.$global.serverPath+'/articleType/findAll',
                //{
                // get 请求参数格式
                // params: {
                //     offset: 0,
                //     limit: 10
                // }
                //},
                JSON.stringify({
                    offset: 0,//文章id
                    limit: 10//可见状态
                }),
                {headers: {'Content-type': 'application/json;charset=UTF-8'}}
            )
            .then(function(res){
                this.data = res.data.data
            }.bind(this))
            .catch(function(res){
                console.log(res)
            })
        }
    }
}
</script>
