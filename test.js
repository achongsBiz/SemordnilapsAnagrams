let should = chai.should();

describe('Validation', function() {
    it('Invalid Characters', invalidCharacterTest);
    it('Valid Characters', validCharacterTest);
})

describe('Anagram Check', function() {
  it('Are Anagrams', isAnAnagramTest);
  it('Are not Anagrams', isNotAnAnagramTest);
})

describe('Semordnilap Check', function() {
  it('Are Semordnilaps', isSemordnilap);
  it('Are not Semordnilaps', isNotSemordnilap);
})

function invalidCharacterTest() {

  let input = '&#856';
  let validationResult = checkAlpha(input);
  validationResult.should.equal(false);
}

function validCharacterTest() {

  let input = 'abcdef';
  let validationResult = checkAlpha(input);
  validationResult.should.equal(true);

}

function isAnAnagramTest() {

  let inputArray1 = ['d','u','s','t','y'];
  let inputArray2 = ['s','t','u','d','y'];


  let anagramTestResult = evaluateAnagram(inputArray1, inputArray2, true);
  anagramTestResult.should.equal(true);
}

function isNotAnAnagramTest() {

  let inputArray1 = ['h','a','p','p','y'];
  let inputArray2 = ['a','p','p','l','e'];

  let anagramTestResult = evaluateAnagram(inputArray1, inputArray2, true);
  anagramTestResult.should.equal(false);
}

function isSemordnilap() {

  let input2Array = ['d','r','a', 'w', 'e', 'r'];
  let input1Word = "reward";

  let semordnilapTestResult = evaluateSemordnilap(input2Array, input1Word, true);
  semordnilapTestResult.should.equal(true);
}

function isNotSemordnilap() {
  
  let input2Array = ['d','r','a', 'w', 'e', 'r', 's'];
  let input1Word = "reward";

  let semordnilapTestResult = evaluateSemordnilap(input2Array, input1Word, true);
  semordnilapTestResult.should.equal(false);
}


