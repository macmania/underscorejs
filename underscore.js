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
	else{
		var value = memo;
		for(var i = 0; i < list.length; i++){
			value = iteratee.call(null, value, list[i], i, list);
		}
		return value; //this reduces to one value
	}
}

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
