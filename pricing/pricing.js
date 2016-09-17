var loblaws = require("./loblaws");

var BASE_RATE = 2;

var regular = function(price){
	if(price < BASE_RATE){
		return BASE_RATE;
	}

	return price;
}

var groceries = function(price, item, callback){
	loblaws.search(item, function(products){
		callback(products);
	});
}

module.exports = {
	regular: regular,
	groceries: groceries
}