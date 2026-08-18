import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadString } from 'firebase/storage';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));
const app = initializeApp(config);
const storage = getStorage(app);
const testRef = ref(storage, 'test.txt');

uploadString(testRef, 'test').then(() => {
  console.log('Storage success');
  process.exit(0);
}).catch(e => {
  console.error('Storage error:', e.message);
  process.exit(1);
});
