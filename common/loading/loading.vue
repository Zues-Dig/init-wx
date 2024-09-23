<template>
	<view class="loading-container" v-if="show">
		<view v-if="logoUrl" class="img-box square">
			<image class="img" :src="logoUrl" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	export default {
		computed: {
			logoUrl() {
				const settings = this.$store.getters['user/getSetting']
				if (!settings) return
				return settings && settings.loading_gif && settings.loading_gif.result[0]?.url || ''
			},
		},
		data() {
			return {
				show: false
			}
		},
		methods: {
			open() {
				this.show = true
			},
			close() {
				this.show = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.loading-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		background-color: #fff;

		.img {
			position: absolute;
			top: 50%;
			left: 50%;
			width: 100%;
			height: 100%;
			transform: translate(-50%, -50%);

			&-box {
				width: 30%;
				margin: auto;
			}
		}
	}
</style>
