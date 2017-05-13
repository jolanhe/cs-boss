<template>
  <div>
    <Card shadow class="main-header padd1">
      <h5>十二翻概况</h5>
      <Form label-position="left" :label-width="50">
        <Form-item label="筛选">
          <Cascader :data="data" trigger="hover" placeholder="选择省市区"></Cascader>
        </Form-item>
      </Form>
    </Card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: [{
        value: 'beijing',
        label: '北京',
        children: [
          {
            value: 'gugong',
            label: '故宫'
          },
          {
            value: 'tiantan',
            label: '天坛'
          },
          {
            value: 'wangfujing',
            label: '王府井'
          }
        ]
      }, {
        value: 'jiangsu',
        label: '江苏',
        children: [
          {
            value: 'nanjing',
            label: '南京',
            children: [
              {
                value: 'fuzimiao',
                label: '夫子庙'
              }
            ]
          },
          {
            value: 'suzhou',
            label: '苏州',
            children: [
              {
                value: 'zhuozhengyuan',
                label: '拙政园'
              },
              {
                value: 'shizilin',
                label: '狮子林'
              }
            ]
          }
        ]
      }]
    }
  }
}
</script>

