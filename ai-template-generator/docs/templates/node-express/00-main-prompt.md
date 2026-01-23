# Node.js+Express项目模板生成AI指令

## 🎯 任务目标

你是一个专业的后端项目生成专家，需要根据以下规范生成一个完整的、可直接部署的Node.js+Express项目模板。

## 📋 执行步骤

### 第1步：理解项目需求
仔细阅读所有规范文档，理解技术栈、项目结构、特殊配置要求。

### 第2步：生成项目基础
- 创建标准的Node.js+TypeScript项目结构
- 集成Express作为Web框架
- 配置开发环境和生产环境

### 第3步：应用Express配置
重点参考`02-express-config.md`，应用所有自定义服务器配置。

### 第4步：生成目录结构
按照`03-structure-templates.md`创建完整的目录和文件结构。

### 第5步：填充代码模板
根据`04-code-templates.md`和`05-deployment-templates.md`填充具体的代码内容。

### 第6步：验证完整性
确保生成的项目包含所有必要的文件和配置，可以直接`npm install`和`npm run dev`。

## 🎯 核心要求

### 必须包含的特性
- ✅ Node.js 18+ + TypeScript
- ✅ Express框架（自定义中间件）
- ✅ MongoDB数据库集成（Mongoose）
- ✅ JWT认证系统
- ✅ Redis缓存支持
- ✅ API文档生成（Swagger）
- ✅ 日志系统（Winston）
- ✅ 单元测试配置（Jest）
- ✅ Docker部署配置
- ✅ CI/CD配置

### 关键配置要求
- 使用模块化的路由结构
- 自定义Express中间件配置
- 数据库连接池管理
- 环境变量配置
- 多环境部署支持

## 📝 参考文档

执行过程中严格参考以下文档：

1. **01-project-overview.md** - 项目基础配置和技术栈
2. **02-express-config.md** - Express魔改详细配置
3. **03-structure-templates.md** - 目录结构规范
4. **04-code-templates.md** - 核心代码模板
5. **05-deployment-templates.md** - 部署相关配置
6. **06-usage-instructions.md** - 使用说明

## ⚠️ 重要提醒

1. **直接复制代码**：对于文档中标记为`[CODE_TEMPLATE]`的代码块，请直接复制使用，不要修改
2. **占位符替换**：将`${VARIABLE}`格式的占位符替换为实际值
3. **配置优先级**：Express魔改配置优先级高于默认配置
4. **完整性检查**：生成后必须验证所有文件和配置的完整性

## 🔍 输出格式要求

请按以下格式组织输出：

```
## Node.js+Express项目生成完成

### 生成的文件列表
[列出所有生成的文件路径]

### 关键配置说明
[简要说明重要配置的内容和作用]

### 下一步操作
[告诉用户如何使用生成的项目]

### 验证清单
[检查项目完整性的清单]
```

## 🚀 开始执行

现在请按照上述步骤和要求，生成一个完整的Node.js+Express项目模板。如需了解具体细节，请参考对应的支持文档。