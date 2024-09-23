<template>
	<view class="container">
		<view class="scheme-background">

		</view>
		<view class="scheme-title">潮汕</view>
		<view class="navbar" id="navbar">
			<u-scroll-list :indicator="false">
				<view v-for="(item, index) in list" :key="index">
					<view class="day-block"></view>
				</view>
			</u-scroll-list>
			<view class="dirider"></view>
		</view>
		<view class="date_weather">
			<u-row>
				<u-col span="8">
					<view style="margin-left: 30rpx;">
						3月3日
					</view>
				</u-col>
				<u-col span="4">
					<view style="float: right;margin-right: 50rpx;">
						晴
					</view>
				</u-col>
			</u-row>
		</view>

		<l-steps direction="column" dot="false" active-index="3">
			<l-step title="2019-9-25 11:30" icon="error" icon-size="20">
				<!-- <view class="describe-container" slot="describe">
		      广大群众反映步骤条问题
		    </view> -->
				<view slot="describe">
					<view class="ticket --flex-column">
						<view class="top --flex-column">
							<view class="content">
								<u-row>
									<u-col span="4">
										<view class="info-time">9:00</view>
										<view class="info-address">广州</view>
									</u-col>
									<u-col span="4">
										<view style="font-size: 24rpx;text-align: center">历时1:30</view>
										<view style="text-align: center">→</view>
									</u-col>
									<u-col span="4">
										<view class="info-time">10:30</view>
										<view class="info-address">汕头站</view>
									</u-col>
								</u-row>
							</view>
						</view>
						<view class="rip"></view>
						<view class="bottom --flex-row-j!sb">
							<view class="barcode"></view>

						</view>
					</view>
				</view>
			</l-step>
			<l-step title="2019-10-05 12:30">
				<view slot="describe">
					<view class="address-card">
						<view class="address-card-header">
							<u-row>
								<u-col span="10">
									<view class="address-card-name">小公园</view>
								</u-col>
								<u-col span="2" class="address-card-icon">
									<view class="address-card-icon">😀</view>
								</u-col>
							</u-row>
						</view>
						<u-row>
							<u-col span="12">
								<view class="dirider"></view>
							</u-col>
						</u-row>
						<view class="address-card-footer">
							<u-row>
								<u-col span="8">
									<view style="color:#000; margin-left: 14rpx;">历时1:30</view>
									<view style="margin-left: 14rpx;color:#000;">20￥</view>
								</u-col>
								<u-col span="4">
									<u-button type="primary" shape="circle" size="small" text="详情"></u-button>
								</u-col>
							</u-row>
						</view>
					</view>
				</view>
			</l-step>
			<l-step title="2019-10-25 13:30">
				<view slot="describe">
					<view class="foot-card">
						<u-row>
							<u-col span="8">
								<view class="foot-card-name">铭铭哦啊煎</view>
							</u-col>
							<u-col span="3">
								<view style="margin-left: 14rpx;color:#000;">20￥</view>
							</u-col>
							<u-col span="1">
								<view class="">😀</view>
							</u-col>
						</u-row>
					</view>
				</view>
			</l-step>
		</l-steps>

		<uni-fab ref="fab" :pattern="pattern" @trigger="trigger" direction="vertical" :content="content"
			horizontal="right" vertical="bottom" />


		<view class="footer">
			<view class="" style="width: 100%;height: 100rpx;">
				<u-row>
					<u-col span="5">
						<view class="footer-text" @click="popupShow = true">线路</view>
					</u-col>
					<u-col span="4">
						<view class="footer-text">分享</view>
					</u-col>
					<u-col span="3">
						<view></view>
					</u-col>
				</u-row>
			</view>
		</view>
		<view>
			<u-popup :show="popupShow" mode="right" @close="close" @open="open">
				<view>
					<text>出淤泥而不染，濯清涟而不妖</text>
				</view>
			</u-popup>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					thumb: "https://cdn.uviewui.com/uview/goods/1.jpg"
				}],
				popupShow: false,
				urlRouterList: [
					'/pages/scheme-component/hotel/index',
					'/pages/scheme-component/transportation/index',
					'/pages/scheme-component/attractions/index',
					'/pages/scheme-component/catering/index'
				],
				content: [{
						iconPath: '/static/image.png',
						selectedIconPath: '/static/image-active.png',
						text: '酒店',
						active: false
					},
					{
						iconPath: '/static/home.png',
						selectedIconPath: '/static/home-active.png',
						text: '交通',
						active: false
					},
					{
						iconPath: '/static/star.png',
						selectedIconPath: '/static/star-active.png',
						text: '景点',
						active: false
					},
					{
						iconPath: '/static/star.png',
						selectedIconPath: '/static/star-active.png',
						text: '饮食',
						active: false
					}
				]
			}
		},
		onBackPress() {
			if (this.$refs.fab.isShow) {
				this.$refs.fab.close()
				return true
			}
			return false
		},
		methods: {
			trigger(e) {
				console.log(e, this.urlRouterList[e.index])
				uni.navigateTo({
					url: this.urlRouterList[e.index]
				})
			},
			 close() {
			        this.popupShow = false
			        // console.log('close');
			      }
		}
	}
</script>

