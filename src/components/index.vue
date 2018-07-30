<template>
 <div class="index">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for="(item, index) in catelist" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="(itemS, i) in item.subcates" :key="itemS.id">
                                                {{itemS.title}}&nbsp;
                                            </span>
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <dd>
                                                <a v-for="(itemS, i) in item.subcates" :key="itemS.id" href="/goods/43.html">{{itemS.title}}</a>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--幻灯片-->
                    <div class="left-705">
                        <el-carousel height="341px" indicator-position="outside">
                        <el-carousel-item v-for="(item, index) in sliderlist" :key="item.id">
                        <img :src="item.img_url" alt="">
                        </el-carousel-item>
                    </el-carousel>
                    </div>
                    <!--/幻灯片-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(itemSlider, index) in sliderlist" :key="itemSlider.id">
                                <div class="img-box">
                                    <label>{{index+1}}</label>tg
                                    <img :src="itemSlider.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{itemSlider.title}}</a>
                                    <span >{{itemSlider.add_time | cutTime}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="section" v-for="(item, index) in goodlist" :key="item.level1cateid">
            <div class="main-tit">
                <h2>{{item.catetitle}}}</h2>
                <p>
                    <a href="/goods/43.html" v-for="(itemS, index) in item.level2catelist" :key="itemS.subcateid">{{itemS.subcatetitle}}</a>
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="(itemD, index) in item.datas" :key="itemD.artID">
                        <router-link :to="'/goodsInfo/'+itemD.artID">
                                <div class="img-box">
                                    <img v-lazy="itemD.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{itemD.artTitle}}</h3>
                                    <p class="price">
                                        <b>{{itemD.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存{{itemD.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{itemD.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>



// 暴露出去
export default {
    // 数据
 data:function () { 
   return{
       catelist:[],
       sliderlist:[],
       toplist:[],
       goodlist:[]

   }
  },
 
//   显示出来前调用
   beforeMount() {
         this.axios.get('/site/goods/gettopdata/goods')
         .then((response)=>{
            //  console.log(response);
             this.catelist = response.data.message.catelist
             this.sliderlist = response.data.message.sliderlist
             this.toplist = response.data.message.toplist
         })
         .catch((error)=>{
            //  console.log(error);
         })
         this.axios.get('/site/goods/getgoodsgroup')
         .then((response)=>{
             console.log(response);
             this.goodlist = response.data.message
         })
         .catch((error)=>{
            //  console.log(error);
         })
     },
     
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-carousel img{
    display: block;
    width: 100%;
    height: 100%;
}
</style>
