// Assignment code here



// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

function generatePassword(){
  var length= prompt("How many characters do you want your password to be?");
  if (length < 8 || length > 128){
    alert("Password must be between 8 and 128 characters");
    generatePassword();
  }
  // Empty array for possible types of character
  var typeOfCharacter=[];
  // Arrays of all possible characters, grouped by type
  var lowercaseArray=["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  var uppercaseArray=["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  var numericArray=["1", "2", "3", "4","5","6","7","8","9"];
  var specialArray=[':','~', "'", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "+", "=", "{", "}", "[", "]", "|", "/", ";", "'", "<", ">", ",", ".", "?" ];
  var numTypesChosen=0;
  // Ask if the user would like to include a certain type of character. If yes, add 1 to numTypesChosen. 
  var lowercase= confirm("Do you want your password to have lowercase characters?");
  if (lowercase){
    numTypesChosen +=1;
    // Add this array to index i of typeOfCharacter
    i =typeOfCharacter.length
    typeOfCharacter[i] = lowercaseArray;
  }
  var uppercase= confirm("Do you want your password to have uppercase characters?");
  if (uppercase){
    numTypesChosen +=1;
    i =typeOfCharacter.length
    typeOfCharacter[i] = uppercaseArray;
  }
  var numeric= confirm("Do you want your password to have numeric characters?");
  if (numeric){
    numTypesChosen +=1;
    i =typeOfCharacter.length
    typeOfCharacter[i] = numericArray;
  }
  var special= confirm("Do you want your password to have special characters?");
  if (special){
    numTypesChosen +=1;
    i =typeOfCharacter.length
    typeOfCharacter[i] = specialArray;
  }
  // Restart function if none are selected.
  if (numTypesChosen === 0){
    alert("INVALID- You must choose at least one type of character.");
    generatePassword();
  }
  var password=[];
  // Generate an array of numTypesChosen length of random numbers
  while (password.length != length){
    var randomNumsAddToLength =[];
    function numTypesChosenRandom(){
      for (i=0; i < numTypesChosen;i++){
        value=Math.floor(Math.random()* length) + 1;
        randomNumsAddToLength[i]=value;
      }
    }
    numTypesChosenRandom();
    // Add up randomNumsAddToLength to see how much to adjust by
    var total = 0;
    for (var i=0; i<randomNumsAddToLength.length; i++){
      total +=randomNumsAddToLength[i];
    }
    adjust = length/total;
    // Adjust the randomNumsAddToLength array
    for (i=0; i<randomNumsAddToLength.length; i++){
      randomNumsAddToLength[i] *= adjust;
      randomNumsAddToLength[i]= Math.round(randomNumsAddToLength[i]);
    }
    // Found this function to extract multiple random elements from an array at this link - https://bobbyhadz.com/blog/javascript-get-multiple-random-elements-from-array
    var getMultipleRandom = function(arr, num){
      const shuffled = [...arr].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, num);
    }
    for(i=0; i < randomNumsAddToLength.length; i++){
      password[i] = getMultipleRandom(typeOfCharacter[i], randomNumsAddToLength[i]);
    }
    var password = [].concat.apply([], password);
  }
  // Found this function to shuffle an array at this link-  https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  var shuffleArray = function(array){
    for (let i =array.length -1; i>0; i--){
      let j= Math.floor(Math.random() * (i+1));
      [array[i], array[j]]= [array[j], array[i]];
    }
  };
  shuffleArray(password);
  password= password.join("");
  return(password);
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
