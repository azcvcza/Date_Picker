(function(){
    var DatePicker = {};

    DatePicker.helloworld = function(){
        console.log("hello world,in iife")
    }
    DatePicker.getMonthData = function(year,month){
        var ret = [];
        //console.log("in get MonthData");
        if(!year || !month){
            console.log("default");
            var today = new Date();//没有给就默认今天；
            year = today.getFullYear();
            month = today .getMonth() +1 ;
        }
        
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
            //console.log("firstDaY: "+firstDay+"\n","firstDaYWeekDay: "+firstDayWeekDay+"\n","lastDayOfLastMonth: "+lastDayOfLastMonth+"\n","lastDateOfLastMonth: "+lastDateOfLastMonth+"\n","preMonthDayCount: "+preMonthDayCount+"\n","lastDaYOfMonth :"+lastDayOfMonth+"\n","latDat: "+lastDate+"\n")
            for(var i=0;i<7*5;i++){
                var date = i+1-preMonthDayCount;
                var showDate = date;
                var thisMonth = month;
                // last month
                if(date<=0){
                    thisMonth = month-1; 
                    showDate = lastDateOfLastMonth + date;
                    //console.log("showDate",showDate,lastDateOfLastMonth);
                }else if(date > lastDate){
                    //next month
                    thisMonth = month+1;
                    showDate = showDate - lastDate;
                }
                if(thisMonth ===0){
                    thisMonth=12;
                }
                if(thisMonth ===13){
                    thisMonth =1;
                }
                ret.push({
                    month:thisMonth,
                    date:date,
                    showDate:showDate
                })

            }
        
        //console.table(ret);
        return ret;
    }
    window.DatePicker = DatePicker;
})()