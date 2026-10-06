/**
 * Master data katering: profil brand, kategori, menu & opsi add-ons
 */
const CATERING_DATA = {
  brand: {
    name: "Pawon Selera Catering",
    tagline: "Katering Lezat, Porsi Pas, Tepat Waktu untuk Kantor & Hajatan",
    whatsapp: "6281298765432",
    address: "Jl. Tebet Raya No. 45, Tebet Timur, Jakarta Selatan 12820"
  },
  categories: [
    { id: "all", label: "Semua Menu" },
    { id: "nasi_box", label: "Nasi Box" },
    { id: "prasmanan", label: "Prasmanan" },
    { id: "snack", label: "Snack Box" }
  ],
  menus: [
    {
      id: "menu-1",
      name: "Nasi Kuning Komplit Selera",
      category: "nasi_box",
      price: 28000,
      min_order: 15,
      description: "Nasi kuning bumbu rempah asli, ayam lengkuas empuk, orek tempe manis gurih, telur balado iris, perkedel kentang lembut, lalapan timun kemangi, dan sambal bajak.",
      image_url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
      addons: [
        { id: "add-1-1", name: "Kerupuk Udang Renyah", price: 2000 },
        { id: "add-1-2", name: "Es Cincau Gula Jawa Segar", price: 4000 },
        { id: "add-1-3", name: "Buah Semangka Potong Dingin", price: 3000 }
      ]
    },
    {
      id: "menu-2",
      name: "Nasi Liwet Gurih Solo",
      category: "nasi_box",
      price: 32000,
      min_order: 15,
      description: "Nasi liwet gurih santan wangi pandan, suwiran ayam opor lembut, sayur labu siam pedas manis, areh santan kental, telur pindang cokelat, dan sambal terasi matang.",
      image_url: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80",
      addons: [
        { id: "add-2-1", name: "Kerupuk Kulit Gurih", price: 2500 },
        { id: "add-2-2", name: "Es Teh Manis Jumbo", price: 3000 },
        { id: "add-2-3", name: "Tahu Bacem Goreng Gurih", price: 2500 }
      ]
    },
    {
      id: "menu-3",
      name: "Bento Ayam Teriyaki Wijaya",
      category: "nasi_box",
      price: 35000,
      min_order: 10,
      description: "Nasi putih pulen, ayam fillet saus teriyaki wijen gurih manis, egg roll goreng renyah, tumis buncis jagung manis, lengkap dengan saus sambal sachet.",
      image_url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80",
      addons: [
        { id: "add-3-1", name: "Puding Mangga Vla Susu", price: 4000 },
        { id: "add-3-2", name: "Ocha Teh Hijau Dingin", price: 4000 },
        { id: "add-3-3", name: "Pangsit Goreng Mini", price: 2000 }
      ]
    },
    {
      id: "menu-4",
      name: "Prasmanan Selera Nusantara",
      category: "prasmanan",
      price: 55000,
      min_order: 30,
      description: "Paket lengkap meja prasmanan: Nasi putih pandan, rendang daging sapi empuk khas Minang, kakap fillet asam manis, sup kimlo ayam bakso, soun goreng kampung, acar kuning, dan kerupuk udang.",
      image_url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80",
      addons: [
        { id: "add-4-1", name: "Es Buah Fiesta Segar", price: 6000 },
        { id: "add-4-2", name: "Puding Cokelat Vla Vanila", price: 5000 },
        { id: "add-4-3", name: "Siomay Kukus Bumbu Kacang", price: 7000 }
      ]
    },
    {
      id: "menu-5",
      name: "Prasmanan Tradisional Joglo",
      category: "prasmanan",
      price: 65000,
      min_order: 30,
      description: "Paket prasmanan pesta: Nasi putih wangi, empal daging serundeng gurih, gurame terbang saus mangga muda, sambal krecek kuah santan pedas, capcay kuah seafood, sup iga sayur bening, dan kerupuk emping.",
      image_url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
      addons: [
        { id: "add-5-1", name: "Es Kopyor Selasih Segar", price: 7000 },
        { id: "add-5-2", name: "Asinan Sayur Khas Betawi", price: 6000 },
        { id: "add-5-3", name: "Kerupuk Emping Ekstra", price: 3000 }
      ]
    },
    {
      id: "menu-6",
      name: "Snack Box Rapat Premium",
      category: "snack",
      price: 18000,
      min_order: 20,
      description: "Kombinasi 3 kue pilihan: Lemper bakar ayam suwir pulen, risoles smoked beef keju mayones, bolu kukus pandan keju, plus air mineral cup 220ml.",
      image_url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
      addons: [
        { id: "add-6-1", name: "Pastel Goreng Renyah", price: 3500 },
        { id: "add-6-2", name: "Jus Jeruk Kotak Segar", price: 4500 }
      ]
    },
    {
      id: "menu-7",
      name: "Snack Box Tradisional Manis Gurih",
      category: "snack",
      price: 15000,
      min_order: 20,
      description: "Arem-arem ayam wortel gurih, pie buah segar vla vanila manis, kue lumpur kentang kismis lembut, plus air mineral cup 220ml.",
      image_url: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80",
      addons: [
        { id: "add-7-1", name: "Sosis Solo Ayam Lembut", price: 3500 },
        { id: "add-7-2", name: "Teh Kotak Melati Dingin", price: 4000 }
      ]
    }
  ]
};

if (typeof window !== 'undefined') {
  window.CATERING_DATA = CATERING_DATA;
}

