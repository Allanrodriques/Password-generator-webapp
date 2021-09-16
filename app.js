const resultEL = document.getElementById('result')
const lengthEL = document.getElementById('length')
const uppercaseEL = document.getElementById('uppercase')
const lowercaseEL = document.getElementById('lowercase')
const numbersEL = document.getElementById('numbers')
const symbolsEL = document.getElementById('symbols')
const generateEL = document.getElementById('generate')
const clipboardEL = document.getElementById('clipboard')



const randomFunc = {
	lower: getRandomLower,
	upper:getRandomUpper,
	number:getRandomNumber,
	symbol: getRandomSymbol
};
// generate Event listner
generateEL.addEventListener('click', () => {
	const length = parseInt(lengthEL.value);
	const hasLower = lowercaseEL.checked;	
	const hasUpper = uppercaseEL.checked;
	const hasNumber = numbersEL.checked;
	const hasSymbols = symbolsEL.checked;

	resultEL.innerText = generatePassword(
		hasLower,
		hasUpper,
		hasNumber,
		hasSymbols,
	    length);
});

// copy password to clipboard
clipboardEL.addEventListener('click',() => {
	const textArea = document.createElement('textArea');
	const password = resultEL.innerText;

	if (!password) {
		return;
	}

	textArea.value=password;
	document.body.appendChild(textArea);
	textArea.select();
	document.execCommand('copy')
	textArea.remove();
	alert('Password copied to clipboard')
})

function generatePassword(lower, upper, number , symbol, length){
	// 1. Init pw var
	// 2. Filter out unchecked type
    // 3. Loop over length call generator function for each type
    // 4. Add final password to pw var and return

    let generatePassword= '';

    const typesCount = lower + upper + number + symbol;

    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter
    (items => Object.values(items)[0])

    // console.log('typesArr: ',typesArr);

    if (typesCount === 0) {
    	return '';
    }

    for (let i = 0; i < length; i +=typesCount) {
    	typesArr.forEach(type => {
    		const funcName = Object.keys(type)[0];

    		// console.log('funcName:' , funcName);

    		generatePassword += randomFunc[funcName]();

    	});
   }
   // console.log(generatePassword.slice(0, length));
   const finalPassword = generatePassword.slice(0, length);
   return finalPassword;
  
}
 

function getRandomLower(){
	return String.fromCharCode(Math.floor(Math.random()*26 + 97));

}
function getRandomUpper(){
	return String.fromCharCode(Math.floor(Math.random()*26 + 65));

}
function getRandomNumber(){
	return String.fromCharCode(Math.floor(Math.random()*10 + 48));

}
function getRandomSymbol(){
	const symbols = '!@#$&*(){}[]=^,<>/.';
	return symbols[Math.floor(Math.random() * symbols.length)];
}