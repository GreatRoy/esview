import store from '../store'
import {
  isPlain,
  stringify,
  isNumber
} from '../util/assist'
import {
  currentUid,
  resetModel
} from '../helper/soul_helper'

function addApp() {
  if (!this.opModel.name) {
    return void this.$Message.error('name cant be empty')
  }
  if (!isNumber(this.opModel.sort)) {
    return void this.$Message.error('sort must be number')
  }
  this.$http.post('app/add', this.opModel).then(res => {
    if (res.data.code === 10000) {
      getTableAppList.call(this)
      this.$Message.success('saved')
    }
  })
}

function delApp(id) {
  this.$http.get('app/del/' + id).then(res => {
    if (res.data.code === 10000) {
      getTableAppList.call(this)
      this.$Message.success('deleted')
    }
  })
}

function updateApp() {
  if (!this.opModel.name) {
    return void this.$Message.error('name cant be empty')
  }
  if (!isNumber(this.opModel.sort)) {
    return void this.$Message.error('sort must be positive')
  }
  this.$http.post('app/update', this.opModel).then(res => {
    if (res.data.code === 10000) {
      getTableAppList.call(this)
      this.$Message.success('saved')
    }
  })
}

function getAppList({appName}, fn) {
  this.$http.post('app/appList', {name: appName}).then(res => {
    if (res.data.code === 10000) {
      if (fn) {
        fn.call(this, res.data.data)
      }
    }
  })
}

function getTableAppList() {
  this.tableData = []
  this.loading = true
  this.$http.post('app/tableAppList', this.searchInput).then(res => {
    if (res.data.code === 10000) {
      this.loading = false
      let data = res.data.data
      this.searchInput.total = data.total
      this.tableData = data.list
    }
  })
}

function getRichApp(id, fn) {
  this.$http.get('app/richApp/' + id).then(res => {
    if (res.data.code === 10000) {
      if (fn) {
        fn.call(this, res.data.data)
      }
    }
  })
}

function addPage() {
  let pageSoul = store.getters['dragModule/pageSoul']

  resetModel(pageSoul)
  pageSoul.maxUid = currentUid()
  this.opModel.pageSoul = stringify(pageSoul)
  this.opModel.appId = this.appId
  this.$http.post('page/add', this.opModel).then(res => {
    if (res.data.code === 10000) {
      this.opModel.id = res.data.data.id
      localStorage.setItem('pageSoulId', this.opModel.id)
      this.$Message.success('saved')
    }
  })
}

function delPage(id) {
  this.$http.get('page/del/' + id).then(res => {
    if (res.data.code === 10000) {
      getTablePageList.call(this)
      this.$Message.success('deleted')
    }
  })
}

function updatePage() {
  let pageSoul = store.getters['dragModule/pageSoul']
  resetModel(pageSoul)
  pageSoul.maxUid = currentUid()
  this.opModel.pageSoul = stringify(pageSoul)
  this.$http.post('page/update', this.opModel).then(res => {
    if (res.data.code === 10000) {
      this.$Message.success('saved')
    }
  })
}

function getPageList({pageName, token}, fn) {
  this.http.post('page/pageList', {name: pageName}).then(res => {
    if (res.data.code === 10000) {
      this.controls = res.data.data
      if (fn) {
        fn.call(this, res.data.data)
      }
    }
  })
}

function getTablePageList() {
  this.tableData = []
  this.loading = true
  this.$http.post('page/tablePageList', this.searchInput).then(res => {
    if (res.data.code === 10000) {
      this.loading = false
      let data = res.data.data
      this.searchInput.total = data.total
      this.tableData = data.list
    }
  })
}

function getRichPage(id, fn) {
  this.$http.get('page/richPage/' + id).then(res => {
    if (res.data.code === 10000) {
      if (fn) {
        fn.call(this, res.data.data)
      }
    }
  })
}

export {
  addPage,
  delPage,
  updatePage,
  getPageList,
  getTablePageList,
  getRichPage,
  addApp,
  delApp,
  updateApp,
  getAppList,
  getTableAppList,
  getRichApp
}
