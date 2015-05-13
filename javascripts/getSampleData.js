function getSchool(){
		$.get( "http://lofischools.herokuapp.com/search?query=School&state=NY&limit=10", function(data){
			schools = JSON.parse(data).results;
		});
}
