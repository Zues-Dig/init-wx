<template>
	<view class="container">
		<view class="top-title">
			<view style="height: 150rpx;">
				<u-row customStyle="margin-bottom: 50rpx">
					<u-col span="3">
						<view class="avatar-self" @click="getUser">
							<u-avatar :src="src" size="100rpx" shape="square"></u-avatar>
						</view>
					</u-col>
					<u-col span="9">
						<view class="person-text">

							<view class="name" @click="test">
								John Doe
							</view>
							<view class="soglon">
								旅途漫漫，鹿力同心
							</view>
						</view>
					</u-col>
				</u-row>
			</view>
	<!-- 		<view style="height: 150rpx;">

				<image src="../../static/images/home-banner1.gif"></image>

			</view> -->
			<u-row>
				<u-col span="10">
					<view>
						<u--text text="我的计划" :size="24"></u--text>
					</view>
				</u-col>
				<u-col span="2">
					<u-button @click="addScheme" class="add" text="+" type="primary" color="#123D59"></u-button>
				</u-col>
			</u-row>
		</view>
		<view class="scheme-list">
			<u-row @click="openScheme">
				<u-col span="12">
					<view class="scheme-list-item">
						<view class="scheme-list-item-card">
							<view class="scheme-list-item-card-text">
								<view class="scheme-list-item-card-text-destination">汕头 </view>
								<view style="color: #7C8698;">
									2024年1月1日
								</view>
							</view>
						</view>
					</view>
				</u-col>
			</u-row>
			<u-row>
				<u-col span="12">
					<view class="scheme-list-item">
						<view class="scheme-list-item-card">
							<view class="scheme-list-item-card-text">
								<view class="scheme-list-item-card-text-destination">汕头 </view>
								<view style="color: #7C8698;">
									2024年1月1日
								</view>
							</view>
						</view>
					</view>
				</u-col>
			</u-row>
			<u-row>
				<u-col span="12">
					<view class="scheme-list-item">
						<view class="scheme-list-item-card">
							<view class="scheme-list-item-card-text">
								<view class="scheme-list-item-card-text-destination">汕头 </view>
								<view style="color: #7C8698;">
									2024年1月1日
								</view>
							</view>
						</view>
					</view>
				</u-col>
			</u-row>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: 'https://tse2-mm.cn.bing.net/th/id/OIP-C.K1xIXCXihJ_GYjH9STio4wHaLH?pid=ImgDet&w=474&h=711&rs=1'
			}
		},
		computed: {
			watch_userInfo() {
				return this.$store.getters['user/getUserInfo']
			}
		},
		methods: {
			addScheme() {
				uni.navigateTo({
					url: '/pages/scheme/add_scheme'
				})
			},
			openScheme() {
				uni.navigateTo({
					url: '/pages/scheme/scheme_list'
				})
			},
			getUser() {
				console.log(this.watch_userInfo)
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
			test() {
				this.$minApi.scheme()
					.then(result => {
						console.log("success")
					})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
		height: calc(100vh - 80rpx);

		.top-title {
			height: 220rpx;
			margin-bottom: 60rpx;

			.avatar-self {
				margin-left: 30rpx;
			}

			.person-text {
				margin-left: 16rpx;

				.name {
					font-size: 44rpx;
					margin-bottom: 24rpx;
				}

				.soglon {
					line-height: 0;
					font-size: 22rpx;
					color: #949494;
				}
			}

			.add {
				color: green;
				font-size: 20px;
			}
		}

		.scheme-list {
			overflow-y: scroll;
			margin: 10rpx 0;
			height: calc(100% - 250rpx);
			;

			&-item {
				background-color: beige;
				height: 400rpx;
				border-radius: 25rpx;
				position: relative;
				margin: 20rpx 0;


				&-card {
					width: calc(100% - 200rpx);
					height: 200rpx;
					background-color: #FFFFFF;
					opacity: 0.9;
					position: absolute;
					bottom: 40rpx;
					left: -20rpx;
					border-radius: 0 20rpx 20rpx 0;
					box-shadow: -3rpx 3rpx 6rpx 0rpx #d3d3d3;

					&-text {
						margin-left: 50rpx;

						&-destination {
							margin: 25rpx 0 12rpx 0;
							font-size: 40rpx;
							font-weight: bold;
							font-family: 'Poppins';
						}

					}
				}
			}
		}

	}
</style>