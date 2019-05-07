import request from '../request'
import api from './api'

const header = {
    'Authorization': 'Client-ID xxxxxxx'
}

export default {
    login (params) {
        return request.post(api.login,params,header)
    }
}