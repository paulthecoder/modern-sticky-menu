/**
 * Modern Stick Menu
 * Author: paulthecoder
 * Version: 0.5
 * License: GNU General Public License, version 3
 *
 **/


(function ( $ ) {

    $.fn.sticky_menu = function( args ) {

        args = $.extend({
            // These are the defaults.
            menu: '', // object or selector
            delta: 5, // tolerance
            interval: 50, // scroll event check
            offset: 200, // top offset
            class: {
                up: 'slide-up',
                down: 'slide-down',
            }
        }, args );


        var did_scroll, // did the scroll event occur
            last_st, // last scroll top
            st, // current scroll top
            $menu = $( args.menu );

        var has_scrolled = function() {

            st = $(this).scrollTop();

            if (Math.abs(last_st - st) <= delta) {
                return;
            }


            // If current position > last position AND scrolled past navbar...
            if (st > last_st || st < args.top_offset){
                // Scroll Down
                $menu.removeClass( args.class.down ).addClass( args.class.up );
            }
            else {
                // Scroll Up
                // If did not scroll past the document (possible on mac)...
                if(st + $(window).height() < $(document).height()) {
                    $menu.removeClass( args.class.up ).addClass( args.class.down );
                }
            }

            last_st = st;

        };


        // detect scroll event
        $(window).on('scroll', function(){
            did_scroll = true;
        });

        // check periodically
        setInterval(function(){

            if( did_scroll ){

                has_scrolled();
                did_scroll = false;
            }

        }, args.interval);



        return this;
    };

}( jQuery ));
