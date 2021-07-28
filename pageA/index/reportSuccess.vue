<template>
	<view class="reportSuccess">
		<view class="content">
			<image src="../../static/icon_submitSuccess.png"></image>
			<text class="success">提交成功</text>
			<text class="tips">请等待后台处理</text>
		</view>
		<view class="btn">
			<button class="detail" @click="detail">查看上报详情</button>
			<button class="back" @click="back">返回首页</button>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				
			}
		},
		
		methods: {
			// 跳转详情页
			detail () {
				uni.navigateTo({
					url: `/pageA/index/reportRecords`
				})
			},
			
			// 返回首页
			back () {
				uni.switchTab({
					url: `/pages/index/index`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.reportSuccess {
		padding: 0 10vw;
		position: relative;
		.content {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-top: 15vh;
			image {
				width: 288rpx;
				height: 256rpx;
			}
			.success {
				font-size: 38rpx;
				margin: 48rpx 0 16rpx;
			}
			.tips {
				color: #999999;
				font-size: 26rpx;
			}
		}
		.btn {
			margin-top: 64rpx;
			button {
				height: 96rpx;
				font-size: 32rpx;
				line-height: 96rpx;
				margin-bottom: 32rpx;
			}
			.detail {
				background: #2FA1BE;
				color: #FFFFFF;
			}
			.back {
				background: #FFFFFF;
				border: 2rpx solid #2FA1BE;
				color: #2FA1BE;
			}
		}
	}
</style>
