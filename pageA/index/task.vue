<template>
	<view class="reportRecords">
		<view class="indexTop">
			<u-search placeholder="搜索巡检人" v-model="searchVal" :show-action="false" @search="search" @change="changSearchVal"></u-search>
			<view class="tabs">
				<u-tabs :bold="false" inactive-color="#666666" active-color="#2FA1BE" :list="list" :is-scroll="false" :current="current" @change="changeTab"></u-tabs>
			</view>
		</view>
		<view class="myFeedback" v-if="data && data.length">
			<view class="single" @click="goDatail(item.id)" v-for="(item, index) in data" :key="index">
				<view class="top">
					<view class="left">
						<text>巡检点位： {{item.contents_id}}</text>
					</view>
					<view class="right">
						<text v-if="item.period_status === 1">已完成</text>
						<text v-else style="color: #2FA1BE;">未完成</text>
					</view>
				</view>
				<view class="detail">
					<view class="single le">
						<image src="../../static/icon_task_1.png"></image>
						<text>{{item.atuh_name}}</text>
					</view>
					<view class="single con">
						<image src="../../static/icon_task_2.png"></image>
						<text>{{item.cycles}}/{{item.b_numbers}}</text>
					</view>
					<view class="single ri">
						<image src="../../static/icon_task_3.png"></image>
						<text>{{dayjs.unix(item.create_time).format('YYYY-MM-DD')}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="noCentent" v-else>
			<text>暂无</text>
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
				data: []
			}
		},
		
		created () {
			this.fetchData()
		},
		
		methods: {
			// 初始化数据
			fetchData (type, name) {
				let subItems = {
					names: '',
					type: 2
				}
				if (name) subItems.names = name
				if (typeof type === 'number') subItems.type = type
				this.Api.get('xjTaskList', subItems).then(res => {
					if (res.data.code) {
						this.data = res.data.data
					}
				})
			},
			
			// 搜索功能
			search (val) {
				this.fetchData('',val)
			},
			
			// 内容清空，重新请求数据
			changSearchVal (val) {
				if (!val) this.fetchData()
			},
			
			// 切换Tab
			changeTab (idx) {
				this.current = idx
				let type = 2
				if (this.list[idx].name === "全部") {
					type = 2
				} else if (this.list[idx].name === "未完成") {
					type = 0
				} else if (this.list[idx].name === "已完成") {
					type = 1
				}
				this.fetchData(type, this.searchVal)
			},
			
			// 跳转详情页
			goDatail (id) {
				uni.navigateTo({
					url: `/pageA/index/taskDetail?id=${id}`
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
			position: fixed;
			width: 100%;
			box-shadow: 0rpx 0rpx 5rpx 2rpx #f2f2f2;
			z-index: 2;
		}
		.myFeedback {
			height: 100%;
			background: #F5F5F5;
			padding-top: 180rpx;
			.single {
				margin: 0 auto;
				width: 95%;
				background: #FFFFFF;
				padding: 26rpx 16rpx 0 16rpx;
				border-radius: 10rpx;
				margin-bottom: 32rpx;
				.top {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 26rpx;
					padding: 6rpx 26rpx 0;
					.left {
						color: #333333;
						display: flex;
						align-items: center;
						font-size: 38rpx;
						font-weight: bold;
					}
					.right {
						color: #999999;
					}
				}
				.u-line {
					border-bottom: 29rpx solid rgb(238, 238, 238)!important;
				}
				.detail {
					display: flex;
					align-items: center;
					justify-content: space-between;
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
					.ri {
						justify-content: flex-end;
					}
				}
			}
		}
	}
</style>
