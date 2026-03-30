## 2024-03-23 - [Critical] Hardcoded Admin Auth Bypass
**Vulnerability:** A backdoor existed where passing a shared `x-admin-password` header (matching `VITE_ADMIN_PASSWORD`) completely bypassed JWT authentication and granted the request an `admin` role. The `VITE_ADMIN_PASSWORD` was exposed to the frontend in `import.meta.env`.
**Learning:** Hardcoding credentials, especially ones bundled into client-side code via Vite environment variables, provides trivial authentication bypass for anyone who inspects the client bundle.
**Prevention:** Never use static, shared passwords for authorization bypasses in middleware. Always rely on secure, signed tokens (like JWT) tied to authenticated database user sessions.
