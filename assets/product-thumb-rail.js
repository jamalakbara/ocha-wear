/**
 * Sticky thumbnail rail for the PDP.
 * - Click thumb → smooth-scroll matching gallery slide into view.
 * - IntersectionObserver highlights the thumb of the slide most visible.
 */
class ProductThumbRail extends HTMLElement {
  #observer = null;
  #slides = [];

  connectedCallback() {
    this.addEventListener('click', this.#onClick);
    queueMicrotask(() => this.#setupObserver());
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.#onClick);
    this.#observer?.disconnect();
  }

  #onClick = (event) => {
    const button = event.target.closest('[data-target-media-id]');
    if (!button) return;
    const mediaId = button.getAttribute('data-target-media-id');
    const slide = this.#findSlide(mediaId);
    if (!slide) return;
    event.preventDefault();
    slide.scrollIntoView({ behavior: 'smooth', block: 'center' });
    this.#setActive(mediaId);
  };

  #findSlide(mediaId) {
    const sectionId = this.dataset.sectionId;
    if (sectionId) {
      const section = document.getElementById(`shopify-section-${sectionId}`) || document;
      const scoped = section.querySelector(`.product-media[data-media-id="${mediaId}"]`);
      if (scoped) return scoped;
    }
    return document.querySelector(`.product-media[data-media-id="${mediaId}"]`);
  }

  #setupObserver() {
    const buttons = Array.from(this.querySelectorAll('[data-target-media-id]'));
    this.#slides = buttons
      .map((btn) => this.#findSlide(btn.getAttribute('data-target-media-id')))
      .filter(Boolean);

    if (!('IntersectionObserver' in window) || this.#slides.length === 0) return;

    this.#observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const mediaId = visible.target.getAttribute('data-media-id');
        this.#setActive(mediaId);
      },
      { threshold: [0.5, 0.75], rootMargin: '-20% 0px -20% 0px' }
    );

    this.#slides.forEach((slide) => this.#observer.observe(slide));
  }

  #setActive(mediaId) {
    this.querySelectorAll('[data-target-media-id]').forEach((btn) => {
      const isActive = btn.getAttribute('data-target-media-id') === String(mediaId);
      btn.classList.toggle('is-active', isActive);
      if (isActive) {
        btn.setAttribute('aria-current', 'true');
      } else {
        btn.removeAttribute('aria-current');
      }
    });
  }
}

if (!customElements.get('product-thumb-rail')) {
  customElements.define('product-thumb-rail', ProductThumbRail);
}
