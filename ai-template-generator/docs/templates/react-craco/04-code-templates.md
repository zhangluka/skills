# 核心代码片段模板

## 🧩 组件代码模板

### [CODE_TEMPLATE] 基础Button组件
```typescript
// src/components/common/Button/index.tsx
import React from 'react';
import classNames from 'classnames';
import { ButtonProps } from './types';
import styles from './Button.module.css';

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  onClick,
  className,
  ...props
}) => {
  const buttonClass = classNames(
    styles.button,
    styles[variant],
    styles[size],
    {
      [styles.disabled]: disabled,
      [styles.loading]: loading,
    },
    className
  );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;
    onClick?.(e);
  };

  return (
    <button
      className={buttonClass}
      onClick={handleClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className={styles.spinner} />}
      {icon && !loading && <span className={styles.icon}>{icon}</span>}
      <span className={styles.text}>{children}</span>
    </button>
  );
};

export default Button;
```

### [CODE_TEMPLATE] Button组件类型定义
```typescript
// src/components/common/Button/types.ts
export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'link';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}
```

### [CODE_TEMPLATE] Button组件样式
```css
/* src/components/common/Button/Button.module.css */
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  outline: none;
  gap: 8px;
}

.button:focus {
  outline: 2px solid #1890ff;
  outline-offset: 2px;
}

/* Variants */
.primary {
  background-color: #1890ff;
  color: white;
}

.primary:hover:not(.disabled) {
  background-color: #40a9ff;
}

.secondary {
  background-color: #f0f0f0;
  color: #333;
}

.secondary:hover:not(.disabled) {
  background-color: #e6e6e6;
}

.danger {
  background-color: #ff4d4f;
  color: white;
}

.danger:hover:not(.disabled) {
  background-color: #ff7875;
}

.ghost {
  background-color: transparent;
  color: #1890ff;
  border: 1px solid #d9d9d9;
}

.ghost:hover:not(.disabled) {
  color: #40a9ff;
  border-color: #40a9ff;
}

.link {
  background-color: transparent;
  color: #1890ff;
  padding: 0;
  height: auto;
}

.link:hover:not(.disabled) {
  color: #40a9ff;
}

/* Sizes */
.small {
  padding: 4px 8px;
  font-size: 12px;
  height: 24px;
}

.medium {
  padding: 8px 16px;
  font-size: 14px;
  height: 32px;
}

.large {
  padding: 12px 24px;
  font-size: 16px;
  height: 40px;
}

/* States */
.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loading {
  cursor: wait;
}

.spinner {
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.text {
  white-space: nowrap;
}
```

## 🎣 Hooks代码模板

### [CODE_TEMPLATE] useApi Hook
```typescript
// src/hooks/useApi.ts
import { useState, useEffect, useCallback } from 'react';
import { ApiResponse } from '@/types/api';

interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: () => Promise<void>;
  reset: () => void;
}

export const useApi = <T>(
  apiCall: () => Promise<ApiResponse<T>>,
  immediate = true
): UseApiResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();
      if (result.success) {
        setData(result.data);
      } else {
        setError(result.message || '请求失败');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '未知错误');
    } finally {
      setLoading(false);
    }
  }, [apiCall]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { data, loading, error, execute, reset };
};
```

### [CODE_TEMPLATE] useAuth Hook
```typescript
// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { loginSuccess, logout } from '@/store/slices/authSlice';
import { User, LoginCredentials } from '@/types/auth';
import { authService } from '@/services/auth';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user, token } = useAppSelector(state => state.auth);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 检查本地存储的token
    const storedToken = localStorage.getItem('authToken');
    if (storedToken && !token) {
      // 验证token有效性
      validateToken(storedToken);
    }
  }, [token]);

  const validateToken = async (token: string) => {
    try {
      setLoading(true);
      const user = await authService.validateToken(token);
      dispatch(loginSuccess({ user, token }));
    } catch (error) {
      localStorage.removeItem('authToken');
      dispatch(logout());
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      const { user, token } = await authService.login(credentials);
      localStorage.setItem('authToken', token);
      dispatch(loginSuccess({ user, token }));
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : '登录失败' 
      };
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('authToken');
    dispatch(logout());
  };

  return {
    isAuthenticated,
    user,
    token,
    loading,
    login,
    logout: logoutUser,
  };
};
```

