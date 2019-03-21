<template>
    <div id="articleType">
        <template>
            <Button @click="addDialog = true" icon="md-add" type="dashed">新建一个分类</Button>
        </template>
        <br>
        <br>
        <Table :border="true"  :columns="columns12" :data="data6">
            <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <Button  size="small" style="margin-right: 5px" @click="updateDialog = true">Edit</Button>
                <Button  size="small" @click="remove(index)">Delete</Button>
            </template>
        </Table>
        <br>
         <template>
            <Page :total="2" size="small" show-total />
        </template>
        <!-- 新建文章类型名称Dialog -->
        <Modal
            v-model="addDialog"
            title="新建文章类型"
            @on-ok="ok"
            @on-cancel="cancel">
            <div style="margin-left: 100px">
                <b>名称：</b>
                <Input v-model="typeName" placeholder="Enter Article Title" style="width:200px;" />
            </div>
        </Modal>
        <!-- 修改文章类型名称Dialog -->
        <Modal
            v-model="updateDialog"
            title="修改文章类型名称"
            @on-ok="ok"
            @on-cancel="cancel">
            <div style="margin-left: 100px">
                <b>名称：</b>
                <Input v-model="typeName" placeholder="Enter Article Title" style="width:200px;" />
            </div>
        </Modal>
    </div>
</template>



<script>
export default {
    data () {
        return{
            updateDialog: false,
            addDialog: false,
            columns12: [
                {
                    title: '分类名称',
                    align: 'center',
                    key: 'typeName'
                },
                {
                    title: '创建时间',
                    align: 'center',
                    key: 'createTime'
                },
                {
                    title: '最后一次修改时间',
                    align: 'center',
                    key: 'updateTime'
                }
                ,
                {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            data6: [
                {
                    typeName: 'JAVA',
                    createTime: '2019-3-19',
                    updateTime: '2019-3-19'
                },
                {
                    typeName: 'JAVA',
                    createTime: '2019-3-19',
                    updateTime: '2019-3-19'
                }
            ]
        }
    },
    methods: {
        remove (index) {
            this.data6.splice(index, 1);
        },
    }
}
</script>
