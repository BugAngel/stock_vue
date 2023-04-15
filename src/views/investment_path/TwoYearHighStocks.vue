<template>
    <DatePicker type="date" :model-value="date" placement="bottom-end" placeholder="查询日期"
        @on-change="handleDatePickerChange" style="width: 200px" />
    <br />
    <Button type="primary" @click="getData()" :loading="isGetDataLoading">查询</Button>
    <Table :columns="columns" :data="data" height="600" style="margin-top:15px"></Table>
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
                    "key": "tradeDate",
                    "fixed": "left",
                    "width": 100,
                    "sortable": true
                },
                {
                    "title": "次高日期",
                    "key": "secondHighDate",
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
                }
            ],
            data: [],
            isGetDataLoading: false,
            date: this.$moment(new Date()).format('YYYY-MM-DD')
        }
    },
    created() {
    },
    methods: {
        exportData() {
            this.$refs.table.exportCsv({
                filename: new Date().format('yyyy-MM-dd') + '上升回调数据',
                original: false
            });
        },
        // 获取2年新高股票数据
        async getData() {
            this.isGetDataLoading = true;
            let date = this.date.replaceAll('-', '');
            let queryInfo = {
                date: date
            };
            console.log(queryInfo);
            let { data: res } = await this.$http.get(`investment_path/two_year_high`,
                {
                    params: queryInfo
                }
            );

            // 原始数据处理
            res.data.map(function (item, index, self) {
                item.amount = (item.amount / 10).toFixed(2);
            })

            this.data = res.data;
            this.isGetDataLoading = false;
        },
        handleDatePickerChange(date) {
            this.date = date;
        }
    }
}
</script>

<style scoped></style>