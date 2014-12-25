//not sure what bounded means
//Applies a function func to all of the elements in the list
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

/* Returns a new array that will apply the function func passed
   into each of the elements in the list*/
function map(list, func, context){
	var returnArr = []
	each(list, function(x) {
		returnArr.push(func(x))
	});
	return returnArr;
}

//unsure of this part, needs to reduce the entire list into a single 'value'
//memo is the initial value of the function return value
function reduce(list, iteratee, memo, context){
	if(isNan(list)) {
		return;
	}
	else{
		var value = memo;
		for(var i = 0; i < list.length; i++){
			value = iteratee.call(null, value, list[i], i, list);
		}
		return value; //this reduces to one value
	}
}
//reduces the given list starting at the last element to the head
//and the function iteratee to each of the elements in the list
//and produces a new result to the given memo value
function reduceRight(list, iteratee, memo, context){
	if(isNan(list)){ //returns to the callee 
		return;
	}
	else{
		var value = memo;
		for(var i = list.length-1;i != 0; i--){
			value = iteratee(call, null, value, list[i], i, list);
		}
		return value;
	}
}

//finds the first element that satisfies the given predicate function of the list
function find(list, predicate, context){
	if(list.constructor == Array){
		for(var i = 0; i < list.length; i++){
			if(predicate(list[i])){
				return list[i];
			}
		}
	}else if(list.constructor == Object){
		for(var e in list){
			if(predicate(list[e])){return list[e];}
		}
	}
	return null; 
}
//returns all of the elements that satisfies the given predicate function 
function filter(list, predicate, context){
	var value = []; 
	each(list, function(x){
		if(predicate(x)) 
			value.push(x);
	});
	return value;
}

//returns the key-value pair elements by looking through each of the values in the list 
//given list given in the argument
function where(list, properties){
	if(isNan(list)){
		return;
	}
	else if (list.constructor == Array){
		var newArr = [], flag = false;
		each(list, function(x){
			for(var i in properties){
				if(x[i] == properties[i]){
					flag = true;
					console.log(x[i]);
				}
				else{
					flag = false;
					break;
				}
			}
			if(flag){
				newArr.push(x);
				flag = false;
			}
			
		});
		return newArr;
	}
	else { //other js data structures not supported in this function 
		return;
	}
}

//Returns the first element in the list that satisfies the given properties 
//passed
function findWhere(list, properties){
	if(isNan(list)){
		return;
	}
	else if(list.constructor == Array){
		var flag = false;
		for(var i=0; i < list.length; i++){
			for(var e in properties){
				if(list[e] == properties[e]){
					flag = true;
				}
				else{
					flag = false;
					break;
				}
			}
			if(flag){
				return list[i];
			}
		}
	}
}
//rejects the elements that does not satisfy the given predicate 
function reject(list, predicate, context){
	var newArr = filter(list, function(x){
		if(predicate(x) == false){
			return x;
		}
	});
	return newArr;
}

//returns true or false if all of the elements in the list satisfies the
//given predicate function 
function every(list, predicate, context){
	var flag = true;
	if(isNan){
		return false;
	}
	else if(list.constructor == Array){
		for(var i = 0; i < list.length; i++){
			if(!predicate(list[i])){
				flag = false;
				break;
			}
		}
	}
	else{
		for(var e in list){
			if(!predicate(list[e])){
				flag = false; break;
			}
		}
	}
	return flag;
}

//iterates through the elements in the list and if the element is
function some(list, predicate, context){
	var flag = false;
	if(isNan(list)){
		return false;
	}
	else if(list.constructor == Array){
		for(var i = 0; i < list.length; i++){
			if(predicate(list[i])){
				flag = true;
				break;
			}
		}
	}
	else if(list.constructor == Object){ //the list given is a dictionary with a given key-value pair
		for(var e in list){
			if(predicate(list[e])){
				flag = true;
				break;
			}
		}
	}
	return flag;
}
//if the value is in the list, then contains returns true else false 
function contains(list, value){
	if(isNan(list)){
		return;
	}
	else{
		var returnValue = find(list, function(x){
			if(x == value){
				return true;
			}
			else{
				return false;
			}
		});
		return returnValue != null ? true : false;
	}
}
console.log(contains([1, 2, 3, 4], 3));
console.log(contains([1, 2, 3, 4], 12));


//console.log(reject([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; }));
/**
var x = [{title: "Cybmeline", author: "Shakespeare", year: 1611}, {title:"XXXX", author: "Shakespeare", year: 1611}, {title:"xxx", author:"SSSSS", year:12221}];
console.log(where(x, {author: "Shakespeare", year: 1611}));

/**
console.log(find([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; }));
console.log(filter([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; }));

/***** Helper Function ****/
function isNan(object){
	if(object == null){
		return true;
	}
	else {
		return false; 
	}
}


console.log(reduce([1, 2, 3], function(memo, num){ return memo + num; }, 0));

function reduceRight(list, iteratee, memo, context){
	if(isNan(list)){return;}
	else{
		var value = memo;
		for(var i = list.length-1;i != 0; i--){
			value = iteratee(call, null, value, list[i], i, list);
		}
		return value;
	}
}

function find(list, predicate, context){
	if(list.constructor == Array){
		for(var i = 0; i < list.length; i++){
			if(predicate(list[i])){return list[i];}
		}
	}else if(list.constructor == Object){
		for(var e in list){
			if(predicate(list[e])){return list[e];}
		}
	}
	return null;
}

function filter(list, predicate, context){
	var value = []; 
	each(list, function(x){
		if(predicate(x))
			value.push(x);
	});
	return value;
}

function where(list, )

console.log(find([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; }));
console.log(filter([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; }));
