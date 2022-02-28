# H5-SDK接入文档
- 目前支持英语和阿语
- 接入前请先确定运行环境支持HTML语言及Window 全局对象。

## 1. SDK初始化

### 1.1在页面初始化加载时引入以下资源代码 （注：script引入顺序不可改变） 

```js
    <script src="https://jssdkweb.yallagame.com/config/plugin/crypto.js"></script>
    <script src="https://jssdkweb.yallagame.com/static/js/yllgamesdk.v103t0106.js"></script>
```
### 1.2 初始化SDK
```
    YllGame.init({
        region:'2',  //为当前项目使用语言 （1英语 2阿语） **必填
        packagename:'',  // 为当前项目包名（需找运营方获取） **必填
        gameappid:'', //当前游戏的appid （需找运营方获取） **必填
        gamebuild:'', // 当前游戏版本号 **必填
        gameversion:'', //当前游戏版本名称  **必填
        oschannel:'h5', // 当前运行的渠道名 (例如H5)  **必填
        gameName:'',    // 当前游戏名称 （字符长度不建议太长） ***必填
        gameIcon:'' ,    // 当前游戏图标  (链接形式icon 例;https://**)  ***必填
        gameAppleConfig:'',  // 当前游戏ios下配置文件下载地址  ( 需找运营方获取 )  ***非必填
        googleClientId:'',   // google应用的项目id （需找运营方获取） ***必填
        appleClientId:'',    // apple应用的项目id （需找运营方获取） ***必填
    });
 ```
 **请在引入SDK script资源后立刻进行初始化**
### 1.3 同步SDK语言
-  语言同步 
``` js    
    YllGame.initLanguage({
        region:'2'
    });
    参数说明: region 为当前项目使用语言 （1英语 2阿语）
```
**如果app中用户手动设置切换了语言，必须调用此api 同步sdk中的语言，否则sdk内部仍将采用初始化时传入的语言类型**
### 1.3 SDK内部返回通用code
```js        
    if(data.code == 'REFRESH_TOKEN_TIMEOUT'){
        //RefreshToken过期
    }else if(data.code == 'SIGN_TIME_OUT'){
        //sign 过期
    }else if(data.code == 'ILLEGAL_REQUEST'){
        //非法请求
    }else if(data.code == 'GAME_APPID_ERROR'){
        // 提供的游戏appid错误
    }
```
 ## 2. 登录模块
 ### 2.1 登录 
- SDK登录调用函数： ``` YllGame.login(callback);  //   callback  （--必填 ）```
- 调用示例
``` js
    YllGame.login(function(responseData){
        // responseData 为回调数据,数据格式 {code ：具体状态 ，data：回调数据 } *** 成功状态下返回用户信息，失败状态下返回错误信息
        if(responseData.code == 'TYPE_LOGIN_SUCCESS'){
            //登录成功 （返回数据格式如下）
            code :'TYPE_LOGIN_SUCCESS'
            data:  **用户信息
        }else if(responseData.code == 'TYPE_LOGIN_BLOCK'){
            //账号被封
            code :'TYPE_LOGIN_BLOCK'
            data: {msg： ** 登录失败信息 }
        }else if(responseData.code == 'TYPE_LOGIN_OTHER'){
            //在其它设备登录
            code :'TYPE_LOGIN_OTHER'
            data: {msg： ** 失败信息 }
        }else if(responseData.code == 'TYPE_LOGIN_ERROR'){
            //登录失败
            code :'TYPE_LOGIN_ERROR'
            data: {msg： ** 失败信息 }
        }
    });
```
**注：该函数调用会首先判断是否用户已登录，已登录用户直接跳出欢迎回来提示。未登录用户则会调起登录弹窗**（请在调用此方法后调用同步角色方法   ** 必操作步骤）
### 2.2 静默登录 
- SDK静默登录调用函数： ``` YllGame.silentGuestLogin(callback);  //   callback  （--必填） 回调数据格式与登录一致```
## 3. 用户模块
### 3.1 同步角色
- SDK同步角色调用函数： 
 ```js
      let json = {
          roleid:'',  // @param roleid 游戏角色Id   （**必填）
          rolename: "",  // @param rolename 角色名称   （**必填）
          rolelevel: '',  // @param rolelevel 角色等级   （**必填）
          roleviplevel: '',  // @param roleviplevel 角色VIP等级	   （**必填）
          serverid: '',  // @param serverid 所在游戏服id   （**必填）
          rolecastlelevel: ''  // @param rolecastlelevel 城堡等级   （**必填）
      };
    YllGame.syncRoleInfo(json,callback)  // @param callback  回调函数  （***必填）
```
- 调用示例 
``` js
    YllGame.syncRoleInfo(json,function(responseData){
        if(responseData.code == 'SYNCROLE_SUCCESS'){
            //同步成功 （返回数据格式如下）
            code :'SYNCROLE_SUCCESS',
            data:  **同步信息
        }else if(responseData.code == 'SYNCROLE_FAIL'){
            //同步失败 （返回数据格式如下）
            code :'SYNCROLE_FAIL',
            data: {msg： ** 失败信息 }
        }
    });
```
**注：建议游戏每次登陆、用户角色升级，用户VIP升级必须调用该函数**
 ### 3.2  用户绑定 
 - SDK绑定调用函数： ``` YllGame.bind(callback) //*** callback  （--必填  ） ```
 - 调用示例 
