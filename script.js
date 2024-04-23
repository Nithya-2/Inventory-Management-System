let search = document.querySelector(".search");
let add = document.querySelector(".add");
let slider = document.querySelector(".slider");
let formSection = document.querySelector(".form-section");
let addDetails = document.getElementById("save");
let searchDetails = document.getElementById("search-details");
let reset = document.getElementById("reset");

//Initial value show on table
const list = localStorage.getItem("inventory");

const inventoryList = JSON.parse(list);
displayTable(inventoryList);

search.addEventListener("click", () => {
	slider.classList.add("moveslider");
	formSection.classList.add("form-section-move");
});

add.addEventListener("click", () => {
	slider.classList.remove("moveslider");
	formSection.classList.remove("form-section-move");
});


addDetails.addEventListener("click", () => {
	const list = localStorage.getItem("inventory");
	const inventoryList = JSON.parse(list) || [];
	const name = document.getElementById("name").value;
	const price = document.getElementById("price").value;
	const expirydDate = document.getElementById("expiry-date").value;
	const quantity = document.getElementById("quantity").value;
	const category = document.getElementById("category").value;
	const reference = document.getElementById("reference").value;
	const listItem = {
		id: inventoryList.length + 1, name, price, expirydDate, quantity, category, reference
	}
	if (name && price && expirydDate && quantity && category && reference) {
		inventoryList.push(listItem);
		localStorage.setItem("inventory", JSON.stringify([...inventoryList]));
		displayTable(inventoryList);
		document.getElementById("name").value = '';
		document.getElementById("price").value = '';
		document.getElementById("expiry-date").value = '';
		document.getElementById("quantity").value = '';
		document.getElementById("category").value = '';
		document.getElementById("reference").value = '';	
	} else {
		alert('Please fill the all details')
	}

});
searchDetails.addEventListener("click", () => {
	const search = document.getElementById("search").value;
	const list = localStorage.getItem("inventory");
	const inventoryList = JSON.parse(list);
	let result = inventoryList.filter(o => o.name.toLowerCase() === search.toLowerCase());
	if (result && result.length > 0) {
		displayTable(result);
	} else {
		document.getElementById('table').innerHTML = `<h2>No Results Found</h2>`
	}
});

reset.addEventListener("click", () => {
	document.getElementById("search").value = '';
	const list = localStorage.getItem("inventory");
	const inventoryList = JSON.parse(list);
	displayTable(inventoryList);
});

function displayTable(inventoryList)  {

	
	document.getElementById('table').innerHTML = inventoryList && inventoryList.length > 0 ? 
	generateTable(inventoryList)
	 : '';
}

function generateTable(data) {  
	let table = '<table>';  
	table += '<tr><th>Name</th><th>Price</th><th>Expiry Date</th><th>Quantity</th><th>Category</th><th>Reference</th></tr>';  
	data.forEach(item => {  
	table += `<tr><td>${item.name}</td><td>${item.price}</td><td>${item.expirydDate}</td><td>${item.quantity}</td><td>${item.category}</td><td>${item.reference}</td></tr>`;  
	});  
	table += '</table>';  
	return table;  
	}



