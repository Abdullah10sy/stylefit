const fs = require('fs');
const files = ['Login.tsx', 'Dashboard.tsx', 'Results.tsx', 'Payment.tsx', 'Chat.tsx'];
for (let file of files) {
  let path = 'c:/Users/ABDULLAH/OneDrive/Desktop/New folder (3)/stylefit/src/components/' + file;
  if (fs.existsSync(path)) {
    let code = fs.readFileSync(path, 'utf8');
    let fixed = code.replace(/\\`/g, '`');
    // Also fix any escaped dollars if any
    fixed = fixed.replace(/\\\$/g, '$');
    fs.writeFileSync(path, fixed);
  }
}
console.log('Fixed backticks');
