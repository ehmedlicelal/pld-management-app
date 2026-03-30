## 2024-05-18 - [CRITICAL] Removed Hardcoded Admin Password Backdoor

**Vulnerability:** The application had a severe backdoor vulnerability where the `server/utils/authMiddleware.js` allowed any request to bypass JWT authentication and gain administrative privileges simply by providing an `x-admin-password` header. Compounding this issue, the client-side code (`client/src/api.js`) hardcoded this secret via `import.meta.env.VITE_ADMIN_PASSWORD` in the interceptor, which exposed the raw password directly in the compiled frontend bundle.

**Learning:** It is extremely dangerous to rely on static password headers to bypass standard JWT or session-based authentication mechanisms. Moreover, injecting backend secrets into a frontend build (using tools like Vite) inevitably leaks those secrets to all end users via the browser, violating the fundamental principle of not trusting the client.

**Prevention:** Ensure that all protected routes solely rely on a robust identity provider or secure tokens (e.g., JWT). Never use simple string comparison for authentication bypasses. Furthermore, avoid placing sensitive credentials (such as an admin password) in client-side environment variables (`VITE_*`), as the build tools will embed them into the publicly served static files.
