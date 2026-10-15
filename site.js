/* Theme toggle. The no-flash script in each page's <head> has already
   set data-theme before paint; this only handles the button. */
(function () {
  var btn = document.getElementById('theme-toggle');
  if (!btn) return;

  function label() {
    var dark = document.documentElement.getAttribute('data-theme') === 'dark';
    btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    btn.setAttribute('title', dark ? 'Light mode' : 'Dark mode');
  }

  label();

  btn.addEventListener('click', function () {
    var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    label();
  });

  // Follow the OS only while the visitor hasn't chosen for themselves.
  try {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var onChange = function (e) {
      if (localStorage.getItem('theme')) return;
      document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      label();
    };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else if (mq.addListener) mq.addListener(onChange);
  } catch (e) {}
})();
