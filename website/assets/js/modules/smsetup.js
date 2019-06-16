import ScrollMagic from 'scrollmagic/scrollmagic/uncompressed/ScrollMagic';
import 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap';
import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';
import TweenMax from 'gsap/src/uncompressed/TweenMax';
import scrollTo from 'gsap/src/uncompressed/plugins/ScrollToPlugin';

class Animations {
    constructor() {
        this.controller = new ScrollMagic.Controller();
        this.siteScene = {};
    }

    events () {
        let _self = this;
        $('#menuContent a[data-filter]').each(function(){
            let sectionName = $(this).data('filter').trim().toLowerCase();
            let sectionDuration = $('.section-' + sectionName).innerHeight();
            // console.log(sectionName, sectionDuration);
            sectionName === 'awards' ? sectionDuration = '100%' : sectionDuration = sectionDuration;
            if (sectionName === 'hero') {sectionDuration = sectionDuration - 100}
            _self.siteScene[sectionName] = new ScrollMagic.Scene({
                triggerElement: ".section-" + sectionName,
                triggerHook: "onCenter",
                duration: sectionDuration
            })
            .setClassToggle("a[data-filter='" + sectionName + "']","primary-nav__link--active")
            // .addIndicators({
            //     name: "section-" + sectionName
            // })
            .addTo(_self.controller);
        });

        _self.controller.scrollTo(function(newpos){
            TweenMax.to(window, 0.5, {scrollTo: {y: newpos}});
        });

        $('#menuContent').on('click','a[data-filter]', function(e) {
            e.preventDefault();
            let secElem = $(this).data('filter').trim().toLowerCase();
            if (secElem !== '') {
                if ($('.section-' + secElem).length>0) {
                    let posElem = $('.section-' + secElem).offset().top;
                    console.log(secElem, posElem);
                    $("html, body").animate({
                        scrollTop: posElem
                    }, 500);
                    // _self.controller.scrollTo(posElem);
                }
            }
        });

        let paralDur = $('.section-hero').innerHeight();
        const heroParallax = new ScrollMagic.Scene({
            triggerElement: ".section-profile",
            triggerHook: "0.95",
            duration: paralDur
            })
            .setTween(".section-hero",1 , {y: "25%", ease: Linear.easeNone})
            // .addIndicators({
            //     name: "parallax test"
            // })
            .addTo(_self.controller);

        const revealNavBar = new ScrollMagic.Scene({
                triggerElement: ".section-about",
                triggerHook: 0.5, 
                offset: 50
            })
            .setClassToggle("#site-header", "layer__opacity-100")
            // .addIndicators({
            //     name: "reveal NavBar"
            // }) 
            .addTo(_self.controller);

        let staggerTech = TweenMax.staggerTo(".animation__supplier", 0.3, {transform: "scale(1)", ease: Back.easeOut}, 0.2);
        new ScrollMagic.Scene({
            triggerElement: ".section-suppliers",
            triggerHook: 0.66,
        })
        .setTween(staggerTech)
        // .addIndicators({
        //     name: "tech-animation"
        // }) 
        .addTo(_self.controller);

        var resizeTimer;
        $( window ).on('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function(){
                resetSceneDurations();
            },250);
        });

        // Attila Hazay signature animation
        $('#AH-signature-paths path').each(function(key,val){
            // console.log(key,val);
            pathPrepare ($(val));
        });

        function resetSceneDurations(){
            $(Object.keys(_self.siteScene)).each(function(key,val){
                let value = val.trim().toLowerCase();
                let dur = $(".section-" + value )[0].offsetHeight;
                // console.log(value, dur);
                _self.siteScene[this].duration(dur);
            });
            // aboutScene.duration(($("#about")[0].offsetHeight));
        }


    }
}


export default Animations;