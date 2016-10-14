$(document).ready(function(){

	//Enable select2 plugin
	$('select').select2({
		placeholder: "Select an Option"
	});

	$("#submit").on('click', function(){
	

			//Validation to make sure there is a user input for every field.
	    	function validate() {
			  var valid = true;

			  //Validation for first two name/img inputs
			  $('.form-control').each(function() {
			    if ( $(this).val() === '' )
			        valid = false;
			  });

			  //Validation for <select> inputs.
			  $('select').each(function() {
			  	if( $(this).val() === "")
			  		valid = false
			  })
			  return valid;
			}

			//If validation comes back true, continue on with matching logic.
			if(validate() == true) {

			var role = $("#q0").val();


			var userResult = [$("#q1").val(), $("#q2").val(), $("#q3").val(), $("#q4").val(), $("#q5").val(), $("#q6").val(), $("#q7").val(), $("#q8").val(), $("#q9").val(), $("#q10").val(), $("#q11").val(), $("#q12").val(), $("#q13").val(), $("#q14").val(), $("#q15").val(), $("#q16").val(), $("#q17").val(), $("#q18").val(), $("#q19").val(), $("#q20").val(),$("#q21").val(), $("#q22").val(), $("#q23").val(), $("#q24").val(), $("#q25").val()]
			var score =  userResult.map(Number).reduce(function(previousValue, currentValue, currentIndex, array) {
  			return previousValue + currentValue;
			});
			console.log('total score', score);

		
			//Creates person object and converts result array from string --> number array.
			var newMember = {
				usertype: role == 1 ? true : false,
				fname: $("#firstName").val().trim(),
				lname: $("#lastName").val().trim(),
				score: score,
			};

			$.post("/api/survey", newMember,
		    function(data){
		    	if(data == true) {
		    		alert("We have a match for you! Please check your email for next steps");
		    	}
		    });

		
			//Array of all results for all users in friends.js
		    //var resultArray = []

		    //Information on matched user.
		    //var matchName;

		    //API call to friends.js
		 //    $.get("/api/friends", function(data) {
		 //    	for (var i = 0; i < data.length; i++) {
		 //    		compareMatches(newPerson.result, data[i].result);
		 //    	}
		 //    	//When all comparison calculations are complete, find the best match.
		 //    	if (resultArray.length == data.length) {
		 //    		var indexOfMatch = resultArray.indexOf(Math.min.apply(Math, resultArray));
		 //    		matchName = data[indexOfMatch].name;
		 //    		displayModal();
		 //    	}
		 //    })

		 //    //Comparison calculation to find all results.
		 //    function compareMatches(arr1, arr2) {
			// 		var diff = 0;
			// 		for (var i = 0; i < arr1.length; i++) {
			// 			var num =  Math.abs(arr1[i] - arr2[i]);
			// 			diff += num
			// 		}
			// 		resultArray.push(diff);
			// 	}

			// //Display modal with information on match.
			// function displayModal() {
			// 	$("#user-name").text(newMember.name);
			// 	$("#match-name").text(matchName);
			// 	$("#myModal").modal();
			// }

			} else{
				//If validation is not met, display alert.
				alert("Oops! You forgot to answer a question!");
			}

	})

});