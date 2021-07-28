<template>
	<view class="eventDetails">
		<view class="content">			
			<view class="single">
				<view class="left">
					<text>ID</text>
				</view>
				<view class="right">
					<text>{{data.id}}</text>
				</view>
			</view>
			<view class="single">
				<view class="left">
					<text>巡检人</text>
				</view>
				<view class="right">
					<text>{{data.atuh_name}}</text>
				</view>
			</view>
			<view class="single">
				<view class="left">
					<text>巡检周期/次数</text>
				</view>
				<view class="right">
					<text>{{data.cycles}}/{{data.fnumbers}}</text>
				</view>
			</view>
			<view class="single">
				<view class="left">
					<text>巡检路线</text>
				</view>
				<view class="right">
					<text>{{data.inspection}}</text>
				</view>
			</view>
			<view class="single">
				<view class="left">
					<text>巡检点位</text>
				</view>
				<view class="right">
					<text>{{data.xj_point}}</text>
				</view>
			</view>
			<view class="single">
				<view class="left">
					<text>巡检时间</text>
				</view>
				<view class="right">
					<text>{{dayjs.unix(data.create_time).format('YYYY-MM-DD HH:mm')}}</text>
				</view>
			</view>
			<view class="single">
				<view class="left">
					<text>异常状态</text>
				</view>
				<view class="right">
					<text>{{data.yc_status ? '有' : '无'}}</text>
				</view>
			</view>
			<view class="single">
				<view class="left">
					<text>备注</text>
				</view>
				<view class="right">
					<text>{{data.remark ? data.remark : '无'}}</text>
				</view>
			</view>
			<view class="single">
				<view class="left">
					<text>照片</text>
				</view>
				<view class="right" v-if="data.pictures">
					<image v-for="(item,index) in data.imgArr" :key="index" :src="item" mode="aspectFit" @click="TanPreviewImage(index)"></image>
				</view>
				<view class="right" v-else>
					<text>暂无图片</text>
				</view>
			</view>
			<view class="single">
				<view class="left">
					<text>处理状态</text>
				</view>
				<view class="right">
					<text>{{data.cl_status ? "已处理" : "未处理"}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				baseUrl: this.BaseUrl, // 默认接口地址
				data: {}
			}
		},
		
		onLoad (option) {
			this.fetchData(option.id)
		},
		
		methods:{
			// 初始化数据
			fetchData (id) {
				this.Api.get('xjRecordOnes', {id}).then(res => {
					if (res.data.code === 1) {
						this.data = res.data.data
						if (this.data.pictures && this.data.pictures.length > 0) {
							this.data.pictures.charAt(this.data.pictures.length - 1) === ',' ? 
							this.data.pictures = this.data.pictures.substr(0, this.data.pictures.length - 1) :
							this.data.pictures = this.data.pictures.substr(0, this.data.pictures.length)
						}
						if (this.data.pictures) {
							let d = this.data.pictures.split(',')
							let arr = []
							d.forEach(res => {
								if (res.indexOf('https:') < 0) {
									res = this.baseUrl + res
									arr.push(res)
								} else {
									arr.push(res)
								}
							})
							this.$set(this.data, "imgArr", arr)
						}
					}
				})
			},
			
			// 预览图片
			TanPreviewImage(index){
				var images = []
				this.data.imgArr.map(res => {
					images.push(res)
				})
				// images.push(imgUrl)
				uni.previewImage({ // 预览图片  图片路径必须是一个数组 => ["http://192.168.100.251:8970/6_1597822634094.png"]
					current:index,
					urls:images,
					longPressActions: {  //长按保存图片到相册
						itemList: ['保存图片'],
						success: (data)=> {
							console.log(data);
							uni.saveImageToPhotosAlbum({ //保存图片到相册
								filePath: payUrl,
								success: function () {
									uni.showToast({icon:'success',title:'保存成功'})
								},
								fail: (err) => {
									uni.showToast({icon:'none',title:'保存失败，请重新尝试'})
								}
							});
						},
						fail: (err)=> {
							console.log(err.errMsg);
						}
				}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.eventDetails {
		min-height: 100vh;
		background: #F5F5F5;
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
					width: 260rpx;
					color: #999999;
				}
				.right {
					display: block;
					flex: 1;
					text-align: left;
					color: #333333;
					image {
						width: 192rpx;
						height: 192rpx;
						border-radius: 16rpx;
						margin-right: 16rpx;
						border: 2rpx solid #f2f2f2;
						box-shadow: 0rpx 0rpx 4rpx 1rpx #f2f2f2;
					}
				}
			}
		}
	}
</style>
