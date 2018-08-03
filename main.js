/* global scrollMonitor */
// The site should still work without any of these enhancements

// watcher to add .revealed to .reveal-on-enter elements
(function() {
  var $watchedElements = document.querySelectorAll('.reveal-on-enter');

  $watchedElements.forEach(function($elm) {
    var watcher = scrollMonitor.create($elm);

    watcher.enterViewport(function() {
      var $el = this.watchItem;
      if ($el.classList) {
        $el.classList.add('revealed');
      } else {
        $el.className += ' ' + 'revealed';
      }
    });
  });
})();

// smooth scrolling
(function() {
  var $anchors = document.querySelectorAll('nav a[href^="#"]');

  if (!document.body.scrollIntoView) return;

  $anchors.forEach(function($anchor) {
    $anchor.addEventListener('click', function(e) {
      var $target = document.querySelector(this.hash);

      if ($target) {
        $target.scrollIntoView({
          block: 'start',
          behavior: 'smooth'
        });
        e.preventDefault();
      }
    });
  });
})();
