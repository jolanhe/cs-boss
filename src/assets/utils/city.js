export default {
  data: [
    {
      label: '全国',
      value: '0'
    },
    {
      label: '广东省',
      value: '7',
      children: [
        {
          label: '全部市',
          value: '7'
        },
        {
          label: '东莞市',
          value: '119',
          children: [
            {
              label: '全部区',
              value: '1213'
            }
          ]
        },
        {
          label: '惠州市',
          value: '301',
          children: [
            {
              label: '全部区',
              value: '301'
            },
            {
              label: '惠城区',
              value: 1606
            },
            {
              label: '博罗县',
              value: 1985
            },
            {
              label: '惠东县',
              value: 2330
            },
            {
              label: '惠阳区',
              value: 2616
            },
            {
              label: '龙门县',
              value: 2805
            }
          ]
        }
      ]
    },
    {
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
    }
  ]
}
