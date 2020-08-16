// function verifyType(val, type) {
//   return Object.prototype.toString.call(val).indexOf(type) != -1;
// }

// function formatStrFunc(key, val) {
//   if (key === "") return val;
//   let color = "";
//   if (verifyType(val, "Object")) {
//     return val;
//   } else if (verifyType(val, "Array")) {
//     return val;
//   } else if (verifyType(val, "String")) {
//     color = "#3d9ca9";
//   } else if (verifyType(val, "Number")) {
//     color = "#cc5200";
//   } else if (verifyType(val, "Boolean")) {
//     color = "#cc5200";
//   } else if (verifyType(val, "Undefined")) {
//     color = "#cc5200";
//   } else if (verifyType(val, "Null")) {
//     color = "#cc5200";
//   }
//   return `<span style='color:${color};'>${val}</span>`;
// }

export function syntaxHighlight(json, option = {}) {
  const { width = "auto", height = "auto", indent = 2 } = option;
  json = JSON.stringify(json, null, indent);
  json = json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  let formatStr = json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    (match) => {
      var cls = "darkorange";
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "red";
        } else {
          cls = "green";
        }
      } else if (/true|false/.test(match)) {
        cls = "blue";
      } else if (/null/.test(match)) {
        cls = "magenta";
      }
      return `<span style="color:${cls};">${match}</span>`;
    }
  );
  const box = `<div style='width:${width};max-height:${height};overflow:auto;'><pre style='font-weight:bold;font-family: none;'>${formatStr}</pre></div>`;
  return box;
}
