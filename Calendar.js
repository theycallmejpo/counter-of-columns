
//Constructor

function Calendar(tag) {
	this.tag = tag;
};

// Instance method

Calendar.prototype.render = function(inputDate) {
	
	var tag = this.tag;

	var date = new Date(inputDate.toDateString());
	var day = date.getDate();
	var month = date.getMonth();
	var year = date.getFullYear();


	// arrays with names
	var dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
	var monthNames = [ "January", "February", "March", "April", "May", 
						"June","July", "August", "September", "October", "November", "December" ];

	var path = document.getElementById(tag);

	var startDate = new Date(date.toDateString());
	startDate.setDate(1);


	date.setDate(startDate.getDate() - startDate.getDay());


	var dateDiff = startDate.getDay();
	
	// hack to get days in current month
	var daysInMonth = new Date(inputDate.getFullYear(), inputDate.getMonth() + 1, 0).getDate();


	var tablePath = CreateTable(dayNames, path, inputDate, monthNames, tag);
	PopulateDates(date, dateDiff, daysInMonth, tablePath);


	// set next and last month dates
	var nextMonth = new Date(inputDate.toDateString());
	nextMonth.setDate(1);
	var lastMonth = new Date(inputDate.toDateString());
	lastMonth.setDate(1);
	nextMonth.setMonth(nextMonth.getMonth() + 1);
	lastMonth.setMonth(lastMonth.getMonth() - 1);


	tablePath.children[1].children[0].children[0].onclick = function() { clearAndAdd(tag, lastMonth) };
	tablePath.children[1].children[2].children[0].onclick = function() { clearAndAdd(tag, nextMonth) };

};

function CreateTable(daysArr, path, inputDate, monthNames, tag) {


	path.innerHTML += "<table class='calendarTable'></table>";
	
	var main = document.getElementById(tag).firstChild;
	console.log(main);
	
	main.innerHTML += "<tr class='header'><td colspan='7'> Juan Posadas' Calendar </td></tr>";
	
	//setting rows with DOM

	main.appendChild(document.createElement("TR"));
	var infoTr = main.children[1];
	infoTr.appendChild(document.createElement("TD"));
	infoTr.children[0].setAttribute("class", "noBorder");
	infoTr.children[0].appendChild(document.createElement("BUTTON"));
	infoTr.children[0].children[0].appendChild(document.createTextNode(" < "));
	

	infoTr.appendChild(document.createElement("TD"));
	infoTr.children[1].setAttribute("colspan", "2");
	infoTr.children[1].appendChild(document.createTextNode(monthNames[inputDate.getMonth()]));

	infoTr.appendChild(document.createElement("TD"));
	infoTr.children[2].setAttribute("class", "noBorder");
	infoTr.children[2].appendChild(document.createElement("BUTTON"));
	infoTr.children[2].children[0].appendChild(document.createTextNode(" > "));
	

	infoTr.appendChild(document.createElement("TD"));
	infoTr.children[3].setAttribute("colspan", "3");
	infoTr.children[3].appendChild(document.createTextNode(inputDate.getFullYear().toString()));

	main.appendChild(document.createElement("TR"));
	
	var tr = main.children[2];

	for(var i = 0; i < daysArr.length; i++) {
		
		tr.appendChild(document.createElement("TD"));
		tr.children[i].appendChild(document.createTextNode(daysArr[i]));

	}

	return main;
};

function PopulateDates(startDate, dateDiff, daysInMonth, path) {

	var weeksOnTable = 6;
	var daysInWeek = 7;
	var dayCounter = 1;
	
	// Filling out the dates in the calendar

	for(var i = 3; i < weeksOnTable + 3; i++) {
		path.appendChild(document.createElement("TR"));
		for(var j = 0; j < daysInWeek; j++) {
			path.children[i].appendChild(document.createElement("TD"));
			path.children[i].children[j].appendChild(document.createTextNode(startDate.getDate()));

			if(dateDiff > 0) {
				path.children[i].children[j].setAttribute("class", "outMonth");
				dateDiff--;
			} else if (dayCounter > daysInMonth) {
				path.children[i].children[j].setAttribute("class", "outMonth");
			} else {
				path.children[i].children[j].setAttribute("class", "inMonth");
				dayCounter++;
			}

			

			startDate.setDate(startDate.getDate() + 1);
		}
	}



};

function clearAndAdd(elementID, date)
{
    document.getElementById(elementID).innerHTML = "";
    var calendar = new Calendar(elementID);
    calendar.render(date);
}

var today = new Date();

var calendar1 = new Calendar("div1");
calendar1.render(new Date(today.getFullYear(), today.getMonth(), today.getDate()));

var calendar2 = new Calendar("div2");
calendar2.render(new Date("January 1, 2009"));

