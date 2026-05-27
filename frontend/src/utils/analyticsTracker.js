const STORAGE_KEY = "app_analytics";
const MAX_EVENTS = 100;

/* ================= ENV CHECK ================= */

const isBrowser =
  typeof window !== "undefined" &&
  typeof localStorage !== "undefined";

/* ================= SAFE PARSE ================= */

const safeParse = (value) => {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

/* ================= STORAGE HELPERS ================= */

const readEvents = () => {
  if (!isBrowser) return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return safeParse(raw);
  } catch (err) {
    console.warn("⚠️ Failed to read analytics:", err);
    return [];
  }
};

const writeEvents = (events) => {
  if (!isBrowser) return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  } catch (err) {
    console.warn("⚠️ Failed to write analytics:", err);
  }
};

/* ================= ID GENERATOR ================= */

const generateId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

/* ================= TRACK EVENT ================= */

export const trackEvent = (eventName, data = {}) => {
  if (!isBrowser) return;

  const existing = readEvents();

  const newEvent = {
    id: generateId(),
    event: eventName,
    data,
    time: new Date().toISOString(),
  };

  const updated = [...existing, newEvent].slice(-MAX_EVENTS);

  writeEvents(updated);
};

/* ================= GET EVENTS ================= */

export const getEvents = () => readEvents();

/* ================= CLEAR EVENTS ================= */

export const clearEvents = () => {
  if (!isBrowser) return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn("⚠️ Failed to clear analytics:", err);
  }
};