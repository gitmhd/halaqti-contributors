// indexedDBQuranUtils.ts

// ─── Data Structures ─────────────────────────────────────────────────────────

/**
 * Represents a single Ayah (verse) in the Quran.
 */
export interface Ayah {
  number: number;
  numberInSurah: number;
  text: string;
  [key: string]: unknown;
}

/**
 * Represents a Surah (chapter) in the Quran.
 */
export interface Surah {
  id: number;
  name: string;
  englishName?: string;
  englishNameTranslation?: string;
  numberOfAyahs?: number;
  revelationType?: string;
  ayahs: Ayah[];
  [key: string]: unknown;
}

/**
 * Represents the full Quran dataset.
 */
export interface QuranData {
  surahs: Surah[];
  [key: string]: unknown;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const DB_NAME = 'HalaqtiQuranDB';
const DB_VERSION = 1;
const STORE_SURAHS = 'surahs';

// ─── Internal State ───────────────────────────────────────────────────────────

let db: IDBDatabase | null = null;

// ─── Internal Helper ──────────────────────────────────────────────────────────

/**
 * Returns the active DB instance or throws if not initialized.
 */
function getDB(): IDBDatabase {
  if (!db) {
    throw new Error(
      'IndexedDB is not initialized. Call initializeDB() before any other operation.'
    );
  }
  return db;
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Initializes the IndexedDB database and creates required object stores.
 * Must be called before any other function in this module.
 *
 * @returns A promise that resolves when the DB is ready.
 */
export function initializeDB(): Promise<void> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const database = (event.target as IDBOpenDBRequest).result;
      if (!database.objectStoreNames.contains(STORE_SURAHS)) {
        database.createObjectStore(STORE_SURAHS, { keyPath: 'id' });
      }
    };

    request.onsuccess = (event: Event) => {
      db = (event.target as IDBOpenDBRequest).result;
      resolve();
    };

    request.onerror = (event: Event) => {
      reject(
        new Error(
          `Failed to open IndexedDB: ${(event.target as IDBOpenDBRequest).error?.message}`
        )
      );
    };
  });
}

/**
 * Stores the full Quran data in IndexedDB.
 * Overwrites any existing data.
 *
 * @param quranData - The full Quran dataset containing all surahs and ayahs.
 * @returns A promise that resolves when all data is saved.
 */
export function saveQuranData(quranData: QuranData): Promise<void> {
  return new Promise((resolve, reject) => {
    const database = getDB();
    const tx = database.transaction(STORE_SURAHS, 'readwrite');
    const store = tx.objectStore(STORE_SURAHS);

    for (const surah of quranData.surahs) {
      store.put(surah);
    }

    tx.oncomplete = () => resolve();
    tx.onerror = () =>
      reject(new Error(`Failed to save Quran data: ${tx.error?.message}`));
  });
}

/**
 * Retrieves a Surah by its number.
 *
 * If `apiUrl` is provided, fetches the surah from the given URL,
 * caches it in IndexedDB, and returns it.
 * If `apiUrl` is not provided, retrieves the surah from IndexedDB.
 *
 * @param surahNumber - The surah number (1–114).
 * @param apiUrl - Optional API URL to fetch the surah from remotely.
 * @returns A promise resolving to the Surah or null if not found.
 */
export async function getSurah(
  surahNumber: number,
  apiUrl?: string
): Promise<Surah | null> {
  if (apiUrl) {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch surah ${surahNumber} from API: ${response.status} ${response.statusText}`
      );
    }
    const surah: Surah = await response.json();
    await saveQuranData({ surahs: [surah] });
    return surah;
  }

  return new Promise((resolve, reject) => {
    const tx = getDB().transaction(STORE_SURAHS, 'readonly');
    const request = tx.objectStore(STORE_SURAHS).get(surahNumber);

    request.onsuccess = () => resolve((request.result as Surah) ?? null);
    request.onerror = () =>
      reject(new Error(`Failed to get surah ${surahNumber}: ${request.error?.message}`));
  });
}

/**
 * Retrieves a specific Ayah by surah number and ayah number within the surah.
 *
 * @param surahNumber - The surah number (1–114).
 * @param ayahNumber - The ayah number within the surah (1-based).
 * @returns A promise resolving to the Ayah or null if not found.
 */
export async function getAyah(
  surahNumber: number,
  ayahNumber: number
): Promise<Ayah | null> {
  const surah = await getSurah(surahNumber);
  if (!surah) return null;
  return surah.ayahs.find((ayah) => ayah.numberInSurah === ayahNumber) ?? null;
}

/**
 * Retrieves all surahs from IndexedDB.
 *
 * @returns A promise resolving to an array of all Surahs.
 */
export function getAllSurahs(): Promise<Surah[]> {
  return new Promise((resolve, reject) => {
    const tx = getDB().transaction(STORE_SURAHS, 'readonly');
    const request = tx.objectStore(STORE_SURAHS).getAll();

    request.onsuccess = () => resolve(request.result as Surah[]);
    request.onerror = () =>
      reject(new Error(`Failed to get all surahs: ${request.error?.message}`));
  });
}

/**
 * Checks whether Quran data is already stored in IndexedDB.
 *
 * @returns A promise resolving to true if data exists, false otherwise.
 */
export function isQuranDataAvailable(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const tx = getDB().transaction(STORE_SURAHS, 'readonly');
    const request = tx.objectStore(STORE_SURAHS).count();

    request.onsuccess = () => resolve(request.result > 0);
    request.onerror = () =>
      reject(new Error(`Failed to check data availability: ${request.error?.message}`));
  });
}

/**
 * Removes all Quranic data from IndexedDB.
 *
 * @returns A promise that resolves when all data has been cleared.
 */
export function clearQuranData(): Promise<void> {
  return new Promise((resolve, reject) => {
    const tx = getDB().transaction(STORE_SURAHS, 'readwrite');
    const request = tx.objectStore(STORE_SURAHS).clear();

    request.onsuccess = () => resolve();
    request.onerror = () =>
      reject(new Error(`Failed to clear Quran data: ${request.error?.message}`));
  });
}
