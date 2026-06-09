/**
 * Updates the recently viewed products in localStorage.
 *
 * Storage shape: Array<{ id: string|number, handle: string, title?: string }>.
 * Legacy entries (bare IDs from prior theme versions) are coerced on read and
 * dropped if they lack a handle.
 */
export class RecentlyViewed {
  /** @static @constant {string} The key used to store the viewed products in local storage */
  static #STORAGE_KEY = 'viewedProducts';
  /** @static @constant {number} The maximum number of products to store */
  static #MAX_PRODUCTS = 8;

  /**
   * Adds a product to the recently viewed products list.
   * @param {{id: string|number, handle: string, title?: string} | string} product
   *   Either a product entry or a bare id (legacy callers).
   */
  static addProduct(product) {
    const entry = this.#normalizeInput(product);
    if (!entry || !entry.handle) return;

    let viewedProducts = this.getProducts();
    viewedProducts = viewedProducts.filter((p) => String(p.id) !== String(entry.id));
    viewedProducts.unshift(entry);
    viewedProducts = viewedProducts.slice(0, this.#MAX_PRODUCTS);

    try {
      localStorage.setItem(this.#STORAGE_KEY, JSON.stringify(viewedProducts));
    } catch (_) {
      /* localStorage may be unavailable (private mode, quota) — fail silently */
    }
  }

  static clearProducts() {
    try {
      localStorage.removeItem(this.#STORAGE_KEY);
    } catch (_) {
      /* noop */
    }
  }

  /**
   * Retrieves the list of recently viewed products from local storage.
   * @returns {Array<{id: string|number, handle: string, title?: string}>}
   */
  static getProducts() {
    let raw = '[]';
    try {
      raw = localStorage.getItem(this.#STORAGE_KEY) || '[]';
    } catch (_) {
      return [];
    }
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (_) {
      return [];
    }
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((p) => this.#normalizeInput(p))
      .filter((p) => p && p.handle);
  }

  static #normalizeInput(value) {
    if (!value) return null;
    if (typeof value === 'string' || typeof value === 'number') {
      return { id: value, handle: null };
    }
    if (typeof value === 'object') {
      return {
        id: value.id ?? null,
        handle: value.handle ?? null,
        title: value.title ?? undefined,
      };
    }
    return null;
  }
}
