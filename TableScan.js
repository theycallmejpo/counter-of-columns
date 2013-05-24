// Class Constructor

function TableScan() {};

// Class/static method

TableScan.sumColumn = function(id, columnName) {

	var table = document.getElementById(id);
	if(table == null) {
		return 0;
	}

	var column = findColumn(table.firstElementChild, columnName);
	if (column == 0) return 0; // exit

	column--; //to turn it 0 indexed
	
	var elemsInColum = addColumnsToArr(table.children[0], column);	
	var columnSum = addElements(elemsInColum);

	return columnSum;

};

// returns the column number, 1 indexed

function findColumn(tableBody, name) {

	var numOfColumns = tableBody.children[0].childElementCount;
	
	for(var i = 1; i <= numOfColumns; i++) {
		var td = tableBody.children[0].children[i-1];
		if (td.firstChild.nodeValue == name)
			return i;
	}

	return 0;

};

function addColumnsToArr(tableBody, column) {

	var rows = tableBody.childElementCount - 1;
	var arr = [];

	for(var i = 1; i <= rows; i++) {
		var elem = tableBody.children[i].children[column];
		if(elem != undefined) {
			if(elem.firstChild != null)
				arr.push(elem.firstChild.nodeValue);
		}
	}

	return arr;
};

function addElements(arr) {

	var length = arr.length;
	var sum = 0.0;

	for(var i = 0; i < length; i++) {
		var dummyAdd = Number(arr[i]);
		if (isNaN(dummyAdd) == false)
			sum += parseFloat(arr[i]);
	}

	sum = Math.round(sum * 1E6)/1E6;
	return sum;
};

function sumFunction(form) {

	var tableID = form.tableName.value;
	var column = form.columnName.value;

	var columnSum = TableScan.sumColumn(tableID, column);

	// document.getElementById("columnName").setAttribute("value", "");

	var textSum = "Column <span class='green'>' " + column + " '</span> in table <span class='yellow'>' " + tableID + " '</span> sums to  " + "<span class='pink'>" + columnSum + "</span>.";
	document.getElementById("resultText").innerHTML = textSum;

};


// TableScan.sumColumn("table2", "Item");
