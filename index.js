console.log('Моя оценка - 26 баллов');
console.log('Отзыв по пунктам ТЗ:');
console.log('Выполненные пункты:');
console.log('Реализация burger menu на обеих страницах: +26'); 
console.log('[+2] при ширине страницы меньше 768рх панель навигации скрывается, появляется бургер-иконка');
console.log('[+4] при нажатии на бургер-иконку, справа плавно появляется адаптивное меню шириной 320px, бургер-иконка плавно поворачивается на 90 градусов'); 
console.log('[+2] высота адаптивного меню занимает всю высоту экрана'); 
console.log('[+4] при повторном нажатии на бургер-иконку или на свободное от бургер-меню пространство адаптивное меню плавно скрывается уезжая за правую часть экрана, бургер-иконка плавно поворачивается на 90 градусов обратно'); 
console.log('[+2] бургер-иконка создана при помощи html+css, без использования изображений'); 
console.log('[+2] ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям, сохраняются заданные на первом этапе выполнения задания требования интерактивности элементов меню'); 
console.log('[+2] при клике по любой ссылке (интерактивной или неинтерактивной) в меню адаптивное меню плавно скрывается вправо, бургер-иконка поворачивается на 90 градусов обратно'); 
console.log('[+2] расположение и размеры элементов в бургер-меню соответствует макету (центрирование по вертикали и горизонтали элементов меню, расположение иконки)'); 
console.log('[+2] область, свободная от бургер-меню, затемняется'); 
console.log('[+4] страница под бургер-меню не прокручивается'); 
console.log('[+0] Реализация слайдера-карусели на странице Main'); 
console.log('[+0] Реализация пагинации на странице Pets');
console.log('[+0] Реализация попап на обеих страницах '); 


const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector(".nav");

const shadow = document.querySelector(".shadow");



function getTranslateXY(element) {
    const style = window.getComputedStyle(element)
    const matrix = new DOMMatrixReadOnly(style.transform)
    return {
        translateX: matrix.m41,
        translateY: matrix.m42
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function toggleMenu() {
  nav.classList.toggle("nav-open");	
  shadow.classList.toggle("active");  
  hamburger.classList.toggle('hamburger-open');
  document.body.classList.toggle("scroll-off");
}

function closeMenu(e) {
	if(e.target.classList.contains("nav-link")){
		nav.classList.remove("nav-open");
		shadow.classList.remove("active");  
		hamburger.classList.remove("hamburger-open");
	}
}


function getInfo(e) {
	if(e.target.classList.contains("card")){
		pets.forEach(function(el,ind,arr){
			if(e.target.dataset.name == el["name"]){
				var elems = document.querySelectorAll(".modal-window [data-pets]");
				elems.forEach(function(elem){
					elem.textContent = el[elem.dataset.pets];
				});
        mwnd.style.backgroundImage = `url(${el[mwnd.dataset.pets]})`;
			}
		});
		showPopup();		
	}  
}

function check(arr, p) {  
  var farr = arr.filter(el => el["name"] === p["name"]);
  if(farr.length > 0)    
    return true;
  return false;       
}

function getContent() {
  var vcards = Array.from(document.querySelectorAll(".slide:not(.hidden) .card")).filter(card => getComputedStyle(card).display === "block");
  var prev = vcards.map(function(el){
    return {"name": el.dataset.name};
  }); 
  var cds = [];    
  for(var i=0;i<vcards.length;i++){
    var obj = pets[getRandomInt(0,7)];
    if(check(cds, obj) || check(prev, obj)){
      while(check(cds, obj) || check(prev, obj)){
        obj = pets[getRandomInt(0,7)];
      }
      cds.push(obj);      
    }
    else{
      cds.push(obj);      
    }    
  }
  return cds;
}

function prev() {
  var cards = getContent(); 
  var slideW = document.querySelector(".slide").offsetWidth;   
  var trans = getTranslateXY(slides).translateX;
  if(trans==0)
    trans = -slideW*3;
  slides.style.transform = `translatex(${trans+slideW}px)`; 
  setTimeout(function(){setClass(cards)}, 500);
}

function next() {
  var cards = getContent(); 
  var slideW = document.querySelector(".slide").offsetWidth;   
  var trans = getTranslateXY(slides).translateX;
  if(trans - slideW < -slideW*2)
    trans = slideW;
  slides.style.transform = `translatex(${trans-slideW}px)`;  
  setTimeout(function(){setClass(cards)}, 500);
}

function setClass(pts) {  
  var slideW = document.querySelector(".slide").offsetWidth;
  document.querySelectorAll(".slide").forEach(function(el){
    el.classList.add("hidden");
  });  
  if(getTranslateXY(slides).translateX == 0){
    slides.children[0].classList.remove("hidden");
    pts.forEach(function(obj,ind,arr){
      slides.children[0].children[ind].dataset.name = obj["name"];
      slides.children[0].children[ind].style.backgroundImage = `url(${obj["img"]})`;
      slides.children[0].children[ind].children[0].textContent = obj["name"];
    });    
  }    
  else if (getTranslateXY(slides).translateX == -slideW){
    slides.children[1].classList.remove("hidden");
    pts.forEach(function(obj,ind,arr){
      slides.children[1].children[ind].dataset.name = obj["name"];
      slides.children[1].children[ind].style.backgroundImage = `url(${obj["img"]})`;
      slides.children[1].children[ind].children[0].textContent = obj["name"];
    });  
  }    
  else if(getTranslateXY(slides).translateX == -slideW*2){
    slides.children[2].classList.remove("hidden");
    pts.forEach(function(obj,ind,arr){
      slides.children[2].children[ind].dataset.name = obj["name"];
      slides.children[2].children[ind].style.backgroundImage = `url(${obj["img"]})`;
      slides.children[2].children[ind].children[0].textContent = obj["name"];
    });  
  }
    
}

function showPopup (argument) {
	popup.style.display = "flex";
  popup.style.justifyContent = "center";
  popup.style.alignItems = "center";
  document.body.style.overflow = "hidden";
	//popup.style.top = window.scrollX;
}

function closePopup (e) {  
  if(e.target.classList.contains("fixed-overlay") || e.target.classList.contains("btn-close")){    
    popup.style.display = "";
    document.body.style.overflow = "";
  }
}

function addClass(e) {
  if(e.target.classList.contains("fixed-overlay"))
    btnclose.classList.add("btn-hover");
}

function removeClass(e) {
  if(e.target.classList.contains("fixed-overlay"))
    btnclose.classList.remove("btn-hover");
}

hamburger.addEventListener('click', toggleMenu);
nav.addEventListener("click", closeMenu);

