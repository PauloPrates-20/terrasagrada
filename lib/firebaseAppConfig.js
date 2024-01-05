import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyB19fga7d-9jEjpRFtr31zsa0RJ9_kQUuU",
  authDomain: "terrasagrada-site.firebaseapp.com",
  projectId: "terrasagrada-site",
  storageBucket: "terrasagrada-site.appspot.com",
  messagingSenderId: "1030118386482",
  appId: "1:1030118386482:web:770ddb2936ed278dfa852b"
};

export const firebaseApp = initializeApp(firebaseConfig);