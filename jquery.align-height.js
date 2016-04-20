(function($) {
    $.alignHeight = function(elements) {
        var maxh = 0;

        var els = [];
        if(elements instanceof jQuery) {
            elements.each(function() {
                els.push($(this));
            });
            elements = els;
        }

        for(var i in elements) {
            var element = elements[i];
            if(!(element instanceof jQuery) && typeof element == 'object') {
                var e = $(element[0]);
            } else {
                var e = $(element);
            }

            if(maxh<e.height()) maxh = e.outerHeight(true);
        }

        for(var i in elements) {
            var element = elements[i];
            if(!(element instanceof jQuery) && typeof element == 'object') {
                var e = $(element[0]);
                var delta = maxh-e.outerHeight(true);

                var sumh = 0;
                for(var j in element) {
                    if(j==0) continue;
                    sumh += $(element[j]).height();
                }

                if(sumh) {
                    for(var j in element) {
                        if(j==0) continue;
                        var e = $(element[j]);
                        var h = e.height();
                        var p = h/sumh;
                        e.css('height', (h+delta*p)+'px');
                    }
                } else {
                    var e = $(element[j]);
                    e.css('height', (delta)+'px');
                }
            } else {
                var e = $(element);
                var pad = e.outerHeight() - e.height();
                e.css('height', (maxh-pad)+'px');
            }
        }
    }
})(jQuery);