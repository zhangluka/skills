# 部署相关代码模板

## 🐳 Docker部署配置

### [CODE_TEMPLATE] Dockerfile (多阶段构建)
```dockerfile
# 构建阶段
FROM node:18-alpine AS builder

# 设置工作目录
WORKDIR /app

# 安装必要的依赖
RUN apk add --no-cache python3 make g++

# 复制package文件
COPY package*.json ./
COPY yarn.lock ./

# 安装依赖 (使用yarn提高效率)
RUN yarn install --frozen-lockfile --production=false

# 复制源代码
COPY . .

# 设置环境变量
ARG REACT_APP_API_BASE_URL
ARG REACT_APP_ENVIRONMENT
ARG REACT_APP_VERSION

ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL
ENV REACT_APP_ENVIRONMENT=$REACT_APP_ENVIRONMENT
ENV REACT_APP_VERSION=$REACT_APP_VERSION
GENERATE_SOURCEMAP=false

# 构建应用
RUN yarn build

# 生产阶段
FROM nginx:alpine AS production

# 安装必要的工具
RUN apk add --no-cache curl

# 复制构建结果
COPY --from=builder /app/build /usr/share/nginx/html

# 复制nginx配置
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# 复制健康检查脚本
COPY docker/healthcheck.sh /etc/healthcheck.sh
RUN chmod +x /etc/healthcheck.sh

# 创建非root用户
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nginx -u 1001

# 设置权限
RUN chown -R nginx:nodejs /usr/share/nginx/html && \
    chown -R nginx:nodejs /var/cache/nginx && \
    chown -R nginx:nodejs /var/log/nginx && \
    chown -R nginx:nodejs /etc/nginx/conf.d

# 创建nginx运行时需要的目录
RUN touch /var/run/nginx.pid && \
    chown -R nginx:nodejs /var/run/nginx.pid

# 切换到非root用户
USER nginx

# 暴露端口
EXPOSE 8080

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD /etc/healthcheck.sh

# 启动nginx
CMD ["nginx", "-g", "daemon off;"]
```

### [CODE_TEMPLATE] Nginx配置
```nginx
# docker/nginx.conf
worker_processes auto;
error_log /var/log/nginx/error.log warn;
pid /var/run/nginx.pid;

events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # 日志格式
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';

    access_log /var/log/nginx/access.log main;

    # 基础配置
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;

    # Gzip压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/xml+rss
        application/atom+xml
        image/svg+xml;

    # 安全头配置
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    server {
        listen 8080;
        server_name _;
        root /usr/share/nginx/html;
        index index.html;

        # 静态资源缓存
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
            add_header X-Content-Type-Options "nosniff";
            
            # 启用gzip压缩
            gzip_static on;
        }

        # HTML文件不缓存
        location ~* \.html$ {
            expires -1;
            add_header Cache-Control "no-cache, no-store, must-revalidate";
            add_header Pragma "no-cache";
        }

        # API代理
        location /api {
            proxy_pass ${API_BASE_URL};
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
            proxy_read_timeout 86400;
        }

        # React Router支持
        location / {
            try_files $uri $uri/ /index.html;
            
            # 添加安全头
            add_header X-Frame-Options "SAMEORIGIN" always;
            add_header X-Content-Type-Options "nosniff" always;
            add_header X-XSS-Protection "1; mode=block" always;
        }

        # 健康检查端点
        location /health {
            access_log off;
            return 200 "healthy\n";
            add_header Content-Type text/plain;
        }

        # 错误页面
        error_page 404 /index.html;
        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
            root /usr/share/nginx/html;
        }
    }
}
```

### [CODE_TEMPLATE] 健康检查脚本
```bash
#!/bin/sh
# docker/healthcheck.sh

# 检查nginx进程
if ! pgrep nginx > /dev/null; then
    echo "Nginx is not running"
    exit 1
fi

# 检查端口监听
if ! netstat -tlnp | grep :8080 > /dev/null; then
    echo "Port 8080 is not listening"
    exit 1
fi

# 检查健康端点
if ! curl -f http://localhost:8080/health > /dev/null 2>&1; then
    echo "Health check failed"
    exit 1
fi

echo "Health check passed"
exit 0
```

## 🚀 Docker Compose配置

### [CODE_TEMPLATE] docker-compose.yml (开发环境)
```yaml
version: '3.8'

services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile
      target: builder
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_BASE_URL=http://backend:8080/api
      - REACT_APP_ENVIRONMENT=development
      - CHOKIDAR_USEPOLLING=true
      - FAST_REFRESH=true
    volumes:
      - .:/app
      - /app/node_modules
    command: yarn start
    depends_on:
      - backend
    networks:
      - app-network

  backend:
    image: your-backend-image:latest
    ports:
      - "8080:8080"
    environment:
      - DATABASE_URL=postgresql://user:password@postgres:5432/mydb
    depends_on:
      - postgres
    networks:
      - app-network

  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=mydb
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - app-network

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    networks:
      - app-network

volumes:
  postgres_data:

networks:
  app-network:
    driver: bridge
```

