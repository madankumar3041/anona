$(document).ready(function () {
    $('#calendar').eCalendar({
 	weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	textArrows: {previous: '<span>‹</span>', next: '<span>›</span>'},
	eventTitle: 'Events',
	url: '',	
	events: [
{url: "", title:'<div class="delivered"></div><h4>Delivered</h4>', description: '<span><img src="images/food-delivery.svg" alt="meal"></span>', datetime: new Date(2021, 2, 01, 10,00)},
{url: "", title:'<div class="delivered"></div><h4>Delivered</h4>', description: '<span><img src="images/food-delivery.svg" alt="meal"></span>', datetime: new Date(2021, 2, 02, 10,00)},
{url: "", title:'<div class="delivered"></div><h4>Delivered</h4>', description: '<span><img src="images/food-delivery.svg" alt="meal"></span>', datetime: new Date(2021, 2, 03, 10,00)},
{url: "", title:'<div class="delivered"></div><h4>Delivered</h4>', description: '<span><img src="images/food-delivery.svg" alt="meal"></span>', datetime: new Date(2021, 2, 04, 10,00)},
{url: "", title:'<div class="off-day"></div><h4>OFF</h4>', description: '<span><img src="images/ban.svg" alt="ban"></span>', datetime: new Date(2021, 2, 05, 10,00)},
{url: "", title:'', description: '<input type="checkbox" class="styled-checkbox" id="calender2" name="calender" value=""><label for="calender2"><span><img src="images/select-meal.svg" alt="meal"></span><h4><p class="notselected">Not Selected</p><p class="selectedmeal">Meal Selected</p></h4></label>', datetime: new Date(2021, 2, 06, 10,00)},		
{url: "", title:'', description: '<input type="checkbox" class="styled-checkbox" id="calender3" name="calender" value=""><label for="calender3"><span><img src="images/select-meal.svg" alt="meal"></span><h4><p class="notselected">Not Selected</p><p class="selectedmeal">Meal Selected</p></h4></label>', datetime: new Date(2021, 2, 07, 10,00)},		
{url: "", title:'', description: '<input type="checkbox" class="styled-checkbox" id="calender4" name="calender" value=""><label for="calender4"><span><img src="images/select-meal.svg" alt="meal"></span><h4><p class="notselected">Not Selected</p><p class="selectedmeal">Meal Selected</p></h4></label>', datetime: new Date(2021, 2, 08, 10,00)},
{url: "", title:'', description: '<input type="checkbox" class="styled-checkbox" id="calender5" name="calender" value=""><label for="calender5"><span><img src="images/select-meal.svg" alt="meal"></span><h4><p class="notselected">Not Selected</p><p class="selectedmeal">Meal Selected</p></h4></label>', datetime: new Date(2021, 2, 09, 10,00)},
{url: "", title:'', description: '<input type="checkbox" class="styled-checkbox" id="calender6" name="calender" value=""><label for="calender6"><span><img src="images/select-meal.svg" alt="meal"></span><h4><p class="notselected">Not Selected</p><p class="selectedmeal">Meal Selected</p></h4></label>', datetime: new Date(2021, 2, 10, 10,00)},
{url: "", title:'', description: '<input type="checkbox" class="styled-checkbox" id="calender7" name="calender" value=""><label for="calender7"><span><img src="images/select-meal.svg" alt="meal"></span><h4><p class="notselected">Not Selected</p><p class="selectedmeal">Meal Selected</p></h4></label>', datetime: new Date(2021, 2, 11, 10,00)},
{url: "", title:'<div class="off-day"></div><h4>OFF</h4>', description: '<span><img src="images/ban.svg" alt="ban"></span>', datetime: new Date(2021, 2, 12, 10,00)},
{url: "", title:'', description: '<input type="checkbox" class="styled-checkbox" id="calender8" name="calender" value=""><label for="calender8"><span><img src="images/select-meal.svg" alt="meal"></span><h4><p class="notselected">Not Selected</p><p class="selectedmeal">Meal Selected</p></h4></label>', datetime: new Date(2021, 2, 13, 10,00)},
{url: "", title:'', description: '<input type="checkbox" class="styled-checkbox" id="calender9" name="calender" value=""><label for="calender9"><span><img src="images/select-meal.svg" alt="meal"></span><h4><p class="notselected">Not Selected</p><p class="selectedmeal">Meal Selected</p></h4></label>', datetime: new Date(2021, 2, 14, 10,00)},
{url: "", title:'', description: '<input type="checkbox" class="styled-checkbox" id="calender10" name="calender" value=""><label for="calender10"><span><img src="images/select-meal.svg" alt="meal"></span><h4><p class="notselected">Not Selected</p><p class="selectedmeal">Meal Selected</p></h4></label>', datetime: new Date(2021, 2, 14, 10,00)},
{url: "", title:'', description: '<input type="checkbox" class="styled-checkbox" id="calender11" name="calender" value=""><label for="calender11"><span><img src="images/select-meal.svg" alt="meal"></span><h4><p class="notselected">Not Selected</p><p class="selectedmeal">Meal Selected</p></h4></label>', datetime: new Date(2021, 2, 15, 10,00)},
{url: "", title:'<div class="paused-day"></div><h4>Freezed</h4>', description: '<span><img src="images/paused.svg" alt="paused"></span>', datetime: new Date(2021, 2, 16, 10,00)},
{url: "", title:'<div class="paused-day"></div><h4>Freezed</h4>', description: '<span><img src="images/paused.svg" alt="paused"></span>', datetime: new Date(2021, 2, 17, 10,00)},
{url: "", title:'<div class="paused-day"></div><h4>Freezed</h4>', description: '<span><img src="images/paused.svg" alt="paused"></span>', datetime: new Date(2021, 2, 18, 10,00)},		
{url: "", title:'<div class="off-day"></div><h4>OFF</h4>', description: '<span><img src="images/ban.svg" alt="ban"></span>', datetime: new Date(2021, 2, 19, 10,00)},
{url: "", title:'', description: '<input type="checkbox" class="styled-checkbox" id="calender12" name="calender" value=""><label for="calender12"><span><img src="images/select-meal.svg" alt="meal"></span><h4><p class="notselected">Not Selected</p><p class="selectedmeal">Meal Selected</p></h4></label>', datetime: new Date(2021, 2, 20, 10,00)},
{url: "", title:'', description: '<input type="checkbox" class="styled-checkbox" id="calender13" name="calender" value=""><label for="calender13"><span><img src="images/select-meal.svg" alt="meal"></span><h4><p class="notselected">Not Selected</p><p class="selectedmeal">Meal Selected</p></h4></label>', datetime: new Date(2021, 2, 21, 10,00)},		
{url: "", title:'', description: '<input type="checkbox" class="styled-checkbox" id="calender14" name="calender" value=""><label for="calender14"><span><img src="images/select-meal.svg" alt="meal"></span><h4><p class="notselected">Not Selected</p><p class="selectedmeal">Meal Selected</p></h4></label>', datetime: new Date(2021, 2, 22, 10,00)},	
{url: "", title:'', description: '<input type="checkbox" class="styled-checkbox" id="calender15" name="calender" value=""><label for="calender15"><span><img src="images/select-meal.svg" alt="meal"></span><h4><p class="notselected">Not Selected</p><p class="selectedmeal">Meal Selected</p></h4></label>', datetime: new Date(2021, 2, 23, 10,00)},		
{url: "", title:'', description: '<input type="checkbox" class="styled-checkbox" id="calender16" name="calender" value=""><label for="calender16"><span><img src="images/select-meal.svg" alt="meal"></span><h4><p class="notselected">Not Selected</p><p class="selectedmeal">Meal Selected</p></h4></label>', datetime: new Date(2021, 2, 24, 10,00)},		
{url: "", title:'', description: '<input type="checkbox" class="styled-checkbox" id="calender17" name="calender" value=""><label for="calender17"><span><img src="images/select-meal.svg" alt="meal"></span><h4><p class="notselected">Not Selected</p><p class="selectedmeal">Meal Selected</p></h4></label>', datetime: new Date(2021, 2, 25, 10,00)},
{url: "", title:'<div class="off-day"></div><h4>OFF</h4>', description: '<span><img src="images/ban.svg" alt="ban"></span>', datetime: new Date(2021, 2, 26, 10,00)},
{url: "", title:'', description: '<input type="checkbox" class="styled-checkbox" id="calender18" name="calender" value=""><label for="calender18"><span><img src="images/select-meal.svg" alt="meal"></span><h4><p class="notselected">Not Selected</p><p class="selectedmeal">Meal Selected</p></h4></label>', datetime: new Date(2021, 2, 27, 10,00)},		
{url: "", title:'<div class="paused-day"></div><h4>Freezed</h4>', description: '<span><img src="images/paused.svg" alt="paused"></span>', datetime: new Date(2021, 2, 28, 10,00)},
{url: "", title:'<div class="paused-day"></div><h4>Freezed</h4>', description: '<span><img src="images/paused.svg" alt="paused"></span>', datetime: new Date(2021, 2, 29, 10,00)},
{url: "", title:'<div class="paused-day"></div><h4>Freezed</h4>', description: '<span><img src="images/paused.svg" alt="paused"></span>', datetime: new Date(2021, 2, 30, 10,00)},		
{url: "", title:'', description: '<input type="checkbox" class="styled-checkbox" id="calender19" name="calender" value=""><label for="calender19"><span><img src="images/select-meal.svg" alt="meal"></span><h4><p class="notselected">Not Selected</p><p class="selectedmeal">Meal Selected</p></h4></label>', datetime: new Date(2021, 2, 31, 10,00)}
	]
		
	});
	/*function myFunction(){
					$('<style type="text/css">.c-day,.c-day-next-month,.c-day-previous-month{height:'+$('.c-day-parent').width()+'px;width:'+$('.c-day-parent').width()+'px;}</style>').appendTo('head');
					clearTimeout(timer);
				}
				var timer = setTimeout(myFunction, 1000);*/
});
