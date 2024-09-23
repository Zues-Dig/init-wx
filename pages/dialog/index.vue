<template>
	<view v-if="show" class="dialog-container" @click="toClose">
		<view class="main" :class="{'active': active}" :style="{backgroundImage: `url(${bgUrl || ''})`}" @click.stop="">
			<text class="iconfont icon-guanbi" @click="toClose"></text>
			<view class="title">Usual Coffee</view>
			<view class="content">
				{{content || ''}}
			</view>
			<view class="footer">
				<view class="btn" @click="toClose">取消</view>
				<view class="btn black" @click="toConfirm">确定兑换</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				require: true,
				default: true
			},
			content: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				active: false,
				bgUrl: ''
			}
		},
		computed: {
			watch_setting() {
				return this.$store.getters['user/getSetting']
			},
		},
		watch: {
			watch_setting: {
				deep: true,
				immediate: true,
				handler: function(data) {
					this.toSetting(data)
				}
			},
			show(value) {
				if (value) {
					this.$nextTick().then(() => {
						this.active = true
					})
				}
			}
		},
		methods: {
			toSetting(target) {
				if (target && target.disalog_bg && target.disalog_bg.result) {
					this.bgUrl = target.disalog_bg.result[0].url
				}
			},
			toClose() {
				this.active = false
				setTimeout(() => {
					this.$emit('close')
				}, 300)
			},
			toConfirm() {
				this.$emit('confirm')
				this.toClose()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.dialog-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .1);
		display: flex;

		.main {
			background-color: #fff;
			border-radius: 30rpx;
			padding: 20rpx;
			font-size: 28rpx;
			margin: auto;
			position: relative;
			transform: scale(0);
			transition: transform 300ms;
			width: 70%;
			text-align: center;
			background-repeat: no-repeat;
			background-position: center;
			opacity: .97;

			&.active {
				transform: scale(1);
			}

			.iconfont {
				position: absolute;
				top: -30%;
				right: -10%;
				font-size: 36rpx;
				color: #000;
				border: 1px solid #000;
				line-height: 50rpx;
				width: 54rpx;
				display: block;
				border-radius: 50%;
			}

			.title {
				font-weight: bold;
				line-height: 70rpx;
				border-bottom: 1px solid rgba(0, 0, 0, .1);
				margin-bottom: 20rpx;
				padding-bottom: 20rpx;
			}

			.content {
				font-size: 30rpx;
				line-height: 100rpx;
			}

			.footer {
				margin-top: 20rpx;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				padding: 20rpx;

				.btn {
					line-height: 55rpx;
					color: #000;
					border: 1px solid #000;
					border-radius: 30rpx;
					margin-left: 20rpx;
					padding: 0 20rpx;

					&.black {
						background-color: #000;
						color: #fff;
					}
				}
			}

		}
	}
</style>
