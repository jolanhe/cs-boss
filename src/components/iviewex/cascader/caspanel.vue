<template>
  <span>
    <ul v-if="data && data.length" :class="[prefixCls + '-menu']">
      <Casitem
        v-for="item in data"
        :key="item"
        :prefix-cls="prefixCls"
        :data="item"
        :tmp-item="tmpItem"
        @click.native.stop="handleClickItem(item)"
        @mouseenter.native.stop="handleHoverItem(item)"></Casitem>
    </ul><Caspanel v-if="sublist && sublist.length" :prefix-cls="prefixCls" :data="sublist" :disabled="disabled" :trigger="trigger" :change-on-select="changeOnSelect" :hover-plus="hoverPlus"></Caspanel>
  </span>
</template>
<script>
import Casitem from './casitem'
import Emitter from 'iview/src/mixins/emitter'
import { findComponentUpward } from 'iview/src/utils/assist'

export default {
  name: 'Caspanel',
  mixins: [ Emitter ],
  components: { Casitem },
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    },
    disabled: Boolean,
    changeOnSelect: Boolean,
    hoverPlus: Boolean,
    trigger: String,
    prefixCls: String
  },
  data () {
    return {
      tmpItem: {},
      result: [],
      sublist: []
    }
  },
  watch: {
    data () {
      this.sublist = []
    }
  },
  methods: {
    handleClickItem (item) {
      // if (!item) { return }
      // this.handleTriggerPlus(item)
      if (this.hoverPlus === true) {
        this.handleTriggerPlus(item)
      } else {
        if (this.trigger !== 'click' && item.children) { return }
        this.handleTriggerItem(item)
      }
    },
    handleHoverItem (item) {
      // if (!item.children) { return }
      // this.handleTriggerItem(item)
      if (this.hoverPlus === true && item.children) {
        this.handleTriggerItem(item)
      } else {
        if (this.trigger !== 'hover' || !item.children) { return }
        this.handleTriggerItem(item)
      }
    },
    handleTriggerItem (item, fromInit = false) {
      if (item.disabled) { return }

      if (item.loading !== undefined && !item.children.length) {
        const cascader = findComponentUpward(this, 'Cascader')
        if (cascader && cascader.loadData) {
          cascader.loadData(item, () => {
            this.handleTriggerItem(item)
          })
          return
        }
      }

      // return value back recursion  // 向上递归，设置临时选中值（并非真实选中）
      const backItem = this.getBaseItem(item)
      this.tmpItem = backItem
      this.emitUpdate([backItem])
      if (item.children && item.children.length) {
        this.sublist = item.children
        this.dispatch('Cascader', 'on-result-change', {
          lastValue: false,
          changeOnSelect: this.hoverPlus ? false : this.changeOnSelect,
          fromInit: fromInit
        })
      } else {
        this.sublist = []
        this.dispatch('Cascader', 'on-result-change', {
          lastValue: true,
          changeOnSelect: this.hoverPlus ? true : this.changeOnSelect,
          fromInit: fromInit
        })
      }
    },
    handleTriggerPlus (item, fromInit = false) {
      if (item.disabled) { return }
      const backItem = this.getBaseItem(item)
      this.tmpItem = backItem
      this.emitUpdate([backItem])
      this.sublist = []
      this.dispatch('Cascader', 'on-result-change', {
        lastValue: true,
        changeOnSelect: true,
        fromInit: fromInit
      })
    },
    updateResult (item) {
      this.result = [this.tmpItem].concat(item)
      this.emitUpdate(this.result)
    },
    getBaseItem (item) {
      let backItem = Object.assign({}, item)
      if (backItem.children) {
        delete backItem.children
      }

      return backItem
    },
    emitUpdate (result) {
      if (this.$parent.$options.name === 'Caspanel') {
        this.$parent.updateResult(result)
      } else {
        this.$parent.$parent.updateResult(result)
      }
    }
  },
  mounted () {
    this.$on('on-find-selected', (params) => {
      const val = params.value
      let value = [...val]
      for (let i = 0; i < value.length; i++) {
        for (let j = 0; j < this.data.length; j++) {
          if (value[i] === this.data[j].value) {
            this.handleTriggerItem(this.data[j], true)
            value.splice(0, 1)
            this.$nextTick(() => {
              this.broadcast('Caspanel', 'on-find-selected', {
                value: value
              })
            })
            return false
          }
        }
      }
    })
    this.$on('on-clear', () => {
      this.sublist = []
      this.tmpItem = {}
    })
  }
}
</script>
