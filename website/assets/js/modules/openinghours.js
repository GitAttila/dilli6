/*jshint esversion: 6 */
import Holidays from './holidays';
class OpeningHours {
    
    constructor() {
        this.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        this.clockInterval = function(callBackFunc) {
            if (typeof callBackFunc!=='function') {
                callBackFunc = function(){};
            }
            setInterval(function(){ 
                callBackFunc();
            },5000);
        };

        this.getNowDate= function() {
            let nowDate = new Date();
            return nowDate;
        };
        this.ohMsg = '';
        this.curCountdownHrs = 0;
        this.curCountdownMins = 0;
        this.initOH();
        this.publicHolidays = new Holidays();
    }
    
    initOH() {
        let oh = [
            {
                openingHr: 11,  //Sunday
                openingMin: 0,
                closingHr: 22,
                closingMin: 0
            },
            {
                openingHr: 11,
                openingMin: 0,
                closingHr: 23,
                closingMin: 0
            },
            {
                openingHr: 11,
                openingMin: 0,
                closingHr: 23,
                closingMin: 0
            },
            {
                openingHr: 11,
                openingMin: 0,
                closingHr: 23,
                closingMin: 0
            },
            {
                openingHr: 11,
                openingMin: 0,
                closingHr: 23,
                closingMin: 0
            },
            {
                openingHr: 11,
                openingMin: 0,
                closingHr: 24,
                closingMin: 0
            },
            {
                openingHr: 11,  //Saturday
                openingMin: 0,
                closingHr: 24,
                closingMin: 0
            }
        ];
        this.updateToday();
        this.initOhMsg(oh);
    }

    updateToday() {
        let numOfDay = this.getNowDate().getDay();
        let indexOfDay = 0 ? numOfDay = 6 : numOfDay = numOfDay -1;
        $('#main-opening-hours .oh-table__row').removeClass('oh-table__row--active');
        $($('#main-opening-hours .oh-table__row').eq(indexOfDay)).addClass('oh-table__row--active');
    }

    updateTimeMsg(msg,hrs,mins){
        msg = msg || '';
        hrs = hrs || 0;
        mins = mins || 0;
        $('#oh-message').text(msg);
        if (this.curCountdownMins!==mins ) {
            $('#oh-message').animateCss('fadeInDown');
            this.curCountdownHrs = hrs;
            this.curCountdownMins = mins;
        }
        // console.log(msg,hrs,mins,this.curCountdownHrs,this.curCountdownMins);
    }

    countTimeDiff(fromTime, toTime){
        let diff = toTime - fromTime;
        let hours = new Date(diff).getUTCHours();
        let minutes = new Date(diff).getUTCMinutes();
        let seconds = new Date(diff).getUTCSeconds();
        if (hours ===0 && minutes ===0 && seconds<=59) {
            minutes =-1;
        }
        return {
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };
    }

    // helper function to return proper hour(s) and/or minute(s)
    compileTimeUnit(timeNum, timeUnit) {
        timeUnit = (timeUnit || "").trim();
        if (timeNum===-1 && timeUnit ==='minute') {
            return ' less than a ' + timeUnit;
        }
        if (timeNum >1) {
            return ' ' + timeNum + ' ' + timeUnit + 's';
        } else if (timeNum === 1) {
            return ' ' + timeNum + ' ' + timeUnit;
        } else {
            return '';
        }
    }

    //helper function to set message
    compileMsg(benchmarkedOHdata,nowTimeData,action){
        let msg ='';
        let compareToDate = new Date(
            nowTimeData.getFullYear(),
            nowTimeData.getMonth(), 
            nowTimeData.getDate(),
            benchmarkedOHdata[action + 'Hr'], 
            benchmarkedOHdata[action + 'Min'],
            0
        );
        let countDownTime = this.countTimeDiff(nowTimeData, compareToDate);
        msg = "We are " + action + " in" + 
            this.compileTimeUnit(countDownTime.hours,'hour') + 
            this.compileTimeUnit(countDownTime.minutes,'minute') + 
            ".";
            this.ohMsg = msg;
        return {
            msg: msg,
            hours: countDownTime.hours,
            minutes: countDownTime.minutes
        };
    }

    initOhMsg(ohData) {
        let _self = this;
        let msg;
        let now = this.getNowDate();
        //now = new Date('2018','9','21','22','5','0');
        let nowHours = now.getHours();

        // is it opened or closed today?
        if (nowHours>=ohData[now.getDay()].openingHr && nowHours<ohData[now.getDay()].closingHr ) {
            msg = "We are open at the moment.";
            _self.updateTimeMsg(msg);
            if (ohData[now.getDay()].closingHr - nowHours <=2) {
                this.clockInterval(function(){
                    now = _self.getNowDate();
                    msg = _self.compileMsg(ohData[now.getDay()], now, 'closing');
                    _self.updateTimeMsg(msg.msg,msg.hours, msg.minutes);
                    _self.updateToday();
                });
            } else {
                _self.updateTimeMsg(msg);
            }
        }  else  {
            msg = "Restaurant is now closed.";
            _self.updateTimeMsg(msg);
            if (Math.abs(ohData[now.getDay()].openingHr - nowHours) <=2) {
                this.clockInterval(function(){
                    now = _self.getNowDate();
                    msg = _self.compileMsg(ohData[now.getDay()], now, 'opening');
                    _self.updateTimeMsg(msg.msg,msg.hours, msg.minutes);
                    _self.updateToday();
                });
            } else {
                _self.updateTimeMsg(msg);
            }
        }
        return msg;
        
    }


}

export default OpeningHours;