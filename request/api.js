import MinRequest from './index'
import store from '@/store'
import {
	getUserProfile
} from '@/common/utils.js'

const minRequest = new MinRequest()

// 请求拦截器
minRequest.interceptors.request((request) => {
	request.header['x-access-token'] = uni.getStorageSync('token')
	return request
})

// 响应拦截器
minRequest.interceptors.response((response) => {
	const {
		statusCode,
		errMsg,
		data
	} = response
	if (statusCode !== 200) {
		uni.showToast({
			title: "网络错误，请检查一下网络",
			icon: "none"
		});
		return Promise.reject({
			statusCode,
			errMsg
		})
	}
	if (data.code === 110403) {
		uni.showToast({
			title: "请登录",
			icon: "none"
		});
		store.commit('user/set_user_info', false)
		store.commit('user/set_token', false)

		// uni.switchTab({
		// 	url: '/pages/index/index'
		// })

		getUserProfile().then(user => {
			if (user.userInfo)
				store.commit('user/login', user.userInfo)
		}).catch(e => {
			uni.showToast({
				icon: 'none',
				title: '登录失败'
			})
		})

		return Promise.reject({
			statusCode: data.code,
			errMsg: data.msg
		})
	}
	if (data.code !== 0) {
		// uni.showToast({
		// 	title: data.msg || '请求失败',
		// 	icon: "none"
		// });
		return Promise.reject(data)
	}
	return data
})

// 设置默认配置
minRequest.setConfig((config) => {
	config.baseURL = 'http://localhost:7512'
	// config.baseURL = 'https://43.154.154.167:7512'
	// config.baseURL = 'https://usualcoffee.club:7512'
	return config
})


export default {
	apis: {
		login: (code) => minRequest.get('/auth/loginByWeChat', code), //	用户登录
		register: (data) => minRequest.post('/auth/bind', data), //	用户注册绑定

		scheme: () => minRequest.get('/scheme/test'),
		// getSetups: (data) => minRequest.post('/wx/setting/get_list', data), //	获取后台设置

		// getMenuLsit: (data) => minRequest.get('/wx/get_list_wechat', data), //	获取菜单列表

		// addOrder: (data) => minRequest.post('/order/add_order', data), //	添加订单
		// getOrderWait: (data) => minRequest.get('/order/get_all_wait_minute', data), //	订单等待时间
		// getOrderList: (data) => minRequest.post('/order/get_list', data), //	订单列表
		// getOrderDetail: (data) => minRequest.get('/order/get_one', data), //	订单详情

		// pay: (data) => minRequest.get('/quartz/task/mockPay', data), //	模拟支付
		// wechatPay: (data) => minRequest.get('/pay/we_chat_app_pay', data), //	模拟支付

		// getCouponList: (data) => minRequest.get('/coupon/coupon_list', data), //	优惠券列表
		// getCoupon: (data) => minRequest.get('/coupon/convert_cup', data), //	领取优惠券
		// setCouponRead: (data) => minRequest.put('/coupon/update_read', data) //	设置优惠券已读
	}
}
