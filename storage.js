// Local storage wrapper (swap with Firebase Firestore for production)

const ENTRIES_KEY = 'mindmap_entries';
const USER_KEY = 'mindmap_user';

export function getUser() {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function setUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearUser() {
  localStorage.removeItem(USER_KEY);
}

export function getEntries() {
  const raw = localStorage.getItem(ENTRIES_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveEntry(entry) {
  const entries = getEntries();
  const existing = entries.findIndex(e => e.id === entry.id);
  if (existing >= 0) {
    entries[existing] = entry;
  } else {
    entries.unshift(entry);
  }
  localStorage.setItem(ENTRIES_KEY, JSON.stringify(entries));
  return entry;
}

export function deleteEntry(id) {
  const entries = getEntries().filter(e => e.id !== id);
  localStorage.setItem(ENTRIES_KEY, JSON.stringify(entries));
}

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}
