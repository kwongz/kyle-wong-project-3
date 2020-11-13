//psuedo Code
  $(document).ready(function() {
        
        // prevent default of form submit
        
        $('form').on('submit', function(e){
            e.preventDefault();
            
            // target value of weight input (and parseint string into numbers?) and store it into a variable, create a alert IF a non-numerical value or no value is entered.
            const userWeight = $('#userWeight').val()
            //  this line of code ensures that positive numerical input is entered, otherwise the user will be alerted
            if (userWeight >= 0) {
                $('#userWeight').val('')
            } else {
                alert('please input your weight in lbs');
            }
            
            // target value of activity, and store it in a varaible
            const userActive = parseInt($('#active').find('input:checked').val());
            // target value of climate, and store it in a varaible
            const userClimate = parseInt($('#climate').find('input:checked').val());
            // clear radio inputs
            $('#active').find('input:checked').removeAttr('checked');
            
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
            multiplierIndex(valueSum);
            
            
            
            // create a function that takes the weight and multiplier as arguments and store the resutls in a variable.
            
            const waterOunces = function (weight, multiplier) {
                return (weight * multiplier);
            }
            const dailyWaterOunces = (waterOunces(userWeight, multiplierIndex(valueSum)));
            console.log(dailyWaterOunces);
            
            // create a function that converts the dailyWaterOunces into cups and store it in a variable
            const ouncesCupsRatio = 0.125;
            const waterCups = function (userOunces, ratio) {
                return Math.round(userOunces*ratio);
            }

            const dailyWaterCups = waterCups(dailyWaterOunces, ouncesCupsRatio);
            console.log(dailyWaterCups);


            // update the section, to display the dailyWaterCups 

            $('#target').text(`${dailyWaterCups} cups of water`);     
        
        }) //End of form event listener


    });