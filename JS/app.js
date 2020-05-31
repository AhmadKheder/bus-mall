'use strict'

var totalClicks = 0;

//product names from pics
var productNames = [
    'bag', 'banana', 'bathroom', 'breakfast', 'bubblegum', 'chair',
    'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors',
    'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'
]

//constructor
function Product(name, imgPath) {
    this.productname = name;
    this.imgPath = imgPath;
    this.clicks = 0;
    this.displayed = 0;
    Product.all.push(this);
}
// it is not a built in arr, we are adding a new G property to the constructor
Product.all = []

//creating objects
for (var i = 0; i < productNames.length; i++) {
    if (productNames[i] != 'usb' && productNames[i] != 'sweep' ) {
        new Product(productNames[i], `/assets/${productNames[i]}.jpg`);
    }
    else if (productNames[i] == 'usb'){
        new Product(productNames[i], `/assets/${productNames[i]}.gif`);
    }else if (productNames[i] == 'sweep'){
        new Product(productNames[i], `/assets/${productNames[i]}.png`);
    }
}

//query html tags
var leftImage = document.querySelector('#first');
var midImage = document.querySelector('#second');
var rightImage = document.querySelector('#third');
var productsShow = document.querySelector('#productsShow');

//objects
var left, mid, right;
var arr =[]
// fill in images 
function renderImages() {
    //init three rand Objects
    left = Product.all[randomNumber(0, Product.all.length - 1)];
    mid = Product.all[randomNumber(0, Product.all.length - 1)];
    right = Product.all[randomNumber(0, Product.all.length - 1)];
    left.displayed++;
    mid.displayed++;
    right.displayed++;
    //changing attributes values
    leftImage.src = left.imgPath;
    leftImage.title = left.productname;
    leftImage.alt = left.productname;

    midImage.src = mid.imgPath;
    midImage.title = mid.productname;
    midImage.alt = mid.productname;

    rightImage.src = right.imgPath;
    rightImage.title = right.productname;
    rightImage.alt = right.productname;
}


renderImages();

productsShow.addEventListener('click', function (event) {
    // console.log(event.target)
    if (totalClicks < 25) {
        if (event.target.id !== 'productsShow') {
            totalClicks++;
            if (event.target.id === 'first') {
                left.clicks++;
            } if (event.target.id === 'second') {
                mid.clicks++;

            }
            if (event.target.id === 'third') {
                right.clicks++;
            }
            renderImages();
        }

    } else {
        renderResults();
    }


});


function renderResults() {

    var ul = document.getElementById('finalResult');
    for (var i = 0; i < Product.all.length; i++) {
        var li = document.createElement('li');
        li.textContent = ` ${Product.all[i].productname}  CLICKED: ${Product.all[i].clicks} Displayed: ${Product.all[i].displayed} `;
        ul.append(li);
    }
}
//helper functions
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}