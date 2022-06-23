// Assignment code here
function generatePassword(){
  var length= prompt("How many characters do you want your password to be?");
  if (length < 8 || length > 128){
    alert("Password must be between 8 and 128 characters");
    generatePassword();
  }
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
  }
  var uppercase= confirm("Do you want your password to have uppercase characters?");
  if (uppercase){
    numTypesChosen +=1;
  }
  var numeric= confirm("Do you want your password to have numeric characters?");
  if (numeric){
    numTypesChosen +=1;
  }
  var special= confirm("Do you want your password to have special characters?");
  if (special){
    numTypesChosen +=1;
  }
  // Restart function if none are selected.
  if (numTypesChosen === 0){
    alert("INVALID- You must choose at least one type of character.");
    generatePassword();
  }

    // Chooses how many of each type will compile the password. (Amount of character types chosen) random numbers added to equal chosen length
    var howManyOfType = [];

    function randomNumsAddToLength(m, n){
        howManyOfType.length = m;
        for (var i = 0; i <howManyOfType.length; i++){
            howManyOfType[i]= 0;
        }
        for (var i =0; i<n; i++){
            howManyOfType[(Math.floor(Math.random()*n))%m]++;
        }
        // Ensure there are no zeros in howManyOfType
        for (i=0; i<howManyOfType.length; i++){
          if(howManyOfType[i]=== 0){
            randomNumsAddToLength(numTypesChosen, length);
          }
        }
     }
     

    randomNumsAddToLength (numTypesChosen, length);

    //functions to output random elements of the four type arrays
    function randomLowercase (){
      x = lowercaseArray[(Math.floor(Math.random() * lowercaseArray.length))];
      return x;
    }
    function randomUppercase (){
      x = uppercaseArray[(Math.floor(Math.random() * uppercaseArray.length))];
      return x;
    }
    function randomNumeric (){
      x = numericArray[(Math.floor(Math.random() * numericArray.length))];
      return x;
    }
    function randomSpecial (){
      x = specialArray[(Math.floor(Math.random() * specialArray.length))];
      return x;
    }
    var password=[];

    // Four if statements with for loops, producing a random amount of each chosen character type. After the for loop is completed, howManyOfType is spliced to ensure there is no repetition
    if (lowercase){
      for (i=0; i<howManyOfType[howManyOfType.length-1]; i++){
        password[password.length] = randomLowercase();
      }
      howManyOfType.splice(-1);
    }
    if (uppercase){
      for (i=0; i<howManyOfType[howManyOfType.length-1]; i++){
        password[password.length] = randomUppercase();
      }
      howManyOfType.splice(-1);
    }
    if (numeric){
      for (i=0; i<howManyOfType[howManyOfType.length-1]; i++){
        password[password.length] = randomNumeric();
      }
      howManyOfType.splice(-1);
    }
    if (special){
      for (i=0; i<howManyOfType[howManyOfType.length-1]; i++){
        password[password.length] = randomSpecial();
      }
      howManyOfType.splice(-1);
    }
    
    // Function to shuffle the password array to produce a random order
    var shuffleArray = function(array){
    for (let i =array.length -1; i>0; i--){
      let j= Math.floor(Math.random() * (i+1));
      [array[i], array[j]]= [array[j], array[i]];
      }
    }
    shuffleArray(password);
    // Connect all elements of the password array and turn the password into a string
    password= password.join("");

    return(password);
}


// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}
// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