### [CODE_TEMPLATE] useLocalStorage Hook
```typescript
// src/hooks/useLocalStorage.ts
import { useState, useCallback, useEffect } from 'react';

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void, () => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error(`Error parsing localStorage value for key "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue, removeValue];
};
```

## 🔧 服务层代码模板

### [CODE_TEMPLATE] API服务基础配置
```typescript
// src/services/api.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiResponse } from '@/types/api';

class ApiService {
  private client: AxiosInstance;
  private refreshTokenPromise: Promise<string> | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // 请求拦截器
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        
        // 添加请求时间戳
        config.metadata = { startTime: new Date() };
        
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        // 计算请求耗时
        const endTime = new Date();
        const duration = endTime.getTime() - response.config.metadata?.startTime?.getTime();
        console.log(`API请求耗时: ${duration}ms`);
        
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          if (!this.refreshTokenPromise) {
            this.refreshTokenPromise = this.refreshToken();
          }

          try {
            const newToken = await this.refreshTokenPromise;
            localStorage.setItem('authToken', newToken);
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return this.client(originalRequest);
          } catch (refreshError) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
            return Promise.reject(refreshError);
          } finally {
            this.refreshTokenPromise = null;
          }
        }

        return Promise.reject(this.handleError(error));
      }
    );
  }

  private async refreshToken(): Promise<string> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await axios.post('/auth/refresh', { refreshToken });
    return response.data.token;
  }

  private handleError(error: any) {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || '请求失败';

      switch (status) {
        case 400:
          return new Error(`请求参数错误: ${message}`);
        case 401:
          return new Error('认证失败，请重新登录');
        case 403:
          return new Error('没有权限访问');
        case 404:
          return new Error('请求的资源不存在');
        case 500:
          return new Error('服务器内部错误');
        default:
          return new Error(`请求失败 (${status}): ${message}`);
      }
    } else if (error.request) {
      return new Error('网络连接失败，请检查网络设置');
    } else {
      return new Error(error.message || '未知错误');
    }
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.get<ApiResponse<T>>(url, config);
    return response.data;
  }

  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.post<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.put<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.delete<ApiResponse<T>>(url, config);
    return response.data;
  }
}

// 扩展axios配置类型
declare module 'axios' {
  interface AxiosRequestConfig {
    metadata?: {
      startTime: Date;
    };
  }
}

export const apiService = new ApiService();
```

### [CODE_TEMPLATE] 用户服务
```typescript
// src/services/user.ts
import { apiService } from './api';
import { User, UserListResponse, CreateUserRequest, UpdateUserRequest } from '@/types/user';

export const userService = {
  // 获取用户列表
  getUsers: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<UserListResponse> => {
    const response = await apiService.get<UserListResponse>('/users', { params });
    return response.data;
  },

  // 获取用户详情
  getUser: async (id: string): Promise<User> => {
    const response = await apiService.get<User>(`/users/${id}`);
    return response.data;
  },

  // 创建用户
  createUser: async (userData: CreateUserRequest): Promise<User> => {
    const response = await apiService.post<User>('/users', userData);
    return response.data;
  },

  // 更新用户
  updateUser: async (id: string, userData: UpdateUserRequest): Promise<User> => {
    const response = await apiService.put<User>(`/users/${id}`, userData);
    return response.data;
  },

  // 删除用户
  deleteUser: async (id: string): Promise<void> => {
    await apiService.delete(`/users/${id}`);
  },

  // 更新用户状态
  updateUserStatus: async (id: string, status: 'active' | 'inactive'): Promise<User> => {
    const response = await apiService.patch<User>(`/users/${id}/status`, { status });
    return response.data;
  },
};
```

## 🏪 状态管理代码模板

### [CODE_TEMPLATE] 认证Slice
```typescript
// src/store/slices/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types/auth';
import { authService } from '@/services/auth';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: localStorage.getItem('authToken'),
  loading: false,
  error: null,
};

// 异步登录action
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      localStorage.setItem('authToken', response.token);
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '登录失败');
    }
  }
);

// 异步登出action
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '登出失败');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = null;
      });
  },
});

export const { loginSuccess, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
```

这些代码模板为AI生成高质量的React应用代码提供了具体的实现参考，确保生成的代码符合企业级开发标准。