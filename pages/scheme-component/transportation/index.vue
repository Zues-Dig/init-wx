<template>
	<view class="container">
		<view class="title">交通</view>
		<view class="add_transportation_form">
			<u--form labelPosition="top" :labelStyle="{'color': '#AFB1B6', 'width': '150rpx'}">
				<u-form-item label="交通方式" labelPosition="top">
					<view class="type-picker" @click="show = true" />
					<u-picker :show="show" :columns="columns" @cancel="addressCancel"
						@confirm="addressConfirm"></u-picker>
				</u-form-item>
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
					<u-col span="5">
						<u-form-item label="到达时间">
							<view class="date-pricker" @click="show3 = true" />
							<u-datetime-picker :show="show3" v-model="endDatetime" mode="datetime"></u-datetime-picker>
						</u-form-item>
					</u-col>
				</u-row>
				<u-row>
					<u-col span="5">
						<u-form-item label="起始地">
							<u--input v-model="form.startAddress"></u--input>
						</u-form-item>
					</u-col>
					<u-col span="2"></u-col>
					<u-col span="5">
						<u-form-item label="到达地">
							<u--input v-model="form.endAddress"></u--input>
						</u-form-item>
					</u-col>
				</u-row>
				<u-row>
					<u-col span="5">
						<u-form-item label="班次">
							<u--input v-model="form.shift"></u--input>
						</u-form-item>
					</u-col>
				</u-row>
				<view class="ticket_detail_card">
					<view>
						<u-row>
							<u-col span="6">
								<u--input placeholder="请输入内容" border="bottom" clearable prefixIcon="search"
									prefixIconStyle="font-size: 22px;color: #909399"></u--input>
							</u-col>
							<u-col span="6">
								<u--input placeholder="请输入内容" border="bottom" clearable suffixIcon="map-fill"
									suffixIconStyle="color: #909399"></u--input>
							</u-col>
						</u-row>
					</view>
					<view class="ticket_detail_card-add">
						添加车票信息
					</view>
				</view>
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

		.add_transportation_form {

			.date-pricker,
			.type-picker {
				padding: 18rpx;
				height: 34rpx;
				border: 1rpx solid #dadbde;
				border-radius: 10rpx;
			}
		}

		.ticket_detail_card {
			background-color: aquamarine;
			height: 150rpx;
			
			&-add {
				text-align: center;
				margin-top: 14rpx;
			}
		}
	}
</style>