import "bootstrap/js/dist/carousel";
class Carousels {

    constructor () {
        this.carousels = 
            [
                {
                    selector: '#carousel-menu-stepper',
                    interval: 5000,
                    ride: true
                },
                {
                    selector: '#carousel-team',
                    interval: 10000,
                    ride: true
                },
                {
                    selector: '#carousel-meals-menu',
                    interval: 10000,
                    ride: true
                }
            ]
        this.initCarousels(this.carousels);
        this.events();
    }

    initCarousels(carousels) { 
        carousels = carousels || [];
        carousels.forEach(element => {
            $(element.selector).carousel({
                interval: element.interval,
                ride: element.ride
            });
        });
    }

    events() {
        $('#carousel-menu-stepper').on('slid.bs.carousel', function () {
            let num = $(this).children().children('.carousel-item.active').data('slidenum');
            $(this).children().children('.carousel-indicators').children('.menu-stepper__step').removeClass('menu-stepper__step--active');
            $(this).children().children('.carousel-indicators').children('.menu-stepper__step').eq(num).addClass('menu-stepper__step--active');
        })
    }

}

export default Carousels;