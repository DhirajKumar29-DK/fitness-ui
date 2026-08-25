const fs = require('fs');
const path = require('path');

const dir = './src/components/home';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

files.forEach(f => {
  const p = path.join(dir, f);
  let content = fs.readFileSync(p, 'utf8');
  content = content.replace(/ease:\s*"([^"]+)"/g, 'ease: "$1" as const');
  fs.writeFileSync(p, content);
});
console.log('Fixed ease types!');
