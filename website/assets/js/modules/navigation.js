/*jshint esversion: 6 */
import 'bootstrap/js/dist/collapse';

class Navigation {
    
    constructor() {
        this.menuIcon = $(".hamburger__menu-icon");
        this.menuContent = $("#menuContent");
        // this.menuHeader = $("#site-header");
        this.events();
    }

    events() {
        var _self = this;
        $(this.menuContent).on("show.bs.collapse", function(){
            _self.toggleTheIcon();
            _self.toggleTheMenu();
        });
        $(this.menuContent).on("shown.bs.collapse", function(){
            $(_self.menuContent).children('.primary-nav__items-wrapper').animateCss('pulse');
        });
        $(this.menuContent).on("hide.bs.collapse", function(){
            _self.toggleTheMenu();
            _self.toggleTheIcon();
        });

        $('#menuContent').on('click','a[data-sectionlink]', function(e) {
            e.preventDefault();
            let sectionElem = $(this).data('sectionlink').trim();
            let posElem = $(sectionElem).offset().top;
            sectionElem === '#section-hero' ? posElem = 0 : posElem = posElem;
            if (sectionElem !== '') {
                if ($(sectionElem).length>0) {
                    _self.scrollTo('html,body', posElem, () => {
                        // collapse the nav menu after a menu item has been clicked
                        if ($("#menuContent").hasClass('show')) {
                            $("#menuContent").delay(300).collapse('hide');
                        }
                    });
                }
            }
        });

        $('#jump-up').on( 'click', function() {
            _self.scrollTo('html, body', 0, function(){});
        });

        $('#jump-down').on( 'click', function() {
            let pos = $('#section-about')[0].offsetTop;
            _self.scrollTo('html, body', pos, function(){});
        });

        $('#btn-hero-order').on( 'click', function(e) {
            e.preventDefault();
            let pos = $('.section-order')[0].offsetTop;
            _self.scrollTo('html, body', pos, function(){});
        });
        
    }
    
    toggleTheMenu() {
        // this.menuHeader.toggleClass("site-header--is-expanded");
    } 
    toggleTheIcon() {
        this.menuIcon.toggleClass("hamburger__menu-icon--close-x");
    } 

    scrollTo(elem, scrollToPos, callBackFunc) {
        if (typeof callBackFunc!=='function') {callBackFunc = function(){}}
        if ($(elem).length>0) {
            $(elem).stop().animate(
                {
                    scrollTop: scrollToPos
                }, 
                500,
                'swing', 
                function() { 
                    //console.log("Finished scrolling");
                    callBackFunc();
                }
            );
        }
    };

}

export default Navigation;