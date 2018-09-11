/**
 * @author Samantha L. Misurda
 * @file A simple CRUD application for customer management
 * @version 1
 */
$(document).ready(function() {
	// Create the tabulator table object
	$("#customer-table").tabulator({
		layout: "fitColumns",
		columns: [{
				title: "Customer ID",
				field: "customerID"
			},
			{
				title: "First Name",
				field: "firstName",
				editor: "input"
			},
			{
				title: "Last Name",
				field: "lastName",
				editor: "input"
			},
			{
				title: "Street Address",
				field: "streetAddress",
				editor: "input"
			},
			{
				title: "City",
				field: "city",
				editor: "input"
			},
			{
				title: "State",
				field: "state",
				editor: "input"
			},
			{
				title: "Zipcode",
				field: "zipcode",
				editor: "input",
				validator: ["minLength:5"]
			},
			{
				title: "Telephone",
				field: "phone",
				editor: "input",
				validator: ["minLength:7", "maxLength:20"]
			},
			{
				title: "Credit Limit",
				field: "creditLimit",
				editor: "input"
			},
			{
				title: "Full Name",
				field: "fullName",
				editor: "input",
				validator: ["required"]
			},
			{
				title: "Delete",
				formatter: rowSelectFormatter
			}
		],
		pagination: "local",
		paginationSize: 10,
		movableColumns: true,
	});

	// Add the data to the table
	$("#customer-table").tabulator("setData", customerObject); 
	var nextCustomerId = 1001; // TThis should typically come from the DB and autoincrement 

	/**
	 * @param cell - The cell that was clicked
	 * @param formatterParams - specific data formatting requirements
	 * @description - Determines which row has been clicked on
	 */
	var rowSelectFormatter = function(cell, formatterParams) {
		var input = $("<input type='checkbox'>");
		var row = cell.getRow();

		input.change(function() {
			if (input.is(":checked")) {
				$("#customer-table").tabulator("selectRow", row);
			} else {
				$("#customer-table").tabulator("deselectRow", row)
			}
		});

		return input;
	}

	/**
	 * @param data - The data to filter on
	 * @param filterParams - The filtering requirements
	 * @description - Used with the searchbar, this function will perform the equivalent of the SQL like command.
	 * Any record containing the entered characters, case insensitive, will be returned
	 */
	function matchAny(data, filterParams) {
		var match = false;
		for (var key in data) {
			if (key !== "undefined" && String(data[key]).search(new RegExp(filterParams.value, "i")) > -1) {
				match = true;
			}
		}
		return match;
	}

	//Add an empty row on button click
	$("#add-button").click(function() {
		$("#customer-table").tabulator("addRow", {
			customerID: nextCustomerId++
		});
	});

	// Delete the selected rows on button click
	$("#delete-button").click(function() {
		var selectedRows = $("#customer-table").tabulator("getSelectedRows");
		$(selectedRows).each(function() {
			this.delete();
		});

	});

	// Call the filter each time a character is entered
	$("#search-filter").keyup(function() {
		$("#customer-table").tabulator("setFilter", matchAny, {
			value: String($("#search-filter-text").val())
		});
	});
}); // End Document.onReady