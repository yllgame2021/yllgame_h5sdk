# H5-FbInstantGame接入文档

## 1. FbInstantGame sdk引入
### 1.1在页面初始化加载时引入以下资源代码 

```js
    <script src="https://www.facebook.com/assets.php/en_US/fbinstant.7.0.js"></script>  // FB 官方sdk引入
    <script src="resource/crypto.js"></script> // 第三方加密资源放在本地引入，src相对路径根据实际放入位置修改（资源在fbInstance/js 目录下获取）
    <script src="resource/fbyllgamesdk.js"></script>// H5 sdk资源放在本地引入，src相对路径根据实际放入位置修改（资源在fbInstance/js 目录下获取）
```
### 1.2 添加 h5InstanceApi.ts , bokSdk.d.ts文件至src目录下 （在fbInstance/ts 目录下获取）

```js
    将 h5InstanceApi.ts 文件 放在游戏src目录下，此文件会暴露出一个YllGameInstance对象。
```
### 1.3 实例 YllGameInstance 对象 （）
```js
    let yllInstance = new YllGameInstance();
```
**注：在需要使用以下登录，支付等功能时实例对象**
 ## 2. 登录授权 
 ### 2.1 登录同步用户信息 
- FB授权后同步用户信息（注意，该方法必须在 FBInstant.initializeAsync() 调用之后使用）
``` js
    let data ={
        packagename:'',  // 为当前项目包名 **必填
        gameappid:'', //当前游戏的appid （需找运营方获取） **必填
        gamebuild:"", // 当前游戏版本号 **必填
        gameversion:"", //当前游戏版本名称  **必填
        oschannel:'', // 当前运行的渠道名 (例如H5)  **必填
    }
    yllInstance.login(data,callback) // @param callback  回调函数  （***必填）
```
- 调用示例
```js
    yllInstance.login(data,(responseData)=>{
        if(responseData.code == 'TYPE_LOGIN_SUCCESS'){
            //登录成功（返回数据格式如下）
            code :'TYPE_LOGIN_SUCCESS',
            data:  **登录信息
        }else if(responseData.code == 'TYPE_LOGIN_ERROR'){
            //登录失败（返回数据格式如下）
            code :'TYPE_LOGIN_ERROR',
            data:  {msg： ** 失败信息 }
        }
    },); 
});
```
### 2.2 同步角色
- 同步角色调用函数： 
 ```js
      let json = {
          roleid:'',  // @param roleid 游戏角色Id   （**必填）
          rolename: "",  // @param rolename 角色名称   （**必填）
          rolelevel: '',  // @param rolelevel 角色等级   （**必填）
          roleviplevel: '',  // @param roleviplevel 角色VIP等级	   （**必填）
          serverid: '',  // @param serverid 所在游戏服id   （**必填）
          rolecastlelevel: ''  // @param rolecastlelevel 城堡等级   （**必填）
      };
    yllInstance.syncRoleInfo(json,callback)  // @param callback  回调函数  （***必填）
```
- 调用示例 
``` js
    yllInstance.syncRoleInfo(json,function(responseData){
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
## 3. 支付模块
### 3.1 获取支付商品
- 调用函数： 
``` js
    yllInstance.getPayCatalog().then((catalogList)=>{
        // catalogList 产品列表list对象
    })
```
### 3.2 支付调用
- 调用函数： 
```js
    let json={
        pointid: '',  // @param pointId 消费点Id   （string 必填）
        sku:"",     // @param sku 商品编码  （string 必填）
        price: ,// @param price 商品价格   （int 必填）
        pointName:"",// @param pointName 消费点名称  （string 必填）
        gameserverid: '',// @param gameserverid 所在区服id  （string 必填）
        roleid:'',// @param roleid 游戏角色Id   （string 必填）
        productId:'',// @param productId 消费商品ID  （string 必填）
        cptime:'',  // @param cptime 游戏方订单创建时间戳
        cpno:''  // @param cpno 游戏方订单号
    };
    yllInstance.pay(json).then((res)=>{})  
```
- 调用示例
``` js
    yllInstance.pay().then((responseData)=>{
        if(responseData.code == 'TYPE_PAY_SUCCESS'){
            //支付成功 （返回数据格式如下）
            code :'TYPE_PAY_SUCCESS',
            data:  **支付信息
        }else if(responseData.code == 'TYPE_PAY_FAIL'){
            //支付失败 （返回数据格式如下）
            code :'TYPE_PAY_FAIL',
            data: {msg： ** 失败信息 }
        }
        else if(responseData.code == 'TYPE_PAY_CANCEL'){
            //支付取消或异常 （返回数据格式如下）
            code :'TYPE_PAY_CANCEL',
            data: {msg： ** 失败信息 }
        }else if(responseData.code == 'TYPE_PAY_NOSUPPORT'){
            //不支持支付调起
            code :'TYPE_PAY_NOSUPPORT',
            data: {msg： ** 提示信息 }
        }
    })
```
