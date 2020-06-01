'use strict'

var totalClicks = 0;
var allProducts = [];
var labelsArr = [];
//product names from pics
var productNames = [
    'bag', 'banana', 'bathroom', 'breakfast', 'bubblegum', 'chair',
    'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors',
    'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'
];

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
    if (productNames[i] != 'usb' && productNames[i] != 'sweep') {
        new Product(productNames[i], `/assets/${productNames[i]}.jpg`);
    }
    else if (productNames[i] == 'usb') {
        new Product(productNames[i], `/assets/${productNames[i]}.gif`);
    } else if (productNames[i] == 'sweep') {
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
var firstRandoms = [];
// random nums for the renderImages()
function randNums() {

    var arr = [];
    var rand1 = randomNumber(0, Product.all.length - 1);
    var rand2 = randomNumber(0, Product.all.length - 1);
    var rand3 = randomNumber(0, Product.all.length - 1);
    arr.push(rand1, rand2, rand3);

    return arr;
}
//prevent duplicating in the second itiration
firstRandoms = randNums();
// var lastRand1, lastRand2, lastRand3;//these are depeding on the rand#s in randNums()

// fill in images 
var localRandNumsArr = [];
function renderImages() {
    localRandNumsArr = randNums();
    console.log('localRandNumsArr' + localRandNumsArr);
    console.log('firstRandoms' + firstRandoms);
    
        if (localRandNumsArr[0] == localRandNumsArr[1] || localRandNumsArr[0] == localRandNumsArr[2] || localRandNumsArr[2] == localRandNumsArr[3]) {
            randNums();


        }
        //init three rand Objects
        left = Product.all[localRandNumsArr[0]];
        mid = Product.all[localRandNumsArr[1]];
        right = Product.all[localRandNumsArr[2]];
    
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
do{

renderImages();
}
while(!(localRandNumsArr.includes(firstRandoms[0]) || localRandNumsArr.includes(firstRandoms[1]) || localRandNumsArr.includes(firstRandoms[2])));
productsShow.addEventListener('click', function (event) {
    // console.log(event.target)
    if (totalClicks < 5) {
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
        // allProducts contains only clicked&viewed NO
        for (var i = 0; i < Product.all.length; i++) {
            allProducts.push(Product.all[i].clicks);
            allProducts.push(Product.all[i].displayed);
        }
        // console.log(allProducts);
        for (var i = 0; i < Product.all.length; i++) {
            labelsArr.push(`${Product.all[i].productname} Clk`);
            labelsArr.push(`${Product.all[i].productname} Vus`);
        }
        chart();
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



///Charts


function chart() {
    //get the canvas tag and tell the browser it's gonna be 2d
    var context = document.getElementById('MyChart').getContext('2d');
    //dec obj of chart

    var myChart = new Chart(context, {
        type: 'bar',
        data: {

            labels: labelsArr,//X-axis
            datasets: [
                {
                    label: '# of Votes',
                    data: allProducts,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1,

                }
            ]

        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}