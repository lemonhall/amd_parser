var fs 		   = require('fs');
var _  		   = require('underscore');
//获得形式参数列表
var get_f_args = require('get-parameter-names');


var print_args = function(a,b){
	console.log(arguments);
}

var lib_maps 	   = 
{
	"$"				: "./lib/zepto",
	"_"				: "./lib/underscore",
	"Deferred"		: "./lib/deferred",
	"Handlebars"	: "./lib/handlebars",
	"DataCenter"	: "./model/datacenter",
	"UDate"			: "./util/date",
	"Cookie"		: "./util/cookie",
	"wx"			: "./lib/wx",
	"IScroll"		: "./lib/iscroll",
	"FastClick" 	: "./lib/fastclick",
	"Base"			: "./util/base",
	"Scroller"		: "./fx/scroller",
	"overthrow"		: "./lib/overthrow"
};

var define  = function(arg1,arg2){
	//console.log(arg2.toString());
	var f_args = get_f_args(arg2);
	//console.log(f_args);
	//print_args.bind(define);
	_.each(f_args,function(item,index){
		console.log("var "	+ 
					item 	+ 
					"\t\t\t =  require('" + 
					(lib_maps[item]===undefined?arg1[index]:lib_maps[item])+
					"');"
		);
	});

	//console.log(arg2.toString());
};

var require = function(arg1,arg2){
	//console.log(arg2.toString());
	var f_args = get_f_args(arg2);
	//console.log(f_args);
	//print_args.bind(define);
	_.each(f_args,function(item,index){
		console.log("var "	+ 
					item 	+ 
					"\t =  require('" + 
					(lib_maps[item]===undefined?arg1[index]:lib_maps[item])+
					"');"
		);
	});

	//console.log(arg2.toString());
};

require.config = function(arg1,arg2){
	console.log(arg1);
	var base_url = "./";
	_.each(arg1.paths,function(value,key){
		var path     = value;
		var lib_name = key;
		console.log("var "+lib_name+"\t =  require('"+ base_url+path +"');");
	});

	_.each(arg1.shim,function(value,key){
		var export_name = value.exports;
		var lib_key  = key;
		console.log("var "+export_name+" =\t  require('"+ base_url+arg1.paths[lib_key]+"');");
	});
};

var file_name = process.argv[2];

fs.readFile(file_name, function (err, data) {
  	if (err) throw err;
  	//console.log(data.toString());
  	var file_content  = data.toString();
  	eval(file_content);
});