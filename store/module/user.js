import $apis from '@/request/api.js'

const {
	getStorageSync,
	removeStorageSync
} = uni

const UUID = getStorageSync('uuid') || false //获取UUID缓存
const OPENID = getStorageSync('openid') || false //获取OPENID缓存
const TOKEN = getStorageSync('token') || false //获取TOKEN缓存
const USER_INFO = getStorageSync('user_info') || false //获取用户信息缓存
const USER_ROLE = getStorageSync('user_role') || [] //获取用户权限缓存
const SETTING = getStorageSync('setting') || [] //配置

//全局状态
const state = {
	uuid: UUID, // 用户uuid
	openid: OPENID, // 用户openid
	token: TOKEN, // 用户token
	user_info: USER_INFO, // 用户信息
	user_role: USER_ROLE, // 用户角色权限
	setting: SETTING, // 用户角色权限
}

//同步方法
const mutations = {
	set_vuex(state, [key, val]) {
		state[key] = val
	},
	set_token(state, info) {
		state.token = info
		uni.setStorageSync('token', info)
	},
	set_openid(state, info) {
		state.openid = info
		uni.setStorageSync('openid', info)
	},
	set_user_info(state, info) {
		state.user_info = info
		uni.setStorageSync('user_info', info)
		this.commit('user/set_read_coupon', info.hasNoReadCouponNumber)
	},
	set_user_role(state, info) {
		state.user_role = info
		uni.setStorageSync('user_role', info)
	},
	set_logout(state) {
		state.uuid = false
		state.openid = false
		state.token = false
		state.user_info = false
		state.user_role = false
		removeStorageSync('uuid')
		removeStorageSync('openid')
		removeStorageSync('token')
		removeStorageSync('user_info')
		removeStorageSync('user_role')
	},
	set_refresh(state) {
		uni.setStorageSync('_cache_name_list', [])
		state.refresh_home = true
		state.refresh_course = true
	},
	set_setting(state, info) {
		state.setting = info
		uni.setStorageSync('setting', info)
	},
	login(state, targetInfo) {
		getCode().then(loginRes => {
			const {
				code
			} = loginRes
			console.log('code', code);
			if (!code) return
			$apis.apis.login({
					code
				})
				.then(res => {
					const {
						data
					} = res

					if (!data) {
						console.error('login empty data', res)
						return
					}

					this.commit('user/set_token', data.token)
					this.commit('user/set_user_info', data.userResult)
				})
				.catch(e => {
					const {
						data
					} = e

					if (!data && targetInfo) {
						getCode().then(loginRes2 => {
							const requestTarget = {
								code: loginRes2.code,
								imageUrl: targetInfo?.avatarUrl || '',
								imageUrlSnap: '',
								mobileNo: '16625186117',
								userName: targetInfo?.nickName || ''
							}
							$apis.apis.register(requestTarget)
								.then(result => {
									const {
										data
									} = result

									if (!data) {
										console.error('login empty data', res)
										return
									}

									this.commit('user/set_token', data.token)
									this.commit('user/set_user_info', data.userResult)
								})
						})
					} else {
						this.commit('user/set_token', false)
						this.commit('user/set_user_info', false)
					}
				})
		})
	}
}

//get方法
const getters = {
	// 用户是否登录
	hasLogin: (state) => state.token || state.user_info || false,
	getRole: (state) => state.user_role,
	getUserInfo: (stae) => stae.user_info,
	getToken: (stae) => stae.token,
	getSetting: (state) => state.setting,
}

//异步方法
const actions = {
	// 清除接口缓存
	clear_api_cache() {
		// return clearCache()
	}
}


export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions
}

const getCode = function() {
	return new Promise((resolve, reject) => {
		uni.login({
			provider: 'weixin',
			success: loginRes => {
				resolve(loginRes)
			},
			fail: () => {
				reject()
			}
		})
	})
}