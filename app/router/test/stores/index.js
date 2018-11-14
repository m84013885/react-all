'use strict'
import {
  observable,
  action,
  computed
} from 'mobx'

// 请求
class Store {
  @observable toastShow = false
  @action changeToastOff = () => {
    this.toastShow = false
  }
  @action changeToastOn = () => {
    this.toastShow = true
  }
}
const store = new Store()

export default {
  store
}