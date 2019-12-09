import Cookies from "js-cookie";
import { setContext } from "svelte";

export const initializedContext = function() {
  const context = {
    apiUrl: "https://api.plateformeco2.ch", // http://localhost:1337
    jwtToken: "",
  };

  if (Cookies.get("user") && Cookies.get("jwt")) {
    context.jwtToken = Cookies.get("jwt");
  }

  setContext("context", context);
};
