(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-464ca0c2"],{"30c8":function(t,n,a){"use strict";var e=a("c634"),r=a.n(e);r.a},c24f:function(t,n,a){"use strict";a.d(n,"e",(function(){return r})),a.d(n,"b",(function(){return s})),a.d(n,"d",(function(){return c})),a.d(n,"a",(function(){return i})),a.d(n,"c",(function(){return o})),a.d(n,"g",(function(){return u})),a.d(n,"f",(function(){return l}));var e=a("b775"),r=function(t){return Object(e["a"])({url:"/app/v1_0/authorizations",method:"post",data:t})},s=function(t){return Object(e["a"])({method:"GET",url:"/app/v1_0/sms/codes/".concat(t)})},c=function(){return Object(e["a"])({url:"/app/v1_0/user"})},i=function(){return Object(e["a"])({url:"/app/v1_0/user/channels"})},o=function(){return Object(e["a"])({url:"/app/v1_0/user/profile"})},u=function(t){return Object(e["a"])({method:"PATCH",url:"/app/v1_0/user/profile",data:t})},l=function(t){return Object(e["a"])({method:"PATCH",url:"/app/v1_0/user/photo",data:t})}},c634:function(t,n,a){},e382:function(t,n,a){"use strict";a.r(n);var e=function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("div",{staticClass:"my-container"},[t.$store.state.user?a("div",{staticClass:"user-info-wrap"},[a("div",{staticClass:"base-info-wrap"},[a("div",{staticClass:"avatar-title-wrap"},[a("van-image",{staticClass:"avatar",attrs:{round:"",fit:"cover",src:t.user.photo}}),a("div",{staticClass:"title"},[t._v(t._s(t.user.name))])],1),a("van-button",{attrs:{round:"",size:"mini"},on:{click:function(n){return t.$router.push("/user/profile")}}},[t._v("编辑资料")])],1),a("van-grid",{staticClass:"data-info",attrs:{border:!1}},[a("van-grid-item",[a("span",{staticClass:"count"},[t._v(t._s(t.user.art_count))]),a("span",{staticClass:"text"},[t._v("头条")])]),a("van-grid-item",[a("span",{staticClass:"count"},[t._v(t._s(t.user.follow_count))]),a("span",{staticClass:"text"},[t._v("关注")])]),a("van-grid-item",[a("span",{staticClass:"count"},[t._v(t._s(t.user.fans_count))]),a("span",{staticClass:"text"},[t._v("粉丝")])]),a("van-grid-item",[a("span",{staticClass:"count"},[t._v(t._s(t.user.like_count))]),a("span",{staticClass:"text"},[t._v("获赞")])])],1)],1):a("div",{staticClass:"not-login",on:{click:function(n){return t.$router.push("/login")}}},[a("div",{staticClass:"mobile"}),a("div",{staticClass:"text"},[t._v("点击登录")])]),a("van-grid",{attrs:{clickable:"","column-num":3}},[a("van-grid-item",{attrs:{text:"我的收藏",to:"/my-article/collect"}},[a("van-icon",{attrs:{slot:"icon",name:"star-o",color:"#eb5253"},slot:"icon"})],1),a("van-grid-item",{attrs:{text:"浏览历史",to:"/my-article/history"}},[a("van-icon",{attrs:{slot:"icon",name:"browsing-history-o",color:"#ffa023"},slot:"icon"})],1),a("van-grid-item",{attrs:{text:"作品",to:"/my-article"}},[a("van-icon",{attrs:{slot:"icon",name:"edit",color:"#678eff"},slot:"icon"})],1)],1),a("van-cell-group",{attrs:{border:!1}},[a("van-cell",{attrs:{title:"消息通知","is-link":""}}),a("van-cell",{attrs:{title:"小智同学","is-link":""},on:{click:function(n){return t.$router.push("/user/chat")}}})],1),t.$store.state.user?a("van-cell-group",{on:{click:t.logout}},[a("van-cell",{staticStyle:{"text-align":"center"},attrs:{title:"退出登录",clickable:""}})],1):t._e()],1)},r=[],s=(a("96cf"),a("1da1")),c=a("c24f"),i={name:"MyPage",components:{},props:{},data:function(){return{user:{}}},computed:{},watch:{},created:function(){this.$store.state.user&&this.loadUser()},mounted:function(){},methods:{loadUser:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function n(){var a,e;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,Object(c["d"])();case 3:a=n.sent,e=a.data.data,t.user=e,n.next=10;break;case 8:n.prev=8,n.t0=n["catch"](0);case 10:case"end":return n.stop()}}),n,null,[[0,8]])})))()},logout:function(){var t=this;this.$dialog.confirm({title:"退出提示",message:"确认退出吗"}).then((function(){t.$store.commit("setUser",null)})).catch((function(){t.$toast("已取消退出")}))}}},o=i,u=(a("30c8"),a("2877")),l=Object(u["a"])(o,e,r,!1,null,"6f5ac663",null);n["default"]=l.exports}}]);
//# sourceMappingURL=chunk-464ca0c2.13fd2c8a.js.map