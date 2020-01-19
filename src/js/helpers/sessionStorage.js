export const getFromSessionStorage = (name) => JSON.parse(sessionStorage.getItem(name));

export const setToSessionStorage = (name, value) => sessionStorage.setItem(name, JSON.stringify(value));

export const removeFromSessionStorage = (name) => sessionStorage.removeItem(name);
