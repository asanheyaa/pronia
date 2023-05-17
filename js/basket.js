const productBtn = document.querySelectorAll('.swiper-best__button');
const productBtn2 = document.querySelectorAll('.main-swiper__column');
const basketProductList = document.querySelector('.basket-header__list');
const basket = document.querySelector('.basket-header');
const basketCounter = document.querySelector('.basket-header__counter');
const fullPrice = document.querySelector('.fullprice');
let price = 0;

const randomId = () => {
	return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// const priceWithoutSpaces = (str) => {
// 	return str.replace(/\s/g, '');
// }; 

const normalPrice = (str) => {
	return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};

const plusFullPrice = (currentPrice) => {
	return price += currentPrice;
};

const minusFullPrice = (currentPrice) => {
	return price -= currentPrice;
};

const printFullPrice = () => {
	fullPrice.textContent = `$${normalPrice(price.toFixed(1))}`;
};

const printCount = () => {
	let length = basketProductList.children.length;
	basketCounter.innerHTML = length;
	length > 0 ? basket.classList.add('_active') : basket.classList.remove('_active');
}


const generateCartProduct = (img, name, price, id) => {
	return `
	<li class="basket-header__item">
        <article class="basket-header__product basket-product data-id="${id}">
            <a href='' class="basket-product__image-link">
				<img class="basket-product__image" src="${img}" alt="buy plant">
			</a>
            <div class="basket-product__text">
                <a href='' class="basket-product__name">${name}</a>
                <span class="basket-product__price">$${price}</span>
            </div>
            <div aria-label="Delete"><img class="basket-product__delete" src="img/main/main__basket__delete-icon.svg"
                    alt=""></div>
        </article>
    </li>
	
	`;
};

const deleteProducts = (productItem) => {
	let currentPrice = parseFloat(productItem.querySelector('.basket-product__price').textContent.replace('$', ''));
	minusFullPrice(currentPrice);
	printFullPrice();
	productItem.remove();
	printCount();
}

productBtn.forEach((el) => {
	el.closest('.swiper-best__slide').setAttribute('data-id', randomId());
	el.addEventListener('click', (e) => {
		e.preventDefault();
		let self = e.currentTarget;
		let parent = self.closest('.swiper-best__slide');
		let id = parent.dataset.id;
		let img = parent.querySelector('.swiper-best__image img').getAttribute('src');
		let name = parent.querySelector('.swiper-best__title').textContent;
		let priceString = parent.querySelector('.swiper-best__price').textContent;
		let priceNumber = parseFloat(priceString.replace('$', ''));

		plusFullPrice(priceNumber);
		printFullPrice();
		basketProductList.insertAdjacentHTML('afterbegin', generateCartProduct(img, name, priceNumber, id));
		if (basketProductList.children.length > 0) {
			basketCounter.classList.add('_active');
		}
		printCount();
		self.disabled = true;
	});
});

basketProductList.addEventListener('click', (e) => {
	if (e.target.classList.contains('basket-product__delete')) {
		deleteProducts(e.target.closest('.basket-header__item'));
		if (basketProductList.children.length <= 0) {
			basketCounter.classList.remove('_active');
		};
	};
});

document.querySelector('.basket-header__icon').addEventListener('click', (e) => {
	if (basketProductList.children.length > 0) {
		basket.classList.toggle('_active');
	}
});

document.addEventListener('click', (e) => {
	if (!e.target.closest('.basket-header')) {
		if (!e.target.closest('.basket-product__delete')) {
			basket.classList.remove('_active')
		}
	}
})