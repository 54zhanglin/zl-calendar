//毫秒时间格式化
Date.prototype.format = function (formatStr) {    
    var date = this;    
    /*   
    函数：填充0字符   
    参数：value-需要填充的字符串, length-总长度   
    返回：填充后的字符串   
    */   
    var zeroize = function (value, length) {    
        if (!length) {    
        length = 2;    
        }    
        value = new String(value);    
        for (var i = 0, zeros = ''; i < (length - value.length); i++) {    
        zeros += '0';    
        }    
        return zeros + value;    
    };    
    return formatStr.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|M{1,4}|yy(?:yy)?|([hHmstT])\1?|[lLZ])\b/g, function($0) {    
        switch ($0) {    
	        case 'd': return date.getDate();    
	        case 'dd': return zeroize(date.getDate());    
	        case 'ddd': return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][date.getDay()];    
	        case 'dddd': return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];    
	        case 'M': return date.getMonth() + 1;    
	        case 'MM': return zeroize(date.getMonth() + 1);    
	        case 'MMM': return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()];    
	        case 'MMMM': return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][date.getMonth()];    
	        case 'yy': return new String(date.getFullYear()).substr(2);    
	        case 'yyyy': return date.getFullYear();    
	        case 'h': return date.getHours() % 12 || 12;    
	        case 'hh': return zeroize(date.getHours() % 12 || 12);    
	        case 'H': return date.getHours();    
	        case 'HH': return zeroize(date.getHours());    
	        case 'm': return date.getMinutes();    
	        case 'mm': return zeroize(date.getMinutes());    
	        case 's': return date.getSeconds();    
	        case 'ss': return zeroize(date.getSeconds());    
	        case 'l': return date.getMilliseconds();    
	        case 'll': return zeroize(date.getMilliseconds());    
	        case 'tt': return date.getHours() < 12 ? 'am' : 'pm';    
	        case 'TT': return date.getHours() < 12 ? 'AM' : 'PM';    
        }    
    });
}
    
    
//获取滚动条当前的位置 
function getScrollTop() { 
	return document.documentElement.scrollTop + document.body.scrollTop; 
} 

//获取当前可视范围的高度/宽度 
function getClientHeight() { 
	var clientHeight = 0; 
	var bodyCH = document.body.clientHeight;
	var documentCH = document.documentElement.clientHeight;
	if (bodyCH && documentCH) { 
		clientHeight = Math.min(bodyCH, documentCH); 
	} 
	else { 
		clientHeight = Math.max(bodyCH, documentCH); 
	} 
	return clientHeight; 
} 
function getClientWidth() { 
	var clientWidth = 0; 
	var bodyCW = document.body.clientWidth;
	var documentCW = document.documentElement.clientWidth;
	if (bodyCW && documentCW) { 
		clientWidth = Math.min(bodyCW, documentCW); 
	} 
	else { 
		clientWidth = Math.max(bodyCW, documentCW); 
	} 
	return clientWidth; 
}

//获取文档完整的高度
function getScrollHeight() { 
	return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight); 
}


function getMonthDayNumber(year, month) {
	return (new Date(year, month, 0)).getDate();
}

function getFistDayOfWeek(value) {
	var year = value.getFullYear();
	var month = value.getMonth() + 1;
	var firstDay = year + "-" + month + "-1";
	return (new Date(firstDay)).getDay();
	
}

function getLastMonthDayNumber(value) {
	var year = value.getFullYear();
	var month = value.getMonth() + 1;
	var lastMonth = parseInt(month) - 1;
	if (parseInt(month) == 1) {
		lastMonth = 12;
	}
	return getMonthDayNumber(year, lastMonth, 0);
}

function getYearOfLastMonth(value) {
	var year = value.getFullYear();
	var month = value.getMonth() + 1;
	if (month == 1) {
		return year - 1;
	}else {
		return year;
	}
}

function getYearOfNextMonth(value) {
	var year = value.getFullYear();
	var month = value.getMonth() + 1;
	if (month == 12) {
		return year + 1;
	}else {
		return year;
	}
}

