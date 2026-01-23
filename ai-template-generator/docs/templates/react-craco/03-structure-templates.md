# 项目目录结构和文件模板

## 📁 完整目录结构

```
${PROJECT_NAME}/
├── public/                         # 静态资源目录
│   ├── index.html                  # HTML模板
│   ├── favicon.ico                 # 网站图标
│   ├── logo192.png                 # Logo图片
│   └── manifest.json               # PWA配置
├── src/                           # 源代码目录
│   ├── components/                # 通用组件
│   │   ├── common/               # 基础组件
│   │   │   ├── Button/
│   │   │   │   ├── index.tsx
│   │   │   │   ├── Button.module.css
│   │   │   │   ├── types.ts
│   │   │   │   └── __tests__/
│   │   │   │       └── Button.test.tsx
│   │   │   ├── Input/
│   │   │   │   ├── index.tsx
│   │   │   │   ├── Input.module.css
│   │   │   │   ├── types.ts
│   │   │   │   └── __tests__/
│   │   │   │       └── Input.test.tsx
│   │   │   ├── Modal/
│   │   │   ├── Loading/
│   │   │   └── ErrorBoundary/
│   │   ├── business/             # 业务组件
│   │   │   ├── Header/
│   │   │   │   ├── index.tsx
│   │   │   │   ├── Header.module.css
│   │   │   │   └── __tests__/
│   │   │   ├── Sidebar/
│   │   │   ├── Footer/
│   │   │   └── UserCard/
│   │   └── Layout/               # 布局组件
│   │       ├── index.tsx
│   │       ├── Layout.module.css
│   │       └── __tests__/
│   │           └── Layout.test.tsx
│   ├── pages/                    # 页面组件
│   │   ├── Home/
│   │   │   ├── index.tsx
│   │   │   ├── Home.module.css
│   │   │   └── __tests__/
│   │   │       └── Home.test.tsx
│   │   ├── About/
│   │   ├── User/
│   │   │   ├── index.tsx
│   │   │   ├── components/
│   │   │   │   ├── UserList/
│   │   │   │   └── UserDetail/
│   │   │   └── __tests__/
│   │   ├── Login/
│   │   └── NotFound/
│   │       ├── index.tsx
│   │       └── NotFound.module.css
│   ├── hooks/                    # 自定义Hooks
│   │   ├── useApi.ts             # API调用Hook
│   │   ├── useAuth.ts            # 认证Hook
│   │   ├── useLocalStorage.ts    # 本地存储Hook
│   │   ├── useDebounce.ts        # 防抖Hook
│   │   └── __tests__/
│   │       ├── useApi.test.ts
│   │       └── useAuth.test.ts
│   ├── services/                 # API服务
│   │   ├── api.ts                # API基础配置
│   │   ├── auth.ts               # 认证服务
│   │   ├── user.ts               # 用户服务
│   │   ├── common.ts             # 通用服务
│   │   └── __tests__/
│   │       ├── api.test.ts
│   │       └── auth.test.ts
│   ├── store/                    # 状态管理
│   │   ├── index.ts              # Store配置
│   │   ├── slices/               # Redux Slices
│   │   │   ├── authSlice.ts
│   │   │   ├── userSlice.ts
│   │   │   └── appSlice.ts
│   │   └── __tests__/
│   │       └── store.test.ts
│   ├── utils/                    # 工具函数
│   │   ├── constants.ts          # 常量定义
│   │   ├── helpers.ts            # 辅助函数
│   │   ├── validators.ts         # 验证函数
│   │   ├── storage.ts            # 存储工具
│   │   ├── request.ts            # 请求工具
│   │   └── __tests__/
│   │       ├── helpers.test.ts
│   │       └── validators.test.ts
│   ├── types/                    # TypeScript类型定义
│   │   ├── api.ts                # API类型
│   │   ├── user.ts               # 用户类型
│   │   ├── auth.ts               # 认证类型
│   │   ├── common.ts             # 通用类型
│   │   └── index.ts              # 类型导出
│   ├── styles/                   # 样式文件
│   │   ├── globals.css           # 全局样式
│   │   ├── variables.css         # CSS变量
│   │   ├── reset.css             # 样式重置
│   │   ├── components.css        # 组件样式
│   │   ├── antd-theme.css        # Antd主题
│   │   └── responsive.css        # 响应式样式
│   ├── assets/                   # 静态资源
│   │   ├── images/               # 图片资源
│   │   │   ├── logo.png
│   │   │   └── placeholder.png
│   │   ├── icons/                # 图标资源
│   │   │   ├── logo.svg
│   │   │   └── icons.tsx         # SVG组件导出
│   │   └── fonts/                # 字体文件
│   ├── config/                   # 配置文件
│   │   ├── env.ts                # 环境配置
│   │   ├── constants.ts          # 配置常量
│   │   └── theme.ts              # 主题配置
│   ├── router/                   # 路由配置
│   │   ├── index.tsx             # 路由定义
│   │   ├── guards.tsx            # 路由守卫
│   │   └── routes.ts             # 路由常量
│   ├── App.tsx                   # 根组件
│   ├── App.css                   # 根组件样式
│   ├── index.tsx                 # 应用入口
│   ├── index.css                 # 入口样式
│   ├── setupTests.ts             # 测试配置
│   └── react-app-env.d.ts        # React类型声明
├── scripts/                      # 构建脚本
│   ├── build.js                  # 构建脚本
│   ├── utils/
│   │   └── env.js                # 环境变量工具
│   └── deploy.js                 # 部署脚本
├── config/                       # 项目配置
│   ├── craco.config.js           # Craco配置
│   ├── webpack.config.js         # Webpack扩展配置
│   └── cdn.js                    # CDN配置
├── docs/                         # 项目文档
│   ├── README.md                 # 项目说明
│   ├── API.md                    # API文档
│   └── DEPLOYMENT.md             # 部署文档
├── tests/                        # 测试文件
│   ├── __mocks__/                # Mock文件
│   │   └── fileMock.js
│   └── setup.js                  # 测试设置
├── docker/                       # Docker配置
│   ├── Dockerfile                # Docker镜像
│   ├── docker-compose.yml        # Docker编排
│   └── nginx.conf                # Nginx配置
├── .github/                      # GitHub配置
│   └── workflows/
│       └── ci.yml                # CI/CD配置
├── package.json                  # 项目依赖
├── package-lock.json             # 依赖锁定
├── tsconfig.json                 # TypeScript配置
├── .eslintrc.json                # ESLint配置
├── .prettierrc                   # Prettier配置
├── .gitignore                    # Git忽略文件
├── .env.example                  # 环境变量示例
├── .env.development              # 开发环境变量
├── .env.production               # 生产环境变量
├── .env.staging                  # 预发布环境变量
├── docker-compose.yml            # 开发环境Docker
├── Dockerfile                    # 生产环境Docker
├── nginx.conf                    # Nginx配置
└── README.md                     # 项目说明
```

