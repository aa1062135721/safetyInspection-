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
					<text>上报人</text>
				</view>
				<view class="right">
					<text>{{data.sb_name}}</text>
				</view>
			</view>
			<view class="single">
				<view class="left">
					<text>事件标题</text>
				</view>
				<view class="right">
					<text>{{data.title}}</text>
				</view>
			</view>
			<view class="single">
				<view class="left">
					<text>事件地点</text>
				</view>
				<view class="right">
					<text>{{data.address}}</text>
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
				<view class="right" v-if="data.sb_pictures">
					<image v-for="(item, index) in data.imgArr" :key="index" :src="item" @click="TanPreviewImage(index)" mode="aspectFit"></image>
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
					<text>{{data.sb_status ? '已处理' : '未处理'}}</text>
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
		
		methods: {
			// 初始化数据
			fetchData (id) {
				this.Api.get('changeReportXq', {id: id}).then(res => {
					if (res.data.code) {
						this.data = res.data.data
						
						if (this.data.sb_pictures) {
							let d = this.data.sb_pictures.split(',')
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
				var images = [];
				this.data.imgArr.map(res => {
					images.push(res)
				})
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
					width: 180rpx;
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
						margin-right: 16rpx;
						border: 2rpx solid #f2f2f2;
						box-shadow: 0rpx 0rpx 4rpx 1rpx #f2f2f2;
					}
				}
			}
		}
	}
</style>
