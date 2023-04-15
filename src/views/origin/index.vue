<template>
    <Space direction="vertical">
        <Space wrap>
            <Button type="success" @click="updateAll()" :loading="isGetAllLoading" size="large">更新全部数据</Button>
        </Space>
        <Space wrap>
            <Button type="info" @click="getDaily()" :loading="isGetDailyLoading">更新每日股票数据</Button>
        </Space>
        <Space wrap>
            <Button type="info" @click="getHsConst()" :loading="isGetHsConstLoading">更新沪深股通成份股数据</Button>
        </Space>
        <Space wrap>
            <Button type="info" @click="getStockBasic()" :loading="isGetStockBasicLoading">更新股票基础信息数据</Button>
        </Space>
        <Space wrap>
            <Button type="info" @click="getTradeCal()" :loading="isGetTradeCalLoading">更新交易日历数据</Button>
        </Space>
    </Space>
</template>
<script>
export default {
    data() {
        return {
            isGetAllLoading: false,
            isGetDailyLoading: false,
            isGetHsConstLoading: false,
            isGetStockBasicLoading: false,
            isGetTradeCalLoading: false,
        }
    },
    created() {
    },
    methods: {
        // 更新全部数据
        updateAll() {
            this.isGetAllLoading = true;
            getDaily();
            this.$Message.success('更新每日数据成功');
            getHsConst();
            this.$Message.success('更新沪深股通成份股数据成功');
            getStockBasic();
            this.$Message.success('更新股票基础信息数据成功');
            getTradeCal();
            this.$Message.success('更新交易日历信息数据成功');
            this.isGetAllLoading = false;
            return this.$Message.success('全部更新成功');
        },
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
        },
        // 更新均线数据
        async getAvgLine() {
            this.isGetAvgLineLoading = true;
            let { data: res } = await this.$http.get(`/avg_line/update_all_recent`);
            this.isGetAvgLineLoading = false;
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