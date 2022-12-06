// Define elements
const resultPsw = document.getElementById('result');
const lengthPsw = document.getElementById('length');
const uppercasePsw = document.getElementById('uppercase');
const lowercasePsw = document.getElementById('lowercase');
const numbersPsw = document.getElementById('numbers');
const symbolsPsw = document.getElementById('symbols');
const generatePsw = document.getElementById('generate');
const clipboard = document.getElementById('clipboard');

// Randomise value/output
const randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol
}

// Check criteria selection
generate.addEventListener('click', () => {
	const length = +lengthPsw.value;
	const hasLower = lowercasePsw.checked;
	const hasUpper = uppercasePsw.checked;
	const hasNumber = numbersPsw.checked;
	const hasSymbol = symbolsPsw.checked;
	
	resultPsw.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

function generatePassword(lower, upper, number, symbol, length) {
	let generatedPassword = '';
	const typesCount = lower + upper + number + symbol;
	const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);
	
	// If no criteria selected
	if(typesCount === 0) {
		return '';
	}
	
	// create a loop
	for(let i=0; i<length; i+=typesCount) {
		typesArr.forEach(type => {
			const funcName = Object.keys(type)[0];
			generatedPassword += randomFunc[funcName]();
		});
	}
	
	const finalPassword = generatedPassword.slice(0, 128);
	
	return finalPassword;
}

function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
	return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
	const symbols = '!@#$%^&*(){}[]=<>/,.'
	return symbols[Math.floor(Math.random() * symbols.length)];
}

clipboard.addEventListener('click', () => {
	const textarea = document.createElement('textarea');
	const password = resultPsw.innerText;
	
	if(!password) { return; }
	
	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	textarea.remove();
	alert('Password copied to clipboard');
});