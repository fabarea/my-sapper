import { writable } from "svelte/store";
import Cookies from "js-cookie";

let user = null;
if (Cookies.get("user") && Cookies.get("jwt")) {
  user = JSON.parse(Cookies.get("user"));
}

export const userStore = writable(user);
