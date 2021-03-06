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
	var newList = sortBy(list, iteratee, context);
	return newList[0];
}



function min(list, iteratee, context){
	var newList = sortBy(list, iteratee, context), 
		lastIndex = newList.length - 1;

	return newList[lastIndex];
}


function sortBy(list, iteratee, context){
	if(isValidObject(list) == false) {
		return -Infinity;
	}

	else {
		var newList = [].concat(list);
		if(iteratee){
			newList.sort(iteratee); 
		}
		else {
			newList.sort(function(a, b){ 
				if(a < b)
					return 1; 
				else if(a == b)
					return 0;
				else
					return -1;
			});
		}
		return newList;
	}
}

function groupBy(list, iteratee, context){
	if(!isValidObject(list)) 
		return;

	else {
		var newGroup = {}, 
			tempKey, 
			isFunc = isFunction(iteratee) ? true : false;
		
		each(list, function(e){
			tempKey = isFunc ? iteratee(e) : e[iteratee];
			console.log(e[iteratee]);
			if(isUndefined(newGroup[tempKey])){
				newGroup[tempKey] = [e];
			}
			else {
				newGroup[tempKey].push(e);
			}

		});
		return newGroup;
	}
}

function indexBy(list, iteratee, context){
	var newGroup = groupBy(list, iteratee, context);
	return newGroup;
}

function countBy(list, iteratee, context){
	var newGroup = groupBy(list, iteratee);
	
	for(var i in newGroup){
		newGroup[i] = newGroup[i].length;
	}
	return newGroup;
}


//uses the fisher-yates shuffle method in shuffling the given list
function shuffle(list){
	if(!isValidObject(list)) 
		return;

	for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = list[i];
        list[i] = list[j];
        list[j] = temp;
    }
    return list;
}



//produces a random items from the list, this random number of items 
//is determined by the n argument
function sample(list, n){
	if(!isValidObject(list)) 
		return;
	
	if(!isValidObject(n)){
		var index = Math.floor(Math.random() * (list.length - 1) + 0);
		if(isArray(list)) 
			return list[index]; 
		else {
			var c = 0;
			return getValByIndex(list, index);
		}
	}

	if(n < 0 || n > list.length - 1) 
		return;

	var i = n, 
		dictRandomInd = {}, 
		index, 
		isArr = isArray(list), 
		newSample = []; 
	//generate the random indices by using a dictionary
	for(; i > 0;){
		index = Math.floor(Math.random() * (list.length - 1) + 0);
		if(isUndefined(dictRandomInd[index])){
			dictRandomInd[index] = index;
			i--;
		}
	}

	each(dictRandomInd, function(i){
		if(isArr){
			newSample.push(list[i]);
		}
		else {
			newSample.push(getValByIndex(list, i));
		}
	});
	return newSample;
}

