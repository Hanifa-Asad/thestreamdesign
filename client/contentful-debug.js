const fs = require('fs');
const path = require('path');
const envPath = path.resolve(__dirname, '.env');
const envRaw = fs.readFileSync(envPath, 'utf8');
const env = envRaw.split(/\r?\n/).reduce((acc, line) => {
  const m = line.match(/^(\w+)=(.*)$/);
  if (m) acc[m[1]] = m[2];
  return acc;
}, {});

const spaceId = env.VITE_CONTENTFUL_SPACE_ID;
const accessToken = env.VITE_CONTENTFUL_ACCESS_TOKEN;
const environment = env.VITE_CONTENTFUL_ENVIRONMENT || 'master';
const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environment}/entries?content_type=blogPost&limit=1&include=2`;

(async () => {
  const res = await fetch(`${url}&access_token=${accessToken}`);
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
})();
