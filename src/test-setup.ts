import "@testing-library/jest-dom/vitest";

// Node 22+ ships an experimental built-in `localStorage` (vitest 4 turns it on
// via `--localstorage-file`). Without a valid backing file it shadows jsdom's
// Storage and exposes a broken object whose `clear()` isn't callable, which
// breaks any test that resets storage (e.g. ThemeToggle). Install a clean,
// fully-functional in-memory Storage so tests get isolated localStorage /
// sessionStorage regardless of the Node version.
function createMemoryStorage(): Storage {
  let store = new Map<string, string>();
  return {
    get length() {
      return store.size;
    },
    clear() {
      store = new Map();
    },
    getItem(key: string) {
      return store.has(key) ? store.get(key)! : null;
    },
    key(index: number) {
      return [...store.keys()][index] ?? null;
    },
    removeItem(key: string) {
      store.delete(key);
    },
    setItem(key: string, value: string) {
      store.set(key, String(value));
    },
  } as Storage;
}

for (const prop of ["localStorage", "sessionStorage"] as const) {
  const storage = createMemoryStorage();
  const descriptor = { value: storage, writable: true, configurable: true };
  Object.defineProperty(globalThis, prop, descriptor);
  if (typeof window !== "undefined") {
    Object.defineProperty(window, prop, descriptor);
  }
}
