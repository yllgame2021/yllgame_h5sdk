interface payJson {
    pointid: string;
    sku:string;
    price:number;
    pointName:string;
    gameserverid: string;
    roleid:string;
    productId:string;
}
class YllGameInstance {
    public login(data:Object,callback : Function) : void{
        let playerID:string , signToken:string , asidAsync:string;
        FBInstant.player.getASIDAsync().then((asid)=>{
            console.log(asid);
            asidAsync = asid ? asid : '';
            FBInstant.player.getSignedPlayerInfoAsync(asidAsync).then( (result) => {
                playerID = result.getPlayerID(); 
                signToken = result.getSignature();
                console.log(playerID)
                console.log(signToken)
                YllGame.init(data);
                YllGame.loginFb({token:signToken},function(res){
                    callback(res)
                });
            });
        });
    }
    public syncRoleInfo(json,callback){
        YllGame.syncRoleInfo(json,(res)=>{
            callback(res);
        });
    }
    public getPayCatalog(){
        return new Promise((resolve,reject)=>{
            FBInstant.payments.getCatalogAsync().then(function (catalog) {
                resolve(catalog);
            })["catch"](function(e) {
                console.log("getPayCatalog error = " + JSON.stringify(e))
            });
        })
    }
    public pay(json : payJson) :any{
        return new Promise((resolve,reject)=>{
            YllGame.payFb(json,(payOb)=>{
                let orderId ='' , readyPay = false;
                if(payOb.code == 'SUCCESS'){
                    orderId = payOb.orderId;
                }else{
                    resolve({code:'TYPE_PAY_FAIL',data:{msg:payOb.msg}});
                    return;
                }
                FBInstant.getSupportedAPIs().indexOf("payments.onReady") >= 0 && FBInstant.payments.onReady(() => {
                    readyPay = true;
                    FBInstant.payments.purchaseAsync({
                        productID: json.productId,
                        developerPayload: orderId
                    }).then(function(e) {
                        FBInstant.payments.consumePurchaseAsync(e.purchaseToken).then(function(pe) {
                            let payJson = {...json,purchasetoken:e['signedRequest'],paymentID:e['paymentID'],orderId:orderId};
                            YllGame.payApi(payJson,function(callData){
                                resolve(callData);
                            })
                        })["catch"](function(e) {
                            resolve({code:'TYPE_PAY_CANCEL',data:{msg:JSON.stringify(e)}});
                            console.info("consumePurchaseAsync error = " + JSON.stringify(e))
                        })
                    })["catch"](function(e) {
                        resolve({code:'TYPE_PAY_CANCEL',data:{msg:e && e.message ? e.message:JSON.stringify(e)}});
                        console.log("purchaseAsync error = " + JSON.stringify(e))
                    })
                })
                setTimeout(() => {
                    if(!readyPay){
                        resolve({code:'TYPE_PAY_NOSUPPORT',data:{msg:'Payment is not supported'}});
                    } 
                }, 1000);
            })
        })
    }
}
