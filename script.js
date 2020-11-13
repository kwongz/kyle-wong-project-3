//psuedo Code
  $(document).ready(function() {

// Global Scope
      // target value of weight input (and parseint string into numbers?) and store it into a variable, create a alert IF a non-numerical value or no value is entered.
    const userWeight = $('#userWeight').val()



        
        // prevent default of form submit
        
        $('form').on('submit', function(e){
            e.preventDefault();
            
            //  this line of code ensures that positive numerical input is entered, otherwise the user will be alerted
            if (userWeight >= 0) {
                $('#userWeight').val('')
            } else {
                alert('please input your weight in lbs');
            }
            
            // target value of activity, and store it in a varaible
            // NEW: create a if statement that if a input is checked get the value and remove the check state
            const userActive = parseInt($('#active').find('input:checked').val());

            // // target value of climate, and store it in a varaible
            const userClimate = parseInt($('#climate').find('input:checked').val());
            // // clear radio inputs
            
            // add the index values of the activity and climate and create a conditional statement if the values = 2 then multiply the weight by 0.5
            //  2 < value < 6 multiply by 0.75
            //  value = 6 multiply by 1 
            // store that combined index value into a variable 
            
            const valueSum = userActive + userClimate;
            const multiplierIndex = function(i) {
                if(i === 2){
                    return 0.5
                } else if (i <= 5) {
                    return 0.75
                } else {
                    return 1
                }
            }
            
            
            
            // create a function that takes the weight and multiplier as arguments and store the results in a variable.
            
            const waterOunces = function (weight, multiplier) {
                return (weight * multiplier);
            }
            const dailyWaterOunces = (waterOunces(userWeight, multiplierIndex(valueSum)));
            
            // create a function that converts the dailyWaterOunces into cups and store it in a variable
            const ouncesCupsRatio = 0.125;
            const waterCups = function (userOunces, ratio) {
                return Math.round(userOunces*ratio);
            }

            const dailyWaterCups = waterCups(dailyWaterOunces, ouncesCupsRatio);


            // update the section, to display the dailyWaterCups 

            $('#target').text(`${dailyWaterCups} cups of water`);     
        
        }) //End of form event listener
        

        // create a timer that alerts the user with a audio and visual notification to drink water every 15 mins
        $('#startTimer').on('click', function (){
            const waterReminder = setInterval(function() {
                document.getElementById("notification").play();
                alert("Drink Water");
            }, 
            90000);
            // create button that stop clears the interval function waterReminder when the user clicks the button stop
            $('#clearTimer').on('click', function (){
                clearInterval(waterReminder);
            })
        })
        // setInterval(function(){ alert("Hello"); }, 3000);

        // create a timer that starts when the user clicks "start now"

        // make a conditional statement that alerts the user every 15 mins to drink some water

    });