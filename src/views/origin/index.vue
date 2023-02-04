<template>
    <Space direction="vertical">
        <Space wrap>
            <Button type="primary" @click="getDaily()" :loading="isGetDailyLoading">更新每日股票数据</Button>
        </Space>
        <Space wrap>
            <Button type="info" @click="getHsConst()" :loading="isGetHsConstLoading">更新沪深股通成份股数据</Button>
        </Space>
        <Space wrap>
            <Button type="primary" @click="getStockBasic()" :loading="isGetStockBasicLoading">更新股票基础信息数据</Button>
        </Space>
        <Space wrap>
            <Button type="success" @click="getTradeCal()" :loading="isGetTradeCalLoading">更新交易日历数据</Button>
        </Space>
    </Space>
</template>
<script>
export default {
    data() {
        return {
            isGetDailyLoading: false,
            isGetHsConstLoading: false,
            isGetStockBasicLoading: false,
            isGetTradeCalLoading: false,
        }
    },
    created() {
    },
    methods: {
        // 更新每日股票数据
        async getDaily() {
            this.isGetDailyLoading = true;
            let { data: res } = await this.$http.get(`/origin/daily`);
            this.isGetDailyLoading = false;
            if (res.status !== 200) {
                return this.$Message.error(res.msg);
            } else {
                return this.$Message.success(res.msg);
            }
        },
        // 更新沪深股通成份股数据
        async getHsConst() {
            this.isGetHsConstLoading = true;
            let { data: res } = await this.$http.get(`/origin/hs_const`);
            this.isGetHsConstLoading = false;
            if (res.status !== 200) {
                return this.$Message.error(res.msg);
            } else {
                return this.$Message.success(res.msg);
            }
        },
        // 更新股票基础信息数据
        async getStockBasic() {
            this.isGetStockBasicLoading = true;
            let { data: res } = await this.$http.get(`/origin/stock_basic`);
            this.isGetStockBasicLoading = false;
            if (res.status !== 200) {
                return this.$Message.error(res.msg);
            } else {
                return this.$Message.success(res.msg);
            }
        },
        // 更新交易日历数据
        async getTradeCal() {
            this.isGetTradeCalLoading = true;
            let { data: res } = await this.$http.get(`/origin/trade_cal`);
            this.isGetTradeCalLoading = false;
            if (res.status !== 200) {
                return this.$Message.error(res.msg);
            } else {
                return this.$Message.success(res.msg);
            }
        }
    }
}
</script>

<style scoped>

</style>