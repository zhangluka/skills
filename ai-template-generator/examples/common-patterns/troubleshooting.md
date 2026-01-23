# 常见问题和解决方案

## 🎯 概述

本文档收集了AI驱动项目模板生成过程中遇到的常见问题及其解决方案，帮助用户快速解决问题并提高使用效率。

## ❌ 生成相关的问题

### Q1: AI生成的项目缺少关键文件

**问题描述**: AI生成的项目缺少某些重要文件或配置

**可能原因**:
- Prompt中的要求不够明确
- AI理解偏差导致遗漏
- 文档中的要求不够详细

**解决方案**:
```markdown
1. 检查Prompt是否包含完整的要求清单
2. 在"核心要求"部分明确列出所有必需文件
3. 使用验证清单确保完整性

## 🎯 核心要求
### 必须包含的特性
- ✅ package.json - 包含完整依赖和脚本
- ✅ tsconfig.json - TypeScript配置
- ✅ [其他必需文件]
```

**预防措施**:
- 使用模板验证工具: `node tools/template-validator.js`
- 在Prompt中包含详细的验证步骤

### Q2: 生成的代码格式不规范

**问题描述**: AI生成的代码不符合团队的代码规范

**可能原因**:
- Prompt中没有明确格式要求
- AI对代码规范理解有偏差

**解决方案**:
```markdown
## 🔍 输出格式要求
请按以下格式组织输出：

### 代码规范要求
- 使用4个空格缩进
- 字符串使用单引号
- 行末不加分号
- 函数使用箭头函数优先

### 示例格式
```typescript
const example = () => {
  const data = 'formatted code'
  return data
}
```
```

### Q3: 环境变量和配置错误

**问题描述**: 生成的项目环境变量配置不正确

**解决方案**:
```markdown
## 🌍 环境变量配置

### [CODE_TEMPLATE] 环境变量文件
```bash
# .env.development
REACT_APP_API_BASE_URL=http://localhost:8080/api
REACT_APP_ENV=development

# .env.production
REACT_APP_API_BASE_URL=https://api.production.com
REACT_APP_ENV=production
```

### 配置验证要求
- [ ] 开发环境API地址可访问
- [ ] 生产环境使用HTTPS
- [ ] 敏感信息不提交到代码库
```

## 🔧 配置相关的问题

### Q4: 构建工具配置错误

**问题描述**: Vite/Craco配置导致构建失败

**解决方案**:
```markdown
## ⚙️ 构建配置验证

### [CODE_TEMPLATE] 基础配置
```javascript
// craco.config.js
module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // 路径别名配置
      webpackConfig.resolve.alias = {
        '@': path.resolve(__dirname, 'src')
      }
      return webpackConfig
    }
  }
}
```

### 验证步骤
1. npm install
2. npm start (开发环境)
3. npm run build (生产环境)
4. 检查构建输出目录
```

### Q5: 路径别名不工作

**问题描述**: 路径别名配置正确但导入时报错

**解决方案**:
```markdown
## 路径别名完整配置

### 1. TypeScript配置
```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"]
    }
  }
}
```

### 2. 构建工具配置
```javascript
// craco.config.js 或 vite.config.ts
{
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components')
    }
  }
}
```

### 3. 验证步骤
- 重启开发服务器
- 清除node_modules重新安装
- 检查导入路径大小写
```

## 🏗️ 项目结构问题

### Q6: 目录结构不符合团队规范

**问题描述**: 生成的项目结构与团队标准不一致

**解决方案**:
```markdown
## 📁 自定义目录结构

### 要求的结构
```
src/
├── components/     # 组件
├── pages/         # 页面
├── hooks/         # 自定义hooks
├── services/      # API服务
├── utils/         # 工具函数
└── types/         # 类型定义
```

### 生成要求
请严格按照上述结构创建目录和文件，确保:
- 目录名称大小写正确
- 文件放置位置准确
- 命名规范符合团队标准
```

### Q7: 组件导入路径错误

**问题描述**: 组件之间导入路径不正确

**解决方案**:
```markdown
## 导入路径规范

### 使用路径别名
```typescript
// ✅ 正确的导入
import Button from '@components/Button'
import { useAuth } from '@hooks/useAuth'