function getMonthDays(value) {
	var year = value.getFullYear();
	var month = value.getMonth() + 1;
	var today = new Date();
	today = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + (today.getDate() < 10 ? ("0" + today.getDate()) : today.getDate());
	var days = [];
	var firstDayOfWeek = getFistDayOfWeek(value);
	var lastMonthDayNumber = getLastMonthDayNumber(value);
	var nowMonthDayNumber = getMonthDayNumber(year, month);
	
	var yearOfLastMonth = getYearOfLastMonth(value);
	var lastMonth = (month == 1) ? 12 : (month - 1);
	var yearOfNextMonth = getYearOfNextMonth(value);
	var nextMonth = (month == 12) ? 1 : (month + 1);
	
	if (lastMonth < 10) {
		lastMonth = "0" + lastMonth;
	}
	if(month < 10) {
		month = "0" + month;
	}
	if(nextMonth < 10) {
		nextMonth = "0" + nextMonth;
	}
	
	for (var i = (lastMonthDayNumber - firstDayOfWeek + 1); i < (lastMonthDayNumber + 1); i++){
		var dayObj = {value: i, type: "last", name: yearOfLastMonth + "-" + lastMonth + "-" + i};
		days.push(dayObj);
	}
	for (var i=1; i < (nowMonthDayNumber + 1); i++){
		var day = i;
		if (day < 10) {
			day = "0" + day;
		}
		var dayObj = {value: day, type: "now", name: year + "-" + month + "-" + day};
		if ((year + "-" + month + "-" + day) === today) {
			dayObj.today = true;
		}
		days.push(dayObj);
	}
	var count = days.length;
	for (var i=1; i < (43 - count); i++) {
		var day = i;
		if (day < 10) {
			day = "0" + day;
		}
		var dayObj = {value: day, type: "next", name: yearOfNextMonth + "-" + nextMonth + "-" + day};
		days.push(dayObj);
	}
	return days;
}

//获取当前月份日历主体html字符串
function getCalendarTableBodyHtml(date, eventsObj) {
	//sortData(eventsObj);
	
	var obj = getMonthDays(new Date(date));
	
	var htmlArray = new Array();
	for (var i = 0; i < (obj.length / 7); i++) {
		var o = obj.slice((i * 7), ((i + 1) * 7));
		var tdBgArray = new Array();
		for (var j = 0; j < o.length; j++) {
			var tdBg = '<td data-date="' + o[j].name + '">&nbsp;</td>';
			tdBgArray.push(tdBg);
		}
		
		var tdHtml = getEventsHtml(o, eventsObj);
		
		var trHtml = '<div class="calendar-month-rows">' + 
						'<table class="calendar-row-bg ui seven column celled table">' +
							'<tbody><tr>' + 
								tdBgArray.join("") +
							'</tr></tbody>' + 
						'</table>'+
						'<table class="calendar-row-body ui small seven column table">' +
							'<tbody>' +
								tdHtml + 
							'</tbody>' + 
						'</table>' +
					 '</div>';
		
		
		htmlArray.push(trHtml);
	}
	
	var html = htmlArray.join("");
	
	return html;
}

//根据阶段时间进行排序
function sortSelectedEvents(events) {
	//初步排序
	events.sort(function(m, n) {
		var mStart = new Date(m.startDate).getTime();
		var mEnd = new Date(m.endDate).getTime();
		var nStart = new Date(n.startDate).getTime();
		var nEnd = new Date(n.endDate).getTime();
		
		if (mStart > nStart) {
			return true;
		}
		if (mStart == nStart) {
			if (mEnd > nEnd) {
				return false
			}else {
				return true
			}
		}
		return false;
	});
	
	var array = new Array();
	
	while(events && events.length > 0){
		var e = events[0];
		array.push(e);
		events = removeArrayNum(events, 0);
		
		var stop = new Date(e.endDate).getTime();
		var nArray = new Array();
		for (var i = 0; i < events.length; i++) {
			if (stop < new Date(events[i].startDate).getTime()) {
				array.push(events[i]);
				nArray.push(i);
				stop = new Date(events[i].endDate).getTime();
			}
		}
		
		for (var i = 0; i < nArray.length; i++) {
			events = removeArrayNum(events, nArray[i] - i);
		}
	}
	
	return array;
}

