<template>
	<view class="home">
		<view class="content">
			<view class="top">
				<view class="left">
					<view class="title">
						<image src="../../static/icon_home_1.png"></image>
						<text>巡检任务总数</text>
					</view>
					<view class="center">
						<text>{{data.inspection.completeTotal}}</text>
					</view>
					<view class="foot">
						<text>未完成 {{data.inspection.notComplete}}</text>
						<text>|</text>
						<text>已完成 {{data.inspection.completed}}</text>
					</view>
				</view>
				<view class="right">
					<view class="title">
						<image src="../../static/icon_home_2.png"></image>
						<text>上报事件总数</text>						
					</view>
					<view class="center">
						<text>{{data.report.reportTotal}}</text>
					</view>
					<view class="foot">
						<text>未处理 {{data.report.notReport}}</text>
						<text>|</text>
						<text>已处理 {{data.report.completed}}</text>
					</view>
				</view>
			</view>
			<view class="section">
				<view class="title">
					<image src="../../static/icon_home_3.png"></image>
					<text>待办任务</text>
				</view>
				<view class="detail">
					<view class="single" v-for="(item, index) in taskList" :key="index" @click="showDetail(item)">						
						<view class="text" :class="item.isOpen ? '' : 'action'">
							<text>{{item.title}}</text>
						</view>
						<view class="time">
							<text>{{dayjs(item.datetime).format('MM-DD')}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="tabs">
				<view class="singleTab tab1" @click="goPage('/pageA/index/ereport')">
					<text>事件上报</text>
					<image src="../../static/icon_tab_1.png"></image>
				</view>
				<view class="singleTab tab2" @click="goPage('/pageA/index/reportRecords')">
					<text>上报记录</text>
					<image src="../../static/icon_tab_2.png"></image>
				</view>
				<view class="singleTab tab3" @click="goPage('/pageA/index/task')">
					<text>巡检任务</text>
					<image src="../../static/icon_tab_3.png"></image>
				</view>
				<view class="singleTab tab4" @click="goPage('/pageA/index/inspectionRecord')">
					<text>巡检记录</text>
					<image src="../../static/icon_tab_4.png"></image>
				</view>
			</view>
		</view>		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: {},
				taskList: [] //待办任务列表
			}
		},
		
		onLoad() {

		},
		
		created () {
			this.fetchData()
			this.getTask()
		},
		
		methods: {
			// 初始化数据
			fetchData () {
				this.Api.get('getTotal').then(res => {
					if (res.data.code) {
						this.data = res.data.data
					}
				})
			},
			
			// 获取待办任务
			getTask () {
				this.Api.get('getPendingList').then(res => {
					if (res.data.code) {
						this.taskList = res.data.data
						this.taskList.map(res => {
							this.$set(res, "isOpen", false)
						})
					}
				})
			},
			
			// 跳转页面
			goPage (url) {
				uni.navigateTo({
					url: url
				})
			},
			
			showDetail(val) {
				val.isOpen = !val.isOpen
			}
		}
	}
</script>

<style lang="scss" scoped>
.home {
	.content {
		padding: 2vh 5vw;
		.top {
			display: flex;
			align-items: center;
			justify-content: space-between;
			.left {
				width: 48%;
				height: 20vh;
				background: linear-gradient(to bottom, #1C83DA 50%, #4FB8EF 100%);
				border-radius: 32rpx;
				padding: 32rpx;
				color: #fff;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.title {
					display: flex;
					align-items: center;
					font-size: 26rpx;
					image {
						width: 38rpx;
						height: 38rpx;
						margin-right: 6rpx;
					}
				}
				.center {
					font-size: 80rpx;
				}
				.foot {
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 26rpx;
					color: #eaeaea;
				}
			}
			.right {
				width: 48%;
				height: 20vh;
				background: linear-gradient(to bottom, #2495AE 50%, #75C1CF 100%);
				border-radius: 32rpx;
				padding: 32rpx;
				color: #fff;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.title {
					display: flex;
					align-items: center;
					font-size: 26rpx;
					image {
						width: 38rpx;
						height: 38rpx;
						margin-right: 6rpx;
					}
				}
				.center {
					font-size: 80rpx;
				}
				.foot {
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 26rpx;
					color: #eaeaea;
				}
			}
		}
		.section {
			margin-top: 32rpx;
			height: 45vh;
			background: linear-gradient(to bottom, #303D5C 50%, #495B88 100%);
			border-radius: 32rpx;
			padding: 16rpx 32rpx 0rpx;
			.title {
				color: #fff;
				display: flex;
				align-items: center;
				font-size: 38rpx;
				border-bottom: 4rpx solid #8c8c8c;
				padding-bottom: 19rpx;
				image {
					width: 48rpx;
					height: 48rpx;
					margin-right: 16rpx;
				}
			}
			.detail {
				height: 85%;
				padding-top: 32rpx;
				overflow-y: auto;
				.single {
					display: flex;
					justify-content: space-between;
					align-items: center;
					color: #fff;
					margin-bottom: 40rpx;
					.text {
						width: 80%;
						font-size: 28rpx;
						letter-spacing: 4rpx;
					}
					.action {
						overflow:hidden;
						white-space:nowrap;
						text-overflow:ellipsis;
					}
					.time {
						width: 20%;
						text-align: right;
					}
				}
			}
		}
		.tabs {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			margin-top: 32rpx;
			.singleTab {
				width: 48%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-radius: 26rpx;
				margin-bottom: 32rpx;
				padding: 13rpx 0;
				text {
					display: block;
					flex: 1;
					text-align: center;
					color: #fff;
					font-size: 32rpx;
				}
				image {
					width: 128rpx;
					height: 128rpx;
				}
			}
			.tab1 {
				background: linear-gradient(to right, #FF7269 20%, #FF9F99 100%);
			}
			.tab2 {
				background: linear-gradient(to right, #1C83DA 20%, #4FB8EF 100%);
			}
			.tab3 {
				background: linear-gradient(to right, #2495AE 20%, #75C1CF 100%);
			}
			.tab4 {
				background: linear-gradient(to right, #645CC8 20%, #8779D7 100%);
			}
		}
	}
}
</style>
