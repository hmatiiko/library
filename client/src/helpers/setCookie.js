import Cookies from "js-cookie";

export function setCookie(key, value) {
  const inOneHour = new Date(new Date().getTime() + 60 * 60 * 1000);
  Cookies.set("token", value, { expires: inOneHour });
}
