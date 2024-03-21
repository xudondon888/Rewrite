/*************************************

脚本作者：@ios151

[rewrite_local]

^https:\/\/notability\.com\/ url script-response-body https://raw.githubusercontent.com/xudondon888/Rewrite/main/Notability.js

[mitm]

hostname = notability.com

*************************************/

const _0x27ac=['bG9n','Y2FuY2VsZWQ=','6K6i6ZiF54q25oCBOg==','c3Vic2NyaXB0aW9u','cHJvY2Vzc0FwcGxlUmVjZWlwdA==','OTk5OS0wOS0wOVQwOTowOTowOS4wMDBa','Y29tLmdpbmdlcmxhYnMuTm90YWJpbGl0eS5wcmVtaXVtX3N1YnNjcmlwdGlvbg=='];const _0x246d=function(_0x27ac41,_0x246d37){_0x27ac41=_0x27ac41-0x0;let _0x4d0cfd=_0x27ac[_0x27ac41];if(_0x246d['rNojbM']===undefined){(function(){const _0x5a0563=function(){let _0x563179;try{_0x563179=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');')();}catch(_0x183bd7){_0x563179=window;}return _0x563179;};const _0x31d1b9=_0x5a0563();const _0x20bb4a='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x31d1b9['atob']||(_0x31d1b9['atob']=function(_0x59854e){const _0x56569e=String(_0x59854e)['replace'](/=+$/,'');let _0x3176d2='';for(let _0x1612f6=0x0,_0x5cd15e,_0x3a76fc,_0x4bd163=0x0;_0x3a76fc=_0x56569e['charAt'](_0x4bd163++);~_0x3a76fc&&(_0x5cd15e=_0x1612f6%0x4?_0x5cd15e*0x40+_0x3a76fc:_0x3a76fc,_0x1612f6++%0x4)?_0x3176d2+=String['fromCharCode'](0xff&_0x5cd15e>>(-0x2*_0x1612f6&0x6)):0x0){_0x3a76fc=_0x20bb4a['indexOf'](_0x3a76fc);}return _0x3176d2;});}());_0x246d['sDxOiw']=function(_0x4c08bf){const _0x48e245=atob(_0x4c08bf);let _0x4c62df=[];for(let _0x29cc0a=0x0,_0x4e7c40=_0x48e245['length'];_0x29cc0a<_0x4e7c40;_0x29cc0a++){_0x4c62df+='%'+('00'+_0x48e245['charCodeAt'](_0x29cc0a)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x4c62df);};_0x246d['TKVkZA']={};_0x246d['rNojbM']=!![];}const _0x1e1f29=_0x246d['TKVkZA'][_0x27ac41];if(_0x1e1f29===undefined){_0x4d0cfd=_0x246d['sDxOiw'](_0x4d0cfd);_0x246d['TKVkZA'][_0x27ac41]=_0x4d0cfd;}else{_0x4d0cfd=_0x1e1f29;}return _0x4d0cfd;};const subscriptionData={'data':{'processAppleReceipt':{'error':0x0,'__typename':'SubscriptionResult','subscription':{'productId':_0x246d('0x6'),'originalTransactionId':'570001184068302','tier':'premium','refundedDate':null,'refundedReason':null,'isInBillingRetryPeriod':![],'expirationDate':_0x246d('0x5'),'gracePeriodExpiresAt':null,'overDeviceLimit':![],'expirationIntent':null,'__typename':'AppStoreSubscription','user':null,'status':_0x246d('0x1'),'originalPurchaseDate':'2022-09-09T09:09:09.000Z'}}}};function handleSubscription(_0x4e7c40){if(_0x4e7c40['status']==='canceled'){console[_0x246d('0x0')]('订阅已取消。');}else{console['log'](_0x246d('0x2'),_0x4e7c40['status']);}}handleSubscription(subscriptionData['data'][_0x246d('0x4')][_0x246d('0x3')]);