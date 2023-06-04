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
            sz:[],
            szdata:[],
            tradeDate:[],
            option: {
                title: {
                    text: '图形'
                },
                tooltip: {
                    trigger: 'axis'
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
                    boundaryGap: false,
                    data: this.tradeDate
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: '上证指数',
                        type: 'line',
                        stack: 'Total',
                        data: this.sz
                    },
                    {
                        name: '股票价格指数',
                        type: 'line',
                        stack: 'Total',
                        data: [220, 182, 191, 234, 290, 330, 310]
                    }
                ]
            },
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
        let chart = this.$echarts.init(document.getElementById('union'), null, {
            width: 600,
            height: 400
        });
        // console.log(this.tsCode)
        this.option && chart.setOption(this.option);
    },
    methods: {
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
            console.log(queryInfo)

            // 获取指定股票2年数据
            // let { data: stock } = await this.$http.get(`stock_daily/daily_info`, { params: queryInfo });

            // console.log(stock)

            // // 获取近2年上证指数
            let sh = await this.$http.get(`stock_daily/sh_info`, { params: queryInfo });
            this.szdata = sh.data.data
            console.log(this.szdata)
          
            this.szdata.forEach(item => {
                this.sz.push(item.close)
                this.tradeDate.push(item.tradeDate)

            })

            console.log(this.sz)

            console.log(this.tradeDate)





            // // 获取指定股票2年数据
            // let { data: stock } = await this.$http.get(`stock_daily/daily_info`, { params: queryInfo });
            // // 获取近2年上证指数
            // let { data: sh } = await this.$http.get(`origin/sh_index`);
        //     this.$emit('updateTsCode', this.tsCode);
        //     this.$emit('updateDate', this.date);
        }
    }
}
</script>

<style scoped></style>