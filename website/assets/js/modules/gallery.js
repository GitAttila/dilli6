import lightGallery from 'lightgallery/dist/js/lightgallery-all';

class Gallery {

    constructor () {
        this.gallery = $('#about-gallery');
        this.aboutGalleryImgs = $('#about-gallery .gallery__img-wrapper');
        this.resizeListener();
        this.initGallery();
    }

    setGalleryClasses() {
        $(this.aboutGalleryImgs).each(function (val, key) {
            let img$ = $(key).children('img');
            let wrapperRatio = $(key)[0].clientWidth / $(key)[0].clientHeight;
            let imgRatio = $(img$)[0].clientWidth / $(img$)[0].clientHeight;
            // console.log(key, val, wrapperRatio, imgRatio);
            if (wrapperRatio >= imgRatio) {
                img$.css({'width': '100%', 'height': 'auto'});
            } else {
                img$.css({'width': 'auto', 'height': '100%'});
            }
        });
    }

    resizeListener() {
        let _self = this;
        let resizeTimer;
        $( window ).on('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function(){
                _self.setGalleryClasses();
                // console.log('resetting classes...');
            },250);
        });
    }
    
    initGallery() {
        $(this.gallery).lightGallery({
            selector: '.gallery__img-wrapper'
        }); 
        console.log('gallery initialized');
    }

}

export default Gallery;