<template>
	<view class="container">

		<view class="top-swiper">
			<u-swiper :list="swiperList" :autoplay="true" @change="e => current = e.current"
				indicatorStyle="bottom: 30rpx">
				<view slot="indicator" class="indicator">
					<view class="indicator__dot" v-for="(item, index) in swiperList" :key="indicator_index"
						:class="[index === current && 'indicator__dot--active']">
					</view>
				</view>
			</u-swiper>
		</view>

		<view class="main">
			<view class="user square" v-if="watch_userInfo && watch_userInfo.imageUrl">
				<image class="img" :src="watch_userInfo.imageUrl" mode="widthFix"></image>
			</view>
			<view class="tip">Hello</view>
			<view class="advice" v-if="!watch_userInfo">
				<text class="value">欢迎加入Usual Coffee会员</text>
				<view class="btn" @click="getUser">立即注册</view>
			</view>
			<view v-else class="message">
				<view class="name">{{watch_userInfo.userName}}</view>
				<view class="line"></view>
			</view>
			<!-- <view class="message">
				<view class="message-left">
					<view class="img-box square" @click="getUser">
						<image v-if="watch_userInfo.imageUrl" class="img" :src="watch_userInfo.imageUrl"
							mode="widthFix"></image>
					</view>
					<view class="detail">
						<view class="detail-top">
							<text>{{ watch_userInfo.userName || 'Usual Coffee' }}</text>
						</view>
						<view class="detail-bottom">
							<view v-if="watch_userInfo.points || watch_userInfo.points === 0" class="item">
								积分
								<text>{{watch_userInfo.points}}</text>
							</view>
						</view>
					</view>
				</view>
			</view> -->
			<view class="btns">
				<view class="item" v-for="(item, index) in btns" :key="index" @click="toMenu(index)">
					<view class="img-box square">
						<image v-if="item.img" class="img" :src="item.img" mode="widthFix"></image>
					</view>
					<text class="title">{{item.title}}</text>
					<text class="mark">{{item.mark}}</text>
				</view>
			</view>

			<view class="footer">
			</view>
		</view>

		<view class="coupon">
			<view class="title">
				<view class="tips">
					集满<text class="black">10</text>杯，请您喝一杯
				</view>
				<text v-if="aviteCount !== 10" class="num">
					<text class="black">{{aviteCount}}</text>
					/10
				</text>
				<view v-else class="btn" @click="openCoupon">老板买单</view>
			</view>
			<view class="icons">
				<div v-for="(item, index) in 10" :key="index">
					<text v-if="index < aviteCount" class="iconfont icon-beizi-fill"></text>
					<text v-else class="iconfont icon-zhibei"></text>
				</div>
			</view>
		</view>

		<show-dialog :show="showDialog" @close="showDialog = false" content="我要老板请我喝一杯!" @confirm="onCouponConfirm">
		</show-dialog>

		<!-- <loading></loading> -->
	</view>
</template>

