/* Article pages, phone/tablet only: swipe left to go back to the home page (same language). */
(function () {
    var x0, y0, t0, ignore;
    function blocked(el) {
        // don't hijack swipes on videos, forms or anything that scrolls sideways
        for (; el && el !== document.body; el = el.parentElement) {
            var tag = el.tagName;
            if (tag === 'VIDEO' || tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
            if (el.scrollWidth > el.clientWidth + 2) {
                var ox = getComputedStyle(el).overflowX;
                if (ox === 'auto' || ox === 'scroll') return true;
            }
        }
        return false;
    }
    document.addEventListener('touchstart', function (e) {
        if (window.innerWidth >= 1024 || e.touches.length !== 1) { ignore = true; return; }
        var t = e.touches[0];
        x0 = t.clientX; y0 = t.clientY; t0 = Date.now();
        ignore = blocked(e.target);
    }, { passive: true });
    document.addEventListener('touchend', function (e) {
        if (ignore) return;
        var t = e.changedTouches[0], dx = t.clientX - x0, dy = t.clientY - y0;
        if (dx < -80 && Math.abs(dy) < Math.abs(dx) * 0.5 && Date.now() - t0 < 700) {
            var lang = document.documentElement.lang === 'ru' ? 'ru' : 'en';
            document.body.style.transition = 'transform .25s ease, opacity .25s ease';
            document.body.style.transform = 'translateX(-30%)';
            document.body.style.opacity = '0';
            setTimeout(function () { location.href = 'index.html?lang=' + lang; }, 200);
        }
    }, { passive: true });
    // coming back with the browser's back button: show the page again
    window.addEventListener('pageshow', function () {
        document.body.style.transition = ''; document.body.style.transform = ''; document.body.style.opacity = '';
    });
})();