<style lang="scss" scoped>
	.describe-container {
		text-align: center;
		height: 200rpx;
		border: 1px solid #4d4d4d;
	}

	.scheme-background {
		width: auto;
		height: 380rpx;
		background-color: bisque;
	}

	.fab-class {
		position: relative;
		top: 20rpx;
	}

	.scheme-title {
		height: 50rpx;
		font-size: 38rpx;
		text-align: center;
		margin-top: 20rpx;
	}

	.day-block {
		width: 100rpx;
		height: 100rpx;
		background-color: gray;
		margin: 0 15rpx;
		border-radius: 12rpx;
		margin-top: 20rpx;
	}

	.dirider {
		border-bottom: 1px solid #c0c4cc;
		margin: 10rpx 20rpx 20rpx;
	}

	.date_weather {
		height: 50rpx;
	}


	.navbar {
		width: 100%;
		text-align: center;
		background-color: #fff;
		z-index: 999;
		/* 兼容 */
		position: -webkit-sticky;
		position: -ms-sticky;
		position: -o-sticky;
		/* 粘性定位*/
		position: sticky;
		left: 0;
		top: 0;
		color: #fff;
	}

	.address-card {

		width: 500rpx;
		height: 180rpx;
		border-radius: 20rpx;
		border: 4rpx solid #AF33FF;

		&-header {
			padding: 20rpx 20rpx 10rpx;
		}

		&-footer {
			padding: 0 20rpx 10rpx;
			font-size: 28rpx;
		}

		&-name {
			color: #000;
			font-size: 32rpx;
			margin-left: 14rpx;
		}

		&-icon {
			float: right;
		}
	}

	.foot-card {
		width: 500rpx;
		height: 50rpx;
		border-radius: 20rpx;
		border: 4rpx solid #FF5733;
		font-size: 28rpx;
		padding: 20rpx 5rpx;

		&-name {
			color: #000;
			font-size: 32rpx;
			margin-left: 14rpx;
		}

		&-icon {
			float: right;
		}
	}

	.footer {
		margin-top: 150rpx;
		position: sticky;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #fff;
		color: #333;
		text-align: center;
		border-top: 1rpx solid #d4d4d4;

		&-text {
			text-align: center;
			margin-top: 20rpx;
			border-right: 1rpx solid #d4d4d4;
			color: #808080;
		}
	}

	.ticket {
		width: 510rpx;
		filter: drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.3));

		.top,
		.bottom,
		.rip {
			background-color: #fff;
		}

		.top {
			border-top-right-radius: 20rpx;
			border-top-left-radius: 20rpx;
			height: 100rpx;
			padding: 30rpx 20rpx 10rpx;
			border: 4rpx solid #3AB92E;
			border-bottom: 0;

			.content {
				.info-time {
					font-size: 42rpx;
					color: black;
					text-align: center;
				}

				.info-address {
					font-size: 28rpx;
					color: #A2A1AC;
					text-align: center;
				}
			}
		}

		.rip {
			height: 40rpx;
			margin: 0 16rpx;
			background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAACCAYAAAB7Xa1eAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuOWwzfk4AAAAaSURBVBhXY5g7f97/2XPn/AcCBmSMQ+I/AwB2eyNBlrqzUQAAAABJRU5ErkJggg==);
			background-size: 6rpx 4rpx;
			background-repeat: repeat-x;
			background-position: center;
			position: relative;
			box-shadow: 0 1rpx 0 0 #fff, 0 -1rpx 0 0 #fff;

			&:before,
			&:after {
				content: '';
				position: absolute;
				width: 40rpx;
				height: 40rpx;
				top: 50%;
				transform: translate(-50%, -50%) rotate(45deg);
				border: 4rpx solid transparent;
				border-top-color: #3AB92E;
				border-right-color: #3AB92E;
				border-radius: 100%;
				pointer-events: none;
			}

			&:before {
				left: -8px;
			}

			&:after {
				transform: translate(-50%, -50%) rotate(225deg);
				right: -32px;
			}
		}

		.bottom {
			border-bottom-right-radius: 20rpx;
			border-bottom-left-radius: 20rpx;
			padding: 18px;
			height: 30rpx;
			padding-top: 10px;
			border: 4rpx solid #3AB92E;
			border-top: 0;

			.barcode {
				background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF4AAAABCAYAAABXChlMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuOWwzfk4AAACPSURBVChTXVAJDsMgDOsrVpELiqb+/4c0DgStQ7JMYogNh2gdvg5VfXFCRIZaC6BOtnoNFpvaumNmwb/71Frrm8XvgYkker1/g9WzMOsohaOGNziRs5inDsAn8yEPengTapJ5bmdZ2Yv7VvfPN6AH2NJx7nOWPTf1/78hoqgxhzw3ZqYG1Dr/9ur3y8vMxgNZhcAUnR4xKgAAAABJRU5ErkJggg==);
				background-repeat: repeat-y;
				min-width: 58px;
			}

			.buy {
				display: block;
				font-size: 12px;
				font-weight: bold;
				background-color: #5D9CEC;
				padding: 0 18px;
				line-height: 30px;
				border-radius: 15px;
				color: #fff;
				text-decoration: none;
			}
		}

	}
</style>