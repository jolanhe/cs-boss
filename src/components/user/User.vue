<template>
  <div>
    <h4 class="marg24">用户管理</h4>
    <div class="marg24">
      <Table :columns="columns1" :data="data1"></Table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      columns1: [
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
      data1: []
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
        this.data1 = data.data
      }))
      .catch(function (reason) {
        console.log(reason)
      })
    }
  },
  watch: {
    '$route': 'fetchData'
  }
}
</script>