function getValByIndex(list, index){
	var c = 0;
	for(var i in list){
		if(c == index)
			return list[i];
		c++;
	}
}
//returns an array 
function toArray(list){
	if(!isValidObject(list))
		return;
	else if(isArray(list))
		return list;

	var newArray = [];
	each(list, function(e){
		newArray.push(e);
	});
	return newArray;
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
	else if(isValidAccessNum(array, numOfFirstElements)){
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

//returns a new array that takes a multidimensional array and transforms this array into a 1D array
function flatten(array, shallow){
	var newArray = new Array;
	if(shallow == null){
		for(var i = 0; i < array.length; i++){
			if(array[i].constructor == Array){
				var x = flattenHelper(array[i]);
				newArray = newArray.concat(x);
			}
			else{
				newArray.push(array[i]);
			}
		}
	}
	else{ //shallow is not null then flatten the array only once
		for(var i = 0; i < array.length; i++){
			if(array[i].constructor == Array){
				each(array[i], function(x){
					newArray.push(x);
				});
			}
			else{
				newArray.push(array[i]);
			}
		}
	}
	return newArray; 
}

function flattenHelper(array, array2){
	if(array.constructor == Array){ //it's an array
		for(var e = 0; e < array.length; e++){
			if(array[e].constructor == Array){
				if(array2 == null){
					flattenHelper(array[e], new Array);
				}
				else
					flattenHelper(array[e], array2)
			}
			else {
				if(array2 == null){
					array2 = new Array;
					array2.push(array[e]);
				}
				else
					array2.push(array[e]);
			}
		}
		return array2;
	}
	else {
		return array;
	}
}

//returns a new array with all of the instances stored in the arguments removed
function without(array){
	if(isNull(array)) {
		console.log("array passed cannot be null");
		return;
	}
	else if(isArgumentsPassedValid(arguments == false)) {
		return;
	}
	else{
		//instantiates a new dictionary to store a key-value pair to make it easier to access values
		var removeInstances = {},
			newArray = [];
		delete arguments['0']; //removes the first argument passed in the function
		for(var e in arguments){
			removeInstances[arguments[e]] = true;
		}
		newArray = reject(array, function(x){
			if(!removeInstances[x]){
				return false;
			}
		});
		return newArray;
	}
}

//console.log(without([1, 2, 3, 4, 5, 6, 7, 7, 8, 9], 1, 2, 4));
//console.log(without([1, 2]));

//computes the unique items of the array items passed as arguments
function union(){
	if(isArgumentsPassedValid(arguments) == false){
		return;
	}
	else{
		var dict = {}, 
			newArray = [];

		each(arguments, function(e){
			if(isElementArray(e)){
				each(e, function(x){
					dict[x] = x;
				});
			}
		});
		each(dict, function(e){ 
			newArray.push(e);
		});

		return newArray;
	}
}


//computes the items that are similar with each other
//need to fix the order in which the items were added 
function intersection(){
	if(isArgumentsPassedValid(arguments) == false){
		return;
	}
	else{
		var dict = {}, 
			tempArray = [], 
			newArray = [];
		if(isElementArray(arguments['0'])) {
			var oldArray = uniq(arguments['0']); 
			tempArray = tempArray.concat(oldArray);
			each(tempArray, function(e) {
				dict[e] = {value: e, size: 1};
			});

			delete arguments['0'];
			
			each(arguments, function(e) {
				e = uniq(e);
				console.log(e, "hello");
				if(isElementArray(e)){
					each(e, function(x){
						if(dict[x]){
							dict[x].size = dict[x].size+1; 
							console.log(dict[x]);
						}
					});
				}
			});
			var s = size(arguments) + 1; 
			console.log(dict);
			each(tempArray, function(x){
				if(dict[x].size/s == 1){
					newArray.push(dict[x].value); 
				}
			});
		}
		else{
			return;
		}

		return newArray;
	}
}


//returns an array of all elements that are unique between n number of arrays passed as arguments
//not sure...??
function difference(array){
	if(isArgumentsPassedValid(arguments) == false)
		return;

	else {
		var dict = {}, 
			newArray = [];
		each(array, function(e){
			dict[e] = {size:1, value: e}
		});
		delete arguments[0];
		each(arguments, function(e){
			if(isElementArray(e)){
				//if the element e has duplicates 
				e = uniq(e);
				each(e, function(i){
					if(isUndefined(dict[i]) == false){
						dict[i].size = dict[i].size+1;

					}
				});
			}
		});


		each(array, function(e){
			if(dict[e].size == 1){
				newArray.push(e);
			}
		});
		return newArray;
	}
}

//temporary function, still need to add more functionality
function uniq(array, isSorted, iteratee) {
	if(isValidObject(array) && isArray(array)){
		var dict = {}, 
		    newArray = [];
		
		each(array, function(e){
			if(isNull(dict[e])){
				newArray.push(e)
				dict[e] = e;
			}
		});
		return newArray;
	}

	else {	
		console.log("argument passed is not valid");
		return;
	}

}


function zip(){
	
}

/**Utility Functions ***/

function isEqual(object, other) {
	if(!isValidObject(object) || !isValidObject(other)) {
		return false;
	}

	if(object.constructor != other.constructor){
		return false;
	}	
	if(isArray(object)){
		if(object.length != other.length)
			return false;

		for(var i = 0; i < object.length; i++) {
			if(isArray(object[i]) || isObject(object[i])) {
				if(isEqual(object[i], other[i]) == false){
					return false;
				}
			}
			if(object[i] != other[i]){
				return false;
			}
		}
	}
	else if(isObject(object)) {
		for(var e in object) {
			if(isArray(object[e]) || isObject(object[e])){
				if(isEqual(object[e], other[e]) == false){
					return false;
				}
			}
			else if(object[e] != other[e]) {
				return false;
			}
		}
	}
	else if(object != other) {
		return false;
	}

	return true;
}

function isEmpty(object) {
	return (isValidObject(object));
} 
//checks if the node passed is a DOM element
function isElement(node) {
	if(!isValidObject(node)){
		return false;
	}
	else {
		return node.tagName ? true : false; //if the node has a tag name
	}
}

function isArray(element){
	return (isValidObject(element) && element.constructor == Array);
}

function isObject(element){
	return (isValidObject(element) && element.constructor == Object);
}

function isArguments(element){
	return (isValidObject(element) && ((Object.prototype.toString.call(element) == '[object Arguments]') || (!!obj.callee)));
}

function isFunction(element){
	return (isValidObject(element) && element.constructor == Function);
}

function isString(element){
	return (isValidObject(element) && element.constructor == String);
}

function isNumber(element){
	return (isValidObject(element) && element.constructor == Number);
}


function isFinite(element) {
	return !(element == -Infinity || element == Infinity);
}


function isBoolean(element){
	return (isValidObject(element) && element.constructor == Boolean);
}

function isDate(element){
	return (isValidObject(element) && Object.prototype.toString.call(element) == '[object Date]');
}

function isRegExp(element){
	return (isValidObject(element) && Object.prototype.toString.call(element) == '[object RegExp]');
}

function isNan(object) {
	return (isValidObject(object) || isNaN(object));
}

function isNull(object){
	return (object == null);
}


function isUndefined(object){
	return (object == undefined);
}

function isValidObject(e){
	return (!isNull(e) || !isUndefined(e));
}


//looks at object e to see if it is a falsy member
function isFalsy(e){
	return (e == false || e == null || e == 0 || e == "" && e == undefined || e == NaN || isNaN(e))
	
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

//checks to see if the number of arguments passed are sufficient
function isArgumentsPassedValid(arguments){
	if(arguments['0'] == undefined){
		console.log("The number of arguments passed are not valid");
		return false;
	}
	else{
		return true;
	}
}

//checks to see if the argument passed is of type array
function isElementArray(e){
	if(e.constructor == Array){
		return true;
	}
	else{
		console.log("Argument passed ", e, " is not valid");
		return false;
	}
}
