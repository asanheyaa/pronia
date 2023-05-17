function ibg() {

	let ibg = document.querySelectorAll(".ibg");
	for (var i = 0; i < ibg.length; i++) {
		if (ibg[i].querySelector('img')) {
			ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
		}
	}
}

ibg();

const burger = document.querySelector('.header__burger');

burger.addEventListener('click', (e) => {
	burger.classList.toggle('_active');
	document.querySelector('.header__menu').classList.toggle('_active');
	document.body.classList.toggle('_lock');
});

const swiperTree = new Swiper('.swiper-reviews', {

	// Navigation arrows
	navigation: {
		nextEl: '.swiper-reviews__next',
		prevEl: '.swiper-reviews__prev',
	},
	spaceBetween: 35,
	autoHeight: true,
	observer: true,
	observeParents: true,
	breakpoints: {
		1100: {
			slidesPerView: 3,
		}, 700: {
			slidesPerView: 2,
		}, 250: {
			slidesPerView: 1,
		},
	},

});

const swiper = new Swiper('.main-swiper', {

	// Navigation arrows
	navigation: {
		nextEl: '.main-swiper__next',
		prevEl: '.main-swiper__prev',
	},
	// autoHeight: true,
	spaceBetween: 15,
	observer: true,
	observeParents: true,
	breakpoints: {
		992: {
			slidesPerView: 3,
		}, 580: {
			slidesPerView: 2,
		}, 250: {
			slidesPerView: 1,
		},
	},

});


const swiperTwo = new Swiper('.swiper-best', {

	// Navigation arrows
	navigation: {
		nextEl: '.swiper-best__next',
		prevEl: '.swiper-best__prev',
	},
	autoHeight: true,
	spaceBetween: 35,
	observer: true,
	observeParents: true,
	breakpoints: {
		1100: {
			slidesPerView: 3,
		}, 700: {
			slidesPerView: 2,
		}, 250: {
			slidesPerView: 1,
		},
	},

});



// Rating 1
const ratings = document.querySelectorAll('.swiper-rating');
if (ratings.length > 0) {
	initRatings();
};

function initRatings() {
	let ratingActive, ratingValue;
	for (let index = 0; index < ratings.length; index++) {
		const rating = ratings[index];
		initRating(rating);
	}

	function initRating(rating) {
		initRatingVars(rating);

		setRatingActiveWidth();

		if (rating.classList.contains('rating__set')) {
			setRating(rating);
		}
	}

	function initRatingVars(rating) {
		ratingActive = rating.querySelector('.swiper-rating__active');
		ratingValue = rating.querySelector('.swiper-rating__value');
	}

	function setRatingActiveWidth(index = ratingValue.innerHTML) {
		const ratingActiveWidth = index / 0.05;
		ratingActive.style.width = `${ratingActiveWidth}%`;
	}

	function setRating(rating) {
		const ratingItems = rating.querySelectorAll('.swiper-rating__item');
		for (let index = 0; index < ratingItems.length; index++) {
			const ratingItem = ratingItems[index];
			ratingItem.addEventListener('mouseenter', (e) => {
				initRatingVars(rating);

				setRatingActiveWidth(ratingItem.value);
			});
			ratingItem.addEventListener('mouseleave', (e) => {
				setRatingActiveWidth();
			});
			ratingItem.addEventListener('click', (e) => {
				initRatingVars(rating);
				ratingValue.innerHTML = index + 1;

			});
		}
	}
};

// Rating 2

const rating2 = document.querySelectorAll('.rating-reviews');

rating2.forEach((ratingItem) => {
	const ratingActive2 = ratingItem.querySelector('.rating-reviews__active');
	const ratingValue2 = ratingItem.querySelector('.rating-reviews__value');


	const ratingActiveWidth2 = ratingValue2.innerHTML / 0.05;
	ratingActive2.style.width = `${ratingActiveWidth2}%`;
});


// form email
const form = document.forms.nameForm;
const inputEmail = document.querySelector('.best-selling__input');
form.addEventListener('submit', (e) => {
	e.preventDefault();
	let error = funcValidation(form);
	if (error === 0) {
		console.log('*kiss*');
		form.reset();

	}
});

function funcValidation(form) {
	let error = 0;
	if (emailTest(inputEmail)) {
		addFormError(inputEmail);
		error++;
		if (!form.querySelector('.best-selling__error')) {
			inputEmail.parentElement.insertAdjacentHTML(
				'beforeend',
				`<div class="best-selling__error">Please enter your email</div>`
			);
		}
	}
	return error;
};

function addFormError(inputEmail) {
	inputEmail.classList.add('_error');
};

function removeFormError(inputEmail) {
	inputEmail.classList.remove('_error');
};

function emailTest(inputEmail) {
	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(inputEmail.value);
};

inputEmail.addEventListener('focus', (e) => {
	if (form.querySelector('.best-selling__error')) {
		removeFormError(inputEmail);
		form.querySelector('.best-selling__error').remove();
	}
})


// menu scroll

const header = document.querySelector('.header');
window.addEventListener('scroll', scrollHeaderFunction)

scrollHeaderFunction();
function scrollHeaderFunction(e) {
	const scrollDistance = window.pageYOffset;
	if (scrollDistance > 50) {
		header.classList.add('_active');
	} else {
		header.classList.remove('_active');
	}
}
