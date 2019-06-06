$(document).ready(function(){

    // slider 

    $('.product-slider-options_list').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplaySpeed: 2000,
        prevArrow:  '.product-slider-options_prevBtn',
        nextArrow: '.product-slider-options_nextBtn',
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
              }
            },
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 2,
              }
            },
        ]
      });

    // slider 

    // add to table 

    $('.product-slider-options_list-item--link').click( function(event){
      let productPrice      = $(this).attr('price').replace(/[^0-9.]/g, "");
      let productDiscount   = $(this).attr('discount').replace(/[^0-9.]/g, "");
      let productName       = $(this).attr('product-name');
      let productId         = $(this).attr('product-id');



      productPrice    = parseInt(productPrice);
      productPrice    = productPrice.toFixed(0);
      productDiscount = parseInt(productDiscount);
      productDiscount = productDiscount.toFixed(0);

      productPrice    = productPrice.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
      productDiscount = productDiscount.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');

      $('.product-form_table tbody').append(`
      <tr>
          <td class="product-form_table--product__subname" product-id="${productId}"><button type="button" class="remove-link"></button>${productName}</td>
          <td>
              <div class="product-form_table--counter">
                  <div class="product-form_table--counter__minus">-</div>
                  <div class="product-form_table--counter__value">1</div>
                  <div class="product-form_table--counter__plus">+</div>
              </div>
          </td>
          <td class="product-form_table--price"  price="${productPrice}">${productPrice} р.</td>
          <td class="product-form_table--discount"></td>
          <td class="product-form_table--discount__price" discount="${productDiscount}">${productDiscount} р.</td>
      </tr>
      `);
      
      calculateDiscoun();
    });

    // add to table /

      
    // remove from table 

    $(document).on('click', '.remove-link' , function(event){
        let eventTarget = $(event.target);
        eventTarget.closest('tr').remove();
        calculateDiscoun();
    })

    // remove from table /


    // counter


    $(document).on('click', '.product-form_table--counter__plus', function(event){
      
        let targetCounter = $(event.target);
        let startValue = parseInt(targetCounter.siblings('.product-form_table--counter__value').html());
        let newValue = startValue += 1;

        targetCounter.siblings('.product-form_table--counter__value').html(newValue);

        let startPrice = parseInt($(this).parents('tr').children('.product-form_table--price').attr('price').replace(/ /g,''));
        let newPrice = startPrice * newValue;

        newPrice = newPrice.toFixed(0);
        newPrice = newPrice.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        $(this).parents('tr').children('.product-form_table--price').html(newPrice + ' р.');


        let startDiscountPrice = parseInt($(this).parents('tr').children('.product-form_table--discount__price').html().replace(/ /g,''));

        let newDiscountPrice = startDiscountPrice * newValue;

        newDiscountPrice = newDiscountPrice.toFixed(0);
        newDiscountPrice = newDiscountPrice.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');

        $(this).parents('tr').children('.product-form_table--discount__price').html(newDiscountPrice + ' р.');

        calculateDiscoun();
    });

  
    $(document).on('click', '.product-form_table--counter__minus', function(event){
        let targetCounter = $(event.target);
        let startValue = parseInt(targetCounter.siblings('.product-form_table--counter__value').html());
        let newValue = startValue -= 1;

        if ( newValue < 1) {
          newValue = 1;
        };

        targetCounter.siblings('.product-form_table--counter__value').html(newValue);

        let startPrice = $(this).parents('tr').children('.product-form_table--price').attr('price').replace(/ /g,'');
        let valPrice = $(this).parents('tr').children('.product-form_table--price').html();
        startPrice = parseInt(startPrice.replace(/[^0-9.]/g, ""));
        valPrice = parseInt(valPrice.replace(/[^0-9.]/g, ""));

        
        let newPrice = valPrice - startPrice;
        newPrice = newPrice.toFixed(0);
        newPrice = newPrice.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        $(this).parents('tr').children('.product-form_table--price').html(newPrice + ' р.');
        
        let startDiscPrice = parseInt($(this).parents('tr').children('.product-form_table--discount__price').html().replace(/ /g,''));
        let valDiscPrice = parseInt($(this).parents('tr').children('.product-form_table--discount__price').html().replace(/ /g,''));

        let newDiscPrice = valDiscPrice - startDiscPrice;
        newDiscPrice = newDiscPrice.toFixed(0);
        newDiscPrice = newDiscPrice.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        $(this).parents('tr').children('.product-form_table--discount__price').html(newDiscPrice + ' р.');
        

        if ( newPrice < startPrice ) {
          startPrice     = (startPrice.toFixed(0) + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
          startDiscPrice = (startDiscPrice.toFixed(0) + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
          $(this).parents('tr').children('.product-form_table--price').html(startPrice + ' р.');
          $(this).parents('tr').children('.product-form_table--discount__price').html(startDiscPrice + ' р.');
        }

        calculateDiscoun();
    });

    // counter /

});


