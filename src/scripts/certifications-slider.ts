export function initCertificationsSlider() {
  const slider = document.getElementById('certifications-slider');
  const scrollLeftBtn = document.getElementById('scroll-left') as HTMLButtonElement | null;
  const scrollRightBtn = document.getElementById('scroll-right') as HTMLButtonElement | null;
  const indicators = document.querySelectorAll('.page-indicator');
  
  if (!slider || !scrollLeftBtn || !scrollRightBtn) return;
  
  let currentPage = 0;
  const totalPages = slider.querySelectorAll('.certification-page').length;
  
  function updatePage(newPage: number) {
    if (!slider || !scrollLeftBtn || !scrollRightBtn) return;
    if (newPage < 0 || newPage >= totalPages) return;
    
    currentPage = newPage;
    const pageWidth = slider.clientWidth;
    slider.scrollTo({ left: pageWidth * currentPage, behavior: 'smooth' });
    
    // Actualizar indicadores
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentPage);
    });
    
    // Actualizar estado de botones
    scrollLeftBtn.disabled = currentPage === 0;
    scrollRightBtn.disabled = currentPage === totalPages - 1;
  }
  
  scrollLeftBtn.addEventListener('click', () => updatePage(currentPage - 1));
  scrollRightBtn.addEventListener('click', () => updatePage(currentPage + 1));
  
  // Click en indicadores
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => updatePage(index));
  });
  
  // Soporte para swipe en mobile
  let startX = 0;
  let isDragging = false;
  
  slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });
  
  slider.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
  }, { passive: false });
  
  slider.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    isDragging = false;
    
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    
    // Umbral de 50px para detectar swipe
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        updatePage(currentPage + 1); // Swipe left
      } else {
        updatePage(currentPage - 1); // Swipe right
      }
    }
  });
  
  // Inicializar
  updatePage(0);
}