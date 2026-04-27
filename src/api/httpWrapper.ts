export interface CustomRequestInit extends RequestInit {
  // We can add custom options here later if needed
}

function createInterceptor() {
  return async function interceptedFetch<T = any>(
    input: RequestInfo,
    init: CustomRequestInit = {}
  ): Promise<T> {
    const { ...fetchOptions } = init;
    const token = localStorage.getItem('token');

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(fetchOptions.headers as any || {}),
    };

    // PRIORITY LOGIC:
    // 1. Use headers passed directly in the call (e.g., TMDB API Key)
    // 2. If none, use the JWT from localStorage (for our local backend)
    if (!headers['Authorization'] && token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(input, {
      ...fetchOptions,
      headers,
    });

    // Handle session expiration
    if (res.status === 401) {
      localStorage.removeItem('token');
      // Only redirect if we are in a browser context and not already on the login page
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
      throw new Error('Unauthorized');
    }

    if (!res.ok) {
      const message = await res.text();
      throw new Error(`Request failed: ${res.status} - ${message}`);
    }

    return res.json();
  }
}

export const httpWrapper = createInterceptor();
