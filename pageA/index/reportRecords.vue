<template>
	<view class="reportRecords">
		<view class="indexTop">
			<u-search placeholder="搜索事件标题" v-model="searchVal" :show-action="false" @search="search" @change="changeSearchVal"></u-search>
			<view class="tabs">
				<u-tabs :bold="false" inactive-color="#666666" active-color="#2FA1BE"  :list="list" :is-scroll="false" :current="current" @change="changeTab"></u-tabs>
			</view>
		</view>
		<view class="myFeedback" v-if="reportList && reportList.length">
			<view class="single" @click="goDatail(item.id)" v-for="(item, index) in reportList" :key="index">
				<view class="top">
					<view class="left">
						<image src="../../static/icon_time.png"></image>
						<text>{{dayjs.unix(item.sb_time).format('YYYY-MM-DD HH:mm')}}</text>
					</view>
					<view class="right">
						<text v-if="item.sb_status === 1">已处理</text>
						<text v-else style="color: #2FA1BE;">待处理</text>
					</view>
				</view>
				<u-line color="#EEEEEE" />
				<view class="detail">
					<text>{{item.title}}</text>
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
					name: '未处理'
				}, {
					name: '已处理'
				}],
				current: 0,
				reportList: [],
				type: 2
			}
		},
		
		created () {
			this.fetchData()
		},
		
		methods: {
			// 初始化数据
			fetchData (type,name) {
				let subItems = {
					type: 2,
					titles: ''
				}
				if (typeof type === 'number') subItems.type = type
				if (name) subItems.titles = name
				this.Api.post("changeReportList", subItems).then(res => {
					if (res.data.code) {
						this.reportList = res.data.data
					}
				})
			},
			
			// 切换Tab
			changeTab (idx) {
				this.current = idx
				let type = 2
				if (this.list[idx].name === '全部') {
					type = 2
				} else if (this.list[idx].name === '未处理') {
					type = 0
				} else if (this.list[idx].name === '已处理') {
					type = 1
				}
				this.type = type
				this.fetchData(type, this.searchVal)
			},
			
			// 跳转详情页
			goDatail (id) {
				uni.navigateTo({
					url: `/pageA/index/eventDetails?id=${id}`
				})
			},
			
			// 内容清空，重新请求数据
			changeSearchVal (val) {
				if (!val) this.fetchData()
			},
			
			// 搜索功能
			search (val) {
				this.fetchData(this.type, val)
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
			padding-top: 180rpx;
			height: 100%;
			background: #F5F5F5;
			overflow-y: auto;
			.single {
				margin: 0 auto;
				width: 95%;
				background: #FFFFFF;
				padding: 26rpx 16rpx;
				border-radius: 10rpx;
				margin-bottom: 32rpx;
				.top {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 26rpx;
					font-size: 28rpx;
					padding: 0 26rpx;
					.left {
						color: #999999;
						display: flex;
						align-items: center;
						image {
							width: 32rpx;
							height: 32rpx;
							margin-right: 16rpx;
						}
					}
					.right {
						color: #999999;
					}
				}
				.u-line {
					border-bottom: 29rpx solid rgb(238, 238, 238)!important;
				}
				.detail {
					line-height: 48rpx;
					font-size: 32rpx;
					color: #333333;
					padding: 0 26rpx;
					padding-top: 26rpx;
					overflow:hidden;
					white-space:nowrap;
					text-overflow:ellipsis;
					font-family: PingFang-SC-Medium;
				}
			}
		}
	}
</style>
