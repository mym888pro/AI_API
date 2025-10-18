# AI_API
一个可以调用OpenAI GPT系列、Anthropic Claude系列、Google Gemini系列的插件
我没有准备图标，你需要准备三个尺寸的图标文件（PNG格式）：
icon16.png (16x16 像素)
icon48.png (48x48 像素)
icon128.png (128x128 像素)
将上述所有文件按照项目结构保存到同一个文件夹中
准备图标文件并放入 icons 文件夹
打开 Chrome 浏览器，进入 chrome://extensions/
开启右上角的"开发者模式"
点击"加载已解压的扩展程序"，选择你的扩展文件夹
扩展安装完成后，点击工具栏中的扩展图标
首次使用需要点击"设置 API 密钥"配置至少一个 API 密钥
选择模型，输入提示词，点击发送请求即可使用
支持多种大模型：OpenAI GPT系列、Anthropic Claude系列、Google Gemini
安全的 API 密钥存储（本地存储）
直观的用户界面
实时响应显示
错误处理和加载状态提示
这个扩展提供了完整的大模型 API 调用功能，用户可以根据自己的需求选择不同的模型，并轻松调用它们的 API。
项目结构
ai-api-caller/
├── manifest.json          # 扩展配置文件
├── popup.html            # 弹出窗口界面
├── popup.js              # 弹出窗口逻辑
├── background.js         # 后台脚本
├── options.html          # 选项页面
├── options.js            # 选项页面逻辑
├── styles.css            # 通用样式
└── icons/                # 图标文件夹
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
访问https://github.com/mym888pro/AI_API/以查看代码
