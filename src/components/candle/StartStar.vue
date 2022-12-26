<template>
    <Button type="primary" @click="getStartStar()" :loading="isGetStartStarLoading">查询</Button>
    <Table :columns="columns" :data="data" ref="table" style="margin-top:15px"></Table>
    <Space class="ivu-mt" wrap>
        <Button type="primary" @click="exportData()">
            <Icon type="ios-download-outline"></Icon> 导出数据
        </Button>
    </Space>
</template>
<script>
export default {
    data() {
        return {
            columns: [
                {
                    "title": "交易日期",
                    "key": "trade_date",
                    "fixed": "left",
                    "width": 100,
                    "sortable": true
                },
                {
                    "title": "股票代码",
                    "key": "symbol",
                    "width": 150,
                    "sortable": true
                },
                {
                    "title": "股票名称",
                    "key": "name",
                    "width": 150,
                    "sortable": true
                },
                {
                    "title": "产业",
                    "key": "industry",
                    "width": 150,
                    "sortable": true
                },
                {
                    "title": "交易额/万",
                    "key": "amount",
                    "width": 150,
                    "sortable": true
                },
                {
                    "title": "当日收盘价",
                    "key": "close",
                    "width": 150,
                    "sortable": true
                },
                {
                    "title": "次日收盘价",
                    "key": "next_day_close",
                    "width": 150,
                    "sortable": true
                },
                {
                    "title": "次2日收盘价",
                    "key": "next_2day_close",
                    "width": 150,
                    "sortable": true
                },
                {
                    "title": "次5日收盘价",
                    "key": "next_5day_close",
                    "width": 150,
                    "sortable": true
                },
                {
                    "title": "次10日收盘价",
                    "key": "next_10day_close",
                    "width": 150,
                    "sortable": true
                },
                {
                    "title": "次20日收盘价",
                    "key": "next_20day_close",
                    "width": 150,
                    "sortable": true
                }
            ],
            data: [],
            isGetStartStarLoading: false
        }
    },
    methods: {
        exportData() {
            this.$refs.table.exportCsv({
                filename: new Date().format('yyyy-MM-dd') + '启明星数据',
                original: false
            });
        },
        // 获取启明星股票数据
        async getStartStar() {
            this.isGetStartStarLoading = true;
            let { data: res } = await this.$http.get(`start_star`,
                {
                    params: { firstDate: 20221213,
                        secondDate: 20221214,
                        thirdDate: 20221215
                     }
                }
            );
            res = JSON.parse(res)
            let startStarData = []
            for (let item of res) {
                startStarData.push({ "trade_date": item.fields.trade_date, "symbol": item.fields.symbol, "name": item.fields.name, "industry": item.fields.industry, "amount": item.fields.amount / 10 })
            }
            this.data = startStarData
            this.isGetStartStarLoading = false;
        },
    }
}
</script>

<style scoped>

</style>