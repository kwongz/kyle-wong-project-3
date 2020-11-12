//psuedo Code


// create a function that takes the weight and combined index value variables and multiply them

const waterOunces = function (weight, multiplier) {
    return (weight * multiplier);
}

// create a function that converts ounces into cups

// prevent default of form submit

$('form').on('submit', function(e){
    e.preventDefault();
    
    // target value of weight input (and parseint string into numbers?) and store it into a variable, create a alert IF a non-numerical value or no value is entered.
    const userWeight = $('#weight').val()
    //  this line of code ensures that positive numerical input is entered, otherwise the user will be alerted
    if (userWeight >= 0) {
        $('#weight').val('')
    } else {
        alert('please input your weight in lbs');
    }


    // target value of activity, and store it in a varaible
    const userActive = parseInt($('#active').find('input:checked').val());

    // target value of climate, and store it in a varaible
    
    const userClimate = parseInt($('#climate').find('input:checked').val());
    
    // add the index values of the activity and climate and create a conditional statement if the values = 2 then multiply the weight by 0.5
    //  2 < value < 6 multiply by 0.75
    //  value = 6 multiply by 1 
    // store that combined index value into a variable 
    
    const valueSum = userActive + userClimate;
    console.log(valueSum);

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
    console.log(multiplierIndex(valueSum));



    // call weight * index value function which will give you the amount of daily water required in ounces, store it in a varaible

    const dailyWaterOunces = (waterOunces(userWeight, multiplierIndex(valueSum)));

    const ouncesCupsRatio = 0.125;

    const dailyWaterCups = Math.round(dailyWaterOunces*ouncesCupsRatio);

    $('#target').append(`${dailyWaterCups} cups of water`);

})



// take the daily water required variable and put it into the function that converts ounces into cups

// update the section, that will then display "you need _____ cups of water a day"


