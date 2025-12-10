# 剪贴板中转站

一个简单的跨设备文本传输工具，基于 Cloudflare Pages + KV 存储。

## 部署步骤

### 1. 创建 GitHub 仓库
```bash
cd clipboard-share
git init
git add .
git commit -m "init"
# 在 GitHub 创建仓库后
git remote add origin https://github.com/你的用户名/clipboard-share.git
git push -u origin main
```

### 2. 配置 Cloudflare

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 进入 **Workers & Pages** → **KV**
3. 创建一个 KV 命名空间，名称如 `clipboard-kv`
4. 进入 **Workers & Pages** → **Create** → **Pages**
5. 选择 **Connect to Git**，连接你的 GitHub 仓库
6. 构建设置：
   - 构建命令：留空
   - 输出目录：`public`
7. 部署后，进入项目 **Settings** → **Functions** → **KV namespace bindings**
8. 添加绑定：
   - 变量名：`CLIPBOARD_KV`
   - KV 命名空间：选择刚创建的

### 3. 完成
访问 Cloudflare 分配的域名即可使用！

## 功能
- 保存文本到云端
- 从云端读取文本
- 一键复制到剪贴板
- 内容 24 小时后自动过期
