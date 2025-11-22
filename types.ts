export interface Link {
  code: string;
  originalUrl: string;
  clicks: number;
  createdAt: string; // ISO Date string
  lastClickedAt: string | null; // ISO Date string
}

export interface ApiError {
  message: string;
  field?: string;
}

export interface CreateLinkRequest {
  url: string;
  code?: string;
}

export interface HealthResponse {
  ok: boolean;
  version: string;
  uptime: number;
  timestamp: string;
}
