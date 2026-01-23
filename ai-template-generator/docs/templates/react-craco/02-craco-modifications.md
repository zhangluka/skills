# Craco魔改配置详细说明

## ⚙️ 核心魔改要求

此文档包含所有对标准Create React App + Craco配置的自定义修改，用于适配公司的部署和构建需求。

## 🔧 Webpack配置魔改

### [CODE_TEMPLATE] craco.config.js
```javascript
const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const isAnalyze = process.env.ANALYZE === 'true';

module.exports = {
  // React应用的主配置
  style: {
    modules: {
      localIdentName: '[name]__[local]___[hash:base64:5]',
    },
  },
  
  eslint: {
    enable: true,
    mode: 'extends',
  },
  
  babel: {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'entry',
          corejs: 3,
        },
      ],
      [
        '@babel/preset-react',
        {
          runtime: 'automatic',
        },
      ],
      '@babel/preset-typescript',
    ],
    plugins: [
      [
        'import',
        {
          libraryName: 'antd',
          libraryDirectory: 'es',
          style: 'css',
        },
      ],
    ],
  },
  
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // 1. 路径别名配置
      webpackConfig.resolve.alias = {
        '@': paths.appSrc,
        '@components': path.join(paths.appSrc, 'components'),
        '@pages': path.join(paths.appSrc, 'pages'),
        '@utils': path.join(paths.appSrc, 'utils'),
        '@services': path.join(paths.appSrc, 'services'),
        '@hooks': path.join(paths.appSrc, 'hooks'),
        '@types': path.join(paths.appSrc, 'types'),
        '@assets': path.join(paths.appSrc, 'assets'),
        '@styles': path.join(paths.appSrc, 'styles'),
      };

      // 2. SVG处理配置
      webpackConfig.module.rules.push({
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgoConfig: {
                plugins: [
                  {
                    removeViewBox: false,
                  },
                ],
              },
            },
          },
        ],
      });

      // 3. 样式文件处理增强
      const cssRule = webpackConfig.module.rules.find(
        (rule) => rule.test && rule.test.test('.css')
      );
      if (cssRule) {
        cssRule.use.forEach((use) => {
          if (use.loader && use.loader.includes('css-loader')) {
            use.options.modules = {
              auto: (resourcePath) => resourcePath.includes('.module.'),
              localIdentName: '[name]__[local]___[hash:base64:5]',
            };
          }
        });
      }

      // 4. 生产环境优化
      if (isProduction) {
        // 代码分割配置
        webpackConfig.optimization.splitChunks = {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 10,
            },
            antd: {
              test: /[\\/]node_modules[\\/]antd[\\/]/,
              name: 'antd',
              chunks: 'all',
              priority: 20,
            },
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 5,
              reuseExistingChunk: true,
            },
          },
        };

        // 输出文件名配置
        webpackConfig.output.filename = 'static/js/[name].[contenthash:8].js';
        webpackConfig.output.chunkFilename = 'static/js/[name].[contenthash:8].chunk.js';
        
        // 静态资源文件名
        webpackConfig.module.rules.forEach((rule) => {
          if (rule.oneOf) {
            rule.oneOf.forEach((oneOfRule) => {
              if (oneOfRule.test && oneOfRule.test.test('.png')) {
                oneOfRule.options.name = 'static/media/[name].[hash:8].[ext]';
              }
              if (oneOfRule.test && oneOfRule.test.test('.css')) {
                oneOfRule.use.forEach((use) => {
                  if (use.loader && use.loader.includes('file-loader')) {
                    use.options.name = 'static/css/[name].[contenthash:8].[ext]';
                  }
                });
              }
            });
          }
        });

        // 添加Gzip压缩
        webpackConfig.plugins.push(
          new CompressionWebpackPlugin({
            algorithm: 'gzip',
            test: /\.(js|css|html|svg)$/,
            threshold: 8192,
            minRatio: 0.8,
          })
        );

        // 添加Bundle分析（可选）
        if (isAnalyze) {
          webpackConfig.plugins.push(new BundleAnalyzerPlugin());
        }
      }

      // 5. 开发环境优化
      if (env === 'development') {
        webpackConfig.devtool = 'eval-source-map';
      }

      return webpackConfig;
    },
  },
  
  // 开发服务器配置
  devServer: {
    port: 3000,
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: process.env.REACT_APP_API_PROXY || 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': '/api',
        },
      },
    },
  },
};
```

## 🔌 插件配置

