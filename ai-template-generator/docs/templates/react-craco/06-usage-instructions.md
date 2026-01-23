# 使用说明和验证清单

## 📖 使用说明

### 🚀 快速开始

1. **准备环境**
   - 安装 Node.js 18+
   - 安装 Docker (可选)
   - 配置环境变量

2. **使用AI生成项目**
   - 复制 `00-main-prompt.md` 中的内容
   - 发送给AI (DeepSeek V3)
   - 等待AI生成完整项目

3. **项目初始化**
   ```bash
   # 进入生成的项目目录
   cd ${PROJECT_NAME}
   
   # 安装依赖
   npm install
   # 或
   yarn install
   
   # 启动开发服务器
   npm start
   # 或
   yarn start
   ```

### 📋 环境变量配置

#### 复制环境变量模板
```bash
cp .env.example .env.development
cp .env.example .env.production
cp .env.example .env.staging
```

#### 配置开发环境 (.env.development)
```bash
REACT_APP_API_BASE_URL=http://localhost:8080/api
REACT_APP_ENVIRONMENT=development
REACT_APP_DEBUG=true
REACT_APP_VERSION=1.0.0
REACT_APP_CDN_URL=
REACT_APP_PUBLIC_PATH=/
```

#### 配置生产环境 (.env.production)
```bash
REACT_APP_API_BASE_URL=https://api.production.com
REACT_APP_ENVIRONMENT=production
REACT_APP_DEBUG=false
REACT_APP_VERSION=1.0.0
REACT_APP_CDN_URL=https://cdn.production.com
REACT_APP_PUBLIC_PATH=/
```

### 🔧 开发工作流

#### 日常开发命令
```bash
# 启动开发服务器
npm start

# 运行测试
npm test

# 代码规范检查
npm run lint:check

# 自动修复代码格式
npm run lint:fix

# 格式化代码
npm run format

# 类型检查
npm run type-check

# 构建项目
npm run build

# 分析打包大小
npm run build:analyze
```

#### Git工作流
```bash
# 创建功能分支
git checkout -b feature/new-feature

# 提交代码
git add .
git commit -m "feat: add new feature"

# 推送分支
git push origin feature/new-feature

# 创建Pull Request
# 代码审查通过后合并到main分支
```

## 🐳 Docker部署

### 本地开发环境
```bash
# 启动开发环境
docker-compose up -d

# 查看日志
docker-compose logs -f frontend

# 停止服务
docker-compose down
```

### 生产环境部署
```bash
# 使用生产环境配置
docker-compose -f docker-compose.prod.yml up -d

# 健康检查
curl http://localhost/health

# 查看运行状态
docker-compose ps
```

### 自定义部署
```bash
# 使用部署脚本
chmod +x scripts/deploy.sh

# 部署到预发布环境
./scripts/deploy.sh staging latest

# 部署到生产环境
./scripts/deploy.sh production v1.2.0
```

## ✅ 验证清单

### 📂 项目结构验证

- [ ] `public/` 目录存在且包含必要文件
  - [ ] `index.html` - HTML模板
  - [ ] `favicon.ico` - 网站图标
  - [ ] `manifest.json` - PWA配置

- [ ] `src/` 目录结构完整
  - [ ] `components/` - 组件目录
    - [ ] `common/` - 通用组件
    - [ ] `business/` - 业务组件
    - [ ] `Layout/` - 布局组件
  - [ ] `pages/` - 页面组件
  - [ ] `hooks/` - 自定义Hooks
  - [ ] `services/` - API服务
  - [ ] `store/` - 状态管理
  - [ ] `utils/` - 工具函数
  - [ ] `types/` - 类型定义
  - [ ] `styles/` - 样式文件
  - [ ] `assets/` - 静态资源
  - [ ] `config/` - 配置文件
  - [ ] `router/` - 路由配置

### ⚙️ 配置文件验证

- [ ] `package.json` - 项目依赖配置正确
- [ ] `tsconfig.json` - TypeScript配置完整
- [ ] `craco.config.js` - Craco配置包含所有魔改设置
- [ ] `.eslintrc.json` - ESLint规则配置
- [ ] `.prettierrc` - Prettier格式化配置
- [ ] `.gitignore` - Git忽略规则合理
- [ ] 环境变量文件完整

### 🔧 功能验证

