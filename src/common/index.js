import request from './request.js'
import timeFormat from './timeFormat.js'
import convertToPinyin from './convertToPinyin.js'
import getArgs from './getArgs.js'

const common = (vm) => {
	vm.prototype.$common = {
		getArgs,
		request,
		timeFormat,
		convertToPinyin
	}
}
export default {
	install(Vue, options) {
		common(Vue);
	}
}
