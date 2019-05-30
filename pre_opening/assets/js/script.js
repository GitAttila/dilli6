// ---------- JQUERY ANIMATE EXTENSION ----------
$.fn.extend({
    animateCss: function (animationName, delay, callBackFunc) {
        var self = this;
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        if (typeof callBackFunc!=='function') {
          callBackFunc = function(){};
        }
        delay = delay || 0;
        setTimeout(function(){
          self.show();
          self.css("visibility", "visible");
          self.addClass('animated ' + animationName).one(animationEnd, function() {
              $(self).removeClass('animated ' + animationName);
              callBackFunc();
          });
        },delay);
        return self;
    }
});

(function(global) {
  var scene = document.getElementById('parallax-scene');
  var parallaxInstance = new Parallax(scene);

  $('.parallax-scene').animateCss('fadeIn');
  $('.fadein-left-big').animateCss('fadeInLeftBig',"700");
  $('.fadein-right-big').animateCss('fadeInRightBig',"1400");
  $('.fadein-up-big').animateCss('fadeInUpBig',"2500");
  $('.bounce-in').animateCss('bounceIn',"3500", function() {
    $('#logo-main').addClass('animation-heartbeat');
  });

  global.initParallax = parallaxInstance;
}(window));