## 📄 核心文件模板

### [FILE_TEMPLATE] public/index.html
```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="${PROJECT_DESCRIPTION}"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>${PROJECT_NAME}</title>
  </head>
  <body>
    <noscript>您需要启用JavaScript才能运行此应用程序。</noscript>
    <div id="root"></div>
  </body>
</html>
```

### [FILE_TEMPLATE] src/index.tsx
```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

import App from './App';
import { store } from './store';
import { customTheme } from './styles/theme';
import './styles/globals.css';
import './index.css';

// 设置dayjs中文
dayjs.locale('zh-cn');

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider 
        locale={zhCN} 
        theme={customTheme}
      >
        <App />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
```

### [FILE_TEMPLATE] src/App.tsx
```typescript
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import ErrorBoundary from './components/common/ErrorBoundary';
import Loading from './components/common/Loading';
import './App.css';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
      <Loading />
    </ErrorBoundary>
  );
};

export default App;
```

### [FILE_TEMPLATE] src/router/index.tsx
```typescript
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import About from '../pages/About';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import ProtectedRoute from './guards';

// 基础路由配置
export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />,
      },
      {
        path: 'home',
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: 'about',
        element: (
          <ProtectedRoute>
            <About />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
```

## 🗂 目录创建规则

### 组件目录结构模板
```
ComponentName/
├── index.tsx              # 组件主文件
├── ComponentName.module.css  # 组件样式
├── types.ts              # 类型定义
├── hooks/                # 组件专属hooks
│   └── useComponent.ts
├── utils/                # 组件工具函数
│   └── helpers.ts
├── __tests__/            # 测试文件
│   ├── Component.test.tsx
│   └── utils.test.ts
└── README.md             # 组件文档
```

### 页面目录结构模板
```
PageName/
├── index.tsx             # 页面主文件
├── PageName.module.css   # 页面样式
├── components/           # 页面专属组件
│   ├── ComponentA/
│   └── ComponentB/
├── hooks/               # 页面专属hooks
├── services/            # 页面API服务
├── __tests__/           # 测试文件
└── types.ts             # 页面类型定义
```

## 📋 文件命名规范

### 命名约定
- **组件文件**: PascalCase (`UserProfile.tsx`)
- **Hook文件**: camelCase + use前缀 (`useUserProfile.ts`)
- **工具文件**: camelCase (`formatDate.ts`)
- **类型文件**: camelCase (`userTypes.ts`)
- **常量文件**: camelCase (`apiConstants.ts`)
- **样式文件**: kebab-case (`user-profile.module.css`)
- **测试文件**: 与主文件同名，添加`.test`后缀

### 目录命名
- **组件目录**: PascalCase (`UserProfile/`)
- **页面目录**: PascalCase (`UserManagement/`)
- **工具目录**: camelCase (`utils/`, `services/`, `hooks/`)

## 🔧 配置文件生成

### 必需的配置文件清单
- [ ] package.json - 项目依赖和脚本
- [ ] tsconfig.json - TypeScript配置
- [ ] craco.config.js - 构建配置
- [ ] .eslintrc.json - 代码规范
- [ ] .prettierrc - 代码格式化
- [ ] .gitignore - Git忽略规则
- [ ] .env.example - 环境变量模板

这个目录结构为AI生成完整项目提供了清晰的蓝图，确保所有必要的文件和目录都被正确创建。