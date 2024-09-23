import Vue from 'vue'
import LoadingComponent from './loading.vue'

const Loading = Vue.extend(LoadingComponent)

LoadingComponent.install = (options = {}) => {
	let instance = new Loading({
		data: options
	}).$mount()
	
	console.log('11ca', instance)

	document.body.appendChild(instance.$el)
	return instance // 返回当前实例
}

export default Loading
