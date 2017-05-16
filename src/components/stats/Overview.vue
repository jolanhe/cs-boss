<template>
  <div>
    <Card shadow class="main-header padd1">
      <h5>十二翻概况</h5>
      <Form label-position="left" :label-width="48">
        <Row type="flex" class="col-gap">
          <Col>
            <Form-item label="区域：">
              <Cascader v-model="value3" :data="data" :clearable="false" placeholder="选择区域" @on-change="handleChange" filterable></Cascader>
            </Form-item>
          </Col>
          <Col>
            <Form-item label="时间：">
              <Row type="flex" class="col-gap2">
                <Col class="font0">
                  <Radio-group v-model="button1" type="button">
                    <Radio label="昨天"></Radio>
                    <Radio label="今天"></Radio>
                    <Radio label="最近7天"></Radio>
                    <Radio label="最近30天"></Radio>
                  </Radio-group>
                </Col>
                <Col>
                  <Date-picker type="daterange" placeholder="选择日期"></Date-picker>
                </Col>
              </Row>
            </Form-item>
          </Col>
        </Row>
      </Form>
    </Card>
    <div class="marg1">
      <Card shadow class="marg3">
        <IEcharts :option="bar" style="height: 400px;"></IEcharts>
      </Card>
      <Row :gutter="24">
        <Col :lg="12">
          <Card shadow class="marg3">
            <p slot="title">标准卡片</p>
            <p>卡片内容</p>
            <p>卡片内容</p>
            <p>卡片内容</p>
          </Card>
        </Col>
        <Col :lg="12">
          <Card shadow class="marg3">
            <p slot="title">标准卡片</p>
            <p>卡片内容</p>
            <p>卡片内容</p>
            <p>卡片内容</p>
          </Card>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
// import 'echarts/lib/chart/bar'

export default {
  name: 'Overview',
  data () {
    return {
      data: this.$utils.city.data,
      value3: [],
      button1: '昨天',
      bar: {
        title: {
          text: 'ECharts Hello World'
        },
        tooltip: {},
        xAxis: {
          data: ['Shirt', 'Sweater', 'Chiffon Shirt', 'Pants', 'High Heels', 'Socks']
        },
        yAxis: {},
        series: [{
          name: 'Sales',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      }
    }
  },
  methods: {
    handleChange (value, selectedData) {
      // this.text = selectedData.map(o => o.label).join(', ')
      // console.log(selectedData)
    },
    doRandom () {
      const that = this
      let data = []
      for (let i = 0, min = 5, max = 99; i < 6; i++) {
        data.push(Math.floor(Math.random() * (max + 1 - min) + min))
      }
      that.loading = !that.loading
      that.bar.series[0].data = data
    }
  }
}
</script>

