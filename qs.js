let body = JSON.parse($response.body);

// 修改card_items
if (body.card_items && body.card_items.length > 0) {
  body.card_items[0].priority_display = false;
  body.card_items[0].is_show = false;
}
body.preview_guide = null;

// 删除reward_ad_banner
if (body.reward_ad_banner) {
  delete body.reward_ad_banner;
}

// 删除blocks
if (body.blocks && body.blocks.length > 1) {
  delete body.blocks[1];
}

$done({body: JSON.stringify(body)});
