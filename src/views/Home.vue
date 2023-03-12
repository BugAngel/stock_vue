<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-nav">
                        <MenuItem name="1" to="/origin">
                        <Icon type="ios-navigate"></Icon>
                        源数据
                        </MenuItem>
                        <MenuItem name="2" to="/pre_start_star">
                        <Icon type="ios-keypad"></Icon>
                        蜡烛图指标
                        </MenuItem>
                        <MenuItem name="3" to="/rising_correction">
                        <Icon type="ios-analytics"></Icon>
                        缠论
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider hide-trigger :style="{ background: '#fff' }">
                    <Menu active-name="this.$router.history.current.path" theme="light" width="auto" :open-names="['1']">
                        <Submenu name="1">
                            <template #title>
                                <Icon type="ios-keypad"></Icon>
                                源数据
                            </template>
                            <MenuItem name="1-1" to="/origin">更新源数据</MenuItem>
                            <MenuItem name="1-2">Option 2</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template #title>
                                <Icon type="ios-navigate"></Icon>
                                蜡烛图指标
                            </template>
                            <MenuItem name="2-1" to="/start_star">启明星</MenuItem>
                            <MenuItem name="2-2" to="/pre_start_star">预测启明星</MenuItem>
                            <MenuItem name="2-3" to="/hammer">锤子线</MenuItem>
                        </Submenu>
                        <Submenu name="3">
                            <template #title>
                                <Icon type="ios-analytics"></Icon>
                                缠论指标
                            </template>
                            <MenuItem name="3-1" to="/rising_correction">上升回调</MenuItem>
                            <MenuItem name="3-2">Option 2</MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{ padding: '0 24px 24px' }">
                    <Content :style="{ padding: '24px', minHeight: '280px', background: '#fff' }">
                        <!-- 路由占位符 -->
                        <router-view></router-view>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 左侧菜单数据
            menulist: [],
        };
    },
    created() { },
    methods: {
    },
};
</script>

<style scoped>
.layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    height: 100%;
}

.layout>.ivu-layout {
    height: 100%;
}

.layout-logo {
    width: 70px;
    height: 50px;
}

.layout-nav {
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
</style>
