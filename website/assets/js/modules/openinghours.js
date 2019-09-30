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
        this.oh = [
            [[12,0],[22,0]], //Sunday
            [[11,0],[15,0],[17,0],[22,0]],
            [[11,0],[15,0],[17,0],[22,0]],
            [[11,0],[15,0],[17,0],[22,0]],
            [[11,0],[15,0],[17,0],[22,0]],
            [[11,0],[15,0],[17,0],[22,0]],
            [[12,0],[22,0]] //Saturday
        ];
        this.initOH();
        this.publicHolidays = new Holidays();
    }

    initOH() {
        let htmlOHSnippet = this.buildOHtable(this.oh);
        $('#oh-table-snippet').html(htmlOHSnippet);
        this.updateToday();
        this.initOhMsg(this.oh);
    }

    updateToday() {
        let numOfDay = this.getNowDate().getDay();
        let indexOfDay = numOfDay === 0 ? numOfDay = 6 : numOfDay = numOfDay -1;
        $('#oh-table-snippet .oh-table__row').removeClass('oh-table__row--active');
        $($('#oh-table-snippet .oh-table__row').eq(indexOfDay)).addClass('oh-table__row--active');
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
            benchmarkedOHdata[0], 
            benchmarkedOHdata[1],
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
        let now = _self.getNowDate();
        // now = new Date('2019','8','30','10','41','0');
        let nowHours = now.getHours();
        
        // is it opened or closed today?
        let checkOpened = checkIfOpened(nowHours,ohData[now.getDay()]);

        if (checkOpened.isOpened) {
            msg = "We are open at the moment.";
            _self.updateTimeMsg(msg);
            if (ohData[now.getDay()][checkOpened.pos + 1][0] - nowHours <=2) {
                this.clockInterval(function(){
                    now = _self.getNowDate();
                    msg = _self.compileMsg(
                        [
                            ohData[now.getDay()][checkOpened.pos + 1][0], 
                            ohData[now.getDay()][checkOpened.pos + 1][1]
                        ], 
                        now, 
                        'closing');
                    _self.updateTimeMsg(msg.msg,msg.hours, msg.minutes);
                    _self.updateToday();
                });
            } else {
                _self.updateTimeMsg(msg);
            }
        }  else  {
            msg = "Restaurant is now closed.";
            _self.updateTimeMsg(msg);
            if (Math.abs(ohData[now.getDay()][checkOpened.pos][0] - nowHours) <=2) {
                this.clockInterval(function(){
                    now = _self.getNowDate();
                    msg = _self.compileMsg(
                        [
                            ohData[now.getDay()][checkOpened.pos][0], 
                            ohData[now.getDay()][checkOpened.pos][1]
                        ],
                        now, 
                        'opening');
                    _self.updateTimeMsg(msg.msg,msg.hours, msg.minutes);
                    _self.updateToday();
                });
            } else {
                _self.updateTimeMsg(msg);
            }
        }
        // helper functions
        function checkIfOpened(hourToCheck, timeIntArr) {
            let pos = 0;
            for (var i = 0; i < timeIntArr.length - 1; i++) {
                if (i%2 === 0) {
                    if (hourToCheck >= timeIntArr[i][0] && hourToCheck < timeIntArr[i+1][0]) {
                        pos = i;
                        return {
                            isOpened: true,
                            pos: pos
                        }
                    }
                    if (hourToCheck < timeIntArr[i][0]) {
                        if (i > 0 ) {
                            if (hourToCheck > timeIntArr[i-1][0]) {
                                pos = i;
                            }
                        } else {
                            pos = i;
                        }
                        
                    }
                }
            }
            return {
                isOpened: false,
                pos: pos
            }
        }
        return msg;
        
    }

    buildOHtable(ohData) {
        let _self = this;
        let html = '';
        let dayIndex = 0;
        for (let i = 0; i <= 6; i++) {
            dayIndex = i + 1;
            dayIndex === 7 ? dayIndex = 0 : dayIndex = dayIndex;
            html+= '<tr class="oh-table__row">';
            html+= '<td class="oh-table__day">';
            html+= '<span class="oh-table__day--holiday-icon"><i class="fas fa-umbrella-beach"></i>&nbsp;&nbsp</span>';
            html+= _self.days[dayIndex];
            html+= '</td>'
            html+= '<td class="oh-table__hours">';
            html+= buildOHDay(ohData[dayIndex]);
            html+= '</td></tr>';
        }
        html = '<table class="oh-table" id="main-opening-hours">' + html + '</table>';
        return html;

        // helper functions
        function buildOHDay(ohDataPerDay) {
            let html = '';
            let countHrsMins = 0;
            ohDataPerDay.map((ohPerDay, ind) => {
                countHrsMins += ohDataPerDay[ind][0] + ohDataPerDay[ind][1];
                html += meridiemTime(ohDataPerDay[ind][0]) + ':' + normalizeDigit(ohDataPerDay[ind][1]) + '<sup>' + meridiemTimeAbbr(ohDataPerDay[ind][0]) + '</sup>';
                ind%2 === 1 ? html += '&nbsp;&nbsp;&nbsp;' : html+= '&nbsp;&mdash;&nbsp;';
            })
            if (countHrsMins === 0) {
                return 'closed';
            }
            return html;
        }
        function normalizeDigit(num) {
            return num > 9 ? '' + num : '0' + num;
        }
        function meridiemTime(num) {
            return num > 12 ? num-12 : num;
        }
        function meridiemTimeAbbr(num) {
            return num > 12 ? 'p.m.' : 'a.m.';
        }
        
    }
}

export default OpeningHours;
