$(function() {

$(document).on('DOMSubtreeModified', screenChange);
$(document).on('DOMAttrModified', screenChange);
$(window).on('resize', screenChange);
$(window).on('orientationchange', screenChange);
screenChange();

function screenChange() {
  if (screenChange.scheduled) return;
  screenChange.scheduled = true;

  setTimeout(function () {
    screenChange.scheduled = false;
    var containers = $('.rem-height-container').get();
    containers.forEach(recalculate);
  }, 15);
}

function recalculate(container) {
  container = $(container);
  var children = container.children('*[class*="rem-height-"]');
  var auto = children.filter('*[class*="rem-height-auto"]');
  var sized = children.not('*[class*="rem-height-auto"]');

  sized.hide();
  var max = container.height();
  var used = auto.get().reduce(function(cur, child) {
    return cur + $(child).outerHeight(true);
  }, 0);
  var remaining = max - used;
  sized.show();

  sized.get().forEach(function(child) {
    child = $(child);
    var classes = child.attr('class').split(/\s+/);
    var found = false;

    for (var i = 0; !found && i < classes.length; ++i) {
      var c = classes[i];
      var strs = c.split('rem-height-');
      if (strs.length == 2) {
        var percent = parseInt(strs[1]);
        if (isNaN(percent)) {
          throw new Error('invalid size ' + strs[1] + ' for child ' + child);
        }
        var size = 0.01 * percent * remaining;
        var other = child.outerHeight(true) - child.height();
        child.height(size - other);
        found = true;
      }
    }
    if (!found) {
      throw new Error('class not found???');
    }
  });
}

});
