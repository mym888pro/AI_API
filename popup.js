document.addEventListener('DOMContentLoaded', function() {
  const modelSelect = document.getElementById('model-select');
  const promptInput = document.getElementById('prompt-input');
  const sendBtn = document.getElementById('send-btn');
  const optionsBtn = document.getElementById('options-btn');
  const loading = document.getElementById('loading');
  const errorMessage = document.getElementById('error-message');
  const responseArea = document.getElementById('response-area');
  
  // 从存储中加载模型选择
  chrome.storage.sync.get(['selectedModel'], function(result) {
    if (result.selectedModel) {
      modelSelect.value = result.selectedModel;
    }
  });
  
  // 保存模型选择
  modelSelect.addEventListener('change', function() {
    chrome.storage.sync.set({ selectedModel: this.value });
  });
  
  // 打开选项页面
  optionsBtn.addEventListener('click', function() {
    chrome.runtime.openOptionsPage();
  });
  
  // 发送请求到 AI API
  sendBtn.addEventListener('click', async function() {
    const model = modelSelect.value;
    const prompt = promptInput.value.trim();
    
    if (!prompt) {
      showError('请输入提示词');
      return;
    }
    
    // 显示加载状态
    loading.style.display = 'block';
    errorMessage.style.display = 'none';
    sendBtn.disabled = true;
    
    try {
      const response = await callAIApi(model, prompt);
      responseArea.textContent = response;
    } catch (error) {
      showError(error.message);
    } finally {
      loading.style.display = 'none';
      sendBtn.disabled = false;
    }
  });
  
  // 调用 AI API
  async function callAIApi(model, prompt) {
    // 从存储中获取 API 密钥
    const config = await new Promise(resolve => {
      chrome.storage.sync.get(['openaiKey', 'anthropicKey', 'googleKey'], resolve);
    });
    
    let apiUrl, requestOptions;
    
    // 根据选择的模型构造请求
    if (model.startsWith('gpt')) {
      // OpenAI API
      if (!config.openaiKey) {
        throw new Error('请先在设置中配置 OpenAI API 密钥');
      }
      
      apiUrl = 'https://api.openai.com/v1/chat/completions';
      requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.openaiKey}`
        },
        body: JSON.stringify({
          model: model,
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 1000
        })
      };
    } else if (model.startsWith('claude')) {
      // Anthropic API
      if (!config.anthropicKey) {
        throw new Error('请先在设置中配置 Anthropic API 密钥');
      }
      
      apiUrl = 'https://api.anthropic.com/v1/messages';
      requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': config.anthropicKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: model,
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 1000
        })
      };
    } else if (model.startsWith('gemini')) {
      // Google Gemini API
      if (!config.googleKey) {
        throw new Error('请先在设置中配置 Google AI API 密钥');
      }
      
      apiUrl = `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${config.googleKey}`;
      requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      };
    } else {
      throw new Error('不支持的模型');
    }
    
    const response = await fetch(apiUrl, requestOptions);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || JSON.stringify(data));
    }
    
    // 解析不同 API 的响应格式
    if (model.startsWith('gpt')) {
      return data.choices[0].message.content;
    } else if (model.startsWith('claude')) {
      return data.content[0].text;
    } else if (model.startsWith('gemini')) {
      return data.candidates[0].content.parts[0].text;
    }
  }
  
  function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
  }
});