<script>
	import showDialog from '@/pages/dialog'
	// import loading from '@/common/loading/loading'

	export default {
		data() {
			return {
				setting: {},
				showDialog: false,
				userInfo: null,
				current: 0,
				aviteCount: 10,
				btns: [{
					key: 'logo_order',
					img: '',
					// img: 'https://p0.meituan.net/rmscashier/0a9bde989c2aea00fd27d41494e6f75921544.png',
					title: '点单',
					mark: '小程序点餐,免排队'
				}, {
					key: 'logo_self',
					img: '',
					// img: 'https://p1.meituan.net/rmscashier/f48f21ad4a0c9bd82e8b928d6575c16616289.png',
					title: '自提',
					mark: '提前预定,到店取'
				}]
			}
		},
		mounted() {
			this.userInfo = this.$store.getters['user/getUserInfo'] || null
			this.setting = this.$store.getters['user/getSetting'] || null
			if (this.setting) {
				this.btns.forEach(item => {
					if (this.setting[item.key] && this.setting[item.key].result && this.setting[item.key].result
						.length)
						item.img = this.setting[item.key].result[0].url
				})
			}
		},
		components: {
			showDialog,
			// loading
		},
		computed: {
			swiperList() {
				if (!this.setting) return []
				return this.setting.carousels && this.setting.carousels.result.map(item => item.url) || []
			},
			watch_setting() {
				return this.$store.getters['user/getSetting']
			},
			watch_userInfo() {
				// return null
				return this.$store.getters['user/getUserInfo']
			}
		},
		watch: {
			watch_setting: {
				deep: true,
				immediate: true,
				handler: function(data) {
					this.toSetting(data)
				}
			},
			watch_userInfo: {
				deep: true,
				immediate: true,
				handler: function(data) {
					this.aviteCount = data.cupNumber || 0
				}
			}
		},
		methods: {
			toSetting(target) {
				this.setting = target || null
				if (this.setting) {
					this.btns.forEach(item => {
						if (this.setting[item.key] && this.setting[item.key].result && this.setting[item.key]
							.result
							.length)
							item.img = this.setting[item.key].result[0].url
					})
				}
			},
			toMenu(type) {
				this.$store.commit('shop/set_order_type', type)
				uni.navigateTo({
					// url: `/pages/menu/index?type=${type}`
					url: '/pages/map/index'
				})
			},
			getUser() {
				if (this.watch_userInfo) return
				this.getUserProfile().then(res => {
					if (res.userInfo)
						this.$store.commit('user/login', res.userInfo)
				})
			},
			getUserProfile() {
				return new Promise((resolve, reject) => {
					uni.getUserProfile({
						desc: '用户登录',
						success: (info_res) => {
							resolve(info_res)
						},
						fail: err => {
							reject(err)
						}
					})
				})
			},
			openCoupon() {
				if (this.aviteCount !== 10) {
					uni.showToast({
						icon: 'none',
						title: '请加油集满10杯后领取喔'
					})
					return
				}
				this.showDialog = true

			},
			onCouponConfirm() {
				this.$minApi.getCoupon()
					.then(res => {
						uni.showToast({
							icon: 'none',
							title: '领取成功'
						})
						this.aviteCount = 0
						this.$store.commit('user/set_read_coupon', 1)
					})
					.catch(e => {
						uni.showToast({
							title: e.msg || '兑换失败',
							icon: 'none'
						})
					})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding-bottom: 0;
		overflow-y: auto;

		.top-swiper {
			height: 50%;
			position: relative;

			/deep/ .u-swiper {
				height: 100% !important;

				.u-swiper__wrapper {
					height: 100% !important;

					.u-swiper__wrapper__item__wrapper__image {
						height: 100% !important;
					}
				}
			}
		}

		.indicator {
			@include flex(row);
			justify-content: center;

			&__dot {
				height: 12rpx;
				width: 12rpx;
				border-radius: 100%;
				background-color: rgba(0, 0, 0, 0.9);
				margin: 0 10rpx;
				transition: background-color 0.3s;

				&--active {
					width: 36rpx;
					border-radius: 12rpx;
					background-color: rgba(0, 0, 0, 0.9);
				}
			}
		}

		.main {
			width: 90%;
			margin: 0 auto;
			position: relative;
			display: flex;
			flex-direction: column;
			background-color: #fff;
			border-radius: 30rpx;
			top: -100rpx;
			box-shadow: #000000 0rpx 0rpx 20rpx -15rpx;

			.user {
				width: 20%;
				position: absolute;
				top: 0;
				right: 5%;
				transform: translate(0, -50%);
				border-radius: 50%;
				overflow: hidden;

				.img {
					position: absolute;
					width: 100%;
					height: 100%;
					top: 0;
					left: 0;
				}
			}

			.tip {
				font-size: 36rpx;
				padding: 0 40rpx;
				line-height: 100rpx;
				font-weight: 700;
			}

			.advice {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 40rpx 0;
				width: 90%;
				margin: 0 auto 20rpx;
				border-bottom: 1px solid #f5f5f5;

				.value {
					font-size: 30rpx;
					font-weight: 700;
					width: 60%;
					white-space: nowrap;
				}

				.btn {
					padding: 0 20rpx;
					line-height: 60rpx;
					border-radius: 30rpx;
					background-color: #000;
					color: #fff;
					font-size: 26rpx;
				}
			}

			.message {
				width: 90%;
				margin: 0 auto;

				.line {
					width: 100%;
					height: 8rpx;
					margin-top: 20rpx;
					background-color: #000;
					border-radius: 20rpx;
				}
			}

			.btns {
				display: flex;
				flex-wrap: wrap;
				background-color: #FFFFFF;
				padding-bottom: 30rpx;
				border-bottom-left-radius: 30rpx;
				border-bottom-right-radius: 30rpx;
				overflow: hidden;
				margin-top: 55rpx;

				.item {
					width: 50%;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					&:first-child {
						border-right: 1px solid #f5f5f5;
					}

					&.center {
						width: 100%;
						margin-top: 40rpx;

						.img-box {
							width: 20%;
						}
					}

					.img {
						position: absolute;
						width: 100%;
						height: 100%;

						&-box {
							width: 40%;
							margin-bottom: 10rpx;
						}
					}

					.title {
						font-size: 32rpx;
						margin-bottom: 10rpx;
					}

					.mark {
						font-size: 24rpx;
						color: $uni-text-color-grey;
					}
				}
			}

			.footer {
				height: 10%;
			}
		}

		.coupon {
			width: 90%;
			margin: 30rpx auto 0;
			background-color: #fff;
			padding: 30rpx;
			position: relative;
			top: -100rpx;

			.title {
				display: flex;
				justify-content: space-between;
				align-items: flex-end;
				font-size: 24rpx;
				color: $uni-text-color-grey;
				line-height: 40rpx;

				.black {
					color: #000;
					font-size: 40rpx;
				}

				.tips {
					display: flex;
					align-items: flex-end;
					line-height: 50rpx;

					text {
						margin-right: 5rpx;
					}
				}


				.btn {
					border: 1px solid #000;
					margin-left: 20rpx;
					padding: 0 15rpx;
					border-radius: 30rpx;
					font-weight: bold;
					color: #000;
					letter-spacing: 2rpx;
				}
			}

			.icons {
				display: flex;
				justify-content: space-around;
				align-items: center;
				margin-top: 40rpx;

				.iconfont {
					font-size: 55rpx;

					&.avite {}
				}
			}
		}
	}
</style>
