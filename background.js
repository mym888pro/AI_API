// 后台脚本，用于处理扩展的生命周期事件
chrome.runtime.onInstalled.addListener(() => {
  console.log('AI API 调用器已安装');
});

// 监听扩展图标点击（备用）
chrome.action.onClicked.addListener((tab) => {
  // 可以在这里添加点击图标时的逻辑
});
