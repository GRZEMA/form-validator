const username = document.querySelector('#username')

const pass = document.querySelector('#password')
const pass2 = document.querySelector('#password2')

const email = document.querySelector('#email')

const form = document.querySelectorAll('.form-box input')

const submitBtn = document.querySelector('.send-btn')
const clearBtn = document.querySelector('.clear-btn')
const closeBtn = document.querySelector('.close-btn')

const popup = document.querySelector('.popup')

const showError = (input, msg) => {
	const formBox = input.parentElement
	const errorMsg = formBox.querySelector('.error-text')

	formBox.classList.add('error')
	errorMsg.textContent = msg
}

const clearError = input => {
	const formBox = input.parentElement
	formBox.classList.remove('error')
}

const clearForm = () => {
	form.forEach(item => {
		item.value = ''
		clearError(item)
	})
}

const checkForm = () => {
	form.forEach(item => {
		if (item.value === '') {
			showError(item, item.placeholder)
		} else {
			clearError(item)
		}
	})
}

const checkLength = (input, min) => {
	if (input.value.length < min) {
		const inputName = input.previousElementSibling.textContent.slice(0, -1)
		showError(input, `${inputName} składa się z min. ${min} znaków.`)
	}
}

const checkPass = (pass1, pass2) => {
	if (pass1.value !== pass2.value) {
		showError(pass2, 'Hasła do siebie nie pasują!')
	}
}

const checkEmail = email => {
	const regexp = new RegExp(
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	)
	if (!email.value.match(regexp)) {
		showError(email, 'Podaj prawidłowy e-mail!')
	} else {
		clearError(email)
	}
}

const checkErrors = () => {
	const allInputs = document.querySelectorAll('.form-box')
	let errorCount = 0

	allInputs.forEach(item => {
		if (item.classList.contains('error')) {
			errorCount++
		}
	})

	if (errorCount === 0) {
		popup.classList.add('show-popup')
	}

	console.log(errorCount)
}

submitBtn.addEventListener('click', e => {
	e.preventDefault()
	checkForm()
	checkLength(username, 3)
	checkLength(pass, 8)
	checkPass(pass, pass2)
	checkEmail(email)
	checkErrors()
})

clearBtn.addEventListener('click', e => {
	e.preventDefault()
	clearForm()
})

closeBtn.addEventListener('click', e => {
	e.preventDefault()
	popup.classList.remove('show-popup')
})
