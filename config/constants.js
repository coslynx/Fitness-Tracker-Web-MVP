const API_BASE_URL = process.env.NEXTAUTH_URL;

export const AUTH_URL = `${API_BASE_URL}/api/auth`;
export const GOALS_URL = `${API_BASE_URL}/api/goals`;
export const PROGRESS_URL = `${API_BASE_URL}/api/progress`;
export const USERS_URL = `${API_BASE_URL}/api/users`;
export const COMMUNITY_URL = `${API_BASE_URL}/api/community`;
export const WEBHOOK_URL = `${API_BASE_URL}/api/webhooks`;