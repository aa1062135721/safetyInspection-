<template>
	<view class="ereport">
		<view class="content">
			<view class="single">
				<text class="title">事件标题</text>
				<u-input v-model="info.title" placeholder="请输入事件标题" />
			</view>
			<view class="single">
				<text class="title">事件地点</text>
				<u-input v-model="info.address" placeholder="请输入事件地点" />
			</view>
			<view class="single bz">
				<text class="title">备注</text>
				<u-input v-model="info.remarks" placeholder="请输入备注文字" :type="type" height="180" maxlength="1000" :autoHeight="false"/>
			</view>
		</view>
		<view class="uploadImg">
			<text class="title">图片</text>
			<u-upload style="display: flex; align-items: center;" name="name" @on-Success="onSuccess" :action="action" del-bg-color="#747474" :show-progress="true" :preview-full-image="false" :custom-btn="true">
				<view slot="addBtn" >
					<image src="../../static/icon_upload.png" style="width: 200rpx; height: 200rpx; margin-top: 10rpx;"></image>
				</view>
			</u-upload>
		</view>
		<view class="btn">
			<button @click="submit">提交</button>
		</view>
		<view style="height: 5vh;"></view>
	</view>
</template>

<script>
	export default {
		data ()  {
			return {
				info: {
					title: '', // 事件标题
					address: '', // 事件地址
					remarks: '' // 备注
				},
				type: 'textarea', // 文本框类型
				userInfo: {}, // 用户信息
				pictures: '', // 上传图片列表
				action: "https://cuntapoling.mx5918.com/index.php/api/file_uploads" // 图片上传地址
			}
		},
		
		created () {
			this.userInfo = uni.getStorageSync('userInfo')
		},
		
		methods: {			
			// 图片上传成功的钩子
			onSuccess(data, index, lists){
				uni.showToast({
					title: data.msg,
					icon: "none"
				})
				if (data.code === 1 && data.msg === "上传成功") {
					this.pictures += data.data + ','		
				}
			},
			
			// 提交
			submit () {
				let str = ''
				if (this.info.title === '') {
					str = '请输入事件标题'
				} else if (this.info.address === '') {
					str = '请输入事件地点'
				}
				if (str) {
					uni.showToast({
						title: str,
						icon: 'none'
					})
					return
				}
				if (this.pictures.length > 0) {
					this.pictures = this.pictures.substr(0, this.pictures.length - 1);
				}
				let subItems = {
					sb_name: this.userInfo.real_name,
					title: this.info.title,
					address: this.info.address,
					remark: this.info.remarks,
					sb_pictures: this.pictures
				}
				this.Api.post('changeReport', subItems).then(res => {
					if (res.data.code === 1) {
						uni.navigateTo({
							url: `/pageA/index/reportSuccess`
						})						
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ereport {
		padding: 0 32rpx;
		.content {
			.single {
				border-bottom: 2rpx solid #ebebeb;
				padding-bottom: 16rpx;
				margin-top: 32rpx;
				.title {
					font-size: 38rpx;
					font-weight: 500;
				}
				/deep/ .u-input {
					margin-top: 32rpx;
					input {
						font-size: 32rpx;
					}
				}
			}
			// .bz {
			// 	padding-bottom: 4rem;
			// }
		}
		.uploadImg {
			margin-top: 32rpx;
			.title {
				display: block;
				font-size: 38rpx;
				font-weight: 500;
				margin-bottom: 32rpx;
			}
		}
		.btn {
			margin-top: 15vh;
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
