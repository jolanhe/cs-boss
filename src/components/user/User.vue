<template>
  <div>
    <h4 class="marg24">用户管理</h4>
    <div class="marg24">
      <Table :columns="columns" :data="grid" :no-data-text="tipe"></Table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      columns: [
        {
          type: 'index'
        },
        {
          title: 'uid',
          key: 'uid'
        },
        {
          title: 'account',
          key: 'account'
        },
        {
          title: 'create_time',
          key: 'create_time'
        }
      ],
      grid: [],
      tipe: '加载中...'
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.props
    })
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      // console.log(this.data1)
      this.$axios.all([this.$api.user.queryAllUser(JSON.stringify(this.user), this.$api.params(this.user))])
      .then(this.$axios.spread(({ data }) => {
        switch (data.status_code) {
          case 0:
            if (data.data.length !== 0) {
              this.grid = data.data
            } else {
              this.tipe = '暂无数据'
            }
            break
          default:
            this.$store.commit('ERROR_RESPONSE_HANDLER', data)
        }
      }))
      .catch(reason => {
        this.$store.commit('ERROR_RESPONSE_HANDLER', reason)
      })
    }
  },
  watch: {
    '$route': 'fetchData'
  }
}
</script>
