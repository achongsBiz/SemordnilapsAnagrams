/*******************************************
Module: jsDemo1.js
Project: jsDemo1
Log:
20180415 - Initial revision.

********************************************/

/**********
Function controls script flow.
**********/
function submitAction() {

   var validationCheck = validateInput();
   if (validationCheck)
      processResults();
}

/**********
Function validates input.
**********/
function validateInput() {
    //Define all objects involved in the validation process
   var validationPass = true;
   var firstWordInput = document.getElementById("firstWord");
   var secondWordInput = document.getElementById("secondWord");
   var evaluationTypeInput = document.getElementById("evalType");
   var statusBox = document.getElementById("ValidationResults");
   var errorMessage = ["","","",""];
   var errorMessagetxt = "";

   //Reset all formatting
   firstWordInput.style.backgroundColor = "white";
   secondWordInput.style.backgroundColor = "white";
   evaluationTypeInput.options[0].style.backgroundColor = "white";

   //Check for empty evaluation type dropdown.
   if (evaluationTypeInput.selectedIndex == 0) {
      errorMessage[0] = "Please select an evaluation mode from the dropdown.<br>";
      var select = document.getElementById('select');
      evaluationTypeInput.options[0].style.backgroundColor = "orange";
      validationPass = false;
   }
   //Check for non letters for first word.
   var testfirstWordInput = checkAlpha(firstWordInput.value);
   if(testfirstWordInput == false) {
      errorMessage[1] = "First word can only contain letters.<br>";
      firstWordInput.style.backgroundColor = "orange";
      validationPass = false;
   }
   //Check for non letters for second word.
   var testsecondWordInput = checkAlpha(secondWordInput.value);
   if(testsecondWordInput  == false){
      errorMessage[2] =  "Second word can only contain letters.<br>";
      secondWordInput.style.backgroundColor = "orange";
      validationPass = false;
   }
   //Check for equal input.
   if (firstWordInput.value == secondWordInput.value && testfirstWordInput == true && testsecondWordInput == true) {
      errorMessage[3] = "Both words cannot be the same.<br>";
      firstWordInput.style.backgroundColor = "orange";
      secondWordInput.style.backgroundColor = "orange";
      validationPass = false;
   }

   if (validationPass == false) {
      errorMessagetxt += "<ul>"
      for (var i=0; i < 4; i++) {
         if (errorMessage[i].length > 0) {
            errorMessagetxt = errorMessagetxt + "<li>" + errorMessage[i] + "</li>";
         }
      }
      errorMessagetxt += "</ul>"
   }

   statusBox.innerHTML = errorMessagetxt;

   return validationPass;
}

/**********
Function evaluates the words based on the mode selection
**********/
function processResults(){

//Define all objects used.
   var firstWordInputValue = (document.getElementById("firstWord").value).toUpperCase();
   input1Array = firstWordInputValue.split("");
   var secondWordInputValue = (document.getElementById("secondWord").value).toUpperCase();
   input2Array = secondWordInputValue.split("");
   var evalTypeDD = document.getElementById("evalType");
   var evalTypeDDsel = evalTypeDD.options[evalTypeDD.selectedIndex].value;
   var statusBox = document.getElementById("ValidationResults");
   var inputSameLength = (input1Array.length == input2Array.length ? true : false);

/*
Evaluate Anagrams:
Anagrams have the same letters, not necessarily in the same order.
Therefore, if we rearrange and sort the arrays capturing each word,
and get identical arrays, then the words are anagrams of each other.
*/
   if(evalTypeDDsel == 1){

      var input1ArrayTarget = input1Array.sort();
      var Input1Sorted = "";
      var input2ArrayTarget = input2Array.sort();
      var Input2Sorted = "";

      for (var i =0; i < input1ArrayTarget.length; i++) {
         Input1Sorted += input1ArrayTarget[i];
      }
      for (var j =0; j < input2ArrayTarget.length; j++) {
         Input2Sorted += input2ArrayTarget[j];
      }

      if(Input1Sorted == Input2Sorted && inputSameLength) {
         statusBox.innerHTML = "These words are anagrams."
      }
      else {
         statusBox.innerHTML = "These words are not anagrams"
      }
   }

/*
Evaluate Semordnilap:
A semordnilap has the same letters as the original word, but spelled
backwards. Therefore if we iterate through the array backwards, backwards
and obtain a string equal to the other word, then it's a semordnilap.
*/
   else if (evalTypeDDsel == 2){

      var Input2Sorted = "";

      for (var i = input2Array.length-1; i >= 0; i--){
         Input2Sorted += input2Array[i];
      }
      if (firstWordInputValue == Input2Sorted  && inputSameLength) {
         statusBox.innerHTML = "These words are semordnilaps."
      }
      else {
         statusBox.innerHTML = "These words are not semordnilaps."
      }
   }

}

/**********
Function toggles the informational display.
**********/
function displayGuide(selection){

   var message = "";
   var messageTarget = document.getElementById("Informational");

   if (selection.value == 0) {
      message = "Start by selecting an evaluation type, then enter two words."
   }
   else if (selection.value == 1) {
     message = "Anagrams are words obtained by rearranging the letters of another word.";
   }
   else if (selection.value == 2) {
      message = "Semordnilaps are words formed by rearranging the letters in reverse order.";
   }

   messageTarget.innerHTML = message;

}

/**********
Function verifies that only letters are present
**********/
function checkAlpha(strValue)
{
  var checkPattern = /^[a-zA-Z]+$/;
  return checkPattern.test(strValue);
}