let price,
    sale,
    discount;


function calculateDiscoun() {
  
  price     = document.querySelectorAll('.product-form_table--price');
  sale      = document.querySelectorAll('.product-form_table--discount__price');
  discount  = document.querySelectorAll('.product-form_table--discount');

  let sumPriceElem      = document.querySelector('.total-sum_price');
  let sumDiscountElem   = document.querySelector('.total-sum_disc');
  let sumSaleElem       = document.querySelector('.total-sum_sale');
  let sumTotal          = document.querySelector('.product-form_buy--title');

  price = Array.from(price).map(elem => {
    return elem.innerHTML.replace(/\D+/g, "");
  });

  // sale = Array.from(sale).map(elem => {
  //   return elem.innerHTML.replace(/[^0-9.]/g, "");
  // });
  
  // let discountPrice = price.reduce((acc, cur, i) => {
  //   cur = parseInt(cur);
  //   sale[i] = parseInt(sale[i]);
  //   acc.push(cur - sale[i]);
  //   return acc;
  // }, []);


  // discountPrice.forEach((el, i) => {
  //   el = (el.toFixed(0) + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
  //   discount[i].innerHTML = el + ' р.';
  // })

 let sumPrice     = price.reduce((price_sum, a) => parseInt(price_sum) + parseInt(a,0));
 sumPrice = parseInt(sumPrice);

 let salePerc = document.querySelector('.product-form_buy--sale__percent');


  price.forEach((el, i) => {
    sumPrice = parseInt(sumPrice);
    sumPrice = sumPrice.toString();
    console.log(sumPrice)
    if ( sumPrice.length < 7 ) {
      salePerc.innerHTML = 'Скидка: 0 %';
      el = parseInt(el);
      el = (el.toFixed(0) + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
      sale[i].innerHTML = el + ' р.';

    } else {
      sumPrice = parseInt(sumPrice);
      let per = parseInt(sumPrice / 1000000);

        if ( per > 20 ) {
          per = 20;
        }

      salePerc.innerHTML = 'Скидка: ' + per + ' %';
      el = parseInt(el);
      let perRes = el * per;
      let elRes = perRes / 100;
      el =  el - elRes;
      el = (el.toFixed(0) + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
      sale[i].innerHTML = el + ' р.';
    }
  });

  sale = Array.from(sale).map(elem => {
    return elem.innerHTML.replace(/[^0-9.]/g, "");
  });

  let discountPrice = price.reduce((acc, cur, i) => {
    cur = parseInt(cur);
    sale[i] = parseInt(sale[i]);
    acc.push(cur - sale[i]);
    return acc;
  }, []);

  discountPrice.forEach((el, i) => {
    el = (el.toFixed(0) + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    discount[i].innerHTML = el + ' р.';
  })


 
  let sumSale      = sale.reduce((sale_sum, a) => parseInt(sale_sum) + parseInt(a,0));
  let sumDiscount  = discountPrice.reduce((discount_sum, a) => parseInt(discount_sum) + parseInt(a,0));

  sumPrice    = parseInt(sumPrice);
  sumPrice    = sumPrice.toFixed(0);
  sumDiscount = parseInt(sumDiscount);
  sumDiscount = sumDiscount.toFixed(0);
  sumSale     = parseInt(sumSale);
  sumSale     = sumSale.toFixed(0);

  sumPrice    = (sumPrice +'').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
  sumDiscount = (sumDiscount +'').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
  sumSale     = (sumSale +'').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');


  sumPriceElem.innerHTML    = sumPrice + ' р.' ;
  sumDiscountElem.innerHTML = sumDiscount + ' р.' ;
  sumSaleElem.innerHTML     = sumSale + ' р.' ;
  sumTotal.innerHTML        = sumSale.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + ' р.' ;


  getProducts();

}

calculateDiscoun();




function getProducts() {
  var productId         = document.querySelectorAll("td[product-id]");
  var productCount      = document.querySelectorAll(".product-form_table--counter__value");
  var productIdArr      = [];
  var productCountArr   = [];

  productId.forEach(elem => {
    productIdArr.push(parseInt(elem.getAttribute('product-id')));
  });


  productCount.forEach(element => {
    productCountArr.push(parseInt(element.innerHTML));
  });

  return {productCountArr, productIdArr};
}


function sendProducts() {
  document.querySelector('.product-form_buy--btn').addEventListener("click", function(event){
    event.preventDefault();
    getProducts();

    const {productCountArr, productIdArr} = getProducts();

    productCountArr.forEach((element, ind) => {
      for ( var i = 0; i < element; i++) {
        productIdArr.forEach((el, index) => {
          if ( ind == index) {
            get_revpopup_cart(el,'product',get_revpopup_cart_quantity(''+ el +''));
          } 
        });
      };
    });
  });
}

sendProducts();
