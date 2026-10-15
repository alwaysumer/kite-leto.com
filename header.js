/* Desktop: the top bar sticks flush to the top edge of the window, so page text can't peek out above it. */
(function () {
    var h = document.querySelector('header');
    if (!h) return;
    var st = document.createElement('style');
    st.textContent =
        '@media (min-width:1024px){' +
        'header.site-header{top:-1rem}' +
        'header.site-header>div:first-child{transition:border-radius .2s ease}' +
        'header.site-header.is-stuck>div:first-child{border-top-left-radius:0;border-top-right-radius:0;border-top-color:transparent}' +
        '}';
    document.head.appendChild(st);
    h.classList.add('site-header');
    function upd() { h.classList.toggle('is-stuck', window.scrollY > 12); }
    window.addEventListener('scroll', upd, { passive: true });
    upd();
})();

/* Article pages, desktop: when the page is scrolled to the very end, the bottom of the right column
   lines up with the bottom of the last FAQ item. If the column is a little too short to reach it,
   the "other spots" box gets a bit of extra bottom padding (never more than 120px). */
(function () {
    var aside = document.querySelector('aside');
    if (!aside || !aside.lastElementChild) return;
    var o = aside.lastElementChild, grid = aside.parentElement;
    function fit() {
        o.style.paddingBottom = '';
        if (window.innerWidth < 1024 || getComputedStyle(aside).position !== 'sticky') return;
        var top = parseFloat(getComputedStyle(aside).top) || 0;
        var gridBottomDoc = grid.getBoundingClientRect().bottom + window.scrollY;
        var endBottom = window.innerHeight - (document.documentElement.scrollHeight - gridBottomDoc);
        var gap = endBottom - top - aside.offsetHeight;
        if (gap > 0 && gap <= 120) o.style.paddingBottom = (parseFloat(getComputedStyle(o).paddingBottom) + gap) + 'px';
    }
    function later() { setTimeout(fit, 60); }
    window.addEventListener('load', later);
    window.addEventListener('resize', later);
    later();
})();
