import ScrollMagic from 'scrollmagic/scrollmagic/uncompressed/ScrollMagic';
import 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap';
import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';
import TweenMax from 'gsap/src/uncompressed/TweenMax';

class Animations {
    constructor() {
        this.controller = new ScrollMagic.Controller();
        this.siteScene = {};
    }

    events () {
        let _self = this;
        $('#menuContent a[data-sectionlink]').each(function(){
            let sectionName = $(this).data('sectionlink').trim().toLowerCase();
            let sectionDuration = $(sectionName).innerHeight();
            if (sectionName === '#section-hero') {
                sectionDuration = sectionDuration - (sectionDuration/100)*12;
            }
            // console.log(sectionName, sectionDuration);
            _self.siteScene[sectionName] = new ScrollMagic.Scene({
                triggerElement: sectionName,
                triggerHook: "onCenter",
                duration: sectionDuration
                })
                .setClassToggle("a[data-sectionlink='" + sectionName + "']","primary-nav__link--active")
                // .addIndicators({
                //     name: sectionName
                // })
                .addTo(_self.controller);
        });

        let paralDur = $('#section-hero').innerHeight();
        const heroParallaxScene= new ScrollMagic.Scene({
            triggerElement: "#section-about",
            triggerHook: "0.95",
            duration: paralDur
            })
            .setTween(".section-hero",1 , {y: "25%", ease: Linear.easeNone})
            // .addIndicators({
            //     name: "parallax test"
            // })
            .addTo(_self.controller);

        const revealNavBarScene = new ScrollMagic.Scene({
                triggerElement: "#section-about",
                triggerHook: 0.66, 
                offset: 0
            })
            .setClassToggle(".site-header", "layer__opacity-100")
            // .addIndicators({
            //     name: "reveal NavBar"
            // }) 
            .addTo(_self.controller);

        const revealJumpUpBtnScene = new ScrollMagic.Scene({
                triggerElement: "#section-about",
                triggerHook: 0.66, 
                offset: 0
            })
            .setClassToggle("#jump-up", "visible")
            // .addIndicators({
            //     name: "revealJumpUpBtnScene"
            // }) 
            .addTo(_self.controller);

        let staggerTech = TweenMax.staggerTo(".animation__supplier", 0.3, {transform: "scale(1)", ease: Back.easeOut}, 0.2);
        const suppliersScene = new ScrollMagic.Scene({
            triggerElement: ".section-suppliers",
            triggerHook: 0.6,
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

        function resetSceneDurations(){
            $(Object.keys(_self.siteScene)).each(function(key,val){
                let value = val.trim().toLowerCase();
                let dur = $(value)[0].offsetHeight;
                // console.log(value, dur);
                _self.siteScene[this].duration(dur);
            });
            // aboutScene.duration(($("#about")[0].offsetHeight));
        }


    }
}

export default Animations;