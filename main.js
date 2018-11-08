(function () {
    var datepicker = window.DatePicker;
    //console.log("in main.je", datepicker)
    var monthData = datepicker.getMonthData();
    var wrapper = document.createElement('div');
    wrapper.classList.add("t_picker")
    document.body.appendChild(wrapper);
    //console.log(monthData1)
    datepicker.get_this_month = function (monthData) {
        //确定当月月份
        var temp_month = {};
        for (var i = 0; i < monthData.length; i++) {
            if (!temp_month[monthData[i].month]) {
                temp_month["" + monthData[i].month + ""] = 1;
            } else {
                temp_month["" + monthData[i].month + ""] += 1;
            }
        }
        var this_month = 0;
        for (i in temp_month) {
            if (temp_month[i] > 25) {
                this_month = i;
            }
        }
        //确定结束
        return this_month;
    }
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
        var this_month = datepicker.get_this_month(monthData);
        //var monthData = datepicker.getMonthData(year, month);

        var html = '<table id="table_container" class="cal" summary="A calendar style date picker">' +
            '<caption>' +
            '<a href="#" class="control-btn prev" rel="prev">&lt</a>' +
            '<span>' + monthData[10].year + " - " + this_month + '</span>' +
            '<a href="#" class="control-btn after" rel="after">&gt</a>' +
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
            if (monthData[i].date > 0 && monthData[i].date <= getMonthDay(monthData[i].year, this_month)) {
                html += '<td class=\"this_month\"">' +   date.showDate + "</td>";
            } else {
                html += '<td ">' + date.showDate + "</td>";
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
    datepicker.render = function (year, month) {
        var html = datepicker.buildUI(year, month);
        //console.log("in init", html, "\n dom", dom)
        //console.log("in render",year,month,html)
        
        wrapper.innerHTML = html;

    }
    datepicker.init = function (input) {
        datepicker.render();
       
        var target = document.querySelector(input);
        
        target.addEventListener('click', function () {
            if (wrapper.classList.contains("t_picker")) {
                wrapper.classList.remove("t_picker")
                wrapper.classList.add("t_picker-show");
                
            } else {
                wrapper.classList.remove("t_picker-show")
                wrapper.classList.add("t_picker");
                var left = target.offsetLeft;
                var top = target.offsetTop;
                var height = target.offsetHeight;
                wrapper.style.top = top + height + 2 + "px";
                wrapper.style.left = left + "px";
                isNotOpen = true;
            }
            wrapper.addEventListener("click", function (e) {
                var btn = e.target;
                var this_month = datepicker.get_this_month(monthData);
                if (!btn.classList.contains("control-btn")) {
                    return;
                }
                //check control btn
                if (btn.classList.contains("prev")) {
                    //console.log("prev", this_month, monthData)
                    if (this_month > 1) {
                        //console.log("prev if\n")
                        monthData = datepicker.getMonthData(monthData[10].year, this_month - 1)
                        datepicker.render(monthData[10].year, this_month - 1);
                    } else{
                        //console.log("prev else\n")
                        monthData = datepicker.getMonthData(monthData[10].year-1,12);
                        datepicker.render(monthData[10].year - 1, 12);
                    }
                } else if (btn.classList.contains("after")) {
                    //console.log("after", this_month, monthData)
                    if (this_month < 12) {
                        //console.log("after if\n")
                        monthData = datepicker.getMonthData(monthData[10].year,this_month-(-1));
                        datepicker.render(monthData[10].year, this_month-(-1));
                    } else {
                        //console.log("after else\n")
                        monthData = datepicker.getMonthData(monthData[10].year + 1, 1);
                        datepicker.render(monthData[10].year + 1, 1);
                    }
                }//end check control
                
                
            });//wrapper add Event end
           
           
            wrapper.addEventListener("click",function(e){
                var input = document.getElementsByTagName("input")[0];
                var year_month = e.target.parentNode.parentNode.parentNode.caption.children[1].innerHTML;
                console.log("new e",e.target,e.target.nodeName,e.target.innerHTML,e.target.parentNode.parentNode.parentNode.caption.children[1])
                if(e.target.nodeName === "TD"){
                    input.value =   year_month+" - " +e.target.innerHTML;
                    if(wrapper.classList.contains("t_picker-show")){
                        wrapper.classList.remove("t_picker-show");
                        wrapper.classList.add("t_picker");
                    }
                    
                }
                
            })

        })
    } //end init


})(); //end main closure