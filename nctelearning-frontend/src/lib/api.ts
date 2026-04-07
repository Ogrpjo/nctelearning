export const apiBaseUrl = process.env.API_URL || "http://103.252.137.178:2030";

export const apiUrl = (path: string): string => {
	console.log(process.env.API_URL);
	const base = apiBaseUrl.replace(/\/$/, '');
	const suffix = path.startsWith('/') ? path : `/${path}`;
	return `${base}${suffix}`;
};

export const withAuthHeaders = (headers: Record<string, string> = {}): Record<string, string> => {
	const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
	return token ? { ...headers, Authorization: `Bearer ${token}` } : headers;
};




