<template>
    <DatePicker type="daterange" :model-value="dateRange" :options="datePickerOptions" placement="bottom-end"
        placeholder="查询日期范围" @on-change="handleDatePickerChange" style="width: 200px" />
    <br/>
    <span>实体占整体比例</span> <InputNumber :max="1" :min="0" :step="0.1" v-model="threshold" />
    <br/>
    <Button type="primary" @click="getHammer()" :loading="isGetHammerLoading">查询</Button>
    <Table :columns="columns" :data="HammerData" height="600" style="margin-top:15px" ref="table"></Table>
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
                }
            ],
            HammerData: [],
            isGetHammerLoading: false,
            threshold: 0.3,
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
                filename: this.$moment(new Date()).format('YYYY-MM-DD') + '锤子数据',
                original: false
            });
        },
        // 获取启明星股票数据
        async getHammer() {
            this.isGetHammerLoading = true;
            let begin = this.dateRange[0].replaceAll('-', '');
            let end = this.dateRange[1].replaceAll('-', '');
            let { data: res } = await this.$http.get(`japan_candle/hammer_list`,
                {
                    params: {
                        begin: begin,
                        end: end,
                        threshold: this.threshold
                    }
                }
            );

            // 原始数据处理
            res.data.map(function(item,index,self){
                item.amount = (item.amount / 10).toFixed(2);
            })

            this.HammerData = res.data;
            this.isGetHammerLoading = false;
        },
        handleDatePickerChange(date) {
            this.dateRange = date;
        }
    }
}
</script>

<style scoped>

</style>