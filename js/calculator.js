/**
 * State & Logika Kalkulator Pesanan Katering Pawon Selera
 */

// Shared application state
window.currentSelectedCategory = 'all';
window.currentSelectedMenuId = CATERING_DATA.menus[0].id;
window.currentPax = 25;
window.selectedAddonIds = new Set();

/**
 * Format angka ke format Rupiah (contoh: Rp 28.000)
 */
function formatRupiah(amount) {
  return 'Rp ' + Number(amount).toLocaleString('id-ID');
}

/**
 * Render opsi add-ons untuk menu terpilih
 */
function renderAddons() {
  const container = document.getElementById('addons-container');
  if (!container) return;

  const currentMenu = CATERING_DATA.menus.find(m => m.id === window.currentSelectedMenuId);
  if (!currentMenu || !currentMenu.addons || currentMenu.addons.length === 0) {
    container.innerHTML = '<p class="text-xs text-culinary-muted italic">Paket ini sudah lengkap, tidak memerlukan add-ons khusus.</p>';
    return;
  }

  container.innerHTML = currentMenu.addons.map(addon => {
    const isChecked = window.selectedAddonIds.has(addon.id);
    return `
      <label class="flex items-center justify-between p-3 rounded-xl border ${isChecked ? 'border-brand-700 bg-brand-50/50' : 'border-culinary-border bg-white'} hover:bg-stone-50 cursor-pointer transition-colors touch-target">
        <div class="flex items-center gap-3">
          <input 
            type="checkbox" 
            value="${addon.id}" 
            ${isChecked ? 'checked' : ''}
            onchange="toggleAddon('${addon.id}')"
            class="w-4 h-4 rounded text-brand-700 focus:ring-brand-700 border-culinary-border"
          />
          <span class="text-sm font-medium text-culinary-dark">${addon.name}</span>
        </div>
        <span class="text-xs font-bold text-brand-800">+${formatRupiah(addon.price)} / pax</span>
      </label>
    `;
  }).join('');
}

/**
 * Toggle checklist add-on dan hitung ulang
 */
function toggleAddon(addonId) {
  if (window.selectedAddonIds.has(addonId)) {
    window.selectedAddonIds.delete(addonId);
  } else {
    window.selectedAddonIds.add(addonId);
  }
  renderAddons();
  recalculate();
}

/**
 * Hitung ulang total biaya katering & perbarui antarmuka ringkasan
 */
function recalculate() {
  const currentMenu = CATERING_DATA.menus.find(m => m.id === window.currentSelectedMenuId) || CATERING_DATA.menus[0];
  const paxInput = document.getElementById('input-pax');
  const errorMsg = document.getElementById('pax-error-msg');
  const badgeMinOrder = document.getElementById('badge-min-order');
  const hintText = document.getElementById('menu-hint-text');

  if (paxInput) {
    paxInput.min = currentMenu.min_order;
  }
  if (badgeMinOrder) {
    badgeMinOrder.textContent = `Minimal ${currentMenu.min_order} pax`;
  }
  if (hintText) {
    hintText.textContent = `${currentMenu.description}`;
  }

  let pax = parseInt(paxInput ? paxInput.value : window.currentPax, 10);
  if (isNaN(pax) || pax <= 0) {
    pax = currentMenu.min_order;
  }

  if (pax < currentMenu.min_order) {
    if (errorMsg) {
      errorMsg.classList.remove('hidden');
      errorMsg.querySelector('span').textContent = `Minimum pemesanan untuk paket ini adalah ${currentMenu.min_order} pax.`;
    }
  } else {
    if (errorMsg) errorMsg.classList.add('hidden');
  }

  window.currentPax = pax;

  const menuSubtotal = currentMenu.price * pax;
  let totalAddonsPerPax = 0;
  const addonsBreakdownEl = document.getElementById('summary-addons-list');
  let addonsHtml = '';

  if (currentMenu.addons && currentMenu.addons.length > 0) {
    currentMenu.addons.forEach(addon => {
      if (window.selectedAddonIds.has(addon.id)) {
        totalAddonsPerPax += addon.price;
        const addonSubtotal = addon.price * pax;
        addonsHtml += `
          <div class="flex items-center justify-between text-culinary-muted">
            <span>+ ${addon.name} (${pax} x ${formatRupiah(addon.price)})</span>
            <span class="font-medium text-culinary-dark">${formatRupiah(addonSubtotal)}</span>
          </div>
        `;
      }
    });
  }

  if (addonsBreakdownEl) {
    addonsBreakdownEl.innerHTML = addonsHtml || '<div class="text-culinary-muted italic">Tidak ada add-ons dipilih</div>';
  }

  const totalAddonsSubtotal = totalAddonsPerPax * pax;
  const perPaxTotal = currentMenu.price + totalAddonsPerPax;
  const grandTotal = menuSubtotal + totalAddonsSubtotal;

  const summaryPaxBadge = document.getElementById('summary-pax-badge');
  const summaryMenuName = document.getElementById('summary-menu-name');
  const summaryMenuUnitPrice = document.getElementById('summary-menu-unit-price');
  const summaryMenuSubtotal = document.getElementById('summary-menu-subtotal');
  const summaryPerPaxTotal = document.getElementById('summary-per-pax-total');
  const summaryGrandTotal = document.getElementById('summary-grand-total');

  if (summaryPaxBadge) summaryPaxBadge.textContent = `${pax} Pax`;
  if (summaryMenuName) summaryMenuName.textContent = currentMenu.name;
  if (summaryMenuUnitPrice) summaryMenuUnitPrice.textContent = `${pax} x ${formatRupiah(currentMenu.price)}`;
  if (summaryMenuSubtotal) summaryMenuSubtotal.textContent = formatRupiah(menuSubtotal);
  if (summaryPerPaxTotal) summaryPerPaxTotal.textContent = `${formatRupiah(perPaxTotal)} / pax`;
  if (summaryGrandTotal) summaryGrandTotal.textContent = formatRupiah(grandTotal);

  const mobileTotalPrice = document.getElementById('mobile-total-price');
  const mobilePaxInfo = document.getElementById('mobile-pax-info');
  if (mobileTotalPrice) mobileTotalPrice.textContent = formatRupiah(grandTotal);
  if (mobilePaxInfo) mobilePaxInfo.textContent = `${pax} Pax - ${currentMenu.name.split(' ')[0]}...`;
}