//在数组内删除指定的项
function removeArrayNum(array, n) {
	var a = new Array();
	for (var i = 0; i < array.length; i++) {
		if (i != n) {
			a.push(array[i]);
		}
	}
	return a;
}

//克隆数组
function cloneArray(array) {
	var newArray = new Array();
	for (var i = 0; i < array.length; i++) {
		newArray.push(array[i]);
	}
	return newArray;
}

//获取日历主体信息html
function getEventsHtml(obj, events) {
	//先从所有事件中检索出与当前行有关的事件数组
	var selectedEvents = new Array();	//选出的事件组
	var lineStart = new Date(obj[0].name).getTime();	//行开始时间
	var lineEnd = new Date(obj[obj.length - 1].name).getTime();	//行结束时间
	
	for (var k = 0; k < events.length; k++) {
		var startDate = new Date(events[k].startDate).getTime();	//事件开始时间
		var endDate = new Date(events[k].endDate).getTime();		//事件结束时间
		
		if (startDate < lineStart && endDate >= lineStart) {
			selectedEvents.push(events[k]);
			continue;
		}
		
		if (startDate >= lineStart && startDate <= lineEnd) {
			selectedEvents.push(events[k]);
			continue;
		}
	}
	
	//对选出的事件进行优先级排序
	selectedEvents = sortSelectedEvents(selectedEvents);
	
	//获取基础背景的表格tr
	var basicArray = new Array();
	for (var i = 0; i < obj.length; i++) {
		var tdClass = ((obj[i].type == "last") || ((obj[i].type == "next"))) ? obj[i].type : "";
		tdClass = obj[i].today ? (tdClass + " today") : tdClass;
		
		var td = '<td class="' + tdClass + '">' + (obj[i].value == "01" ? obj[i].name : obj[i].value ) + '</td>';
		basicArray.push(td);
	}
	var basicHtml = '<tr class="calendar-basic-date">' + basicArray.join("") + '</tr>';
	
	//calendar时间事件渲染
	var dateArray = new Array();
	
	//标注当前进度
	var n = 0;
	var tdArray = new Array(); //事件行td列表
	
	var eventItemArray = new Array();	//事件行列表
	
	for (var i = 0; i < selectedEvents.length; i++) {
		//是否找到头或者尾了的预设
		var findStart = false;
		var startObj = "";
		var colspan = 1;
		var startUp = false; //事件是否承接了上行
		
		//查验当前事件是否承接上行
		if (lineStart > new Date(selectedEvents[i].startDate).getTime()) {
			startUp = true;
			findStart = true;
		}
		
		//判断当前obj进度是否还能进行事件渲染的需要
		//需要另起一行
		var newLine = false;
		if (n > 0) {
			if (n > obj.length - 1 || ((new Date(selectedEvents[i].startDate).getTime()) < (new Date(obj[n].name).getTime()))) {
				if (tdArray.length > 0) {
					for (var k = n; k < obj.length; k++) {
						td = '<td></td>';
						tdArray.push(td);
					}
				}
				
				var eventHtml = '<tr class="calendar-event-date">' + tdArray.join("") + '<tr>';
				eventItemArray.push(eventHtml);
				n = 0;
				tdArray = [];
			}
		}
		
		for (var j = n; j < obj.length; j++) {
			n++;
			//是不是头
			if (obj[j].name == selectedEvents[i].startDate) {
				findStart = true;
				startUp = false;
				
				startObj = obj[j];
				
				//这个头是不是尾巴
				if (obj[j].name == selectedEvents[i].endDate) {
					td = '<td colspan="' + colspan + '">' + 
							'<div class="td-pos">' + 
								'<div class="td-n">' + 
									'<div class="td-ni">' + 
										selectedEvents[i].title + 
									'</div>' + 
								'</div>' + 
							'</div>' + 
						  '</td>';
					tdArray.push(td);
					break;
				}else {
					//是否已经到了行末
					if (j == obj.length - 1) {
						td = '<td colspan="' + colspan + '">' + 
								'<div class="td-pos">' + 
									'<div class="td-n td-right">' + 
										'<div class="td-ni">' + 
											'<span class="right"></span>' + 
											'<span class="right1"></span>' + 
											selectedEvents[i].title + 
										'</div>' + 
									'</div>' + 
								'</div>' + 
							  '</td>';
						tdArray.push(td);
						break;
					}else {
						colspan++;
					}
				}
			}else {
				//判断头找到了没有
				if(!findStart) {	//还没有找到头
					td = '<td></td>';	//如果头还没有找到，打个占位符
					tdArray.push(td);
					colspan = 1;
				}else {	//头找到了
					//判断是不是尾巴
					if (obj[j].name == selectedEvents[i].endDate) { //找到尾巴了
						//判断是否承接了上行的事件
						if (startUp) {	//事件在上行开始，本行结束
							td = '<td colspan="' + colspan + '">' + 
									'<div class="td-pos">' + 
										'<div class="td-n td-left">' + 
											'<div class="td-ni">' + 
												'<span class="left"></span>' + 
												'<span class="left1"></span>' + 
												selectedEvents[i].title + 
											'</div>' + 
										'</div>' + 
									'</div>' + 
								  '</td>';
							tdArray.push(td);
							break;
						}else {	//事件在本行开始本行结束
							td = '<td colspan="' + colspan + '">' + 
									'<div class="td-pos">' + 
										'<div class="td-n">' + 
											'<div class="td-ni">' + 
												selectedEvents[i].title + 
											'</div>' + 
										'</div>' + 
									'</div>' + 
								  '</td>';
							tdArray.push(td);
							break;
						}
						
					}else {	//如果不是尾巴
						//有没有到了行尾部
						if ((j == obj.length - 1) && (new Date(selectedEvents[i].endDate).getTime() > (new Date(obj[obj.length - 1].name).getTime()))) {	//到了行末了，事件还未完成
							if (startUp) {
								td = '<td colspan="' + colspan + '">' + 
								'<div class="td-pos">' + 
									'<div class="td-n td-left td-right">' + 
										'<div class="td-ni">' + 
											'<span class="left"></span>' + 
											'<span class="left1"></span>' + 
											'<span class="right"></span>' + 
											'<span class="right1"></span>' + 
											selectedEvents[i].title + 
										'</div>' + 
									'</div>' + 
								'</div>' + 
							  '</td>';
							}else {
								td = '<td colspan="' + colspan + '">' + 
										'<div class="td-pos">' + 
											'<div class="td-n td-right">' + 
												'<div class="td-ni">' + 
													'<span class="right"></span>' + 
													'<span class="right1"></span>' + 
													selectedEvents[i].title + 
												'</div>' + 
											'</div>' + 
										'</div>' + 
									  '</td>';
							}
							tdArray.push(td);
							break;
							colspan = 1;
						}else {
							colspan++;
						}
					}
				}
			}
		}	//for结束
	}
	
	if (tdArray.length > 0) {
		var eventHtml = '<tr class="calendar-event-date">' + tdArray.join("") + '<tr>';
		eventItemArray.push(eventHtml);
	}
	
	if (eventItemArray.length > 3) {
		eventItemArray = eventItemArray.slice(0, 3);
	}
	
	return basicHtml + eventItemArray.join("");
}

//获取当前td的位置
function getIndexDate(e) {
	var $this = $(e.target);
	
	var n = 0;
	var $t = $this;
	
	while($t.prev()[0]) {
		$t = $t.prev();
		n++;
	}
	
	var backDate = $($this.parent().parent().parent().parent().find(".calendar-row-bg tbody tr td")[n]);
	return backDate.attr("data-date");
}
