# Remaining-Height
------

In html/css alone, one can't (as far as I've seen) create layouts where a
containers' children take up some height and then a subset of children
dynamically fill the remaining height.

This is a javascript library for doing so.

- **rem-height-container** - a container of children to size
- **rem-height-auto** - a child of a container to assume standard height
  (whatever height the browser normally calculates for it)
- **rem-height-percent** - a child of the container to assume `percent` of
  the remaining height not taken by other children

[demo (jsfiddle)](http://jsfiddle.net/1bmefLzr/5/)

This doesn't work so hot for width, I still use tables for that.
