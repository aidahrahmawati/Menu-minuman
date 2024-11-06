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

export async function ambilDaftarBarbershop() {
  const refDokumen = collection(db, "barbershop");
  const kueri = query(refDokumen, orderBy("menu"));
  const cuplikanKueri = await getDocs(kueri);

  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      menu: dok.data().menu,
      harga: dok.data().harga,
      keluar: dok.data().keluar,
    });
  });
  
  return hasil;
}

export function formatAngka(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export async function tambahBarbershop(menu, harga, keluar) {
  try {
    const dokRef = await addDoc(collection(db, 'barbershop'), {
      menu: menu,
      harga: harga,
      keluar: keluar 
    });
    console.log('Berhasil menambah barbershop ' + dokRef.id);
  } catch (e) {
    console.log('Gagal menambah barbershop ' + e);
  }
}

export async function hapusBarbershop(docId) {
  await deleteDoc(doc(db, "barbershop", docId));
}  

export async function ubahBarbershop(docId, nama, harga, stok) {
  await updateDoc(doc(db, "barbershop", docId), {
    menu: menu,
    harga: harga,
    keluar: keluar 
  });
}

export async function ambilBarbershop(docId) {
  const docRef = await doc(db, "barbershop", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}