#### 基础功能
- [ ] 项目能够正常启动 (`npm start`)
- [ ] 热更新功能正常
- [ ] 路由跳转正常工作
- [ ] 页面可以正常访问
- [ ] 组件渲染正常

#### 构建功能
- [ ] 开发环境构建成功
- [ ] 生产环境构建成功
- [ ] 构建产物大小合理
- [ ] 静态资源路径正确
- [ ] Source Map生成正常

#### 代码质量
- [ ] ESLint检查通过
- [ ] Prettier格式化正常
- [ ] TypeScript编译通过
- [ ] 单元测试运行正常
- [ ] 测试覆盖率达标

#### Craco魔改功能
- [ ] 路径别名正常工作
- [ ] SVG文件可以正常导入
- [ ] CSS模块化正常
- [ ] 生产环境代码分割生效
- [ ] Gzip压缩正常工作
- [ ] Bundle分析工具可用

#### 部署功能
- [ ] Docker镜像构建成功
- [ ] 容器正常运行
- [ ] 健康检查通过
- [ ] Nginx代理正常
- [ ] 环境变量加载正确
- [ ] CI/CD流程完整

### 🧪 测试验证

#### 单元测试
```bash
# 运行所有测试
npm test

# 检查测试覆盖率
npm run test:coverage

# 生成测试报告
```

验证要求：
- [ ] 所有测试通过
- [ ] 测试覆盖率 > 80%
- [ ] 关键逻辑有测试覆盖

#### 集成测试
- [ ] API调用正常
- [ ] 状态管理正常
- [ ] 路由守卫正常
- [ ] 错误处理正常

### 🚀 性能验证

#### 开发环境性能
- [ ] 首次加载时间 < 5秒
- [ ] 热更新响应时间 < 2秒
- [ ] 内存使用合理

#### 生产环境性能
- [ ] 首屏加载时间 < 3秒
- [ ] 资源压缩率 > 70%
- [ ] 缓存策略正确
- [ ] Bundle大小优化

### 🔒 安全验证

- [ ] HTTPS配置正确
- [ ] 安全头设置完整
- [ ] XSS防护正常
- [ ] CSRF防护正常
- [ ] 环境变量安全
- [ ] 敏感信息未泄露

### 📱 兼容性验证

#### 浏览器兼容性
- [ ] Chrome (最新版本)
- [ ] Firefox (最新版本)
- [ ] Safari (最新版本)
- [ ] Edge (最新版本)

#### 响应式兼容性
- [ ] 桌面端显示正常
- [ ] 平板端显示正常
- [ ] 移动端显示正常
- [ ] 触摸操作正常

## 🐛 常见问题解决

### 构建问题

#### 问题1: 路径别名不生效
```bash
# 解决方案
# 1. 检查 tsconfig.json 中的 paths 配置
# 2. 检查 craco.config.js 中的 alias 配置
# 3. 重启开发服务器
```

#### 问题2: SVG导入失败
```bash
# 解决方案
# 1. 安装 @svgr/webpack
# 2. 检查 craco.config.js 中的 SVG loader 配置
# 3. 确认 TypeScript 声明文件
```

### 运行时问题

#### 问题3: API请求失败
```bash
# 解决方案
# 1. 检查环境变量配置
# 2. 确认代理配置
# 3. 检查后端服务状态
```

#### 问题4: 样式不生效
```bash
# 解决方案
# 1. 检查 CSS 模块化配置
# 2. 确认样式导入路径
# 3. 检查 Ant Design 主题配置
```

## 📞 技术支持

### 文档资源
- 📖 [React 官方文档](https://react.dev/)
- 🛠 [Craco 配置文档](https://craco.js.org/)
- 🎨 [Ant Design 文档](https://ant.design/)
- 📦 [Redux Toolkit 文档](https://redux-toolkit.js.org/)

### 社区支持
- 🐛 [GitHub Issues](https://github.com/your-repo/issues)
- 💬 [Discord 社区](https://discord.gg/your-server)
- 📧 技术支持邮箱: support@yourcompany.com

### 更新维护
- 🔄 定期更新依赖包版本
- 📝 持续完善文档
- 🚀 跟进技术发展趋势
- 💡 收集用户反馈改进

---

**使用此文档，您可以快速验证生成的项目是否符合企业级标准，确保项目质量和部署的可靠性。**