<template>
  <div>
    <Card shadow class="main-header padd1">
      <h5>十二翻概况</h5>
      <Form label-position="left" :label-width="48">
        <Row type="flex" class="col-gap">
          <Col>
            <Form-item label="区域：">
              <Cascader v-model="value3" :data="data" trigger="hover" :clearable="false" filterable placeholder="选择区域"></Cascader>
            </Form-item>
          </Col>
          <Col>
            <Form-item label="时间：">
              <Row type="flex" class="col-gap2">
                <Col class="font0">
                  <Button-group>
                    <Button type="primary">昨日</Button>
                    <Button>今日</Button>
                    <Button>最近7天</Button>
                    <Button>最近30天</Button>
                  </Button-group>
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: this.$utils.city.data,
      value3: []
    }
  }
}
</script>

