(function(){
    var DatePicker = {};

    DatePicker.helloworld = function(){
        console.log("hello world,in iife")
    }
    DatePicker.getMonthData = function(year,month){
        var ret = [];
        if(!year || !month){
            var today = new Date();//没有给就默认今天；
            year = today.getFullYear();
            month = today .getMonth() +1 ;
        }
        else{
            var firstDay = new Date(year,month-1,1);
            var firstDayWeekDay = firstDay.getDay();
            if(firstDayWeekDay ===0){
                firstDayWeekDay=7;
            }
            var lastDayOfLastMonth = new Date(year,month-1,0);
            var lastDateOfLastMonth = lastDayOfLastMonth.getDate();

            var preMonthDayCount = firstDayWeekDay -1;

            var lastDayOfMonth = new Date(year,month,0);//利用越界，本月最后一天；
            var lastDate = lastDayOfMonth.getDate();
            console.dir(firstDay,firstDayWeekDay,lastDateOfLastMonth,lastDateOfLastMonth,preMonthDayCount,lastDayOfMonth,lastDate)
            for(var i=0;i<7*6;i++){
                var date = i+1-preMonthDayCount;
            }
        }
    }
    window.DatePicker = DatePicker;
})()