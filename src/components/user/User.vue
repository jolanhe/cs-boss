<template>
  <div>
    <Card shadow class="main-header padd1">
      <h5>用户管理</h5>
      <Form label-position="left" :label-width="50">
        <Form-item label="操作">
          <Button type="primary" icon="person-add" @click="addUserModal = true">添加用户</Button>
          <Button type="error" icon="close">批量删除</Button>
        </Form-item>
      </Form>
    </Card>
    <div class="marg1">
      <Table :columns="columns" :data="grid" :no-data-text="tipe"></Table>
    </div>
    <Modal
      v-model="addUserModal"
      title="添加用户"
      width="300">
      <Form ref="formInline" :model="formInline" :rules="ruleInline">
        <Form-item prop="account">
          <Input type="text" v-model="formInline.account" placeholder="手机号">
          </Input>
        </Form-item>
        <Form-item prop="password">
          <Input type="password" v-model="formInline.password" placeholder="密码">
          </Input>
        </Form-item>
        <Form-item prop="email">
          <Input type="text" v-model="formInline.email" placeholder="E-mail">
          </Input>
        </Form-item>
      </Form>
      <div slot="footer">
        <Button type="primary" long :loading="modalLoading" @click="ok('formInline')">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      columns: [
        {
          type: 'index',
          width: 60,
          align: 'center'
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
          title: 'email',
          key: 'email'
        },
        {
          title: 'create_time',
          key: 'create_time'
        }
      ],
      grid: [],
      tipe: '加载中...',

      modalLoading: false,
      addUserModal: false,
      formInline: {
        account: '',
        password: '',
        email: ''
      },
      ruleInline: {
        account: this.$utils.rules.phone,
        password: this.$utils.rules.password
      }
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
            this.tipe = '获取失败'
            this.$store.commit('ERROR_RESPONSE_HANDLER', data)
        }
      }))
      .catch(reason => {
        this.tipe = '获取失败'
        this.$store.commit('ERROR_RESPONSE_HANDLER', reason)
      })
    },
    ok (name) {
      this.modalLoading = true
      this.$refs[name].validate((valid) => {
        if (valid) {
          // const f = this.formInline
          // const account = JSON.stringify({
          //   account: f.account.trim(),
          //   password: this.$utils.sha1(f.account.trim() + '@user@' + f.password),
          //   email: f.email
          // })
          // this.$axios.all([this.$api.user.addUser(account, this.$api.params(this.user))])
          // .then(this.$axios.spread(({ data }) => {
          //   switch (data.status_code) {
          //     case 0:
          //       this.modalLoading = this.addUserModal = false
          //       this.$Message.success('添加成功！')
          //       this.formInline = {
          //         account: '',
          //         password: '',
          //         email: ''
          //       }
          //       break
          //     default:
          //       this.$store.commit('ERROR_RESPONSE_HANDLER', data)
          //       this.modalLoading = false
          //   }
          // }))
          // .catch(reason => {
          //   this.$store.commit('ERROR_RESPONSE_HANDLER', reason)
          //   this.modalLoading = false
          // })
          // this.grid.unshift({})
        } else {
          this.$Message.error('输入信息格式有误！')
          this.modalLoading = false
        }
      })
    }
  },
  watch: {
    '$route': 'fetchData'
  }
}
</script>
