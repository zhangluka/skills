# 项目概述和技术栈配置

## 📋 项目基本信息

### 项目元数据
```json
{
  "name": "${PROJECT_NAME}",
  "version": "1.0.0",
  "description": "${PROJECT_DESCRIPTION}",
  "author": "${AUTHOR_NAME}",
  "private": true
}
```

## 🛠 技术栈配置

### 核心技术栈
```json
{
  "framework": "React",
  "version": "^18.2.0",
  "language": "TypeScript", 
  "version": "^5.0.0",
  "bundler": "Webpack (via Craco)",
  "version": "^7.1.0"
}
```

### 主要依赖包

#### 生产依赖
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "@reduxjs/toolkit": "^1.9.0",
    "react-redux": "^8.0.0",
    "antd": "^5.4.0",
    "axios": "^1.3.0",
    "dayjs": "^1.11.0",
    "classnames": "^2.3.0"
  }
}
```

#### 开发依赖
```json
{
  "devDependencies": {
    "@craco/craco": "^7.1.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "@types/node": "^18.0.0",
    "typescript": "^5.0.0",
    "eslint": "^8.0.0",
    "@typescript-eslint/eslint-plugin": "^5.0.0",
    "@typescript-eslint/parser": "^5.0.0",
    "prettier": "^2.8.0",
    "@testing-library/react": "^13.0.0",
    "@testing-library/jest-dom": "^5.16.0",
    "@testing-library/user-event": "^14.0.0"
  }
}
```

## 🔧 开发工具配置

### TypeScript配置 (tsconfig.json)
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@pages/*": ["src/pages/*"],
      "@utils/*": ["src/utils/*"],
      "@services/*": ["src/services/*"],
      "@hooks/*": ["src/hooks/*"],
      "@types/*": ["src/types/*"],
      "@assets/*": ["src/assets/*"]
    }
  },
  "include": [
    "src"
  ]
}
```

### ESLint配置 (.eslintrc.json)
```json
{
  "extends": [
    "react-app",
    "react-app/jest",
    "@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "rules": {
    "no-console": "warn",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/explicit-function-return-type": "off",
    "prefer-const": "error",
    "no-var": "error"
  },
  "overrides": [
    {
      "files": ["**/*.test.ts", "**/*.test.tsx"],
      "env": {
        "jest": true
      }
    }
  ]
}
```

### Prettier配置 (.prettierrc)
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
```

## 🚀 项目脚本配置

### package.json scripts
```json
{
  "scripts": {
    "start": "craco start",
    "build": "craco build",
    "build:analyze": "npm run build && npx webpack-bundle-analyzer build/static/js/*.js",
    "test": "craco test",
    "test:coverage": "craco test --coverage --watchAll=false",
    "lint": "eslint src --ext .ts,.tsx --fix",
    "lint:check": "eslint src --ext .ts,.tsx",
    "format": "prettier --write src/**/*.{ts,tsx,css,md,json}",
    "format:check": "prettier --check src/**/*.{ts,tsx,css,md,json}",
    "type-check": "tsc --noEmit",
    "prepare": "husky install"
  }
}
```

## 📁 项目元数据说明

### 占位符说明
- `${PROJECT_NAME}` - 项目名称（如：my-react-app）
- `${PROJECT_DESCRIPTION}` - 项目描述
- `${AUTHOR_NAME}` - 作者姓名
- `${COMPANY_NAME}` - 公司名称（如需要）

### 环境变量模板
```bash
# .env.example
REACT_APP_NAME=${PROJECT_NAME}
REACT_APP_VERSION=1.0.0
REACT_APP_API_BASE_URL=http://localhost:3001/api
REACT_APP_ENVIRONMENT=development
REACT_APP_DEBUG=true
REACT_APP_CDN_URL=
REACT_APP_PUBLIC_PATH=/
```

## 🎯 UI组件库配置

### Ant Design主题配置
```typescript
// src/styles/theme.ts
import { theme } from 'antd';

export const customTheme = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: '#1890ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    borderRadius: 6,
    wireframe: false,
  },
  components: {
    Button: {
      borderRadius: 4,
    },
    Input: {
      borderRadius: 4,
    },
    Card: {
      borderRadius: 8,
    },
  },
};
```

## 📊 状态管理配置

### Redux Toolkit配置
```typescript
// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    // slice reducers will be added here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

## 🔍 路由配置

### React Router配置
```typescript
// src/router/index.tsx
import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import About from '@/pages/About';
import NotFound from '@/pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
]);
```

这个配置为AI生成项目提供了完整的技术栈基础，确保生成的项目具有现代化的开发环境和工具链。