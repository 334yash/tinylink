import { Link, CreateLinkRequest } from '../types';

const STORAGE_KEY = 'tinylink_db_v1';
const DELAY_MS = 600; // Simulate network latency

// Helper to read DB (SSR Safe)
const getDb = (): Link[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

// Helper to write DB (SSR Safe)
const saveDb = (links: Link[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
};

// Helper to validate URL
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Helper to validate code format [A-Za-z0-9]{6,8}
export const isValidCodeFormat = (code: string): boolean => {
  const regex = /^[A-Za-z0-9]{6,8}$/;
  return regex.test(code);
};

// Generate random code
const generateCode = (length: number = 6): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// --- API Methods ---

export const fetchLinks = async (): Promise<Link[]> => {
  await new Promise(resolve => setTimeout(resolve, DELAY_MS));
  return getDb().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const fetchLinkByCode = async (code: string): Promise<Link | null> => {
  await new Promise(resolve => setTimeout(resolve, DELAY_MS));
  const links = getDb();
  return links.find(l => l.code === code) || null;
};

export const createLink = async (data: CreateLinkRequest): Promise<Link> => {
  await new Promise(resolve => setTimeout(resolve, DELAY_MS));
  const links = getDb();

  // 1. Validate URL
  if (!isValidUrl(data.url)) {
    throw new Error("Invalid URL provided.");
  }

  let code = data.code;

  // 2. Handle Custom Code
  if (code) {
    if (!isValidCodeFormat(code)) {
      throw new Error("Code must be 6-8 alphanumeric characters.");
    }
    if (links.some(l => l.code === code)) {
      throw new Error("Code already in use (409).");
    }
  } else {
    // 3. Generate unique code
    do {
      code = generateCode();
    } while (links.some(l => l.code === code));
  }

  const newLink: Link = {
    code: code!,
    originalUrl: data.url,
    clicks: 0,
    createdAt: new Date().toISOString(),
    lastClickedAt: null,
  };

  links.push(newLink);
  saveDb(links);
  return newLink;
};

export const deleteLink = async (code: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, DELAY_MS));
  const links = getDb();
  const filtered = links.filter(l => l.code !== code);
  saveDb(filtered);
};

// Special method for the Redirector (increments stats)
export const incrementClick = async (code: string): Promise<string | null> => {
  // Latency is lower for redirects usually, but we simulate a db write
  await new Promise(resolve => setTimeout(resolve, 200)); 
  const links = getDb();
  const linkIndex = links.findIndex(l => l.code === code);

  if (linkIndex === -1) return null;

  links[linkIndex].clicks += 1;
  links[linkIndex].lastClickedAt = new Date().toISOString();
  saveDb(links);

  return links[linkIndex].originalUrl;
};