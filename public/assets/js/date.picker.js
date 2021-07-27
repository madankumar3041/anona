$(function() {
	"use strict";
	$( ".datepicker" ).datepicker({
		showOtherMonths:false,
		numberOfMonths: 1,
		selectOtherMonths: true,
		dateFormat:"dd / mm / yy",
		changeMonth: true,
		changeYear: true,
		yearRange: "-50:+0" ,
		defaultDate: "dateToday",
		minDate: "dateToday"
	});
	$( ".birthDate" ).datepicker({	 
		showOtherMonths:true,
		numberOfMonths: 1,
		selectOtherMonths: true,
		dateFormat:"dd / mm / yy",
		changeMonth: true,
		changeYear: true,
		yearRange: "-50:+0",
		maxDate: "+0m +0w"
	});
});
