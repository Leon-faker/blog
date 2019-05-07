import apilist from './apiList'

const install = function (Vue) {
    if (install.installed) return
    install.installed = true
    Object.defineProperties(Vue.prototype,{
        $api: {
            get () {
                return apilist
            },
            enumerable: false,
            configurable: false
        }
    })
}

export default {
    install
}