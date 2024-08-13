import '#app';

declare module '#app' {
  interface NuxtApp {
    $toast: {
      show(message: string, options?: any, type?: string): void;
      error(message: string, options?: any): void;
      success(message: string, options?: any): void;
      warning(message: string, options?: any): void;
      auto(message: string, value: boolean): void;
    }
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $toast: {
      show(message: string, options?: any, type?: string): void;
      error(message: string, options?: any): void;
      success(message: string, options?: any): void;
      warning(message: string, options?: any): void;
      auto(message: string, value: boolean): void;
    }
  }
}
