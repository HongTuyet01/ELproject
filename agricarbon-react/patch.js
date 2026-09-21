const fs = require('fs');
let code = fs.readFileSync('src/App.jsx', 'utf8');

// Replace the motion.div wrapper in Layout
code = code.replace(
  /<motion\.div\s+key={location\.pathname}\s+initial={{ opacity: 0, y: 10 }}\s+animate={{ opacity: 1, y: 0 }}\s+exit={{ opacity: 0, y: -10 }}\s+transition={{ duration: 0\.3 }}\s+>\s+{children}\s+<\/motion\.div>/g,
  '{children}'
);

fs.writeFileSync('src/App.jsx', code);
