<template>
	<view class="scanChekc">
		<view class="oneline">
			<text class="t1">巡检点位</text>
			<text class="t2">{{params.xj_point}}</text>
		</view>
		<view class="twoline">
			<u-cell-item title="异常状态" @click="showSelect = true" :value="selectValue"></u-cell-item>
		</view>
		<view class="threeline">
			<text class="t1">备注</text>
			<u-input v-model="remarksVal" :type="type" placeholder="请输入备注文字" />
		</view>
		<view class="fourline">
			<text class="t1">图片</text>
			<u-upload style="display: flex; align-items: center;" name="name" @on-Success="onSuccess" :action="action" del-bg-color="#747474" :show-progress="true" :preview-full-image="false" :custom-btn="true">
				<view slot="addBtn" >
					<image src="../../static/icon_upload.png" style="width: 200rpx; height: 200rpx; margin-top: 10rpx;"></image>
				</view>
			</u-upload>
		</view>
		<u-picker mode="selector" v-model="showSelect" :range="list" range-key="label"  :default-selector="[0]" @confirm="confirm"></u-picker>
		<view class="btn">
			<button type="default" @click="submit">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				remarksVal: '', // 备注信息
				type: 'textarea ', // 文本框类型
				list: [
					{
						value: 1,
						label: '有'
					},
					{
						value: 2,
						label: '无'
					}
				], // 异常状态类型
				showSelect: false, // 控制异常状态弹窗
				selectValue: '', // 异常状态值
				params: {}, // 保存路由传值
				action: "https://cuntapoling.mx5918.com/index.php/api/file_uploads", // 图片上传地址
				pictures: '' // 图片上传列表
			}
		},
		
		// 获取路由传值
		onLoad (option) {
			this.params = JSON.parse(option.params)
		},
		
		methods: {
			// 获取下拉框确定值
			confirm (val) {
				this.selectValue = this.list[val[0]].label
			},
			
			// 图片上传成功的钩子
			onSuccess(data, index, lists){
				uni.showToast({
					title: data.msg,
					icon: "none"
				})
				console.log(data)
				if (data.code === 1 && data.msg === "上传成功") {
					this.pictures += data.data + ','		
				}
			},
			
			// 提交
			submit() {
				if (this.pictures.length > 0) {
					this.pictures = this.pictures.substr(0,this.pictures.length - 1);
				}
				let subItms = {
					tasks_id: this.params.tasks_id,
					contens_id: this.params.contens_id + '',
					numbers: this.params.numbers,
					remark: this.remarksVal,
					pictures: this.pictures,
					yc_status: this.selectValue === "有" ? 1 : 0,
					cl_status: 0
				}
				this.Api.post('xjRecordAdd', subItms).then(res => {
					if (res.data.code === 1 && res.data.msg === "success") {
						uni.showToast({
							title: "提交成功",
							icon: 'none'
						})
						setTimeout(() => {
							uni.navigateBack()
						}, 1000)
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: "none"
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.scanChekc {
		padding: 32rpx;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		padding-bottom: 64rpx;
		.oneline {
			display: flex;
			flex-direction: column;
			border-bottom: 2rpx solid #eeeeee;
			padding-bottom: 26rpx;
			.t1 {
				font-size: 32rpx;
				margin-bottom: 32rpx;
			}
			.t2 {
				color: #666666;
				font-size: 26rpx;
			}
		}
		.twoline {
			/deep/ .u-cell {
				padding: 32rpx 0;
				.u-cell_title {
					font-size: 32rpx;
				}
			}
		}
		.threeline {
			display: flex;
			flex-direction: column;
			border-bottom: 2rpx solid #eeeeee;
			padding-bottom: 26rpx;
			margin-top: 48rpx;
			padding-bottom: 128rpx;
			.t1 {
				font-size: 32rpx;
				margin-bottom: 32rpx;
			}
		}
		.fourline {
			display: flex;
			flex-direction: column;
			padding-bottom: 26rpx;
			margin-top: 48rpx;
			border-bottom: 2rpx solid #eeeeee;
			flex: 1;
			.t1 {
				font-size: 32rpx;
				margin-bottom: 32rpx;
			}
		}
		.btn {
			margin-top: 32rpx;
			button {
				background: #2FA1BE;
				color: #FFFFFF;
				height: 96rpx;
				font-size: 32rpx;
				line-height: 96rpx;
			}
		}
	}
</style>
