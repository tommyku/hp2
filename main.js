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
}).bind(this)();
