<template>
  <div id="articlelst">
    <template>
        <Button to="/home/articlelst/addarticle" icon="md-add" type="dashed">新建一篇文章</Button>
    </template>
    <br>
    <br>
    <Table :border="true"  :columns="columns12" :data="data6">
        <template slot-scope="{ row }" slot="name">
            <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
            <Button  size="small" style="margin-right: 5px" @click="show(index)">View</Button>
            <Button  size="small" @click="remove(index)">Delete</Button>
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
        data () {
            return {
                columns12: [
                    {
                        title: '文章名称',
                        align: 'center',
                        key: 'articleName'
                    },
                    {
                        title: '文章类型',
                        align: 'center',
                        key: 'articleType'
                    },
                    {
                        title: '文章作者',
                        align: 'center',
                        key: 'articleAuthor'
                    },
                    {
                        title: '文章状态',
                        align: 'center',
                        render: (h, params) => {
                            //return h('元素',{元素的性质},'内容')
                            return h('i-switch', {
                                    props: {
                                        size: "large",
                                        value: params.row.status == "true"
                                    }
                                    // on: {
                                    //     'on-change': (value) => {
                                    //         params.row.status = value;
                                    //         const th = this;
                                    //         axios.get(th.url + '/departmentType/updateStatus', {
                                    //             params: {
                                    //                 dId: params.row.dId,
                                    //                 status: value
                                    //             }
                                    //         }).then(function(res) {
                                    //             if (res.data.code === 1028) {
                                    //                 th.$Message.success(res.data.message);
                                    //             } else {
                                    //                 th.$Message.error(res.data.message);
                                    //                 th.changePage(1);
                                    //             }
                                    //         })

                                    //     }
                                    // }
                                },
                                [h('span', {
                                        slot: "open",
                                        domProps: {
                                            innerHTML: '打开'
                                        }
                                    }),
                                    h('span', {
                                        slot: "close",
                                        domProps: {
                                            innerHTML: '关闭'
                                        }
                                    }),
                                ]
                            )
                        }
                    },
                    {
                        title: "点赞数",
                        align: 'center',
                        key: 'likenumber',
                        sortable: true
                    },
                    {
                        title: "阅读数",
                        align: 'center',
                        key: 'readernumber',
                        sortable: true
                    },
                    {
                        title: '创建时间',
                        align: 'center',
                        key: 'createTime'
                    },
                    {
                        title: 'Action',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ],
                data6: [
                    {
                        articleName: '浅谈String',
                        articleType: 'JAVA',
                        articleAuthor: 'Hangli',
                        articleStatus: '可见',
                        likenumber: 4,
                        readernumber: 10,
                        createTime: '2019-3-19'
                    },
                    {
                        articleName: '浅谈String',
                        articleType: 'JAVA',
                        articleAuthor: 'Hangli',
                        articleStatus: '可见',
                        likenumber: 5,
                        readernumber: 10,
                        createTime: '2019-3-19'
                    }
                ]
            }
        },
        methods: {
            show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    width: 800,
                    height: 800,
                    content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
                })
            },
            remove (index) {
                this.data6.splice(index, 1);
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
