import "@testing-library/jest-dom/vitest";

if (!globalThis.matchMedia) {
  globalThis.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener() {},
    removeListener() {},
    addEventListener() {},
    removeEventListener() {},
    dispatchEvent() {
      return false;
    },
  });
}

if (!globalThis.ResizeObserver) {
  // base-ui Tabs registers a ResizeObserver on each tab element; jsdom lacks it.
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

if (!globalThis.DOMRect) {
  globalThis.DOMRect = class {
    x = 0;
    y = 0;
    top = 0;
    left = 0;
    right = 0;
    bottom = 0;
    width = 0;
    height = 0;
    static fromRect(): DOMRect {
      return new this();
    }
    toJSON() {
      return this;
    }
  } as unknown as typeof DOMRect;
}
