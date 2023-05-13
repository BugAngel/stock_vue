<template>
    <Tabs value="name1">
        <TabPane label="2年新高" name="high">
            <DatePicker type="date" :model-value="date" placement="bottom-end" placeholder="查询日期"
                @on-change="handleDatePickerChange" style="width: 200px" />
            <br />
            <Button type="primary" @click="getData()" :loading="isGetDataLoading">查询</Button>
            <Table :columns="columns" :data="data" height="600" style="margin-top:15px" ref="table"></Table>
            <Space class="ivu-mt" wrap>
                <Button type="primary" @click="exportData()">
                    <Icon type="ios-download-outline"></Icon> 导出数据
                </Button>
            </Space>
        </TabPane>
        <TabPane label="接近2年新高" name="nearHigh">
            <DatePicker type="date" :model-value="date" placement="bottom-end" placeholder="查询日期"
                @on-change="handleDatePickerChange" style="width: 200px" />
            <InputNumber :max="1" :min="0" :step="0.01" v-model="threshold" />
            <br />
            <Button type="primary" @click="getNearHighData()" :loading="isGetDataLoading2">查询</Button>
            <Table :columns="columns2" :data="data2" height="600" style="margin-top:15px" ref="table2"></Table>
            <Space class="ivu-mt" wrap>
                <Button type="primary" @click="exportData2()">
                    <Icon type="ios-download-outline"></Icon> 导出数据
                </Button>
            </Space>
        </TabPane>
    </Tabs>
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
                    "title": "交易额/万",
                    "key": "amount",
                    "width": 150,
                    "sortable": true
                },
                {
                    "title": "当日收盘价(后复权)",
                    "key": "close",
                    "width": 180,
                    "sortable": true
                },
                {
                    "title": "当日涨幅/%",
                    "key": "pctChg",
                    "width": 150,
                    "sortable": true
                },
                {
                    "title": "次高日期",
                    "key": "secondHighDate",
                    "width": 150,
                    "sortable": true
                },
                {
                    "title": "次高价格",
                    "key": "secondHighClose",
                    "width": 150,
                    "sortable": true
                },
                {
                    "title": "与次高价格相比涨幅/%",
                    "key": "secondHighChg",
                    "width": 200,
                    "sortable": true
                },
            ],
            columns2: [
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
                    "title": "交易额/万",
                    "key": "amount",
                    "width": 150,
                    "sortable": true
                },
                {
                    "title": "当日收盘价(后复权)",
                    "key": "close",
                    "width": 180,
                    "sortable": true
                },
                {
                    "title": "当日涨幅/%",
                    "key": "pctChg",
                    "width": 150,
                    "sortable": true
                }
            ],
            data: [],
            data2: [],
            isGetDataLoading: false,
            isGetDataLoading2: false,
            threshold: 0.05,
            date: this.$moment(new Date()).format('YYYY-MM-DD')
        }
    },
    created() {
    },
    methods: {
        exportData() {
            this.$refs.table.exportCsv({
                filename: this.$moment(new Date()).format('YYYY-MM-DD') + '两年新高数据',
                original: false
            });
        },
        exportData2() {
            this.$refs.table2.exportCsv({
                filename: this.$moment(new Date()).format('YYYY-MM-DD') + '接近两年新高的股票数据',
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
            let { data: res } = await this.$http.get(`investment_path/two_year_high`,
                {
                    params: queryInfo
                }
            );

            // 原始数据处理
            res.data.map(function (item, index, self) {
                item.amount = (item.amount / 10).toFixed(2);
                item.secondHighChg = ((item.close - item.secondHighClose) / item.secondHighClose * 100.0).toFixed(2)
            })

            this.data = res.data;
            this.isGetDataLoading = false;
        },
        // 获取接近2年新高股票数据
        async getNearHighData() {
            this.isGetDataLoading2 = true;
            let date = this.date.replaceAll('-', '');
            let queryInfo = {
                date: date,
                threshold : this.threshold
            };
            let { data: res } = await this.$http.get(`investment_path/near_two_year_high`,
                {
                    params: queryInfo
                }
            );
            
            console.log(res)
            // 原始数据处理
            res.data.map(function (item, index, self) {
                item.amount = (item.amount / 10).toFixed(2);
            })

            this.data2 = res.data;
            this.isGetDataLoading2 = false;
        },
        handleDatePickerChange(date) {
            this.date = date;
        }
    }
}
</script>

<style scoped></style>