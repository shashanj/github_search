////////////////////////////

function Userctrl ($scope,$http) {

	$scope.hi=false;

	var username=[];
	var reponame=[];
	var datee=[];
	var finale=[];
	var usinf=[]
	var all_rep;
	var word;
	var allpath=[];

	$scope.searchh =function(){

		if(username.length!=0)
		{
			while(username.length!=0)
			{
				username.length=0;
	 			reponame.length=0;
				datee.length=0;
				finale.length=0;
				usinf.length=0
				allpath.length=0;
			}
			$scope.answer=finale;
		}

		word = $scope.rep;
		console.log(word) 
		var request = {
			method: 'GET',
			url: 'https://api.github.com/repositories',
		}
		$http(request)
			.success(function(data) {
				all_rep=data
				findd();
			})
			.error(function(data) {
				callerror();
			});
	}

	callerror = function(){
		$scope.error="the search was not valid"
	}

	findd = function(){
		for (var i = 0; i < all_rep.length; i++) {
			 if((all_rep[i].name).search(word) + 1!=0 && all_rep[i].name!="starling")
			 {
			 	reponame.push(all_rep[i].name)
			 	username.push(all_rep[i].owner.login)
			 }
		};
		if(username.length==0)
			{callerror();}
		else{
			finddate();
		}
		
	}	

	var newpath=[];

	finddate = function(){
		for (var i = 0; i < username.length; i++) {
			 newpath.push('https://api.github.com/repos/'+username[i]+'/'+reponame[i]);
			}
			var x=0;
		for (var i = 0; i < username.length; i++) {
			if(username[i]!="bs"){
			var request = {
			method: 'GET',
			url: newpath[i],
			}
			$http(request)
				.success(function(data) {
					datee.push(data.created_at)

					//console.log(x,data.created_at)
					showtable(x,data.created_at)	
					x++;
				})
				.error(function(data) {
				callerror();
			});
			}
		};
		
		
	}
	var shown
	showtable = function(x,y){
		
		var st={"name":username[x], "repo":reponame[x],"date":y,"show":false}
					console.log(st)
					finale.push(st);
		if(finale.length==username.length)
		{
			info();
		}
	}

	info = function(){
		for (var i = 0; i < username.length; i++) {
			var pat =  'https://api.github.com/users/'+username[i]
			allpath.push(pat)
		}
		var x=0;
		for (var i = 0; i < username.length; i++) {
			var request = {
			method: 'GET',
			url: allpath[i],
			}
			$http(request)
				.success(function(data) {
					//console.log(data.name,data.blog,data.avatar_url)

					inf(x,data.name,data.blog,data.avatar_url)
				})
				.error(function(data) {
				callerror();
			});	
		};
		//console.log(usinf)
		addinfo();
	}

	inf = function(a,b,c,d){
		var ul={"original_name":b, "blog":c,"imgg":d}
					console.log(ul)
					usinf.push(ul);
					console.log(usinf)
		if(usinf.length==username.length)
		{
			addinfo();
		}

	}

	addinfo = function (){
		for (var i = 0; i < finale.length; i++) {
		
		angular.merge(finale[i], usinf[i]);
	}
		
		//console.log(finale)
		$scope.answer=finale;
	}

	$scope.sh= function(a){
		console.log(a)
		if(a)
		{
			a=false
		}
			else
			{
				a=true;
			}
		console.log(a)
		$scope.a=a;
	}
		
}

var x = angular.module('hub_ang',[])

x.controller('Userctrl',["$scope","$http",Userctrl])

