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

    <Modal v-model="addUserModal" title="添加用户" width="300" :transition-names="['modal','mui-fade']">
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
            <span slot="append">@useus.cn</span>
          </Input>
        </Form-item>
      </Form>
      <div slot="footer">
        <Button type="primary" long :loading="modalLoading" @click="handleAddUser('formInline')">确定</Button>
      </div>
    </Modal>


    <Modal v-model="removeUserModal" width="300" :transition-names="['modal','mui-fade']">
      <p slot="header" class="red-center-tt">
        <Icon type="information-circled"></Icon>
        <span>删除确认</span>
      </p>
      <div class="center-tt">
          <p>用户“{{ willRemove.account }}”删除后将无法登录。</p>
          <p>是否继续删除？</p>
      </div>
      <div slot="footer">
        <Button type="error" long :loading="modalLoading" @click="handleRemoveUser(willRemove)">删除</Button>
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
        },
        {
          title: '操作',
          key: 'action',
          width: 80,
          render (row, col, index) {
            return `<i-button type="text" size="small" @click="showUserModal(${index})">删除</i-button>`
          }
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
        password: this.$utils.rules.password,
        email: this.$utils.rules.name
      },

      removeUserModal: false,
      willRemove: {}
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.props
    }),
    email () { return this.formInline.email + '@useus.cn' }
  },
  created () {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.tipe = '加载中...'
      this.$axios.all([this.$api.user.queryAllUser(JSON.stringify({}), this.$api.params(this.user))])
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
    },

    handleAddUser (name) {
      this.modalLoading = true
      this.$refs[name].validate((valid) => {
        if (valid) {
          const f = this.formInline
          const account = JSON.stringify({
            account: f.account.trim(),
            password: this.$utils.sha1(f.account.trim() + '@user@' + f.password),
            email: this.email
          })

          this.$axios.all([this.$api.user.addUser(account, this.$api.params(this.user))])
          .then(this.$axios.spread(({ data }) => {
            switch (data.status_code) {
              case 0:
                this.addUserModal = false
                this.$Message.success('添加成功！')
                this.modalLoading = false
                if (data.data) {
                  this.grid.unshift({
                    uid: data.data.uid || '',
                    account: f.account,
                    email: this.email,
                    create_time: data.data.create_time || ''
                  })
                }
                this.formInline = {
                  account: '',
                  email: ''
                }
                break
              default:
                this.$store.commit('ERROR_RESPONSE_HANDLER', data)
                this.modalLoading = false
            }
          }))
          .catch(reason => {
            this.$store.commit('ERROR_RESPONSE_HANDLER', reason)
            this.modalLoading = false
          })
        } else {
          this.$Message.error('输入信息格式有误！')
          this.modalLoading = false
        }
      })
    },

    showUserModal (index) {
      this.willRemove = this.grid[index]
      this.willRemove.index = index
      this.removeUserModal = true
    },

    handleRemoveUser ({ index, uid }) {
      if (uid === this.user.uid) {
        this.removeUserModal = false
        this.$Message.info('无法删除当前登录用户！')
        return
      }
      this.modalLoading = true
      const u = JSON.stringify({ uid })

      this.$axios.all([this.$api.user.removeUser(u, this.$api.params(this.user))])
      .then(this.$axios.spread(({ data }) => {
        this.removeUserModal = false
        switch (data.status_code) {
          case 0:
            this.$Message.success(data.status_txt)
            this.grid.splice(index, 1)
            this.modalLoading = false
            break
          case 1002:
            this.$Message.error(data.status_txt)
            this.grid.splice(index, 1)
            this.modalLoading = false
            break
          default:
            this.$store.commit('ERROR_RESPONSE_HANDLER', data)
            this.modalLoading = false
        }
      }))
      .catch(reason => {
        this.$store.commit('ERROR_RESPONSE_HANDLER', reason)
        this.modalLoading = false
      })
    }
  }
}
</script>
