/**
 * UI Rendering & DOM Lifecycle Pawon Selera
 */

/**
 * Render katalog menu dinamis berdasarkan kategori
 */
function renderMenuCatalogue(category = 'all') {
  const container = document.getElementById('menu-grid');
  const emptyState = document.getElementById('menu-empty-state');
  if (!container) return;

  const filteredMenus = category === 'all' 
    ? CATERING_DATA.menus 
    : CATERING_DATA.menus.filter(m => m.category === category);

  if (filteredMenus.length === 0) {
    container.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');

  container.innerHTML = filteredMenus.map(menu => {
    const isSelected = menu.id === window.currentSelectedMenuId;
    const categoryLabel = menu.category === 'nasi_box' ? 'Nasi Box' : (menu.category === 'prasmanan' ? 'Prasmanan' : 'Snack Box');

    return `
      <article class="bg-white rounded-2xl border ${isSelected ? 'border-brand-700 ring-2 ring-brand-700/20' : 'border-culinary-border'} shadow-xs hover:shadow-md transition-all flex flex-col overflow-hidden group">
        <div class="relative h-48 w-full bg-stone-100 overflow-hidden">
          <img 
            src="${menu.image_url}" 
            alt="${menu.name}" 
            loading="lazy"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';"
          />
          <span class="absolute top-3 left-3 px-2.5 py-1 rounded-md text-xs font-bold bg-white/95 text-culinary-dark shadow-xs backdrop-blur-xs">
            ${categoryLabel}
          </span>
          <span class="absolute bottom-3 right-3 px-2.5 py-1 rounded-md text-xs font-semibold bg-stone-900/80 text-white backdrop-blur-xs">
            Min. ${menu.min_order} pax
          </span>
        </div>

        <div class="p-5 sm:p-6 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-baseline justify-between gap-2 mb-2">
              <h3 class="font-extrabold text-base sm:text-lg text-culinary-dark leading-snug">
                ${menu.name}
              </h3>
            </div>
            <div class="text-brand-800 font-extrabold text-lg sm:text-xl mb-3">
              ${formatRupiah(menu.price)}
              <span class="text-xs font-medium text-culinary-muted">/ pax</span>
            </div>
            <p class="text-xs sm:text-sm text-culinary-muted leading-relaxed line-clamp-3 mb-4">
              ${menu.description}
            </p>
          </div>

          <div class="pt-4 border-t border-culinary-border/70 flex items-center justify-between gap-3">
            <span class="text-[11px] text-culinary-muted font-medium">
              ${menu.addons && menu.addons.length > 0 ? `+${menu.addons.length} opsi add-on` : 'Menu komplit'}
            </span>
            <button 
              type="button" 
              onclick="selectMenuAndScroll('${menu.id}')"
              class="inline-flex items-center justify-center px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-colors touch-target ${isSelected ? 'bg-emerald-700 text-white' : 'bg-brand-700 hover:bg-brand-800 text-white'} shadow-xs">
              ${isSelected ? 'Menu Terpilih' : 'Pilih Menu & Hitung'}
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

/**
 * Isi pilihan opsi dropdown pada kalkulator
 */
function populateMenuDropdown() {
  const select = document.getElementById('select-menu');
  if (!select) return;

  select.innerHTML = CATERING_DATA.menus.map(menu => {
    return `<option value="${menu.id}">${menu.name} - ${formatRupiah(menu.price)} / pax (Min. ${menu.min_order} pax)</option>`;
  }).join('');

  select.value = window.currentSelectedMenuId;
}

/**
 * Pilih paket menu dari kartu katalog dan gulir ke kalkulator
 */
function selectMenuAndScroll(menuId) {
  window.currentSelectedMenuId = menuId;
  const currentMenu = CATERING_DATA.menus.find(m => m.id === menuId);
  const paxInput = document.getElementById('input-pax');

  if (currentMenu && window.currentPax < currentMenu.min_order) {
    window.currentPax = currentMenu.min_order;
    if (paxInput) paxInput.value = window.currentPax;
  }

  window.selectedAddonIds.clear();

  populateMenuDropdown();
  renderAddons();
  recalculate();
  renderMenuCatalogue(window.currentSelectedCategory);

  const calcEl = document.getElementById('kalkulator');
  if (calcEl) {
    calcEl.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * Filter katalog menu berdasarkan kategori tab
 */
function filterMenu(category) {
  window.currentSelectedCategory = category;

  document.querySelectorAll('.category-filter-btn').forEach(btn => {
    const btnCategory = btn.getAttribute('data-category');
    const isActive = btnCategory === category;
    btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    if (isActive) {
      btn.className = 'category-filter-btn px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all bg-brand-700 text-white shadow-xs touch-target';
    } else {
      btn.className = 'category-filter-btn px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all text-culinary-muted hover:text-culinary-dark touch-target';
    }
  });

  renderMenuCatalogue(category);
}

// Inisialisasi aplikasi saat DOM siap
document.addEventListener('DOMContentLoaded', () => {
  populateMenuDropdown();
  renderMenuCatalogue('all');
  renderAddons();

  // Batas minimum tanggal pengantaran (H+1)
  const dateInput = document.getElementById('input-date');
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;
    dateInput.value = `${yyyy}-${mm}-${dd}`;
  }

  // Event listener dropdown menu
  const selectMenu = document.getElementById('select-menu');
  if (selectMenu) {
    selectMenu.addEventListener('change', (e) => {
      window.currentSelectedMenuId = e.target.value;
      window.selectedAddonIds.clear();
      renderAddons();
      recalculate();
      renderMenuCatalogue(window.currentSelectedCategory);
    });
  }

  // Event listener input pax
  const paxInput = document.getElementById('input-pax');
  if (paxInput) {
    paxInput.addEventListener('input', () => {
      recalculate();
    });
  }

  // Tombol stepper pax
  const btnMinusOne = document.getElementById('btn-minus-one');
  if (btnMinusOne) {
    btnMinusOne.addEventListener('click', () => {
      const currentMenu = CATERING_DATA.menus.find(m => m.id === window.currentSelectedMenuId);
      const min = currentMenu ? currentMenu.min_order : 1;
      if (paxInput && parseInt(paxInput.value, 10) > min) {
        paxInput.value = parseInt(paxInput.value, 10) - 1;
        recalculate();
      }
    });
  }

  const btnPlusOne = document.getElementById('btn-plus-one');
  if (btnPlusOne) {
    btnPlusOne.addEventListener('click', () => {
      if (paxInput) {
        paxInput.value = parseInt(paxInput.value, 10) + 1;
        recalculate();
      }
    });
  }

  const btnDecreasePax = document.getElementById('btn-decrease-pax');
  if (btnDecreasePax) {
    btnDecreasePax.addEventListener('click', () => {
      const currentMenu = CATERING_DATA.menus.find(m => m.id === window.currentSelectedMenuId);
      const min = currentMenu ? currentMenu.min_order : 1;
      if (paxInput) {
        const currentVal = parseInt(paxInput.value, 10);
        paxInput.value = Math.max(min, currentVal - 5);
        recalculate();
      }
    });
  }

  const btnIncreasePax = document.getElementById('btn-increase-pax');
  if (btnIncreasePax) {
    btnIncreasePax.addEventListener('click', () => {
      if (paxInput) {
        paxInput.value = parseInt(paxInput.value, 10) + 5;
        recalculate();
      }
    });
  }

  // Event listener tab kategori
  document.querySelectorAll('.category-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-category');
      filterMenu(cat);
    });
  });

  // Tombol order WhatsApp
  const btnWhatsApp = document.getElementById('btn-whatsapp-order');
  if (btnWhatsApp) {
    btnWhatsApp.addEventListener('click', handleWhatsAppOrder);
  }

  // Kalkulasi awal
  recalculate();
});

// Global exports for inline handlers
window.renderMenuCatalogue = renderMenuCatalogue;
window.populateMenuDropdown = populateMenuDropdown;
window.selectMenuAndScroll = selectMenuAndScroll;
window.filterMenu = filterMenu;
