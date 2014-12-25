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
	if(isNull(list)) {
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
	if(isNull(list)){ //returns to the callee 
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
	if(isNull(list)){
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
	if(isNull(list)){
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
	if(isNull){
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
	if(isNull(list)){
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
	if(isNull(list)){
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

//runs a particular function given the method name and pass the list and the rest of the arguments
function invoke(list, methodName, arguments){
	if(isNull(list)){
		return;
	}
	else{
		every(list, function(x){
			this[methodName](x, arguments);
		});
	}
}
//returns the values of a dictionary given the property name 
function pluck(list, propertyName){
	return map(list, function(x){
		if(x[propertyName]){
			return x[propertyName];
		}
	});
}


//returns the max value of a given list or dictionary
function max(list, iteratee, context){
	//sort the list first then find the max value
	//to-do :(
}





function min(list, iteratee, context){

}


function sortBy(list, iteratee, context){

}

function groupBy(list, iteratee, context){

}

function indexBy(list, iteratee, context){

}
function countBy(list, iteratee, context){

}


//uses the fisher-yates shuffle method in shuffling the given list
function shuffle(list){

}



//produces a random items from the list, this random number of items 
//is determined by the n argument
function sample(list, n){

}
//returns an array 
function toArray(list){

}

//returns the number of items in the list
function size(list){
	if(isNull(list)){
		return;
	}
	else{
		var size = 0; 
		each(list, function(x){
			if(isNull(x) == false){
				size++; //increment the number of items in the list
			}
		});
		return size;
	}
}

//splits an array based on the predicate, the ones that are rejected and the ones that are not
function partition(array, predicate){
	var rejected = [], 
		passed = [];

	each(array, function(x){
		if(predicate(x)){
			passed.push(x);
		}
		else{
			rejected.push(x);
		}
	});
	var array = [passed, rejected];
}

/***** Array functions ***/

//could be improved 
//Returns the first values specified by number of first elements
function first(array, numOfFirstElements){
	if(isNull(array)){
		console.log("array passed cannot be null");
		return;
	}
	else if(!isNull(numOfFirstElements) && numOfFirstElements == array.length){
		console.log("the number of elements that are accessed cannot be greater than the length of the array");
		return;
	}
	else if(!isNull(numOfFirstElements) && numOfFirstElements < 0){
		console.log("the number of elements that are accessed cannot be less than 0");
		return;
	}
	else{
		var newArray = [];
		if(isNull(numOfFirstElements)){ //that means to return the first element in the array
			return array[0];
		}
		else if(!isNull(numOfFirstElements) && numOfFirstElements != array.length-1) { //n is not null
			for(var i = 0; i != numOfFirstElements; i++){
				newArray.push(array[i]);
			}
		}
		else {
			newArray = [].concat(array); //returns the a deep copy of the array
			return newArray;
		}
	}
}

//returns all of the values except the last n values of the array, given that n is specified
function initial(array, numOfLastElemRemoved){
	if(isNull(array)){
		return;
	}
	else if(isValidAccessNum(array, numOfLastElemRemoved)) {
		//checks to see if the numOfLastElemRemoved is a valid number to do operations on 
		//the array
		return;
	}
	else { 
		var newArray = [];
		if(isNull(numOfLastElemRemoved)){
			newArray = [].concat(array); //returns all of the values except the 
			newArray.pop(array.length-1);
		}
		else { //returns a new array removing the last n number of elements
			newArray = [].concat(array);
			for(var i = numOfLastElemRemoved; i != 0; i--){
				newArray.pop(); //keep removing the last elements in the new array until it is 0
			}
		}

		return newArray;
	}
}


//returns the last elements of the array 
function last(array, n){
	if(isNull(array)){
		return;
	}
	else{
		var newArray = array.reverse(); //reverses the elements of the array
		first(array, n);
	}
}

//returns the rest of the elements in an array, the index indicates to return the value of the array
//from that array onward
function rest(array, indexOnward){
	if(isNull(array)){
		return;
	}
	else if(isValidAccessNum(array, indexOnward)) {
		return;
	}
	else {
		var newArray = [];
		for(var i = indexOnward; i < array.length; i++){
			newArray.push(array[i]);
		}
		return newArray;
	}
}

//returns a copy of the array with all of certain values removed such as false, null, 0, "", undefined and NaN
function compact(array){
	var newArray = [];
	each(array, function(e){
		if(isFalsy(e) == false){
			newArray.push(e);
		}
	});
	return newArray;
}


function flatten(array, shallow){
	if(isNull(array)){

	}
}


/*** Small Tests ***/

console.log(compact([0, 1, false, 2, '', 3, undefined, NaN, 1, 2, 3, "", 0, null]));

//console.log(initial([5, 4, 3, 2, 1], 2));



var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
/***console.log(pluck(stooges, 'name'));
console.log(size(stooges));
console.log(size({one: 1, two: 2, three: 3}));
**/
/*** Small case testing **/
//console.log(contains([1, 2, 3, 4], 3));
//console.log(contains([1, 2, 3, 4], 12));





//console.log(reject([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; }));

//var x = [{title: "Cybmeline", author: "Shakespeare", year: 1611}, {title:"XXXX", author: "Shakespeare", year: 1611}, {title:"xxx", author:"SSSSS", year:12221}];
//console.log(where(x, {author: "Shakespeare", year: 1611}));

/**
console.log(find([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; }));
console.log(filter([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; }));


**/
/*** Helper functions ***/
function isNull(object){
	if(object == null){
		return true;
	}
	else {
		return false; 
	}
}

//looks at object e to see if it is a falsy member
function isFalsy(e){
	if(e == false || e == null || e == 0 || e == "" && e == undefined || e == NaN || isNaN(e)){
		return true;
	}
	else{
		return false;
	}
}

//checks to see if the numElements is a valid number to do operations on the array
function isValidAccessNum(array, numElements){
	if(numElements < 0){
		console.log("Number of elements cannot be less than 0");
		return null;
	}
	else if(numElements >= array.length){
		console.log("Number of elements cannot be greater than or equal to the length of the array");
		return null;
	}
}