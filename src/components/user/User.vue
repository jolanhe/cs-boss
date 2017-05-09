<template>
  <div>
    <h1>{{ msg }}</h1>
    <Row type="flex" :gutter="24">
      <Col span="12">
        <Card shadow>
          <p slot="title">使用阴影效果的卡片</p>
          <p>卡片内容</p>
          <p>卡片内容</p>
          <p>卡片内容</p>
        </Card>
      </Col>
      <Col span="12">
        <Card shadow>
          <p slot="title">使用阴影效果的卡片</p>
          <p>卡片内容</p>
          <p>卡片内容</p>
          <p>卡片内容</p>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'User'
    }
  }
}
</script>
