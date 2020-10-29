//@ts-ignore
const localStorageMock = () => {
  let store = {};
  return {
    //@ts-ignore
    getItem: jest.fn((key) => store[key]),
    setItem: jest.fn((key, value) => {
      //@ts-ignore
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    removeItem: jest.fn((key) => {
      //@ts-ignore
      delete store[key];
    }),
  };
};

//@ts-ignore
global.localStorage = localStorageMock();
