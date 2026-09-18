// ===== 作品数据（在这里集中编辑）=====
// category: design(设计插画) | photo(摄影) | words(音乐文字)
//
// 换成你自己的图片：把图片放进 assets/ 目录，然后给这条作品加一个 img 字段，例如：
//   { title: '晚风海报', desc: '...', category: 'design', img: 'assets/晚风海报.jpg' },
// 有 img 就显示你的图片；没有 img 就用 c1/c2 生成的渐变占位图。就这么简单。
const WORKS = [
  { title: '某乐帅照', desc: '一位忧郁的帅哥', category: 'design', img: 'assets/moule.jpg' },
  { title: '猫与月亮', desc: '睡前随手画的插画', category: 'design', c1: '#8a6cf0', c2: '#d59cf0' },
  { title: '街角清晨', desc: '通勤路上拍到的光', category: 'photo', c1: '#5aa9e6', c2: '#a0d8ef' },
  { title: '山间的雾', desc: '一次周末远行', category: 'photo', c1: '#4f9d8a', c2: '#9ad9c8' },
  { title: '深夜歌单', desc: '整理的一份安静的歌', category: 'words', c1: '#c06c84', c2: '#f2a6b8' },
  { title: '一些碎句', desc: '写给自己的短笔记', category: 'words', c1: '#6b7a8f', c2: '#b0bcc9' },
];

// ===== 渲染作品媒体：有 img 用图片，否则用渐变占位 =====
function mediaHTML(w) {
  if (w.img) return `<img class="card__media" src="${w.img}" alt="${w.title}" loading="lazy">`;
  return placeholderSVG(w.c1, w.c2, w.title);
}
function placeholderSVG(c1, c2, label) {
  return `<svg class="card__media" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}的占位图">
    <defs><linearGradient id="g_${label}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>
    <rect width="400" height="300" fill="url(#g_${label})"/>
    <text x="200" y="160" text-anchor="middle" font-size="24" fill="rgba(255,255,255,.85)" font-family="system-ui">${label}</text>
  </svg>`;
}

const gallery = document.getElementById('gallery');
WORKS.forEach((w, i) => {
  const card = document.createElement('article');
  card.className = 'card reveal';
  card.dataset.category = w.category;
  card.tabIndex = 0;
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `查看作品：${w.title}`);
  card.innerHTML = mediaHTML(w) +
    `<div class="card__body"><p class="card__title">${w.title}</p><p class="card__desc">${w.desc}</p></div>`;
  const open = () => openLightbox(w);
  card.addEventListener('click', open);
  card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  gallery.appendChild(card);
});

// ===== 分类筛选 =====
const chips = document.querySelectorAll('.chip');
chips.forEach((chip) => {
  chip.addEventListener('click', () => {
    chips.forEach((c) => c.classList.remove('is-active'));
    chip.classList.add('is-active');
    const f = chip.dataset.filter;
    document.querySelectorAll('.card').forEach((card) => {
      card.hidden = !(f === 'all' || card.dataset.category === f);
    });
  });
});

// ===== 灯箱 =====
const lightbox = document.getElementById('lightbox');
const lbMedia = document.getElementById('lightboxMedia');
const lbCap = document.getElementById('lightboxCap');
const lbClose = document.getElementById('lightboxClose');
let lastFocused = null;

function openLightbox(w) {
  lastFocused = document.activeElement;
  lbMedia.innerHTML = mediaHTML(w);
  lbCap.innerHTML = `<strong>${w.title}</strong><br><span style="color:var(--muted)">${w.desc}</span>`;
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  lbClose.focus();
}
function closeLightbox() {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  if (lastFocused) lastFocused.focus();
}
lbClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox(); });

// ===== 主题切换 =====
const toggle = document.getElementById('themeToggle');
toggle.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  try { localStorage.setItem('theme', next); } catch (e) {}
});

// ===== 滚动进入动画 =====
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
    });
  }, { threshold: 0.12 });
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

// ===== 页脚年份 =====
document.getElementById('year').textContent = new Date().getFullYear();
