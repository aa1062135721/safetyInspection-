<template>
	<view class="mine u-skeleton">
		<view class="top">
			<image src="../../static/bg_mine.png" @load="load"></image>
			<view class="content">
				<image class="u-skeleton-circle" src="@/static/icon_myHeader.png"></image>
				<text class="name u-skeleton-rect">{{userInfo.real_name}}</text>
			</view>
		</view>
		<view class="tabList">
			<u-cell-group>
				<u-cell-item class="u-skeleton-rect" :icon="aboutUs" title="关于我们" @click="goPage('/pages/mine/aboutUs')"></u-cell-item>
				<u-cell-item class="u-skeleton-rect" :icon="outLogin" title="退出登录" @click="isLogin=true"></u-cell-item>
			</u-cell-group>
		</view>
		<u-popup v-model="isLogin" mode="center" border-radius='20'>
			<view class="popup" style="border-radius: 20rpx;">
				<view class="title">
					<text>退出登录</text>
				</view>
				<text class="t1">确定退出当前账号？</text>
				<view class="btn">
					<button class="b1" @click="isLogin=false">取消</button>
					<button class="b2" @click="sure">确定</button>
				</view>
			</view>
		</u-popup>
		<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
	</view>
</template>

<script>
	import aboutUs from '@/static/icon_aboutUs.png'
	import outLogin from '@/static/icon_outLogin.png'
	export default {
		data() {
			return {
				aboutUs,
				outLogin,
				isLogin: false, // 控制退出登录弹窗
				loading: true, // 控制骨架屏状态
				userInfo: {} // 用户信息
			}
		},
		
		onLoad() {
			this.userInfo = uni.getStorageSync('userInfo')
		},
		
		methods: {
			// 跳转页面
			goPage (url) {
				uni.navigateTo({
					url: url
				})
			},
			
			// 退出登录
			sure () {
				uni.redirectTo({
					url: `/pages/login/index`
				})
				this.isLogin = false
				uni.clearStorageSync()
			},
			
			// 背景图片加载完毕，骨架屏关闭显示
			load () {
				this.loading = false
			}
		}
	}
</script>

<style lang="scss" scoped>
.mine {
	min-height: 100vh;
	.top {
		height: 35vh;
		position: relative;
		image {
			height: 100%;
			width: 100%;
		}
		.content {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -40%);
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			image {
				width: 192rpx;
				height: 192rpx;
				border-radius: 50%;
				border: 10rpx solid #78acb1;
			}
			.name {
				width: 80%;
				font-size: 48rpx;
				margin-top: 32rpx;
				color: #FFFFFF;
				text-align: center;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
	}
	.tabList {
		.u-cell {
			line-height: 48rpx;
		}
		/deep/.u-cell_title {
			font-size: 32rpx;
			color: #333333;
		}
		/deep/.u-icon__img {
			width: 38rpx !important;
			height: 38rpx !important;
		}
		/deep/.u-icon__icon {
			font-size: 26rpx !important;
		}
	}
	.popup {
		width: 80vw;
		height: 500rpx;
		padding: 32rpx;
		text-align: center;
		.title {
			font-size: 45rpx;
			font-weight: bold;
			color: #333333;
		}
		.t1 {
			display: block;
			margin: 112rpx 0;
			font-size: 32rpx;
			color: #666666;
		}
		.btn {
			display: flex;
			align-items: center;
			button {
				width: 42%;
			}
			.b1 {
				color: #2FA1BE;
				border: 2rpx solid #2FA1BE;
				background: #FFFFFF;
			}
			.b2 {
				background: #2FA1BE;
				color: #FFFFFF;
			}
		}
	}
}
</style>
