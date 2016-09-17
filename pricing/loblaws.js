var request = require('request');

var search = function(item, callback){
	var requestBody = {
		method: 'GET',
		url: 'https://www.loblaws.ca/ecommerce/v2/loblaw/products/search?q=' + item,
		headers: {
			'Authorization': 'bearer fd887ce5-7b15-4c1e-93a0-dc91ce883ec6'
		}
	}

	request(requestBody, function (error, response, body) {
		if(error){

		}
		else{
			console.log('Status:', response.statusCode);
			console.log('Headers:', JSON.stringify(response.headers));

			var jsonBody = JSON.parse(body);
			callback(jsonBody.searchResults.products);
		}
	});
}

var getbyid = function(){

}

module.exports = {
	search: search,
	getbyid: getbyid
}

search("apple", function(products){
	console.log(products);
});