### [CODE_TEMPLATE] docker-compose.prod.yml (生产环境)
```yaml
version: '3.8'

services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile
      target: production
    ports:
      - "80:8080"
    environment:
      - REACT_APP_API_BASE_URL=${API_BASE_URL}
      - REACT_APP_ENVIRONMENT=production
      - REACT_APP_VERSION=${APP_VERSION}
    healthcheck:
      test: ["CMD", "/etc/healthcheck.sh"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    deploy:
      replicas: 2
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
    networks:
      - app-network

  backend:
    image: your-backend-image:${APP_VERSION}
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - REDIS_URL=${REDIS_URL}
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
      interval: 30s
      timeout: 10s
      retries: 3
    deploy:
      replicas: 3
      resources:
        limits:
          cpus: '1.0'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M
    networks:
      - app-network

  nginx:
    image: nginx:alpine
    ports:
      - "443:443"
      - "80:80"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/conf.d/default.conf
      - ./nginx/ssl:/etc/nginx/ssl
    depends_on:
      - frontend
      - backend
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

## 🔄 CI/CD配置

### [CODE_TEMPLATE] GitHub Actions工作流
```yaml
# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '18'
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'yarn'

      - name: Install dependencies
        run: yarn install --frozen-lockfile

      - name: Run linting
        run: yarn lint

      - name: Run type checking
        run: yarn type-check

      - name: Run tests
        run: yarn test:coverage

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info

  build:
    needs: test
    runs-on: ubuntu-latest
    outputs:
      image-digest: ${{ steps.build.outputs.digest }}
      image-tag: ${{ steps.meta.outputs.tags }}
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Log in to Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: |
            type=ref,event=branch
            type=ref,event=pr
            type=sha,prefix={{branch}}-
            type=raw,value=latest,enable={{is_default_branch}}

      - name: Build and push Docker image
        id: build
        uses: docker/build-push-action@v5
        with:
          context: .
          file: ./Dockerfile
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
          build-args: |
            REACT_APP_API_BASE_URL=${{ secrets.API_BASE_URL }}
            REACT_APP_ENVIRONMENT=${{ github.ref == 'refs/heads/main' && 'production' || 'staging' }}
            REACT_APP_VERSION=${{ github.sha }}

  deploy-staging:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/develop'
    environment: staging
    steps:
      - name: Deploy to staging
        run: |
          echo "Deploying to staging environment"
          # 这里添加实际的部署脚本
          # 例如调用Kubernetes API或者部署到云平台

  deploy-production:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    environment: production
    steps:
      - name: Deploy to production
        run: |
          echo "Deploying to production environment"
          # 这里添加实际的部署脚本

  notify:
    needs: [deploy-staging, deploy-production]
    runs-on: ubuntu-latest
    if: always()
    steps:
      - name: Notify Slack
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          channel: '#deployments'
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

### [CODE_TEMPLATE] 部署脚本
```bash
#!/bin/bash
# scripts/deploy.sh

set -e

# 配置变量
ENVIRONMENT=${1:-staging}
IMAGE_TAG=${2:-latest}
REGISTRY=${REGISTRY:-ghcr.io}
IMAGE_NAME=${IMAGE_NAME:-your-username/react-app}

echo "开始部署到 $ENVIRONMENT 环境..."

# 构建环境变量文件
cat > .env.${ENVIRONMENT} << EOF
REACT_APP_API_BASE_URL=${API_BASE_URL}
REACT_APP_ENVIRONMENT=${ENVIRONMENT}
REACT_APP_VERSION=${IMAGE_TAG}
EOF

# 创建docker-compose覆盖文件
cat > docker-compose.override.yml << EOF
version: '3.8'
services:
  frontend:
    image: ${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}
    environment:
      - REACT_APP_API_BASE_URL=${API_BASE_URL}
      - REACT_APP_ENVIRONMENT=${ENVIRONMENT}
      - REACT_APP_VERSION=${IMAGE_TAG}
    deploy:
      replicas: ${FRONTEND_REPLICAS:-2}
EOF

# 拉取最新镜像
echo "拉取最新镜像..."
docker-compose pull frontend

# 停止旧容器
echo "停止旧容器..."
docker-compose stop

# 启动新容器
echo "启动新容器..."
docker-compose up -d frontend

# 等待服务启动
echo "等待服务启动..."
sleep 30

# 健康检查
echo "执行健康检查..."
for i in {1..10}; do
  if curl -f http://localhost/health; then
    echo "服务启动成功!"
    break
  else
    echo "等待服务启动... ($i/10)"
    sleep 10
  fi
done

# 清理旧镜像
echo "清理旧镜像..."
docker image prune -f

echo "部署完成!"
```

## 📊 监控和日志配置

### [CODE_TEMPLATE] 应用监控配置
```typescript
// src/monitoring/index.ts
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

// Sentry配置
if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    integrations: [
      new BrowserTracing(),
    ],
    tracesSampleRate: 0.1,
    environment: process.env.REACT_APP_ENVIRONMENT,
    release: process.env.REACT_APP_VERSION,
  });
}

// 性能监控
export const trackPerformance = (name: string, startTime: number) => {
  if (process.env.NODE_ENV === 'production') {
    const duration = performance.now() - startTime;
    console.log(`Performance: ${name} took ${duration.toFixed(2)}ms`);
    
    // 发送到监控服务
    if (window.gtag) {
      window.gtag('event', 'performance_timing', {
        event_category: 'Performance',
        event_label: name,
        value: Math.round(duration),
      });
    }
  }
};

// 错误监控
export const trackError = (error: Error, context?: any) => {
  console.error('Application Error:', error, context);
  
  if (process.env.NODE_ENV === 'production' && Sentry) {
    Sentry.captureException(error, {
      contexts: { custom: context },
    });
  }
};
```

这些部署相关模板为AI生成完整的企业级部署配置提供了具体的实现参考。