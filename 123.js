/*************************************

[rewrite_local]

# Your callback URL pattern
^https?:\/\/www\.qq\.com\?#access_token=([\w-]+)&expires_in=(\d+)&openid=([\w-]+)&pay_token=([\w-]+)&state=(\w+)&ret=(\d+)&pf=([\w-]+)&pfkey=([\w-]+)&auth_time=(\d+)&page_type=(\d+) url script-response-body https://raw.githubusercontent.com/xudondon888/Rewrite/main/123.js



[mitm]

hostname = openmobile.qq.com

*************************************/

var callbackData = '_Callback( {"ret":0, "url":"auth://www.qq.com?#access_token=74663626D754D050FFAAB8FEE258FAC8&expires_in=7776000&openid=8E7A102D470E70B339158F8F68D50EF2&pay_token=F945367CDBA0A39FD12319D6E738642D&state=test&ret=0&pf=openmobile_ios&pfkey=045656b3dcbfd8362845671a69355682&auth_time=1708094908&page_type=0"});';

// Extract the JSON part of the callback data
var jsonData = callbackData.substring(callbackData.indexOf('{'), callbackData.lastIndexOf('}') + 1);

// Parse the JSON data
var data = JSON.parse(jsonData);

// Modify the response body as needed
// For example, you might want to change the 'ret' value or add new fields

// Return the modified response
$done({ body: JSON.stringify(data) });
