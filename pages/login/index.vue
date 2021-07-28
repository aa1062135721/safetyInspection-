<template>
	<view class="login">
		<view class="top">
			<text class="title">丝路花街安全巡检</text>
			<text class="tips">员工使用内部账号登录</text>
		</view>
		<view class="content">
			<view class="inp">
				<image src="@/static/icon_user.png"></image>
				<input type="text" placeholder="请输入账号" v-model="userName"/>
			</view>
			<view class="inp">
				<image src="@/static/icon_pwd.png"></image>
				<input type="password" placeholder="请输入密码" v-model="userPwd"/>
			</view>
		</view>
		<view class="btn">
			<button @click="submit">登录</button>
		</view>
		<view>
			<u-toast ref="uToast" />
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				userName: '', // 用户名
				userPwd: '' // 用户密码
			}
		},
			
		methods: {
			// 登录
			submit () {
				let str = ''
				if (!this.userName) {
					str = "请输入账号"
				} else if (!this.userPwd) {
					str = "请输入密码"
				}
				if (str) {
					uni.showToast({
						title: str,
						icon: "none"
					})
					return
				}
				uni.clearStorage()
				let subItems = {
					auth_users: this.userName,
					auth_pass: this.userPwd
				}
				this.Api.post('xjLogin', subItems).then(res => {
					if (res.data.code === 1) {
						uni.setStorageSync('userInfo', res.data.data)
						uni.setStorageSync('token', res.data.data.token)
						uni.switchTab({
							url:'/pages/index/index'
						})
					} else {
						this.$refs.uToast.show({
							title: res.data.msg
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login {
		padding: 10vh 5vh;
		.top {
			display: flex;
			flex-direction: column;
			.title {
				font-size: 51rpx;
				font-weight: bold;
			}
			.tips {
				margin-top: 26rpx;
				color: #999999;
				font-size: 32rpx;
			}
		}
		.content {
			margin-top: 20vh;
			.inp {
				display: flex;
				align-items: center;
				padding-bottom: 16rpx;
				border-bottom: 2rpx solid #f3f3f3;
				margin-bottom: 96rpx;
				image {
					width: 48rpx;
					height: 48rpx;
					margin-right: 10rpx;
				}
				input {
					font-size: 32rpx;
				}
			}
		}
		.btn {
			margin-top: 10vh;
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