### [CODE_TEMPLATE] webpack.plugins.js
```javascript
// 自定义插件配置
const webpack = require('webpack');
const path = require('path');

const getCustomPlugins = (env) => {
  const plugins = [];

  // 1. 定义环境变量
  plugins.push(
    new webpack.DefinePlugin({
      'process.env.REACT_APP_VERSION': JSON.stringify(
        require('../package.json').version
      ),
      'process.env.REACT_APP_BUILD_TIME': JSON.stringify(
        new Date().toISOString()
      ),
    })
  );

  // 2. 生产环境插件
  if (env === 'production') {
    // 可以添加其他生产环境插件
  }

  return plugins;
};

module.exports = getCustomPlugins;
```

## 🌍 环境变量配置

### [CODE_TEMPLATE] 环境变量处理
```javascript
// scripts/utils/env.js
const fs = require('fs');
const path = require('path');

// 读取并解析环境变量文件
const loadEnvFile = (envFile) => {
  const envPath = path.resolve(process.cwd(), envFile);
  
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const envVars = {};
    
    envContent.split('\n').forEach((line) => {
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) {
        const [, key, value] = match;
        envVars[key] = value.replace(/^["']|["']$/g, '');
      }
    });
    
    return envVars;
  }
  
  return {};
};

// 根据环境加载对应的环境变量
const getEnvironmentConfig = () => {
  const nodeEnv = process.env.NODE_ENV || 'development';
  const envFile = `.env.${nodeEnv}`;
  
  return {
    ...loadEnvFile('.env'),
    ...loadEnvFile(envFile),
    NODE_ENV: nodeEnv,
  };
};

module.exports = { loadEnvFile, getEnvironmentConfig };
```

## 📦 构建优化配置

### [CODE_TEMPLATE] 构建脚本增强
```javascript
// scripts/build.js
const { getEnvironmentConfig } = require('./utils/env');
const { execSync } = require('child_process');

const buildProject = () => {
  const envConfig = getEnvironmentConfig();
  
  // 设置构建环境变量
  Object.entries(envConfig).forEach(([key, value]) => {
    process.env[key] = value;
  });
  
  // 执行构建命令
  try {
    console.log('🚀 开始构建项目...');
    execSync('craco build', { stdio: 'inherit' });
    
    console.log('✅ 构建完成！');
    
    // 生成构建信息文件
    generateBuildInfo();
    
  } catch (error) {
    console.error('❌ 构建失败:', error.message);
    process.exit(1);
  }
};

const generateBuildInfo = () => {
  const fs = require('fs');
  const path = require('path');
  
  const buildInfo = {
    buildTime: new Date().toISOString(),
    version: require('../../package.json').version,
    environment: process.env.NODE_ENV,
    commitHash: getCommitHash(),
  };
  
  fs.writeFileSync(
    path.join(process.cwd(), 'build/build-info.json'),
    JSON.stringify(buildInfo, null, 2)
  );
};

const getCommitHash = () => {
  try {
    return execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();
  } catch {
    return 'unknown';
  }
};

if (require.main === module) {
  buildProject();
}

module.exports = { buildProject };
```

## 🚀 部署相关配置

### [CODE_TEMPLATE] 静态资源CDN配置
```javascript
// config/cdn.js
const getCdnConfig = (env) => {
  const cdnConfig = {
    development: {
      publicPath: '/',
      cdnUrl: '',
    },
    staging: {
      publicPath: '/staging/',
      cdnUrl: 'https://cdn-staging.example.com',
    },
    production: {
      publicPath: '/',
      cdnUrl: process.env.REACT_APP_CDN_URL || 'https://cdn.example.com',
    },
  };
  
  return cdnConfig[env] || cdnConfig.development;
};

module.exports = { getCdnConfig };
```

## 📋 配置验证清单

在应用这些魔改配置时，请确保：

- [ ] 所有路径别名都正确配置
- [ ] SVG处理插件正常工作
- [ ] 生产环境代码分割生效
- [ ] Gzip压缩插件已添加
- [ ] 环境变量正确加载
- [ ] 代理配置符合开发需求
- [ ] CDN配置在对应环境下生效
- [ ] 构建信息文件正确生成

## 🔧 调试和故障排除

### 常见问题
1. **路径别名不生效** - 检查tsconfig.json中的paths配置
2. **SVG导入失败** - 确保@svgr/webpack已安装
3. **代码分割无效** - 检查optimization.splitChunks配置
4. **环境变量未加载** - 确认.env文件存在且格式正确

### 调试命令
```bash
# 分析打包大小
npm run build:analyze

# 检查webpack配置
npx craco --info

# 调试环境变量
npm run build:debug
```