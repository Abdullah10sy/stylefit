const fs = require('fs');
const html = fs.readFileSync('c:/Users/ABDULLAH/Downloads/final1sty.html', 'utf8');
const cssMatch = html.match(/<style>([\s\S]*?)<\/style>/);
if (cssMatch && cssMatch[1]) {
  let css = cssMatch[1];
  // append tailwind directives
  css = `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n` + css;
  fs.writeFileSync('c:/Users/ABDULLAH/OneDrive/Desktop/New folder (3)/stylefit/src/app/globals.css', css);
  console.log('CSS extracted');
}
