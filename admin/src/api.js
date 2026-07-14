export const apiUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

export const adminHeaders = () => ({ token: localStorage.getItem('adminToken') || '' })
