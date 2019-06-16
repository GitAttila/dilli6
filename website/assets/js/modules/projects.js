import Isotope from 'isotope-layout';
import 'isotope-layout/js/layout-modes/fit-rows';
import imagesLoaded from 'imagesloaded';
import Animations from './smsetup';
class Projects {

    constructor() {
        this.projectsGridEl = $('#drinksGrid');
        this.galleriesKeys = ['dilli6', 'RA-calendar', 'spars', 'RA-loginpage', 'RA-merchendise', 'kamenictvi', 'RA-dm', 'KE', 'PF', 'bwmagazine', 'photoshoots', 'ra-manage', 'ftc' ];
        this.projectsGrid;
        this.initProjectsGrid();
        this.updateProjectsGrid = function() {
            this.projectsGrid.layout();
        };
        this.anims = new Animations();
    }

    initProjectsGrid() {
        let brokenCount = 0;
        let self = this;
        var imgLoaded = imagesLoaded('body', { background: true }, function () {
            console.log('all images have loaded...');
        });
        imgLoaded.on( 'always', function( instance ) {
            setTimeout(()=>{
                self.projectsGrid = new Isotope( self.projectsGridEl[0], {
                    percentPosition : true,
                    itemSelector: '.grid-layout__item',
                    stagger:50,
                    masonry: {
                        columnWidth: '.grid-layout--sizer',
                        gutterWidth: 20
                    }
                });
                self.events(self.projectsGrid);
                self.initGalleries();
                // initialize animations here
                self.anims.events();

                $('section.section-loading').fadeOut(1000, function(){});

            },1000);
        });
        imgLoaded.on( 'fail', function( instance ) {
            console.log(
                brokenCount + " of images have broken links. Check your image paths."
            );
        });
        imgLoaded.on( 'progress', function( instance, image ) {
            // console.log(instance);
            if (image.isLoaded) {
                $('#loading-spinner .progress__status').width(instance.progressedCount / instance.images.length * 100 + '%');
            } else {
                brokenCount++;
            }
        });
    }

    events(grid) {
        let lastNavMenuClicked='all';
        self = this;
        grid = grid || self.projectsGrid;
        $("#menu-filter [data-filter]").on('click', function(e){
            let isFilterItemDisabled = $(this).hasClass('btn-site--disabled');
            e.preventDefault();
            let filterValue = $(this).data('filter').toLowerCase().trim();
            if ((lastNavMenuClicked === filterValue) || isFilterItemDisabled) {
                return;
            }
            console.log(filterValue, lastNavMenuClicked);
            lastNavMenuClicked = filterValue;

            $("#menu-filter .filter__item").removeClass("btn-site--active");
            $(this).addClass("btn-site--active");
            $('#menu-filter .filter__item').addClass('btn-site--disabled');

            // collapse the nav menu on mobile after a menu item has been clicked
            if ($("#menuContent").hasClass('show')) {
                $("#menuContent").delay(300).collapse('hide');
            }

            grid.arrange({
                filter: function(item){
                    let found = false;
                    let itemData = $(item).data("category").toLowerCase().trim();
                    let valuesArr = itemData.split(',');
                    for (let i = 0;i<valuesArr.length; i++) {
                        if (valuesArr[i].trim()===filterValue) {
                            found = true;
                        }
                    }
                    return found;
                }
            });

            grid.once( 'arrangeComplete', function( filteredItems ) {
                let delayed = 100;
                grid.layout();
                $(filteredItems).each(function(key,val){
                    $(val.element).stop().animateCss('pulse', key * delayed, ()=>{
                        if (key === (filteredItems.length-1)) {
                            $('#menu-filter .filter__item').removeClass('btn-site--disabled');
                            // console.log('animation completed...');
                        }
                    });
                });
            });

        });

        $('#drinksGrid .project-card').on('click', function(){
            $(this).children().children('.project-card__gallery').animateCss('bounceIn');
        });

    }

    
    initGalleries() {
        var self = this;
        $(document).ready(function() {
            $.each(self.galleriesKeys, function(key, val) {
                let galKey = val.trim().toLowerCase();
                let idSelector = "#" + galKey + "-gallery";
                $(idSelector).lightGallery(); 
            });
            console.log('galleries initialized');
        });
    }
}

export default Projects;