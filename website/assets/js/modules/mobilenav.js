/*jshint esversion: 6 */
import 'bootstrap/js/src/collapse';
class MobileMenu {
    
    constructor() {
        this.menuIcon = $(".hamburger__menu-icon");
        this.menuContent = $("#menuContent");
        // this.menuHeader = $("#site-header");
        this.events();
    }

    events() {
        var self = this;
        $(this.menuContent).on("show.bs.collapse", function(){
            self.toggleTheIcon();
            self.toggleTheMenu();
        });
        $(this.menuContent).on("shown.bs.collapse", function(){
            $(self.menuContent).children('.primary-nav__items-wrapper').animateCss('pulse');
        });
        $(this.menuContent).on("hide.bs.collapse", function(){
            self.toggleTheMenu();
            self.toggleTheIcon();
        });
    }
    
    toggleTheMenu() {
        // this.menuHeader.toggleClass("site-header--is-expanded");
    } 
    toggleTheIcon() {
        this.menuIcon.toggleClass("hamburger__menu-icon--close-x");
    } 

}

export default MobileMenu;