/**
 * Format dan kirim data pesanan langsung ke WhatsApp
 */
function handleWhatsAppOrder() {
  const currentMenu = CATERING_DATA.menus.find(m => m.id === window.currentSelectedMenuId) || CATERING_DATA.menus[0];
  const paxInput = document.getElementById('input-pax');
  const dateInput = document.getElementById('input-date');
  const timeInput = document.getElementById('input-time');
  const addressInput = document.getElementById('input-address');
  const notesInput = document.getElementById('input-notes');

  const pax = parseInt(paxInput ? paxInput.value : window.currentPax, 10);

  if (pax < currentMenu.min_order) {
    alert(`Jumlah pesanan belum memenuhi batas minimum order untuk paket ini (Minimal ${currentMenu.min_order} pax). Silakan sesuaikan jumlah porsi.`);
    if (paxInput) {
      paxInput.focus();
      paxInput.value = currentMenu.min_order;
      recalculate();
    }
    return;
  }

  const dateVal = dateInput ? dateInput.value.trim() : '';
  if (!dateVal) {
    alert('Mohon pilih tanggal acara Anda terlebih dahulu.');
    if (dateInput) dateInput.focus();
    return;
  }

  const addressVal = addressInput ? addressInput.value.trim() : '';
  if (!addressVal) {
    alert('Mohon lengkapi alamat pengiriman katering.');
    if (addressInput) addressInput.focus();
    return;
  }

  let formattedDate = dateVal;
  try {
    const d = new Date(dateVal);
    formattedDate = d.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  } catch (e) {
    formattedDate = dateVal;
  }

  const timeVal = timeInput ? timeInput.value : '11.30 WIB';
  const notesVal = notesInput ? notesInput.value.trim() : '-';

  const menuSubtotal = currentMenu.price * pax;
  let totalAddonsPerPax = 0;
  let addonsListText = '';

  if (currentMenu.addons && currentMenu.addons.length > 0) {
    currentMenu.addons.forEach(addon => {
      if (window.selectedAddonIds.has(addon.id)) {
        totalAddonsPerPax += addon.price;
        const sub = addon.price * pax;
        addonsListText += `  • ${addon.name} (${pax} x ${formatRupiah(addon.price)} = ${formatRupiah(sub)})\n`;
      }
    });
  }

  const totalAddonsSubtotal = totalAddonsPerPax * pax;
  const grandTotal = menuSubtotal + totalAddonsSubtotal;

  let message = `Halo ${CATERING_DATA.brand.name}, saya ingin memesan katering dengan rincian berikut:\n\n`;
  message += `*RINCIAN PESANAN:*\n`;
  message += `• Paket Menu: ${currentMenu.name}\n`;
  message += `• Kategori: ${currentMenu.category === 'nasi_box' ? 'Nasi Box' : (currentMenu.category === 'prasmanan' ? 'Prasmanan' : 'Snack Box')}\n`;
  message += `• Jumlah Porsi: ${pax} Pax (${formatRupiah(currentMenu.price)} / pax)\n`;
  
  if (addonsListText) {
    message += `• Menu Tambahan (Add-ons):\n${addonsListText}`;
  } else {
    message += `• Menu Tambahan (Add-ons): Tidak ada\n`;
  }

  message += `\n*JADWAL & PENGIRIMAN:*\n`;
  message += `• Tanggal Acara: ${formattedDate}\n`;
  message += `• Waktu Tiba: ${timeVal}\n`;
  message += `• Alamat Pengiriman: ${addressVal}\n`;
  message += `• Catatan Khusus: ${notesVal}\n\n`;

  message += `*RINGKASAN BIAYA:*\n`;
  message += `• Subtotal Menu: ${formatRupiah(menuSubtotal)}\n`;
  if (totalAddonsSubtotal > 0) {
    message += `• Subtotal Add-ons: ${formatRupiah(totalAddonsSubtotal)}\n`;
  }
  message += `• *Estimasi Total: ${formatRupiah(grandTotal)}*\n\n`;
  message += `Mohon konfirmasi ketersediaan slot dapur dan info invoice pemesanan. Terima kasih!`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${CATERING_DATA.brand.whatsapp}?text=${encodedMessage}`;

  window.open(whatsappUrl, '_blank');
}

// Global exports for inline handlers
window.formatRupiah = formatRupiah;
window.renderAddons = renderAddons;
window.toggleAddon = toggleAddon;
window.recalculate = recalculate;
window.handleWhatsAppOrder = handleWhatsAppOrder;
