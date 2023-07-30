<template>
    <div>
        <div id="union" style="width:600px;height:400px;"></div>
        <div id="diff"></div>
    </div>
</template>

<script>
export default {
    emits: ['updateTsCode', 'updateDate'],
    data() {
        return {
            shData: [],
            stockData: [],
            tradeDate1: [],
            option: {
                title: {
                    text: '图形'
                },
                tooltip: {
                    trigger: 'axis',
                    show: true
                },
                legend: {
                    data: ['上证指数', '股票价格指数']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    nameLocation: 'middle',
                    data: [],
                },
                yAxis: {
                    type: 'value',
                    // min:-1000
                },
                series: [
                    {
                        name: '股票价格指数',
                        type: 'line',
                        // stack: 'Total',
                        data: [],
                        label: { normal: { show: true } }
                    },
                    {
                        name: '上证指数',
                        type: 'line',
                        // stack: 'Total',
                        data: [],
                        label: { normal: { show: true } }
                    },

                ]
            },
            chart: ''
            // tsCode:'',
            // date: ''
        }
    },

    props: ["tsCode", "date"],


    // 接受父组件传来的股票代码、日期
    // props: {
    //     tsCode: String,
    //     date: String
    // },
    mounted() {
        this.chart = this.$echarts.init(document.getElementById('union'), null, {
            width: 1000,
            height: 400
        });
        // console.log(this.tsCode)
        this.option && this.chart.setOption(this.option);
    },
    methods: {
        //比较函数
        sortBy(property, asc) {
            return function (value1, value2) {
                let a = value1[property]
                let b = value2[property]
                // 默认升序
                if (asc == undefined) {
                    return a - b
                } else {
                    return asc ? a - b : b - a
                }
            }
        },



        // 获取股票数据
        async getData() {
            console.log(this.tsCode)

            let begin = this.$moment(this.date).subtract(2, 'years').format("YYYYMMDD");
            let end = this.$moment(this.date).format("YYYYMMDD");

            let queryInfo = {
                begin: begin,
                end: end,
                ts_code: this.tsCode
            };

            // 获取指定股票2年数据
            let stockOrigin = await this.$http.get(`stock_daily/daily_info`, { params: queryInfo });
            //取出数据对象并排序
            let stockSorted = stockOrigin.data.data.sort(this.sortBy('tradeDate', true));
            //遍历得到数据数组和时间数组
            stockSorted.forEach(item => {
                this.stockData.push(item.close)
                this.tradeDate1.push(item.tradeDate)
            })
            //获取近2年上证指数
            let shOrigin = await this.$http.get(`stock_daily/sh_info`, { params: queryInfo });
            //取出数据对象并排序
            let shSorted = shOrigin.data.data.sort(this.sortBy('tradeDate', true));
            //遍历获得和指定股票指数日期对应的上证指数
            this.tradeDate1.forEach(item => {
                this.shData.push(shSorted.find(o => o.tradeDate === item).close)
            })

            this.option.xAxis.data = this.tradeDate1;
            this.option.series[0].data = this.stockData;
            this.option.series[1].data = this.shData;
            console.log(this.option)
            this.option && this.chart.setOption(this.option);

        }
    }
}
</script>

<style scoped></style>