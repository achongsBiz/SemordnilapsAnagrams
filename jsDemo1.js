/*******************************************
Module: jsDemo1.js
Project: jsDemo1
Log:
20190803 - Cleaned up variable declarations.
20180415 - Initial revision.
********************************************/


/**
Main Event Handler Method
*/
function submitAction() {

   let validationCheck = validateInput();
   if (validationCheck)
      processResults();
}

/**
Validates Input
*/
function validateInput() {
   //Define all objects involved in the validation process
   let validationPass = true;
   let firstWordInput = document.getElementById("firstWord");
   let secondWordInput = document.getElementById("secondWord");
   let evaluationTypeInput = document.getElementById("evalType");
   let statusBox = document.getElementById("ValidationResults");
   let errorMessage = ["", "", "", ""];
   let errorMessagetxt = "";

   //Reset all formatting
   firstWordInput.style.backgroundColor = "white";
   secondWordInput.style.backgroundColor = "white";
   evaluationTypeInput.options[0].style.backgroundColor = "white";

   //Check for empty evaluation type dropdown.
   if (evaluationTypeInput.selectedIndex == 0) {
      errorMessage[0] = "Please select an evaluation mode from the dropdown.<br>";
      let select = document.getElementById('select');
      evaluationTypeInput.options[0].style.backgroundColor = "orange";
      validationPass = false;
   }
   //Check for non letters for first word.
   let testfirstWordInput = checkAlpha(firstWordInput.value);
   if (testfirstWordInput == false) {
      errorMessage[1] = "First word can only contain letters.<br>";
      firstWordInput.style.backgroundColor = "orange";
      validationPass = false;
   }
   //Check for non letters for second word.
   let testsecondWordInput = checkAlpha(secondWordInput.value);
   if (testsecondWordInput == false) {
      errorMessage[2] = "Second word can only contain letters.<br>";
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
      for (var i = 0; i < 4; i++) {
         if (errorMessage[i].length > 0) {
            errorMessagetxt = errorMessagetxt + "<li>" + errorMessage[i] + "</li>";
         }
      }
      errorMessagetxt += "</ul>"
   }

   statusBox.innerHTML = errorMessagetxt;

   return validationPass;
}

/**
Function evaluates the words based on the mode selection
*/
function processResults() {

   //Define all objects used.
   let firstWordInputValue = (document.getElementById("firstWord").value).toUpperCase();
   input1Array = firstWordInputValue.split("");
   let secondWordInputValue = (document.getElementById("secondWord").value).toUpperCase();
   input2Array = secondWordInputValue.split("");
   let evalTypeDD = document.getElementById("evalType");
   let evalTypeDDsel = evalTypeDD.options[evalTypeDD.selectedIndex].value;
   let statusBox = document.getElementById("ValidationResults");
   let inputSameLength = (input1Array.length == input2Array.length ? true : false);

   /*
   Evaluate Anagrams:
   Anagrams have the same letters, not necessarily in the same order.
   Therefore, if we rearrange and sort the arrays capturing each word,
   and get identical arrays, then the words are anagrams of each other.
   */
   if (evalTypeDDsel == 1) {

      let anagramStatusCheck = evaluateAnagram(input1Array, input2Array, inputSameLength);
      if (anagramStatusCheck) {
         statusBox.innerText = "These words are anagrams";
      }
      else {
         statusBox.innerText = "These words are not anagrams.";
      }
   }

   /*
   Evaluate Semordnilap:
   A semordnilap has the same letters as the original word, but spelled
   backwards. Therefore if we iterate through the array backwards, backwards
   and obtain a string equal to the other word, then it's a semordnilap.
   */
   else if (evalTypeDDsel == 2) {

      let semordnilapCheck = evaluateSemordnilap(input2Array, firstWordInputValue, inputSameLength);
      if (semordnilapCheck) {
         statusBox.innerText = "These words are semordnilaps";
      }
      else {
         statusBox.innerText = "These words are not semordnilaps.";
      }
   }
}

/**
* Logic to evaluate anagrams.
* @param {String[]} input1Array Array comprising 1st word.
* @param {String[]} input2Array Array comprising 2nd word.
* @param {Boolean} input2Array Whether or not the 2 words are of the same length.
* @return {Boolean} Whether or not the words are anagrams.
*/
function evaluateAnagram(input1Array, input2Array, inputSameLength) {
   let input1ArrayTarget = input1Array.sort();
   let Input1Sorted = "";
   let input2ArrayTarget = input2Array.sort();
   let Input2Sorted = "";
   let anagramStatus = false;

   for (let i = 0; i < input1ArrayTarget.length; i++) {
      Input1Sorted += input1ArrayTarget[i];
   }
   for (let j = 0; j < input2ArrayTarget.length; j++) {
      Input2Sorted += input2ArrayTarget[j];
   }

   anagramStatus = (Input1Sorted == Input2Sorted && inputSameLength) ? true : false;
   return anagramStatus;
}

/**
* Logic to evaluate anagrams.
* @param {String[]} input2Array Array comprising 2nd word.
* @param {firstWordInputValue} firstWordInputValue The 1st word to be evaluated.
* @param {Boolean} input2Array Whether or not the 2 words are of the same length.
* @return {Boolean} Whether or not the words are anagrams.
*/
function evaluateSemordnilap(input2Array, firstWordInputValue, inputSameLength) {
   let Input2Sorted = "";
   let semordnilapStatus = false;

   for (let i = input2Array.length - 1; i >= 0; i--) {
      Input2Sorted += input2Array[i];
   }

   semordnilapStatus = (firstWordInputValue == Input2Sorted && inputSameLength) ? true : false;
   return semordnilapStatus;
}

/**
Toggles the informational display.
*/
function displayGuide(selection) {

   let message = "";
   let messageTarget = document.getElementById("Informational");

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

/**
Verifies that only letters are present in the input.
* @param {String} strValue String to validate.
* @return {Boolean} Whether or not validation passes.
*/
function checkAlpha(strValue) {
   let checkPattern = /^[a-zA-Z]+$/;
   return checkPattern.test(strValue);
}
