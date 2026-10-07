// Bundles the static frontend into dist/ for hosts that can't run the Express server.
// Mirrors the static routes in src/index.js: public/ takes priority over vendor files.
import { cpSync, rmSync } from "node:fs";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import { epoxyPath } from "@mercuryworkshop/epoxy-transport";
import { baremuxPath } from "@mercuryworkshop/bare-mux";

const out = "dist";
rmSync(out, { recursive: true, force: true });
cpSync(uvPath, `${out}/purple`, { recursive: true });
cpSync(epoxyPath, `${out}/epoxy`, { recursive: true });
cpSync(baremuxPath, `${out}/baremux`, { recursive: true });
cpSync("public", out, { recursive: true });
console.log(`Static frontend written to ${out}/`);
