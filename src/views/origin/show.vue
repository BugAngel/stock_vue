<template>
    <Alert show-icon>用来看单个股票长期表现.直接看大量数据网页会崩溃</Alert>
    <DatePicker type="daterange" :model-value="dateRange" :options="datePickerOptions" placement="bottom-end"
        placeholder="查询日期范围" @on-change="handleDatePickerChange" style="width: 200px" />
    <br />
    股票代码：<Input v-model="symbol" placeholder="股票代码" style="width: 300px" />
    <br />
    股票名称：<Input v-model="name" placeholder="股票名称" style="width: 300px" />
    <br />
    产业：<Input v-model="industry" placeholder="产业" style="width: 300px" />
    <br />
    <Button type="primary" @click="getData()" :loading="isGetDataLoading">查询</Button>
    <Table :columns="columns" :data="data" height="600" style="margin-top:15px" ref="table"></Table>
</template>

<script>
export default {
    data() {
        return {
            columns: [
                {
                    "title": "交易日期",
                    "key": "tradeDate",
                    "fixed": "left",
                    "width": 150,
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
                    "title": "交易量",
                    "key": "vol",
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
                    "title": "开盘价",
                    "key": "open",
                    "width": 150,
                    "sortable": true
                },
                {
                    "title": "收盘价",
                    "key": "close",
                    "width": 180,
                    "sortable": true
                },
                {
                    "title": "涨幅/%",
                    "key": "pctChg",
                    "width": 150,
                    "sortable": true
                },

                {
                    "title": "最低价",
                    "key": "low",
                    "width": 150,
                    "sortable": true
                },
                {
                    "title": "最高价",
                    "key": "high",
                    "width": 150,
                    "sortable": true
                }
            ],
            data: [],
            isGetDataLoading: false,
            symbol: '',
            name: '',
            industry: '',
            dateRange: [this.$moment().subtract(7, 'days').format("YYYY-MM-DD"), this.$moment(new Date()).format('YYYY-MM-DD')]
        }
    },
    created() {
    },
    methods: {
        // 获取股票数据
        async getData() {
            this.isGetDataLoading = true;
            let begin = this.dateRange[0].replaceAll('-', '');
            let end = this.dateRange[1].replaceAll('-', '');
            let queryInfo = {
                begin: begin,
                end: end,
                symbol: this.symbol,
                name: this.name,
                industry: this.industry
            };
            let { data: res } = await this.$http.get(`stock_daily/daily_info`, { params: queryInfo });

            // 原始数据处理
            res.data.map(function (item, index, self) {
                item.amount = (item.amount / 10).toFixed(2);
            })

            this.data = res.data;
            this.isGetDataLoading = false;
        },
        handleDatePickerChange(dateRange) {
            this.dateRange = dateRange;
        }
    }
}
</script>

<style scoped></style>