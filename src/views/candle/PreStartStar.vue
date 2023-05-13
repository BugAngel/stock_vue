<template>
    <DatePicker type="daterange" :model-value="dateRange" :options="datePickerOptions" placement="bottom-end"
        placeholder="查询日期范围" @on-change="handleDatePickerChange" style="width: 200px" />
    <Button type="primary" @click="getStartStar()" :loading="isGetStartStarLoading">查询</Button>
    <Table :columns="columns" :data="startStarData" height="600" style="margin-top:15px" ref="table"></Table>
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
            dateRange: [this.$moment().subtract(7, 'days').format("YYYY-MM-DD"), this.$moment(new Date()).format('YYYY-MM-DD')]
        }
    },
    created() {
    },
    methods: {
        exportData() {
            this.$refs.table.exportCsv({
                filename: this.$moment(new Date()).format('YYYY-MM-DD') + '预测启明星数据',
                original: false
            });
        },
        // 获取预测启明星股票数据
        async getStartStar() {
            this.isGetStartStarLoading = true;
            let begin = this.dateRange[0].replaceAll('-', '');
            let end = this.dateRange[1].replaceAll('-', '');
            let { data: res } = await this.$http.get(`japan_candle/pre_start_star_list`,
                {
                    params: {
                        begin: begin,
                        end: end
                    }
                }
            );
            // 原始数据处理
            res.data.map(function(item,index,self){
                item.amount = (item.amount / 10).toFixed(2);
                item.next_day_close_rate = ((item.next_day_close - item.close) / item.close * 100).toFixed(2) + '%';
                item.next_2day_close_rate = ((item.next_2day_close - item.close) / item.close * 100).toFixed(2) + '%';
                item.next_5day_close_rate = ((item.next_5day_close - item.close) / item.close * 100).toFixed(2) + '%';
                item.next_10day_close_rate = ((item.next_10day_close - item.close) / item.close * 100).toFixed(2) + '%';
                item.next_20day_close_rate = ((item.next_20day_close - item.close) / item.close * 100).toFixed(2) + '%';
            })

            this.startStarData = res.data;
            this.isGetStartStarLoading = false;
        },
        handleDatePickerChange(date) {
            this.dateRange = date;
        }
    }
}
</script>

<style scoped>

</style>