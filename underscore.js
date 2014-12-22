//not sure what bounded means
function each(list, func, context) {
	if (list == null){ 
		return;
	}
	else if(list.constructor == Array){
		for(var i = 0; i < list.length; i++){
			func(list[i]);
		}
	}else if(list.constructor == Object){
		for(var e in list) {
			func(list[e])
		}
	}
}


function map(list, func, context){
	var returnArr = []
	each(list, function(x) {
		returnArr.push(func(x))
	});
	return returnArr;
}

//unsure of this part, needs to reduce the entire list into a single 'value'
//memo is the initial index in which to start invocating the function 
function reduce(list, iteratee, memo, context){
	if(isNan(list)) {
		return;
	}
	else if(memo == -1 || memo >= list.length){
		console.log("the index passsed is illegal");
		return;
	}
	else{
		var value = 0; 
		var newArr = list.slice(memo, list.length);
		for(var i = memo; i < list.length; i++){
			value = value + iteratee(memo, list[i], i, list);
		}
		return value; //this reduces to one value
	}
}

//console.log(reduce([1, 2, 3], function(memo, num){ return memo + num; }, 0));




function isNan(object){
	if(object == null){
		return true;
	}
	else {
		return false; 
	}
}
//works in some ways
//Tests for each function
/**console.log(each([1, 2, 3], function(x){
	return console.log(sum(x));
}));
console.log(each({one: 1, two: 2, three: 3}, function(x){
	console.log(sum(x));
}));
**/


//console.log(map([1, 2, 3], function(num){ return num * 3; }));
//console.log(map({one: 1, two: 2, three: 3}, function(num, key){ return num * 3; }));
