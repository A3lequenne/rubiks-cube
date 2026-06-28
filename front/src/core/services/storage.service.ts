import type { Session } from "../models/Session";

export function getSessions(): Session[] {
  const rawSessions = localStorage.getItem(import.meta.env.VITE_STORAGE_KEY);

  if (!rawSessions)
    return [];
  
  try {
    return JSON.parse(rawSessions);
  }
  catch (e) {
    console.error("Failed to get the previous sessions from localStorage", e);
    return [];
  }
}

export function saveSessions(sessions: Session[]) {
  localStorage.setItem(import.meta.env.VITE_STORAGE_KEY, JSON.stringify(sessions));
}