//psuedo Code
$(document).ready(function() {

// Global Scope
// hide text alert div when page loads
    $('#textAlert').hide();

// create am array container with 3 objects holding the img's src and alt information
    const imgArray = [
        {
            img: './assets/image-1.jpg',
            alt: 'a short glass being filled'
        },
        {
            img: './assets/image-2.jpg',
            alt: 'a tall glass jar filled with water'
        },
        {
            img: './assets/image-3.jpg',
            alt: 'water inside a corked class container '
        }
    ]
    
    // create a function that will take the imgArray as an argument and find a random number based on the length of the area that will act as the index number. return the array index value

    const randomizer = function (array) {
        let i = Math.floor(Math.random() * array.length)
        return array[i];
    }
    
      // prevent default of form submit
    
    
    
    $('form').on('submit', function(e){
        e.preventDefault();
        
        // find the value of the users weight and store it in a variable
        const userWeight = $('#userWeight').val()

        //  this line of code ensures that positive numerical input is entered, otherwise the user will be alerted to input their weight in lbs
        if (userWeight >= 0) {
            $('#userWeight').val('')
        } else {
           return alert('please input your weight in lbs');
        }
            
        // target value of activity, and store it in a varaible
        const userActive = parseInt($('#active').find('input:checked').val());

        // // target value of climate, and store it in a varaible
        const userClimate = parseInt($('#climate').find('input:checked').val());
            
        // add the index values of the activity and climate and create a conditional statement 
        const valueSum = userActive + userClimate;
        // if the values = 2 then multiply the weight by 0.5
        //  2 < value < 6 multiply by 0.75
        //  value = 6 multiply by 1 
        // store that combined index value into a variable 
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

        // courtesy of juno college Queen street hot treat code-along
        $('html').animate({
            scrollTop: $('#target').offset().top
        }, 1000);
    }) //End of form event listener
        

        // create a timer that alerts the user with a audio and visual notification to drink water every 15 mins
        $('#startTimer').on('click', function (){
            // ensures button can only be pushed once while active to multiple clicks causing multiple consecutive alerts, thanks to https://www.quora.com/How-do-I-avoid-multiple-click-events-in-jQuery
            $('#startTimer').attr('disabled',true);
            const waterReminder = setInterval(function() {
                $('#notification').trigger('play');
                $('#textAlert').show();
                $('#arrayImg').html(`<img src=${randomizer(imgArray).img} alt=${randomizer(imgArray).alt}/>`);
            }, 
            10000);
            // create button that stop clears the interval function waterReminder when the user clicks the button stop
            $('#clearTimer').on('click', function (){
                // reenables the startTimer buttton when stop is pushed.
                $('#startTimer').attr('disabled',false);
                clearInterval(waterReminder);
            })
        })

        $('#confirm').on('click', function () {
            $('#textAlert').hide();
        })

    });