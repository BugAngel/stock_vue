<template>
    <DatePicker type="daterange" :model-value="dateRange" :options="datePickerOptions" placement="bottom-end"
        placeholder="查询日期范围" @on-change="handleDatePickerChange" style="width: 200px" />
    <Button type="primary" @click="getStartStar()" :loading="isGetStartStarLoading">查询</Button>
    <Table :columns="columns" :data="startStarData" ref="table" style="margin-top:15px"></Table>
    <Page :model-value="pageNum" :page-size="pageSize" :total="dataTotal" :page-size-opts="pageSizeOpts" show-total
        show-sizer style="float:right;margin-top: 15px;" :on-change="handleCurrentChange"
        :on-page-size-change="handleSizeChange" />
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
                    "title": "次日涨幅",
                    "key": "next_day_close_rate",
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
                    "title": "次2日涨幅",
                    "key": "next_2day_close_rate",
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
                    "title": "次5日涨幅",
                    "key": "next_5day_close_rate",
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
                    "title": "次10日涨幅",
                    "key": "next_10day_close_rate",
                    "width": 150,
                    "sortable": true
                },
                {
                    "title": "次20日收盘价",
                    "key": "next_20day_close",
                    "width": 150,
                    "sortable": true
                },
                {
                    "title": "次20日涨幅",
                    "key": "next_20day_close_rate",
                    "width": 150,
                    "sortable": true
                }
            ],
            startStarData: [],
            isGetStartStarLoading: false,
            datePickerOptions: {
                shortcuts: [
                    {
                        text: '1 week',
                        value() {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            return [start, end];
                        }
                    },
                    {
                        text: '1 month',
                        value() {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            return [start, end];
                        }
                    },
                    {
                        text: '3 months',
                        value() {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            return [start, end];
                        }
                    }
                ]
            },
            dateRange: [this.$moment().subtract(7, 'days').format("YYYY-MM-DD"), this.$moment(new Date()).format('YYYY-MM-DD')],
            dataTotal: 0,
            pageSize: 100,
            pageNum: 1,
            pageSizeOpts: [10, 20, 50, 100]
        }
    },
    created(){
        this.getStartStar();
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
            let begin = this.dateRange[0].replaceAll('-', '');
            let end = this.dateRange[1].replaceAll('-', '');
            let { data: res } = await this.$http.get(`start_star/list`,
                {
                    params: {
                        begin: begin,
                        end: end,
                        pageNum: this.pageNum,
                        pageSize: this.pageSize
                    }
                }
            );
            this.dataTotal = res.data.total;
            this.startStarData = res.data.list;
            this.isGetStartStarLoading = false;
        },
        handleDatePickerChange(date) {
            this.dateRange = date;
        },
        // 监听 pagesize 改变的事件
        handleSizeChange(newSize) {
            this.pageSize = newSize;
            this.getStartStar();
        },
        // 监听页码值改变的事件
        handleCurrentChange(newPage) {
            this.pageNum = newPage;
            this.getStartStar();
        },
    }
}
</script>

<style scoped>

</style>