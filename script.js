//psuedo Code
$(document).ready(function() {

    let dailyWaterCups = 0

    //welcome page animations
    $('h1').removeClass('contentHidden');
    $('.carousel').removeClass('contentHidden');
    $('.scrollDown').removeClass('contentHidden')


//scroll down to form on click of floating arrow
    const scrollDown = $('.scrollDown');
        scrollDown.on('click', function(){
                    $('html').animate({
            scrollTop: $('#form').offset().top
        }, 1000);
        })

//clear form function
    function clearForm() {
        $('#userWeight').val("")
        $('#active').find('input:checked').prop('checked', false)
        $('#climate').find('input:checked').prop('checked', false)
    }

//create a function that takes daily water intake as a argument and uses it to display
    function cupResults(dailyWater) {
        $('#drinkingCups').html('')
        for (i=0; i < dailyWater; i++) {
            $('#drinkingCups').append(`<li class="dailyCup"><img src="./assets/dailyCup.png" alt="a picture of a cup"></li>`);
        }
    }

//create a function that onClick fades the daily cup
    $('#drinkingCups').on('click', 'li', function(){
        if ($(this).hasClass('drank')){
            $(this).removeClass('drank')
            dailyWaterCups = dailyWaterCups + 1
        } else {
            $(this).addClass('drank')
            dailyWaterCups = dailyWaterCups - 1
        }
    $('#target').text(`${dailyWaterCups} cups of water`);
    })

//functionality for facts carousel
    const carouselFacts = document.querySelector('.carouselFacts')
    const carouselButtons = document.querySelectorAll('.arrow')
    const numberOfFacts = document.querySelectorAll('.facts').length
    const cup = document.querySelector('.cup')

    let factIndex = 1
    let translateX = 600
    let cupBackgroundPositionY = 20

    //add event listener to each button to cycle through facts and change background position of water
    carouselButtons.forEach(button => {
        button.addEventListener('click', e => {
            if (e.target.id === 'previous') {
                if (factIndex !== 1) {
                    factIndex--;
                    translateX += 600;
                    cupBackgroundPositionY -= 60
                }
            } else {
                if (factIndex !== numberOfFacts) {
                    factIndex++;
                    translateX -= 600;
                    cupBackgroundPositionY += 60

                }
            }
            carouselFacts.style.transform = `translateX(${translateX}px)`
            cup.style.backgroundPosition = `0px ${cupBackgroundPositionY}px`;
        })
    })

//add event listener so when user clicks on activity level they scroll to next section
    $('#active label').on('click', e => {
        $('html').animate({
            scrollTop: $('#climate').offset().top
        }, 1000);
    })


    $('form').on('submit', function(e){
        e.preventDefault();
        
        // find the value of the users weight and store it in a variable
        const userWeight = $('#userWeight').val()

        //  this line of code ensures that positive numerical input is entered, otherwise the user will be alerted to input their weight in lbs
        if (userWeight >= 0) {
         // target value of activity, and store it in a variable
        const userActive = parseInt($('#active').find('input:checked').val());

        // target value of climate, and store it in a variable
        const userClimate = parseInt($('#climate').find('input:checked').val());
            
        // add the index values of the activity and climate and create a conditional statement 
        const valueSum = userActive + userClimate;
        // if the values = 2 then multiply the weight by 0.5
        //  2 < value < 6 multiply by 0.75
        //  value = 6 multiply by 1 
        // store that combined index value into a variable 
        const multiplierIndex = function(i) {
            if(i === 2){
                return 0.3
            } else if (i <= 5) {
                return 0.5
            } else {
                return 0.6
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

        dailyWaterCups = waterCups(dailyWaterOunces, ouncesCupsRatio);
        
        if (dailyWaterCups < 4) {
            dailyWaterCups = 4
        } else if (dailyWaterCups > 14) {
            dailyWaterCups = 14
        }

        
        // update the section, to display the dailyWaterCups 
        $('#target').text(`${dailyWaterCups} cups of water`);

        //update results section with cups icons
        cupResults(dailyWaterCups);


        // courtesy of juno college Queen street hot treat code-along
        $('html').animate({
            scrollTop: $('#target').offset().top
        }, 1000);
        clearForm()
        } else {
            return alert('please input your weight in lbs');
        }
    }); //End of form event listener
});