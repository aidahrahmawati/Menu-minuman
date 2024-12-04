import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBNYqYJVYPTZRIK7pKZ4shbQ4igjseQpLM",
  authDomain: "insan-cemerlang-d724d.firebaseapp.com",
  projectId: "insan-cemerlang-d724d",
  storageBucket: "insan-cemerlang-d724d.appspot.com",
  messagingSenderId: "630693962922",
  appId: "1:630693962922:web:a9447f760b858bcf781cd3"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambilDaftarBarista() {
  const refDokumen = collection(db, "barista");
  const kueri = query(refDokumen, orderBy("menu"));
  const cuplikanKueri = await getDocs(kueri);

  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      menu: dok.data().menu,
      harga: dok.data().harga,
      orderan: dok.data().orderan
    });
  });
  
  return hasil;
}

export function formatAngka(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export async function tambahBarista(menu, harga, orderan) {
  try {
    const dokRef = await addDoc(collection(db, 'barista'), {
      menu: menu,
      harga: harga,
      orderan: orderan 
    });
    console.log('Berhasil menambah barista ' + dokRef.id);
  } catch (e) {
    console.log('Gagal menambah barista ' + e);
  }
}

export async function hapusBarista(docId) {
  await deleteDoc(doc(db, "barista", docId));
}  

export async function ubahBarista(docId, menu, harga, orderan) {
  await updateDoc(doc(db, "barista", docId), {
    menu: menu,
    harga: harga,
    orderan: orderan
  });
}

export async function ambilBarista(docId) {
  const docRef = await doc(db, "barista", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}
