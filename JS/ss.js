var names = [
    "cruisin-goat",
    "emotional-goat",
    "goat-out-of-hand",
    "kissing-goat",
    "sassy-goat",
    "smiling-goat",
    "sweater-goat"
  ];
  
  var totalClicks = 0;
  
  //(1) get the images
  var leftImage = document.getElementById('leftImage');
  var rightImage = document.querySelector('#rightImage');
  var imagesSection = document.querySelector('#imagesSection');
  
  //(2) add src,alt,title to the images to test if ever thing is working
  // leftImage.src = `assets/${names[0]}.jpg`;
  // leftImage.alt = names[0];
  // leftImage.title = names[0];
  
  // rightImage.setAttribute('src', `assets/${names[1]}.jpg`);
  // rightImage.setAttribute('alt', names[1]);
  // rightImage.setAttribute('title', names[1]);
  
  //(3_1) create constructor function for the goats
  // var goatArray = [];
  function Goat(name) {
    this.goatName = name;
    this.imagePath = `assets/${name}.jpg`;
    this.clicks = 0;
    // goatArray.push(this);
    Goat.all.push(this);
  }
  Goat.all = [];
  
  //(3_2) instantiate objects for all the goats one shot
  for (var i = 0; i < names.length; i++) {
    new Goat(names[i]);
  }
  console.log(Goat.all);
  
  var leftGoat, rightGoat;
  //(4) render 2 random images
  function renderImages() {
    // var randomIndex = randomNumber(0,Goat.all.length-1);
     leftGoat = Goat.all[randomNumber(0,Goat.all.length-1)];
     rightGoat = Goat.all[randomNumber(0,Goat.all.length-1)];
    // console.log(leftGoat);
    leftImage.src = leftGoat.imagePath;
    leftImage.alt = leftGoat.goatName;
    leftImage.title = leftGoat.goatName;
    rightImage.src = rightGoat.imagePath;
    rightImage.alt = rightGoat.goatName;
    rightImage.title = rightGoat.goatName;
  }
  renderImages();
  
  //(5) add the event listener to render new images
  // (5) Where should we add the event listener(for the left or right/ to imagesSection will be better since we will have only one clickListener )
  // 5a identify the  clicked image
  // 5b keep track of how many times the image have been clicked and viewed?
  // 5c re render the images
  imagesSection.addEventListener('click',handleClick);
  
  function handleClick (event) {
    // console.log(event);
    // console.log(event.target);
    // console.log(event.target.id);
    if(totalClicks < 5) {

      if(event.target.id !== 'imagesSection') {
        totalClicks++;
        if(event.target.id == 'leftImage') {
          leftGoat.clicks++;
        }
        if(event.target.id === 'rightImage') {
          rightGoat.clicks++;
        }
        renderImages();
      } 
    } else {
      renderResults();
    }
  }
  
  function renderResults () {
    var ulE1 = document.getElementById('finalResult');
    for( var i =0; i<Goat.all.length; i++) {
      var li = document.createElement('li');
      li.textContent = `${Goat.all[i].goatName} has ${Goat.all[i].clicks}`;
      ulE1.append(li);
    }
  }
  
  
  
  // TODO unique images
  // (6) prevent having two exact images at the same time
  // (7) prevent images from repeating one right after the other
  
  
  //helper functions
  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }