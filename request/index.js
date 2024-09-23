const config = Symbol('config')
const isCompleteURL = Symbol('isCompleteURL')
const requestBefore = Symbol('requestBefore')
const requestAfter = Symbol('requestAfter')

class MinRequest {
	[config] = {
		baseURL: '',
		header: {
			'content-type': 'application/json',
		},
		method: 'GET',
		dataType: 'json',
		responseType: 'text',
		showLoading: true
	}

	interceptors = {
		request: (func) => {
			if (func) {
				MinRequest[requestBefore] = func
			} else {
				MinRequest[requestBefore] = (request) => request
			}

		},
		response: (func) => {
			if (func) {
				MinRequest[requestAfter] = func
			} else {
				MinRequest[requestAfter] = (response) => response
			}
		}
	}

	static[requestBefore](config) {
		return config
	}

	static[requestAfter](response) {
		return response
	}

	static[isCompleteURL](url) {
		return /(http|https):\/\/([\w.]+\/?)\S*/.test(url)
	}

	setConfig(func) {
		this[config] = func(this[config])
	}

	request(options = {}) {
		options.baseURL = options.baseURL || this[config].baseURL
		options.dataType = options.dataType || this[config].dataType
		options.url = MinRequest[isCompleteURL](options.url) ? options.url : (options.baseURL + options.url)
		options.data = options.data
		options.header = {
			...options.header,
			...this[config].header
		}
		options.method = options.method || this[config].method

		options.showLoading = options.showLoading === undefined && this[config].showLoading || options.showLoading

		options = {
			...options,
			...MinRequest[requestBefore](options)
		}
		
		if (options.showLoading) {
			uni.showLoading({
				title: '加载中'
			})
		}

		console.log('request', options.url, options.method, options.header, options.data)

		return new Promise((resolve, reject) => {
			uni.hideLoading()
			options.success = function(res) {
				console.log('response', options.url, res.statusCode, res.data)
				resolve(MinRequest[requestAfter](res))
			}
			options.fail = function(err) {
				console.error('response', options.url, res.statusCode, res.data)
				reject(MinRequest[requestAfter](err))
			}
			uni.request(options)
		})
	}

	get(url, data, options = {}) {
		options.url = url
		options.data = data
		options.method = 'GET'
		return this.request(options)
	}

	put(url, data, options = {}) {
		options.url = url
		options.data = data
		options.method = 'PUT'
		return this.request(options)
	}

	post(url, data, options = {}) {
		options.url = url
		options.data = data
		options.method = 'POST'
		return this.request(options)
	}
}

MinRequest.install = function(Vue) {
	Vue.mixin({
		beforeCreate: function() {
			if (this.$options.minRequest) {
				console.log(this.$options.minRequest)
				Vue._minRequest = this.$options.minRequest
			}
		}
	})
	Object.defineProperty(Vue.prototype, '$minApi', {
		get: function() {
			return Vue._minRequest.apis
		}
	})
}

export default MinRequest
