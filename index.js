const path = require("path");
const child_process = require("child_process");
const child = child_process.spawn("pkexec", [
  "node",
  `${path.join(__dirname, "sniffer.js")}`,
]);

child.stdout.setEncoding("utf8");
let stdout = "";
let stderr = "";

child.stdout.on("data", (data) => {
  console.log("data", data.toString());
  stdout += data.toString();
});
child.stderr.on("data", (data) => {
  console.error("data", data.toString());
  stderr += data.toString();
});

child.on("close", () => {
  console.log(stdout, stderr);
});
