"use strict";
/**
 * Distributed with Ultraviolet and compatible with most configurations.
 */
const stockSW = "/purple/sw.js";

/**
 * List of hostnames that are allowed to run serviceworkers on http://
 */
const swAllowedHostnames = ["localhost", "127.0.0.1"];

/**
 * Wisp server used to fetch proxied pages.
 * Static hosts like Netlify can't run the Wisp WebSocket server, so point this
 * at an external one, e.g. "wss://your-wisp-server.example.com/wisp/".
 * Leave empty to use /wisp/ on the current host (works with `npm start`).
 */
const wispServer = "";

/**
 * Global util
 * Used in 404.html and index.html
 */
async function registerSW() {
  if (!navigator.serviceWorker) {
    if (
      location.protocol !== "https:" &&
      !swAllowedHostnames.includes(location.hostname)
    )
      throw new Error("Service workers cannot be registered without https.");

    throw new Error("Your browser doesn't support service workers.");
  }

  await navigator.serviceWorker.register(stockSW, {
    scope: __uv$config.prefix,
  });

  // Register the EpoxyClient transport to be used for network requests
  let wispUrl =
    wispServer ||
    (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/wisp/";
  BareMux.SetTransport("EpxMod.EpoxyClient", { wisp: wispUrl });
}
