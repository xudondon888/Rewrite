/*************************************

脚本作者：@ios151

[rewrite_local]

^https:\/\/notability\.com\/ url script-response-body https://raw.githubusercontent.com/xudondon888/Rewrite/main/Notability.js

[mitm]

hostname = notability.com

*************************************/

// 定义订阅数据
const subscriptionData = {
  "data": {
    "processAppleReceipt": {
      "error": 0,
      "__typename": "SubscriptionResult",
      "subscription": {
        "productId": "com.gingerlabs.Notability.premium_subscription",
        "originalTransactionId": "570001184068302",
        "tier": "premium",
        "refundedDate": null,
        "refundedReason": null,
        "isInBillingRetryPeriod": false,
        "expirationDate": "9999-09-09T09:09:09.000Z",
        "gracePeriodExpiresAt": null,
        "overDeviceLimit": false,
        "expirationIntent": null,
        "__typename": "AppStoreSubscription",
        "user": null,
        "status": "canceled",
        "originalPurchaseDate": "2022-09-09T09:09:09.000Z"
      }
    }
  }
};

// 处理订阅结果的函数
function handleSubscription(subscription) {
  if (subscription.status === 'canceled') {
    console.log('订阅已取消。');
    // 这里可以添加更多的逻辑来处理取消的订阅
  } else {
    console.log('订阅状态:', subscription.status);
    // 根据订阅的其他状态执行操作
  }
}

// 调用处理函数
handleSubscription(subscriptionData.data.processAppleReceipt.subscription);
