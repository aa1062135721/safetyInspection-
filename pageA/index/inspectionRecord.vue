<template>
	<view class="reportRecords">
		<view class="indexTop">
			<u-search placeholder="搜索巡检人/巡检路线" v-model="searchVal" :show-action="false" @search="search" @change="changeSearchVal"></u-search>
			<!-- <view class="tabs">
				<u-tabs :bold="false" inactive-color="#666666" active-color="#2FA1BE" :list="list" :is-scroll="false" :current="current" @change="changeTab"></u-tabs>
			</view> -->
		</view>
		<view class="myFeedback" v-if="data && data.length">
			<view class="single" @click="goDatail(item.id)" v-for="(item, index) in data" :key="index">
				<view class="top">
					<view class="left">
						<text>{{item.inspection}}</text>
					</view>
				</view>
				<view class="detail">
					<view class="single con">
						<image src="../../static/icon_time.png"></image>
						<text>{{dayjs.unix(item.create_time).format('YYYY-MM-DD HH:mm')}}</text>
					</view>
					<view class="single le">
						<image src="../../static/icon_task_1.png"></image>
						<text>{{item.atuh_name}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="noCentent" v-else>
			<text>暂无内容</text>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				searchVal: '', // 搜索值
				list: [{
					name: '全部'
				}, {
					name: '未完成'
				}, {
					name: '已完成'
				}],
				current: 0,
				userInfo: {}, // 用户信息
				data: []
			}
		},
		
		created () {
			this.userInfo = uni.getStorageSync('userInfo')
			this.fetchData()
		},
		
		methods: {
			// 初始化数据
			fetchData (name) {
				let subItems = {
					keyword: ''
				}
				if (name) subItems.keyword = name
				this.Api.post('xjRecordList', subItems).then(res => {
					if (res.data.code === 1) {
						this.data = res.data.data
					}
				})
			},
			
			// 搜索功能
			search (val) {
				this.fetchData(val)
			},
			
			// 监听输入框内容的变化，内容为空，重新请求数据
			changeSearchVal (val) {
				if (!val) this.fetchData()
			},
			
			// 切换tab
			changeTab (idx) {
				this.current = idx
			},
			
			// 跳转详情页
			goDatail (id) {
				uni.navigateTo({
					url: `/pageA/index/inspectionDetail?id=${id}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.reportRecords {
		min-height: 100vh;
		background-color: #F5F5F5;
		padding-bottom: 24rpx;
		.indexTop {
			padding-bottom: 20rpx;
		}
		.myFeedback {
			height: 100%;
			background: #F5F5F5;
			padding-top: 32rpx;
			.single {
				margin: 0 auto;
				width: 95%;
				background: #FFFFFF;
				padding: 26rpx 16rpx 0 16rpx;
				border-radius: 10rpx;
				margin-bottom: 32rpx;
				.top {
					margin-bottom: 26rpx;
					padding: 6rpx 26rpx 0;
					.left {
						color: #333333;
						display: flex;
						align-items: center;
						font-size: 38rpx;
						font-weight: bold;
					}
				}
				.detail {
					display: flex;
					align-items: center;
					.single {
						display: flex;
						align-items: center;
						color: #999999;
						font-size: 29rpx;
						image {
							width: 32rpx;
							height: 32rpx;
							margin-right: 6rpx;
						}
					}
					.con {
						justify-content: center;
					}
				}
			}
		}
	}
</style>
