window.onload = () => {
  'use strict';

  // products
  let products = document.querySelector('.main__products.products')

  let catsCatalog = {
    cat1: {
      image: "url(./img/cats/cat1.png)",
      imageClass: 'cat1',
      name: 'Кот полосатый',
      color: 'Коричневый',
      age: 3,
      paws: 4,
      price: 30,
      isSold: '',
      onSale: true,
      salePercent: '-40%',
      saleStyle: 'product__sale'
    },
    cat2: {
      image: "url(./img/cats/cat2.png)",
      imageClass: 'cat2',
      name: 'Кот полосатый',
      color: 'Коричневый',
      age: 1,
      paws: 4,
      price: 40,
      isSold: 'isSold',
      onSale: false,
      saleStyle: 'product__sale'
    },
    cat3: {
      image: "url(./img/cats/cat3.png)",
      imageClass: 'cat3',
      name: 'Кот полосатый',
      color: 'Коричневый',
      age: 2,
      paws: 4,
      price: 20,
      isSold: '',
      onSale: false,
      saleStyle: 'product__sale'
    },
    cat4: {
      image: "url(./img/cats/cat4.png)",
      imageClass: 'cat4',
      name: 'Кот полосатый',
      color: 'Коричневый',
      age: 6,
      paws: 4,
      price: 25,
      isSold: '',
      onSale: false,
      saleStyle: 'product__sale'
    },
    cat5: {
      image: "url(./img/cats/cat5.png)",
      imageClass: 'cat5',
      name: 'Кот полосатый',
      color: 'Коричневый',
      age: 2,
      paws: 4,
      price: 30,
      isSold: '',
      onSale: true,
      salePercent: '-40%',
      saleStyle: 'product__sale'
    },
    cat6: {
      image: "url(./img/cats/cat6.png)",
      imageClass: 'cat6',
      name: 'Кот полосатый',
      color: 'Коричневый',
      age: 2,
      paws: 4,
      price: 10,
      isSold: 'isSold',
      onSale: false,
      saleStyle: 'product__sale'
    },
  }

  function fillWithProducts(obj, parent) {

    for (let item in obj) {
      let element = document.createElement('div');
      let soldText;
    
      element.classList.add('product');
    
      if (obj[item].salePercent === undefined) {
        obj[item].saleStyle = '';
        obj[item].salePercent = ''
      }
    
      if (!catsCatalog[item].isSold) {
        soldText = 'Купить';
      } else {
        soldText = 'Продан';
      }
    
      element.innerHTML = `
        <div class="product__image ${obj[item].imageClass}">
          <div class="product__favorite"></div>
          <div class="${obj[item].saleStyle}">${obj[item].salePercent}</div>
        </div>
    
        <div class="product__data">
          <h3>${obj[item].name}</h3>
          <div>
            <table>
              <tr>
                <td class="td-data">${obj[item].color}</td>
                <td class="td-data bold-data">${obj[item].age} мес.</td>
                <td class="td-data bold-data">${obj[item].paws}</td>
              </tr>
              <tr>
                <td>Окрас</td>
                <td>Возраст</td>
                <td>Кол-во лап</td>
              </tr>
            </table>
          </div>
          <p>${obj[item].price} 000 руб.</p>
        </div>
    
        <button class="${obj[item].isSold}">${soldText}</button>
      `;
    
      parent.append(element);
    
      document.querySelector(`.${obj[item].imageClass}`).style.background = obj[item].image;
    }
  }

  fillWithProducts(catsCatalog, products);


  // sort feature
  let priceSortBtn = document.querySelector('.sort__price-sort');
  let ageSortBtn   = document.querySelector('.sort__age-sort');

  priceSortBtn.addEventListener('click', priceSort);

  function priceSort() {
      let priceSort = Object.entries(catsCatalog)
        .sort(([,a],[,b]) => a.price - b.price)
        .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

      priceSortBtn.style.color = '#6EBBD3';
      ageSortBtn.style.color = '#000000';
      products.innerHTML = '';
      
      fillWithProducts(priceSort, products);
      addingToFav();  

      priceSortBtn.removeEventListener('click', priceSort);
      priceSortBtn.addEventListener('click', backToDefalut);
  };

  function backToDefalut() {
    priceSortBtn.style.color = '#000000';
    ageSortBtn.style.color = '#000000';

    products.innerHTML = '';

    fillWithProducts(catsCatalog, products);
    addingToFav(); 

    priceSortBtn.removeEventListener('click', backToDefalut);
    priceSortBtn.addEventListener('click', priceSort);
    ageSortBtn.removeEventListener('click', backToDefalut);
    ageSortBtn.addEventListener('click', priceSort);
  }

  ageSortBtn.addEventListener('click', ageSort);

  function ageSort() {
    const ageSort = Object.entries(catsCatalog)
    .sort(([,a],[,b]) => a.age - b.age)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

    priceSortBtn.style.color = '#000000';
    ageSortBtn.style.color = '#6EBBD3';
    products.innerHTML = '';

    fillWithProducts(ageSort, products);
    addingToFav();

    ageSortBtn.removeEventListener('click', priceSort);
    ageSortBtn.addEventListener('click', backToDefalut);
  }


  // burger menu feature
  let burgerButton = document.querySelector('.burger');
  let burgerMenu   = document.querySelector('.header__burger-menu');

  burgerButton.addEventListener('click', () => {
    burgerButton.classList.toggle('active');
    burgerMenu.classList.toggle('active');
    document.body.classList.toggle('lock');
  });


  // form validation feature
  const emailValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  let emailInput    = document.querySelector('.footer__form input[type=email]');
  let submitFormBtn = document.querySelector('.footer__form button');

  emailInput.addEventListener('keyup', () => {

    if (!emailValidation.test(emailInput.value)) {
      submitFormBtn.style.backgroundColor = '#EBEBEB';
      submitFormBtn.disabled = true;
    } else {
      submitFormBtn.style.backgroundColor = '#6EBBD3';
      submitFormBtn.disabled = false;
    }
    if (!emailInput.value){
      submitFormBtn.style.backgroundColor = '#6EBBD3';
      submitFormBtn.disabled = false;
    } 

  });


  // adding to favorite feature
  function addingToFav() {
    let favBtns = document.querySelectorAll('.product__favorite');
    let notif   = document.querySelector('.notification');

  favBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('my-favorite');

      if (btn.classList.contains('my-favorite')) {
        btn.style.background = `url('./img/like-a.png') no-repeat`;
        notif.classList.add('liked')
        setTimeout(() => notif.classList.remove('liked'), 1000)
      } else {
        btn.style.background = `url('./img/like-d.png') no-repeat`;
      }
    })
  });
  }

  addingToFav();


  // scroll up button feature
  let upBtn = document.querySelector('.up-btn');

  window.onscroll = () => {
    if (pageYOffset > 50) {
      upBtn.classList.remove('disappeared');
      upBtn.style.display = 'block';
    } else {
      upBtn.classList.add('disappeared');
      upBtn.style.display = 'none'; 
    }
  }

  upBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

}