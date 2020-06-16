const url = 'https://api.jsonbin.io/b/5e905926172eb643896166e7';

$(document).ready(function() {
	const createButton = document.querySelector('.create-text-btn');
	createButton.addEventListener('click', function() {
		addTextToPage(url);
	});
	const replaceButton = document.querySelector('.replace-inputs-btn');
	replaceButton.addEventListener('click', function() {
		if (IsTextPresent()) {
			replaceVarsByInputValues();
		};
	});

});

// create button
function addTextToPage(url) {
	$.getJSON(url, function(data) {
		const textFromJSON = data.text.join('<br>');
		insertTextToHTML(textFromJSON, '.tale-text');
	});
};

function insertTextToHTML(text, targetSelector) {
	const textElement = createNewElement('p', text);
	appendToAnotherElement(targetSelector, textElement);
};

function createNewElement(targetSelector, innerText) {
	const newElement = document.createElement(targetSelector);
	newElement.innerHTML = innerText;
	return newElement;
};

function appendToAnotherElement(targetSelector, elementToAppend) {
	const target = document.querySelector(targetSelector);
	if (target.children.length) { // check if element has been already appended
		target.children[0].remove(); // remove old element
	};
	target.append(elementToAppend);
};

// replace button
function IsTextPresent() {
	textSection = document.querySelector('.tale-text');
	return textSection.children.length;
};

function replaceVarsByInputValues() {
	const replacementText = getTextForReplacement('.tale-text p');
	const inputs = getInputs('.inputs');
	replaceTextByInputs(inputs, replacementText);
};

function getTextForReplacement(targetSelector) {
	const target = document.querySelector(targetSelector);
	return target.innerHTML;
};

function getInputs(targetSelector) {
	const inputsForm = document.querySelector(targetSelector);
	return inputsForm.children;
};

function replaceTextByInputs(inputs, replacementText) {
	let modifiedText = replacementText;
	for (let i = 0; i < inputs.length; i++) {
		inputId = inputs[i].getAttribute('id');
		if (inputs[i].value == "") {
			continue;
		}
		modifiedText = modifiedText.split(`\{${inputId}\}`).join(inputs[i].value);
	};
	document.querySelector('.tale-text p').innerHTML = modifiedText;
};

