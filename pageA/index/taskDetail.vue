<template>
	<view class="eventDetails">
		<view class="content" v-if="data.task_xq">			
			<view class="single">
				<view class="left">
					<text>ID</text>
				</view>
				<view class="right">
					<text>{{data.task_xq.id}}</text>
				</view>
			</view>
			<view class="single">
				<view class="left">
					<text>巡检人</text>
				</view>
				<view class="right">
					<text>{{data.task_xq.atuh_name}}</text>
				</view>
			</view>
			<view class="single">
				<view class="left">
					<text>巡检周期/次数</text>
				</view>
				<view class="right">
					<text>{{data.task_xq.cycles}}/{{data.task_xq.b_numbers}}</text>
				</view>
			</view>
			<view class="single">
				<view class="left">
					<text>任务编号</text>
				</view>
				<view class="right">
					<text>{{data.task_xq.mubnes}}</text>
				</view>
			</view>
			<view class="single">
				<view class="left">
					<text>巡检点位</text>
				</view>
				<view class="right">
					<text>{{data.task_xq.contents_id}}</text>
				</view>
			</view>
			<view class="single">
				<view class="left">
					<text>任务状态</text>
				</view>
				<view class="right">
					<text>{{data.task_xq.period_status ? '已完成' : '未完成'}}</text>
				</view>
			</view>
		</view>
		<view class="route" v-if="data.task_lx && data.task_lx.length">
			<view class="title">
				<text class="line"></text>
				<text>巡检路线</text>
			</view>
			<view class="single" v-for="(item, index) in data.task_lx" :key="index">
				<view class="oneline">
					<text class="t1">{{item.loude_name}}{{item.floor_name}}—{{item.xj_point}}</text>
					<text class="t2" v-if="item.xsCheckStatus === 1">已巡检</text>
					<view class="right" v-else @click="goPage(item)">
						<image src="../../static/icon_scan.png"></image>
						<text>扫码巡检</text>
					</view>
					<text v-else-if="!item.xsCheckStatus"></text>
				</view>
				<view class="twoline" v-if="item.create_time">
					<image src="../../static/icon_time.png"></image>
					<text>{{dayjs.unix(item.create_time).format('YYYY-MM-DD HH:mm')}}</text>
				</view>
				<view class="twoline" v-else>			
				</view>
			</view>
			<view class="btn">
				<button type="default" @click="submit">确认完成</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				data: {},
				tasksId: null, // 获取任务详情ID
			}
		},
		
		// 获取路由传值
		onLoad (option) {
			this.tasksId = option.id
			this.fetchData(option.id)
		},
		
		onShow () {
			this.fetchData(this.tasksId)
		},
		
		methods: {
			// 初始化数据
			fetchData (id) {
				this.Api.get('xjTaskXq', {id:id}).then(res => {
					if (res.data.code) {
						this.data = res.data.data
						if (this.data.arr1 && this.data.arr1.length && this.data.task_lx && this.data.task_lx.length) {
							this.data.task_lx.map(res => {
								if (this.data.arr1.includes(res.contens_id)) {
									this.$set(res, 'xsCheckStatus', 1)
								} else {
									this.$set(res, 'xsCheckStatus', 0)
								}
							})							
						}
					}
				})
			},
			
			// 跳转详情页，传递参数
			goPage (item) {
				let subItems = {
					tasks_id: this.tasksId,
					contens_id: item.contens_id,
					numbers: this.data.task_xq.mubnes,
					xj_point: item.xj_point
				}
				uni.navigateTo({
					url: `/pageA/index/scanCheck?params=${JSON.stringify(subItems)}`
				})
			},
			
			// 提交
			submit () {
				let d = this.data.task_lx.filter(res => res.xsCheckStatus === 0)
				if ( (d && d.length > 0) || !this.data.arr1) {
					uni.showToast({
						title: "任务未完成，再检查检查吧",
						icon: "none"
					})
				} else {
					uni.navigateBack({
						url: `/pageA/index/task`,
						delta: 1
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.eventDetails {
		min-height: 100vh;
		.content {
			background: #FFFFFF;
			padding: 32rpx;
			.single {
				width: 100%;
				display: flex;
				align-items: center;
				font-size: 32rpx;
				margin-bottom: 48rpx;
				.left {
					display: block;
					width: 240rpx;
					color: #999999;
				}
				.right {
					display: block;
					flex: 1;
					text-align: left;
					color: #333333;
				}
			}
		}
		.route {
			border-top: 32rpx solid #F5F5F5;
			padding: 32rpx;
			.title {
				display: flex;
				align-items: center;
				font-size: 45rpx;
				.line {
					display: block;
					width: 10rpx;
					height: 45rpx;
					background-color: #2FA1BE;
					margin-right: 16rpx;
				}
			}
			.single {
				margin: 48rpx 0;
				border-bottom: 4rpx solid #eee;
				.oneline {
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 35rpx;
					.t1 {
						color: #333333;
					}
					.t2 {
						color: #999999;
					}
					.right {
						display: flex;
						align-items: center;
						font-size: 35rpx;
						color: #2FA1BE;
						image {
							width: 35rpx;
							height: 35rpx;
							margin-right: 13rpx;
						}
					}
				}
				.twoline {
					display: flex;
					align-items: center;
					margin: 29rpx 0;
					font-size: 29rpx;
					color: #999999;
					image {
						width: 32rpx;
						height: 32rpx;
						margin-right: 16rpx;
					}
				}
			}
			// .no-check-single {
			// 	display: flex;
			// 	align-items: center;
			// 	justify-content: space-between;
			// 	border-bottom: 4rpx solid #eee;
			// 	padding-bottom: 48rpx;
			// 	margin-top: 48rpx;
			// 	.left {
			// 		font-size: 35rpx;
			// 		color: #333333;
			// 	}
			// 	.right {
			// 		display: flex;
			// 		align-items: center;
			// 		font-size: 35rpx;
			// 		color: #2FA1BE;
			// 		image {
			// 			width: 35rpx;
			// 			height: 35rpx;
			// 			margin-right: 13rpx;
			// 		}
			// 	}
			// }
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
	}
</style>
