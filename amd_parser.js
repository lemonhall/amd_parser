var fs 		   = require('fs');
var _  		   = require('underscore');
//获得形式参数列表
var get_f_args = require('get-parameter-names');


var print_args = function(a,b){
	console.log(arguments);
}

lib_maps 	   = 
{
	"$"				: "../lib/zepto",
	"_"				: "../lib/underscore",
	"Deferred"		: "../lib/deferred",
	"Handlebars"	: "../lib/handlebars",
	"DataCenter"	: "../model/datacenter",
	"UDate"			: "../util/date",
	"Cookie"		: "../util/cookie",
	"wx"			: "../lib/wx",
	"IScroll"		: "../lib/iscroll",
	"FastClick" 	: "../lib/fastclick",
	"Base"			: "../util/base",
	"Scroller"		: "../fx/scroller",
	"overthrow"		: "../lib/overthrow"
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

var require = function(){
	console.log("xxxxx");
};

require.config = function(arg1,arg2){
	console.log(arg1);
};

var file_name = process.argv[2];

fs.readFile(file_name, function (err, data) {
  	if (err) throw err;
  	//console.log(data.toString());
  	var file_content  = data.toString();
  	eval(file_content);
});