``` js
    YllGame.bind(function(responseData){
        if(responseData.code == 'TYPE_BIND_SUCCESS'){
            //绑定成功 （返回数据格式如下）
            code :'TYPE_BIND_SUCCESS',
            data:  **绑定信息
        }else if(responseData.code == 'TYPE_BIND_FAIL'){
            //绑定失败 （返回数据格式如下）
            code :'TYPE_BIND_FAIL',
            data: {msg： ** 失败信息 }
        }
    });
```
### 3.3 用户上传图片
- SDK上传图片函数： ``` YllGame.updatePicture(callback) //*** callback  （--必填  ） ```
- 调用示例 
``` js
    YllGame.updatePicture(function(responseData){
        if(responseData.code == 'UPDATE_PICTURE_SUCCESS'){
           //上传图片成功 （返回数据格式如下）
            code :'UPDATE_PICTURE_SUCCESS',
            data:{url: ** 图片上传后地址}
        }else if(responseData.code == 'UPDATE_PICTURE_FAIL'){
            //上传失败
            code :'UPDATE_PICTURE_FAIL',
            data: {msg： ** 失败信息 }
        }
    });
```
## 4. 支付模块
### 4.1 支付
- SDK支付调用函数： 
``` js
        var json={
          pointid:'',  // @param pointId 消费点Id
          sku:'', // @param sku 商品编码
          price:'',  // @param price 商品价格
          pointName:'',  // @param pointName 消费点名称
          roleid:'',  // @param roleid 游戏角色Id
          gameserverid:'',  // @param gameserverid 所在区服id
          cptime:'',  // @param cptime 游戏方订单创建时间戳
          cpno:''  // @param cpno 游戏方订单号
        };
        YllGame.pay(json,callback) // callback 回调 （***必填）;
```
- 调用示例
``` js
    YllGame.pay(json,function(responseData){
        if(responseData.code == 'TYPE_PAY_SUCCESS'){
           //支付成功 （返回数据格式如下）
            code :'TYPE_PAY_SUCCESS',
            data:  **支付信息
        }else if(responseData.code == 'TYPE_PAY_PENDING'){
            //等待付款中
            code :'TYPE_PAY_PENDING',
            data: {msg： ** 支付信息 }
        }else if(responseData.code == 'TYPE_PAY_SENDPError'){
            //支付成功，发货失败
            code :'TYPE_PAY_SENDPError',
            data: {msg： ** 失败信息 }
        }else if(responseData.code == 'TYPE_CANCEL_FAIL'){
           // 取消支付 
           code :'TYPE_CANCEL_FAIL',
            data: {msg： ** 失败信息 }
        }else if(responseData.code == 'TYPE_PAY_FAIL'){
            //支付失败
            code :'TYPE_PAY_FAIL',
            data: {msg： ** 失败信息 }
        }
    });
```
## 5. 生成快捷桌面
- SDK生成桌面快捷调用函数：``` YllGame.quick() ```;  
## 6. 账户设置模块
### 6.1 账号设置入口弹窗
- SDK调用函数： ``` YllGame.openAccountPop(callback) //*** callback  （--必填  ） ```
- 调用示例
``` js
    YllGame.openAccountPop(function(responseData){
        if(responseData.code == 'LOGOUT_SUCCESS'){
            //退出账号成功 （返回数据格式如下）
            code :'LOGOUT_SUCCESS',
            data:  **成功信息
        }else if(responseData.code == 'TYPE_BIND_SUCCESS'){
            //绑定成功 （返回数据格式如下）
            code :'TYPE_BIND_SUCCESS',
            data:  **绑定信息
        }else if(responseData.code == 'TYPE_BIND_FAIL'){
            //绑定失败 （返回数据格式如下）
            code :'TYPE_BIND_FAIL',
            data: {msg： ** 失败信息 }
        }
    });
```
**注：切换账号退出成功后（返回code =  LOGOUT_SUCCESS），游戏可根据自身业务场景进行游戏初始化,重置角色等进程**
### 6.2 账号管理
- SDK调用函数： ``` YllGame.openAccountManager(callback) //*** callback  （--必填） ``` 
- 调用示例
``` js
    YllGame.openAccountManager(function(responseData){
        if(responseData.code == 'LOGOUT_SUCCESS'){
            //退出账号成功 （返回数据格式如下）
            code :'LOGOUT_SUCCESS',
            data:  **成功信息
        }else if(responseData.code == 'TYPE_BIND_SUCCESS'){
            //绑定成功 （返回数据格式如下）
            code :'TYPE_BIND_SUCCESS',
            data:  **绑定信息
        }else if(responseData.code == 'TYPE_BIND_FAIL'){
            //绑定失败 （返回数据格式如下）
            code :'TYPE_BIND_FAIL',
            data: {msg： ** 失败信息 }
        }
    });
```
### 6.3 客服
- SDK调用函数： ``` YllGame.openCustomerPop() ``` 

## 7. 广告追踪埋点
### 7.1 埋点sdk方法初始化
```
    YllGame.initAdvertistEvent({
        googleAnalytics:{  id:''},     //googleAnalytics 广告应用id , 转化awId ( 需找运营方获取 )  ***必填
        appsflyer:{ id:'' },   //appsflyer 广告应用id  ( 需找运营方获取 )  ***必填
        facebookPixel:{ id:'' }  //facebookPixel 广告应用id  ( 需找运营方获取 )  ***必填
    });
 ```
 **在sdk初始化后调用此埋点初始化方法**

### 7.2 埋点事件调用
- SDK调用函数： ``` YllGame.eventTriggerRecord(params) //*** params  （--必填  ） ```
- 调用示例
``` js
    YllGame.eventTriggerRecord({
       eventType:'pay',   // 事件类型  ***必填
       eventParams:{      //eventParams 埋点事件需要收集的参数，eventParams对象里的具体参数名根据自身需求定义传入
        currency: "USD", 
        value: 30.00
       }
     });
```
