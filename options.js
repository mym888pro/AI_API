document.addEventListener('DOMContentLoaded', function() {
  const openaiKeyInput = document.getElementById('openai-key');
  const anthropicKeyInput = document.getElementById('anthropic-key');
  const googleKeyInput = document.getElementById('google-key');
  const saveBtn = document.getElementById('save-btn');
  const resetBtn = document.getElementById('reset-btn');
  const successMessage = document.getElementById('success-message');
  
  // 加载保存的设置
  chrome.storage.sync.get(['openaiKey', 'anthropicKey', 'googleKey'], function(result) {
    if (result.openaiKey) openaiKeyInput.value = result.openaiKey;
    if (result.anthropicKey) anthropicKeyInput.value = result.anthropicKey;
    if (result.googleKey) googleKeyInput.value = result.googleKey;
  });
  
  // 保存设置
  saveBtn.addEventListener('click', function() {
    const openaiKey = openaiKeyInput.value.trim();
    const anthropicKey = anthropicKeyInput.value.trim();
    const googleKey = googleKeyInput.value.trim();
    
    chrome.storage.sync.set({
      openaiKey: openaiKey,
      anthropicKey: anthropicKey,
      googleKey: googleKey
    }, function() {
      showSuccess('设置保存成功！');
    });
  });
  
  // 重置设置
  resetBtn.addEventListener('click', function() {
    if (confirm('确定要重置所有 API 密钥吗？')) {
      openaiKeyInput.value = '';
      anthropicKeyInput.value = '';
      googleKeyInput.value = '';
      
      chrome.storage.sync.remove(['openaiKey', 'anthropicKey', 'googleKey'], function() {
        showSuccess('设置已重置');
      });
    }
  });
  
  function showSuccess(message) {
    successMessage.textContent = message;
    successMessage.style.display = 'block';
    setTimeout(() => {
      successMessage.style.display = 'none';
    }, 3000);
  }
});
