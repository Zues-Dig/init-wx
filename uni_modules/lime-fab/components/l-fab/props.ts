// import { type PropType} from 'vue'
// import type { FabOffset, FabMagnetic, FabAxis } from './type'
export default {
	offset: {
		type: Object, //as PropType<FabOffset>
		 default: () => ({ x: -1, y: -1 }),
	},
	gap:{
		type: [String, Number],
		default: 24
	},
	magnetic: {
		type: String// as PropType<FabMagnetic>
	},
	axis: {
		type: String, //as PropType<FabAxis>,
		default: 'y'
	},
	size: {
		type: [String, Array]
	},
	icon: String,
}