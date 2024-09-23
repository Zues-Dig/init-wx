export function getUserProfile() {
	return new Promise((resolve, reject) => {
		uni.getUserProfile({
			desc: '用户登录',
			success: (info_res) => {
				console.log('?', info_res)
				resolve(info_res)
			},
			fail: err => {
				reject(err)
			}
		})
	})
}
