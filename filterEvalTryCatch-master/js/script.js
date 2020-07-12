// Объявляем функцию filterByType, и передаём в неё два параметра (первый - тип данных, второй - все значения)
// функция проверяет соответствие всех значений ...values с типом данных type
const filterByType = (type, ...values) => values.filter(value => typeof value === type),

	// Объявляем функцию hideAllResponseBlocks
	hideAllResponseBlocks = () => {
		// Получаем массив со всем блоками на странице с класом 'dialog__response-block'
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		// Каждому блоку масива responseBlocksArray - задаём display = 'none'
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},

	// Объявляем функцию, которая принимает 3 аргумента: blockSelector, msgText, spanSelector
	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		// Вызываем функцию hideAllResponseBlocks
		hideAllResponseBlocks();
		// Находим на странице элемент по селектору blockSelector, и задаём ему display = 'block'
		document.querySelector(blockSelector).style.display = 'block';
		// Объявляем условие: передан ли spanSelector
		if (spanSelector) {
			// Если передан spanSelector, находим на странице элемент по селектору spanSelector, и задаём текстовое содержимое из параметра msgText, переданого в функцию
			document.querySelector(spanSelector).textContent = msgText;
		}
	},

	// Проверяем передан ли параметр msgText, если передан, то showError приравниваем к тому что вернёт функция showResponseBlock, в которую мы в качестве параметров передаём '.dialog__response-block_error', msgText, '#error'
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),

	// Проверяем передан ли параметр msgText, если передан, то showResults приравниваем к тому что вернёт функция showResponseBlock, в которую мы в качестве параметров передаём '.dialog__response-block_ok', msgText, '#ok'
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),

	// Объявляем функцию showNoResults которая вызывает функцию showResponseBlock, и в качестве параметра передаём '.dialog__response-block_no-results'
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),

	// Объявляем функцию tryFilterByType, которая принимает в себя два параметра: type, values
	tryFilterByType = (type, values) => {
		try {
			// Создаём переменную valuesArray, которой присваиваем
			const valuesArray = eval(`filterByType('${type}', ${values})`);
			// Проверяем есть ли что-то в переменной valuesArray, если есть, то переменной alertMsg присваиваем `Данные с типом ${type}: ${valuesArray}`, иначе - `Отсутствуют данные типа ${type}`
			const alertMsg = (valuesArray.length) ?
				`Данные с типом ${type}: ${valuesArray}` :
				`Отсутствуют данные типа ${type}`;
				// Dspsdftv функцию showResults, и передаём в неё alertMsg
			showResults(alertMsg);
			// Перехватываем ошибку
		} catch (e) {
			// Вызываем функцию showError, и передаём в неё саму ошибку
			showError(`Ошибка: ${e}`);
		}
	};
// Находим на странице кнопку с id - filter-btn
const filterButton = document.querySelector('#filter-btn');
// Вешаем по клику на filterButton функцию, в которую передаём event
filterButton.addEventListener('click', e => {
	// Получаем полве с id - type
	const typeInput = document.querySelector('#type');
	// Получаем полве с id - data
	const dataInput = document.querySelector('#data');

	// Если поле dataInput пустое,
	if (dataInput.value === '') {
		// Выводим сообщение 'Поле не должно быть пустым!', если в поле dataInput ничего не записано
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		// Вызываем функцию showNoResults
		showNoResults();
	} else {
		// Очищаем поле dataInput
		dataInput.setCustomValidity('');
		// Отменяем стандартное поведение
		e.preventDefault();
		// Вызываем функцию tryFilterByType, и передаём в неё значение поля typeInput, и значение поля dataInput
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});

