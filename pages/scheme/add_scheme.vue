<template>
	<view class="container">
		<view class="title">新建计划</view>
		<view class="add_scheme_form">
			<u--form labelPosition="top" :labelStyle="{'color': '#AFB1B6'}">
				<u-form-item label="城市">
					<u--input v-model="form.cityName"></u--input>
				</u-form-item>
				<u-form-item label="日期">
					<view class="date-select">
					<u-row @click="showCalendar=true">
						<u-col span="5">
							{{form.travalRageDate ? form.travalRageDate[0] : ''}}
						</u-col>
						<u-col span="2" textAlign="center">
							至
						</u-col>
						<u-col span="5">
							{{form.travalRageDate ? form.travalRageDate[form.travalRageDate.length - 1]: ''}}
						</u-col>
					</u-row>
					</view>
				</u-form-item>
				<u-form-item label="备注">
					<u--textarea v-model="form.mark" placeholder="请输入内容" ></u--textarea>
				</u-form-item>
			</u--form>
			<view style="margin: 20rpx;">
				<l-button width="620" height="80">开始出发</l-button>
			</view>
		</view>
		
		<u-calendar :show="showCalendar" mode="range" closeOnClickOverlay="true" showMark="true"
			@confirm="confirmCalendar" @close="closeCalendar"></u-calendar>
			
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					cityName: '',
					travalRageDate: null,
					mark: ''

				},
				showCalendar: false
			}
		},
		methods: {
			confirmCalendar(e) {
				console.log(e);
				this.form.travalRageDate = e;
				this.showCalendar = false;
			},
			closeCalendar(e) {
				console.log(e);
				this.showCalendar = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 20px;
		.title {
			font-size: 40rpx;
			margin-bottom: 50rpx;
		}
		.date-select {
			padding: 18rpx;
			border: 1rpx solid #dadbde ;
			border-radius: 10rpx;
		}
	}
</style>