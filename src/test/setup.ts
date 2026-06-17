import '@testing-library/jest-dom';

// jsdom does not implement window.matchMedia; provide a global stub so
// components that call useReducedMotion() work in all test files without
// each needing its own beforeEach mock.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }),
});
