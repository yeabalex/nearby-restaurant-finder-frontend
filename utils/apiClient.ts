import axios, { 
    AxiosInstance, 
    AxiosResponse, 
    AxiosRequestConfig,
    AxiosResponseHeaders,
    RawAxiosResponseHeaders 
  } from 'axios';
  
  export class GraphQLClient {
    private client: AxiosInstance;
    baseURL: string;
    private authToken?: string;
  
    constructor(baseURL: string) {
      this.baseURL = baseURL;
      this.client = axios.create({
        baseURL,
        timeout: 200000,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  
    public setAuthToken(token: string): void {
      this.authToken = token;
    }
  
    public clearAuthToken(): void {
      this.authToken = undefined;
    }
  
    public async query<T>(
      query: string,
      variables?: Record<string, unknown>,
      config: RequestConfig = {}
    ): Promise<GraphQLResponse<T>> {
      return this.request<T>({
        query,
        variables,
        ...config
      });
    }
  
  
    private async request<T>(config: GraphQLRequestConfig): Promise<GraphQLResponse<T>> {
      try {
        const requestHeaders: Record<string, string> = {
          'Content-Type': 'application/json',
          ...config.headers as Record<string, string>
        };
  
        if (config.requiresAuth && this.authToken) {
          requestHeaders.Authorization = `Bearer ${this.authToken}`;
        }
  
        const response = await this.client.post<{ data?: T; errors?: GraphQLError[] }>('', {
          query: config.query,
          variables: config.variables,
        }, {
          ...config,
          headers: requestHeaders,
        });
  
        return this.handleSuccess(response);
      } catch (error) {
        throw this.handleError(error as GraphQLErrorResponse);
      }
    }
  
    private handleSuccess<T>(response: AxiosResponse<{ data?: T; errors?: GraphQLError[] }>): GraphQLResponse<T> {
      if (response.data.errors?.length) {
        throw new Error(response.data.errors[0].message);
      }
  
      return {
        data: response.data.data,
        errors: response.data.errors,
        // extensions: response.data.extensions,
        status: response.status,
        headers: this.normalizeHeaders(response.headers)
      };
    }
  
    private normalizeHeaders(headers: RawAxiosResponseHeaders | AxiosResponseHeaders): Record<string, string> {
      const normalizedHeaders: Record<string, string> = {};
      Object.entries(headers).forEach(([key, value]) => {
        if (typeof value === 'string') {
          normalizedHeaders[key] = value;
        } else if (Array.isArray(value)) {
          normalizedHeaders[key] = value.join(', ');
        }
      });
      return normalizedHeaders;
    }
  
    private handleError(error: GraphQLErrorResponse): Error {
      const status = error.response?.status;
      const message = error.response?.data?.errors?.[0]?.message || error.message;
  
      switch (status) {
        case 401:
          throw new Error('Unauthorized. Please check your authentication.');
        case 403:
          throw new Error('Forbidden. You do not have access to this resource.');
        case 404:
          throw new Error('GraphQL endpoint not found.');
        case 500:
          throw new Error('Internal server error. Please try again later.');
        default:
          throw new Error(message || 'An unexpected error occurred.');
      }
    }
  }
  
  
  interface GraphQLError {
    message: string;
    locations?: Array<{
      line: number;
      column: number;
    }>;
    path?: string[];
    extensions?: Record<string, unknown>;
  }
  
  interface GraphQLResponse<T> {
    data?: T;
    errors?: GraphQLError[];
    extensions?: Record<string, unknown>;
    status: number;
    headers: Record<string, string>;
  }
  
  interface RequestConfig extends Omit<AxiosRequestConfig, 'headers'> {
    requiresAuth?: boolean;
    headers?: Record<string, string>;
  }
  
  interface GraphQLRequestConfig extends RequestConfig {
    query?: string;
    variables?: Record<string, unknown>;
  }
  
  interface GraphQLErrorResponse {
    response?: {
      status: number;
      data?: {
        errors?: GraphQLError[];
      };
    };
    message: string;
  }