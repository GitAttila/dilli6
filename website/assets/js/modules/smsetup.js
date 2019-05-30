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
                triggerElement: ".section-profile",
                triggerHook: 0.5, 
                offset: 50
            })
            .setClassToggle("#site-header", "layer__opacity-100")
            // .addIndicators({
            //     name: "reveal NavBar"
            // }) 
            .addTo(_self.controller);


        const blendInAvatar = new ScrollMagic.Scene({
                triggerElement: ".section-profile",
                triggerHook: 0.5, 
                offset: 50
            })
            .setTween(".section-hero__avatar", 0.5 , {scale: "2",opacity: "0", ease: Back.easeOut})
            // .addIndicators({
            //     name: "reveal NavBar"
            // }) 
            .addTo(_self.controller);

        let langBarsPresets = ['100%','90%','90%','60%'];
        $('.section-profile .progress__status').each(function(index){
            new ScrollMagic.Scene({
                triggerElement: ".section-skills",
                triggerHook: 0.5,
                offset: -400
            })
            .setTween(this, 0.3,{width: langBarsPresets[index], ease: Back.easeOut, delay: 0.2*index})
            // .addIndicators({
            //     name: "lang skills"
            // }) 
            .addTo(_self.controller);
        });
        
        let webBarsPresets = ['100%','100%','90%','85%','85%'];
        $('.feature-web .progress__status').each(function(index){
            new ScrollMagic.Scene({
                triggerElement: ".section-skills",
                triggerHook: 0.5,
                offset: 200
            })
            .setTween(this, 0.3,{width: webBarsPresets[index], ease: Back.easeOut, delay: 0.2*index})
            // .addIndicators({
            //     name: "webskills"
            // }) 
            .addTo(_self.controller);
        });
        
        let comLangBarsPresets = ['85%','67%','67%'];
        $('.feature-languages .progress__status').each(function(index){
            new ScrollMagic.Scene({
                triggerElement: ".section-skills",
                triggerHook: 0.5,
                offset: 200
            })
            .setTween(this, 0.3,{width: comLangBarsPresets[index], ease: Back.easeOut, delay: 0.2*index})
            // .addIndicators({
            //     name: "webskills"
            // }) 
            .addTo(_self.controller);
        });
        
        let automationBarsPresets = ['90%','90%','85%','80%'];
        $('.feature-automation .progress__status').each(function(index){
            new ScrollMagic.Scene({
                triggerElement: ".section-skills",
                triggerHook: 0.5,
                offset: 500
            })
            .setTween(this, 0.3,{width: automationBarsPresets[index], ease: Back.easeOut, delay: 0.2*index})
            // .addIndicators({
            //     name: "automationskills"
            // }) 
            .addTo(_self.controller);
        });
        
        let javascriptAnimBarsPresets = ['100%','75%','75%'];
        $('.feature-jsanim .progress__status').each(function(index){
            new ScrollMagic.Scene({
                triggerElement: ".section-skills",
                triggerHook: 0.5,
                offset: 500
            })
            .setTween(this, 0.3,{width: javascriptAnimBarsPresets[index], ease: Back.easeOut, delay: 0.2*index})
            // .addIndicators({
            //     name: "jsAnimskills"
            // }) 
            .addTo(_self.controller);
        });
        
        let designBarsPresets = ['100%','90%','67%', '75%', '85%', '60%'];
        $('.feature-design .progress__status').each(function(index){
            new ScrollMagic.Scene({
                triggerElement: ".section-skills",
                triggerHook: 0.5,
                offset: 700
            })
            .setTween(this, 0.3,{width: designBarsPresets[index], ease: Back.easeOut, delay: 0.2*index})
            // .addIndicators({
            //     name: "designSkills"
            // }) 
            .addTo(_self.controller);
        });

        let staggerTech = TweenMax.staggerTo(".tech-animation", 0.3, {transform: "scale(1)", ease: Back.easeOut}, 0.2);
        new ScrollMagic.Scene({
            triggerElement: ".section-tech",
            triggerHook: 0.66,
        })
        .setTween(staggerTech)
        // .addIndicators({
        //     name: "tech-animation"
        // }) 
        .addTo(_self.controller);

        let staggerAwards = TweenMax.staggerTo(".award-animation", 1, {transform: "translateY(0)", opacity: 1, ease: Back.easeOut}, 0.2);
        new ScrollMagic.Scene({
            triggerElement: ".section-awards",
            triggerHook: 0.66,
        })
        .setTween(staggerAwards)
        // .addIndicators({
        //     name: "award-animation"
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

        var AHsignatureTween = new TimelineMax()
            .delay(1)
		    .add(TweenMax.to('path#att', 0.5, {strokeDashoffset: 0, ease:Linear.easeNone})) // draw word for 0.9
            .add(TweenMax.to('path#iline', 0.25, {strokeDashoffset: 0, ease:Linear.easeNone}))  // draw dot for 0.1
            .add(TweenMax.to('path#dot', 0.25, {strokeDashoffset: 0, ease:Linear.easeNone}))
            .add(TweenMax.to('path#la', 0.5, {strokeDashoffset: 0, ease:Linear.easeNone}))
            .add(TweenMax.to('path#h1line', 0.25, {strokeDashoffset: 0, ease:Linear.easeNone}))
            .add(TweenMax.to('path#h2line', 0.5, {strokeDashoffset: 0, ease:Linear.easeNone}))
            .add(TweenMax.to('path#az', 0.5, {strokeDashoffset: 0, ease:Linear.easeNone}))
            .add(TweenMax.to('path#ay', 0.5, {strokeDashoffset: 0, ease:Linear.easeNone}))
            .add(TweenMax.to('path', 3.25, {stroke: "#ffffff", ease:Linear.easeNone}), 0);			// change color during the whole thing
        
        var AHsignatureScene = new ScrollMagic.Scene(
                {
                    triggerElement: ".section-hero", 
                    tweenChanges: true,
                    triggerHook: 0
                }
            )
            .setTween(AHsignatureTween)
            // .addIndicators({
            //     name: "signature"
            // }) 
            .addTo(_self.controller);
                    
        function pathPrepare ($el) {
            var lineLength = $el[0].getTotalLength();
            $el.css("stroke-dasharray", lineLength);
            $el.css("stroke-dashoffset", lineLength);
        }

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