// ❌ 错误的导入
import Button from '../../../components/Button'
import { useAuth } from '../../hooks/useAuth'
```

### 文件命名规范
- 组件文件: PascalCase.tsx
- Hook文件: camelCase.ts
- 类型文件: camelCase.ts
```

## 🚀 部署相关的问题

### Q8: Docker构建失败

**问题描述**: 生成的Docker配置无法正常构建

**解决方案**:
```markdown
## Docker配置最佳实践

### [CODE_TEMPLATE] 多阶段构建
```dockerfile
# 构建阶段
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# 生产阶段
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
```

### 验证清单
- [ ] 基础镜像版本正确
- [ ] 构建步骤完整
- [ ] 端口暴露正确
- [ ] 健康检查配置
```

### Q9: CI/CD流水线失败

**问题描述**: GitHub Actions或其他CI/CD流水线执行失败

**解决方案**:
```markdown
## CI/CD配置要点

### 基础流水线
```yaml
name: CI/CD Pipeline
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
      - name: Build
        run: npm run build
```

### 常见问题排查
1. 检查Node.js版本兼容性
2. 验证依赖缓存配置
3. 确认环境变量设置
4. 检查部署权限
```

## 🧪 测试相关的问题

### Q10: 测试文件生成不完整

**问题描述**: 生成的测试文件缺少关键测试用例

**解决方案**:
```markdown
## 测试模板要求

### [CODE_TEMPLATE] 组件测试
```typescript
// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import Button from './Button'

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

### 测试覆盖率要求
- 组件测试覆盖率 > 80%
- Hook测试覆盖率 > 85%
- API服务测试覆盖率 > 90%
```

## 📊 性能相关的问题

### Q11: 构建产物过大

**问题描述**: 生成的项目构建后包体积过大

**解决方案**:
```markdown
## 构建优化配置

### 代码分割
```javascript
// webpack或vite配置
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
}
```

### 优化措施
- 启用Gzip压缩
- 按需导入第三方库
- 使用Tree Shaking
- 图片资源优化
```

## 🔄 AI模型特定问题

### Q12: DeepSeek V3生成质量不稳定

**解决方案**:
```markdown
## DeepSeek V3优化策略

### Prompt优化
- 使用中文编写主要指令
- 提供详细的中文注释
- 保持结构清晰简洁
- 避免过于复杂的嵌套

### 质量控制
- 多次生成对比结果
- 使用验证工具检查
- 根据反馈调整Prompt
- 建立成功案例库
```

## 🛠️ 工具使用问题

### Q13: 验证工具报错

**问题描述**: template-validator.js运行时报错

**解决方案**:
```bash
# 确保Node.js版本
node --version  # 需要 >= 16.0.0

# 检查文件权限
chmod +x tools/template-validator.js

# 验证路径
node tools/template-validator.js --template react-craco

# 如果问题持续
npm install --save-dev fs-extra path
```

### Q14: Prompt优化工具无法使用

**解决方案**:
```bash
# 检查依赖
npm list --depth=0

# 安装必要依赖
npm install --save-dev child_process

# 使用简单模式
node tools/prompt-optimizer.js prompt.md --basic
```

## 📋 预防措施清单

### ✅ 生成前检查
- [ ] 检查Prompt是否完整
- [ ] 确认占位符格式正确
- [ ] 验证代码模板标记准确
- [ ] 确认AI模型配置

### ✅ 生成后验证
- [ ] 运行模板验证工具
- [ ] 检查文件完整性
- [ ] 验证关键配置
- [ ] 测试基本功能

### ✅ 持续改进
- [ ] 记录遇到的问题
- [ ] 更新文档和模板
- [ ] 优化Prompt结构
- [ ] 分享成功经验

## 🆘 获取帮助

### 📚 资源文档
- [完整方法论](../methodology.md)
- [模板创建指南](creating-templates.md)
- [Prompt优化指南](optimizing-prompts.md)

### 🛠️ 工具支持
```bash
# 验证工具帮助
node tools/template-validator.js --help

# 优化工具帮助
node tools/prompt-optimizer.js --help
```

### 📞 社区支持
- GitHub Issues: 报告问题和建议
- 社区讨论: 分享经验和最佳实践
- 文档贡献: 帮助改进文档和模板

---

**通过参考这些常见问题和解决方案，您可以更有效地使用AI驱动模板生成技能，快速解决问题并提高工作效率。**