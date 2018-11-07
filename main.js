(function () {
    var datepicker = window.DatePicker;
    //console.log("in main.je", datepicker)

    datepicker.buildUI = function (year, month) {
        
        function getMonthDay(year, month) {
            var table_normal = {
                1: 31,
                2: 28,
                3: 31,
                4: 30,
                5: 31,
                6: 30,
                7: 31,
                8: 31,
                9: 30,
                10: 31,
                11: 30,
                12: 31
            };;
            var table_special = {
                1: 31,
                2: 29,
                3: 31,
                4: 30,
                5: 31,
                6: 30,
                7: 31,
                8: 31,
                9: 30,
                10: 31,
                11: 30,
                12: 31
            };
            if (checkYear(year)) {
                //闰年
                return table_special[month];
            } else {
                return table_normal[month];
            }
        }
        function checkYear(year) {
            if (year % 100 === 0) {
                if (year % 4 === 0) {
                    return true;
                }
            } else {
                if (year % 4 === 0) {
                    return true;
                }
            }
            return false;
        }
        
        var monthData = datepicker.getMonthData(year, month);
        //确定当月月份
        var temp_month = {};
        for(var i = 0;i<monthData.length;i++){
           if(!temp_month[monthData[i].month]){
            temp_month[""+monthData[i].month+""]=1;
           }
           else{
               temp_month[""+monthData[i].month+""]+=1;    
           }
        }
        var this_month = 0;
        for(i in temp_month){
            if(temp_month[i]>25){
                this_month = i;
            }
        }
        //确定结束
        var html = '<table id="table_container" class="cal" summary="A calendar style date picker">' +
            '<caption>' +
            '<a href="#" rel="prev">&lt</a>' +
            '<span>' + "January 2018" + '</span>' +
            '<a href="#" rel="after">&gt</a>' +
            '</caption>' +
            '<colgroup>' +
            '<col id="sun">' +
            '<col id="mon">' +
            '<col id="tue">' +
            '<col id="wed">' +
            '<col id="thur">' +
            '<col id="fri">' +
            '<col id="sat">' +
            '</colgroup>' +
            '<thead>' +
            '<tr>' +
            '<th scope="col">' + 'Sun' + '</th>' +
            '<th scope="col">' + 'Mon' + '</th>' +
            '<th scope="col">' + 'Tue' + '</th>' +
            '<th scope="col">' + 'Wed' + '</th>' +
            '<th scope="col">' + 'Tur' + '</th>' +
            '<th scope="col">' + 'Fri' + '</th>' +
            '<th scope="col">' + 'Sat' + '</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>';
        
        for (var i = 0; i < monthData.length; i++) {
            var date = monthData[i];
            if (i % 7 === 0) {
                //第一天
                html += '<tr>';
            }
            if (monthData[i].date > 0 && monthData[i].date <= getMonthDay(monthData[i].year,this_month)) {
                html += '<td>' + "<a href=\"#\">" + date.showDate + "</a></td>";
            } else{
                html += '<td class="null">' + date.showDate + "</td>";
            }
            if (i % 7 === 6) {
                //最后一天
                html += '</tr>';
            }
        }
        //console.log(html);
        html += '</tbody>' + '</table>'; //end template
        return html;
    } //end buildUI
    datepicker.init = function (dom) {
        var html = datepicker.buildUI();
        //console.log("in init", html, "\n dom", dom)

        dom.innerHTML = html;
    } //end init


})(); //end main closure