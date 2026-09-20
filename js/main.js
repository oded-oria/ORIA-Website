/* ORIA LEFKADA — progressive enhancements.
   The page is fully usable without this file: the menu stays open, gallery tiles
   link straight to the full photos, and the accessibility button is not shown. */
(function () {
    'use strict';

    var root = document.documentElement;

    /* ----------------------------------------------------------------------
       Header disclosures: mobile menu + accessibility options panel
       ---------------------------------------------------------------------- */
    var disclosures = [];

    function createDisclosure(toggle, target, show, hide) {
        if (!toggle || !target) { return null; }

        var disclosure = {
            toggle: toggle,
            target: target,
            isOpen: function () { return toggle.getAttribute('aria-expanded') === 'true'; },
            open: function () {
                disclosures.forEach(function (other) { if (other !== disclosure) { other.close(); } });
                toggle.setAttribute('aria-expanded', 'true');
                show(target);
            },
            close: function () {
                toggle.setAttribute('aria-expanded', 'false');
                hide(target);
            }
        };

        toggle.addEventListener('click', function () {
            if (disclosure.isOpen()) { disclosure.close(); } else { disclosure.open(); }
        });

        disclosures.push(disclosure);
        return disclosure;
    }

    var menu = createDisclosure(
        document.getElementById('nav-toggle'),
        document.getElementById('primary-menu'),
        function (el) { el.classList.add('is-open'); },
        function (el) { el.classList.remove('is-open'); }
    );

    createDisclosure(
        document.getElementById('a11y-toggle'),
        document.getElementById('a11y-panel'),
        function (el) { el.hidden = false; },
        function (el) { el.hidden = true; }
    );

    if (menu) {
        // Following a menu link closes the menu.
        menu.target.addEventListener('click', function (event) {
            if (event.target.closest('a')) { menu.close(); }
        });

        // Reset when the layout switches to the desktop navigation.
        var desktop = window.matchMedia('(min-width: 48em)');
        var onLayoutChange = function (event) { if (event.matches) { menu.close(); } };
        if (desktop.addEventListener) { desktop.addEventListener('change', onLayoutChange); }
        else if (desktop.addListener) { desktop.addListener(onLayoutChange); }
    }

    // Escape closes whichever disclosure is open and returns focus to its button.
    document.addEventListener('keydown', function (event) {
        if (event.key !== 'Escape') { return; }
        disclosures.forEach(function (disclosure) {
            if (disclosure.isOpen()) {
                disclosure.close();
                disclosure.toggle.focus();
            }
        });
    });

    // Clicking, or moving keyboard focus, outside an open disclosure closes it.
    function closeIfOutside(node) {
        disclosures.forEach(function (disclosure) {
            if (!disclosure.isOpen()) { return; }
            if (node && (disclosure.toggle.contains(node) || disclosure.target.contains(node))) { return; }
            disclosure.close();
        });
    }
    document.addEventListener('click', function (event) { closeIfOutside(event.target); });
    document.addEventListener('focusin', function (event) { closeIfOutside(event.target); });

    /* ----------------------------------------------------------------------
       Keep anchor targets and keyboard focus clear of the sticky header even
       when it wraps onto several lines (browser zoom, "Larger text").
       ---------------------------------------------------------------------- */
    var header = document.querySelector('.site-header');
    if (header && 'ResizeObserver' in window) {
        new ResizeObserver(function () {
            root.style.setProperty('--header-offset', header.offsetHeight + 'px');
        }).observe(header);
    }

    /* ----------------------------------------------------------------------
       Accessibility options (saved per browser; applied early by the inline
       script in <head> so there is no flash on load)
       ---------------------------------------------------------------------- */
    var STORAGE_KEY = 'oria-a11y';
    var optionButtons = Array.prototype.slice.call(document.querySelectorAll('[data-a11y]'));

    function readPrefs() {
        try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') || {}; }
        catch (e) { return {}; }
    }

    function writePrefs(prefs) {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs)); }
        catch (e) { /* storage unavailable: the choice still applies to this page view */ }
    }

    function renderOption(button, on) {
        button.setAttribute('aria-pressed', String(on));
        var state = button.querySelector('.a11y-option__state');
        if (state) { state.textContent = on ? 'On' : 'Off'; }
    }

    // A property that is mid-transition ignores a new custom-property value and
    // keeps its old colour, which stranded the call-to-action on the wrong accent
    // when High contrast was switched. Applying the change with transitions off,
    // then forcing a reflow before restoring them, commits it in one step.
    function applyWithoutTransition(change) {
        root.classList.add('a11y-switching');
        change();
        void root.offsetWidth;
        root.classList.remove('a11y-switching');
    }

    optionButtons.forEach(function (button) {
        var key = button.getAttribute('data-a11y');
        renderOption(button, root.classList.contains('a11y-' + key));

        button.addEventListener('click', function () {
            var on = !root.classList.contains('a11y-' + key);
            applyWithoutTransition(function () {
                root.classList.toggle('a11y-' + key, on);
            });
            renderOption(button, on);

            var prefs = readPrefs();
            prefs[key] = on;
            writePrefs(prefs);
        });
    });

    var reset = document.getElementById('a11y-reset');
    if (reset) {
        reset.addEventListener('click', function () {
            applyWithoutTransition(function () {
                optionButtons.forEach(function (button) {
                    root.classList.remove('a11y-' + button.getAttribute('data-a11y'));
                });
            });
            optionButtons.forEach(function (button) { renderOption(button, false); });
            writePrefs({});
        });
    }

    /* ----------------------------------------------------------------------
       Photo viewer: upgrades the gallery links to open a native <dialog>.
       The dialog element provides the focus trap, Escape-to-close and
       hides the rest of the page from assistive technology.
       ---------------------------------------------------------------------- */
    var dialog = document.getElementById('lightbox');
    var links = Array.prototype.slice.call(document.querySelectorAll('#gallery-list .tile__link'));

    if (dialog && typeof dialog.showModal === 'function' && links.length) {
        var stage = document.getElementById('lightbox-stage');
        var count = document.getElementById('lightbox-count');
        var image = null;
        var current = 0;
        var opener = null;

        var show = function (index) {
            current = (index + links.length) % links.length;
            var link = links[current];
            var thumb = link.querySelector('img');

            if (!image) {
                image = document.createElement('img');
                image.decoding = 'async';
                stage.appendChild(image);
            }
            image.width = Number(link.getAttribute('data-width')) || 0;
            image.height = Number(link.getAttribute('data-height')) || 0;
            image.alt = thumb ? thumb.alt : '';
            image.src = link.href;

            count.textContent = 'Image ' + (current + 1) + ' of ' + links.length;
        };

        links.forEach(function (link, index) {
            link.setAttribute('aria-haspopup', 'dialog');
            link.addEventListener('click', function (event) {
                // Leave modified clicks alone so "open in new tab" keeps working.
                if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) { return; }
                event.preventDefault();
                opener = link;
                // Open first, then fill: a live region that is not yet rendered
                // announces nothing, so setting the count before showModal() was silent.
                dialog.showModal();
                show(index);
            });
        });

        document.getElementById('lightbox-prev').addEventListener('click', function () { show(current - 1); });
        document.getElementById('lightbox-next').addEventListener('click', function () { show(current + 1); });
        document.getElementById('lightbox-close').addEventListener('click', function () { dialog.close(); });

        dialog.addEventListener('keydown', function (event) {
            if (event.key === 'ArrowLeft') { show(current - 1); }
            else if (event.key === 'ArrowRight') { show(current + 1); }
        });

        // Clicking the empty area around the photo closes the viewer.
        stage.addEventListener('click', function (event) {
            if (event.target === stage) { dialog.close(); }
        });

        dialog.addEventListener('close', function () {
            if (opener) { opener.focus(); }
            opener = null;
        });
    }
})();
