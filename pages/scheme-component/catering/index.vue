<template>
	<view class="container">
		<view class="title">饮食</view>
		<view class="add_cateering_form">
			<u--form labelPosition="top" :labelStyle="{'color': '#AFB1B6', 'width': '150rpx'}">
				<u-form-item label="标题">
					<u--input v-model="form.title"></u--input>
				</u-form-item>
				<u-row>
					<u-col span="5">
						<u-form-item label="发生时间">
							<view class="date-pricker" @click="show2 = true" />
							<u-datetime-picker :show="show2" v-model="startDatetime"
								mode="datetime"></u-datetime-picker>
						</u-form-item>
					</u-col>
					<u-col span="2"></u-col>
				</u-row>
				<u-row>
					<u-form-item label="餐厅名">
						<u--input v-model="form.title"></u--input>
					</u-form-item>
				</u-row>
				<u-row>
					<u-form-item label="价格">
						<u--input v-model="form.title"></u--input>
					</u-form-item>
				</u-row>
				<view>
					定位
				</view>
				<u-row>
					<u-col span="12">
						<u-form-item label="备注">
							<u--textarea v-model="form.mark" placeholder="请输入内容"></u--textarea>
						</u-form-item>
					</u-col>
				</u-row>
			</u--form>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				show2: false,
				show3: false,
				form: {
					type: '',
					title: '',
					startDatetime: null,
					endDatetime: null,
					startAddress: '',
					endAddress: '',
					shift: ''
				},
				columns: [
					['中国', '美国', '日本']
				],
			}
		},
		methods: {
			// 注意返回值为一个数组，单列时取数组的第一个元素即可(只有一个元素)
			addressConfirm(e) {
				console.log(e);
				this.show = false
			},
			addressCancel() {
				this.show = false
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

		.add_cateering_form {

			.date-pricker,
			.type-picker {
				padding: 18rpx;
				height: 34rpx;
				border: 1rpx solid #dadbde;
				border-radius: 10rpx;
			}
		}

	}
</style>