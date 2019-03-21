<style scoped>
    .layout-con{
        height: 100%;
        width: 100%;
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
</style>
<template>
    <div class="layout">
       <Header style="background-color:#fff">
            <Menu style="background-color:#fff" mode="horizontal" theme="dark" active-name="1">
                <div class="layout-logo" style="color:rgb(81,90,110);font-size:2.5em">Federik's Home</div>
            </Menu>
        </Header>
        <Layout :style="{minHeight: '100vh'}">
            <Sider hide-trigger :style="{background: '#fff'}">
                    <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-stats" />
                                <b>统计管理</b>
                            </template>
                            <MenuItem name="2-1">浏览统计</MenuItem>
                            <MenuItem name="2-2">文章统计</MenuItem>
                        </Submenu>
                        <MenuItem name="1-1" to="/home/articlelst">
                            <Icon type="ios-paper" />
                            <b>文章管理</b>
                        </MenuItem>
                        <MenuItem name="1-12" to="/home/articleType">
                            <Icon type="ios-list-box" />
                            <b>分类管理</b>
                        </MenuItem>
                        <MenuItem name="1-15" to="/home/articlelst">
                            <Icon type="logo-twitch" />
                            <b>留言管理</b>
                        </MenuItem>
                        <MenuItem name="1-16" to="/home/articlelst">
                            <Icon type="ios-reorder" />
                            <b>日志管理</b>
                        </MenuItem>
                    </Menu>
                </Sider>
            <Layout>
                <Content :style="{padding: '0 16px 16px'}">
                    <Breadcrumb :style="{margin: '16px 0'}">
                        <BreadcrumbItem>Home</BreadcrumbItem>
                    </Breadcrumb>
                    <Card>
                        <div style="height: 600px">
                            <router-view/>
                        </div>
                    </Card>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
export default {
    data () {
        return {
            isCollapsed: false
        };
    },
    computed: {
        menuitemClasses: function () {
            return [
                'menu-item',
                this.isCollapsed ? 'collapsed-menu' : ''
            ]
        }
    }
}
</script>