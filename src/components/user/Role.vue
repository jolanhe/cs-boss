<template>
  <div>
    <h4 class="marg1">角色管理</h4>
    <div class="marg1">
      <Table :columns="columns" :data="grid" :no-data-text="tipe"></Table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Role',
  data () {
    return {
      columns: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: 'role_id',
          key: 'role_id'
        },
        {
          title: 'name',
          key: 'name'
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
      this.tipe = '加载中...'
      this.$axios.all([this.$api.user.queryAllRole(JSON.stringify({}), this.$api.params(this.user))])
      .then(this.$axios.spread(({ data }) => {
        switch (data.status_code) {
          case 0:
            if (data.data && data.data.length !== 0) {
              this.grid = data.data
            } else {
              this.tipe = '暂无数据'
            }
            break
          default:
            this.tipe = '获取失败'
            this.$store.commit('ERROR_RESPONSE_HANDLER', data)
        }
      }))
      .catch(reason => {
        this.tipe = '获取失败'
        this.$store.commit('ERROR_RESPONSE_HANDLER', reason)
      })
    }
  },
  watch: {
    '$route': 'fetchData'
  }
}
</script>
