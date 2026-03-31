## 2024-05-14 - Removed hardcoded admin password from client

**Vulnerability:** The admin password was hardcoded into the client-side JavaScript bundle via `import.meta.env.VITE_ADMIN_PASSWORD` in `client/src/api.js` and `client/src/pages/AdminLogin.jsx`. This exposed the password to all visitors, allowing them to bypass the authentication mechanism by passing the `x-admin-password` header.

**Learning:** Secrets should never be exposed in the client-side JavaScript bundle. Any environmental variables prefixed with `VITE_` are exposed to the client.

**Prevention:** Ensure that sensitive information, such as passwords, API keys, and other secrets, are never exposed to the client. Use a secure backend to handle authentication and authorization, and only expose necessary information to the client. Backdoor authentication mechanisms should be removed in favor of standard authentication and role-based access control.