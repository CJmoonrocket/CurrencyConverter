export function setCookie(key, value, duration) {
    document.cookie = `${key}=${value}; max-age=${duration}`
}
  
  export const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};