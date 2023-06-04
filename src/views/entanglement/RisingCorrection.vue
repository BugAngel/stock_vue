<template>
    <DatePicker type="date" :model-value="date" placement="bottom-end" placeholder="查询日期"
        @on-change="handleDatePickerChange" style="width: 200px" />
    <br />
    <span>日期</span>
    <InputNumber :max="240" :min="0" :step="1" v-model="range" />
    <span>最小斜率</span>
    <InputNumber :max="1" :min="0" :step="0.1" v-model="minSlope" />
    <span>最大斜率</span>
    <InputNumber :max="10" :min="0" :step="0.1" v-model="maxSlope" />
    <span>回调幅度</span>
    <InputNumber :max="1" :min="0" :step="0.01" v-model="callback" />
    <br />
    <Button type="primary" @click="getRisingCorrection()" :loading="isGetRisingCorrectionLoading">查询</Button>
    <Table :columns="columns" :data="risingCorrectionData" height="600" style="margin-top:15px" ref="table">
        <template #action="{ row, index }">
            <Button type="primary" style="margin-right: 5px" @click="show(index)">看图</Button>
        </template>
    </Table>
    <Space class="ivu-mt" wrap>
        <Button type="primary" @click="exportData()">
            <Icon type="ios-download-outline"></Icon> 导出数据
        </Button>
    </Space>
    <Modal v-model="modal1" draggable :mask="false" title="图" width="600px">
        <SpreadChart tsCode="000671.SZ" date="20230602"></SpreadChart>
    </Modal>
</template>
<script>
import SpreadChart from '@/components/SpreadChart.vue';

export default {
    components: { SpreadChart },
    data() {
        return {
            // tscode: '000671.SH',
            // date: '20230602',
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
                    "title": "图形",
                    slot: 'action',
                }
            ],
            risingCorrectionData: [],
            isGetRisingCorrectionLoading: false,
            range: 5,
            minSlope: 0.3,
            maxSlope: 10,
            callback: 0,
            modal1: false,
            date: this.$moment(new Date()).format("YYYY-MM-DD")
        };
    },
    created() {
    },
    methods: {
        exportData() {
            this.$refs.table.exportCsv({
                filename: this.$moment(new Date()).format("YYYY-MM-DD") + "上升回调数据",
                original: false
            });
        },
        // 获取上升回调股票数据
        async getRisingCorrection() {
            this.isGetRisingCorrectionLoading = true;
            let date = this.date.replaceAll("-", "");
            let queryInfo = {
                date: date,
                range: this.range,
                minSlope: this.minSlope,
                maxSlope: this.maxSlope,
                callback: this.callback
            };
            console.log(queryInfo);
            let { data: res } = await this.$http.get(`entanglement/rising_correction`, {
                params: queryInfo
            });
            // 原始数据处理
            res.data.map(function (item, index, self) {
                item.amount = (item.amount / 10).toFixed(2);
            });
            this.risingCorrectionData = res.data;
            this.isGetRisingCorrectionLoading = false;
        },
        // 看股票图
        show(index) {
            this.modal1 = true;
        },
        handleDatePickerChange(date) {
            this.date = date;
        }
    },
  
}
</script>

<style scoped></style>