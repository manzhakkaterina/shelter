console.log('Моя оценка - 100 баллов');
console.log('Отзыв по пунктам ТЗ:');
console.log('Выполненные пункты:');
console.log('Страница Main (60)'); 
console.log('1. Проверка верстки'); 
console.log('[+4] Верстка страницы валидная: для проверки валидности вёрстки используйте сервис https://validator.w3.org/');
console.log('[+1] логотип в хедере состоит из текстовых элементов'); 
console.log('[+1] страница содержит ровно один элемент <h1>'); 
console.log('[+1] добавлен favicon'); 
console.log('2. Вёрстка соответствует макету'); 
console.log('[+5] блок <header>'); 
console.log('[+5] блок Not only'); 
console.log('[+5] блок About'); 
console.log('[+5] блок Our Friends'); 
console.log('[+5] блок Help'); 
console.log('[+5] блок In addition'); 
console.log('[+5] блок <footer>'); 
console.log('3. Требования к css');
console.log('[+2] для позиционирования элементов блока Help использована сеточная верстка (flexbox или grid) '); 
console.log('[+2] при уменьшении масштаба страницы браузера или увеличении ширины страницы (>1280px) вёрстка размещается по центру'); 
console.log('[+2] фоновый цвет тянется на всю ширину страницы'); 
console.log('4. Интерактивность элементов');
console.log('[+2] элемент About the Shelter в навигации подсвечен и неинтерактивен, остальные элементы навигации интерактивны'); 
console.log('[+2] каждая карточка с питомцем в блоке Our Friends интерактивна при наведении на любую область этой карточки');
console.log('[+2] плавная прокрутка по якорям'); 
console.log('[+2] выполняются все ссылочные связи согласно Перечню ссылочных связей для страницы Main'); 
console.log('[+2] выполнена интерактивность ссылок и кнопок.');
console.log('[+2] обязательное требование к интерактивности: плавное изменение внешнего вида элемента при наведении и клике, не влияющее на соседние элементы'); 
console.log('Страница Pets (40)'); 
console.log('5. Проверка верстки');
console.log('[+4] верстка страницы валидная: для проверки валидности вёрстки используйте сервис https://validator.w3.org/'); 
console.log('[+1] логотип в хедере состоит из текстовых элементов'); 
console.log('[+1] страница содержит ровно один элемент <h1>');
console.log('[+1] добавлен favicon'); 
console.log('6. Вёрстка соответствует макету'); 
console.log('[+5] блок <header>'); 
console.log('[+5] блок Our Friends');
console.log('[+5] блок <footer>'); 
console.log('7. Требования к css'); 
console.log('[+2] при уменьшении масштаба страницы браузера или увеличении ширины страницы (>1280px) вёрстка размещается по центру');
console.log('[+2] фоновый цвет тянется на всю ширину страницы'); 
console.log('8. Интерактивность элементов'); 
console.log('[+2] элемент Our pets в навигации подсвечен и неинтерактивен, остальные элементы навигации интерактивны'); 
console.log('[+2] доступные кнопки пагинации (вправо) активны, недоступные (влево) - неактивны (disabled)');
console.log('[+2] каждая карточка с питомцем в блоке Our Friends интерактивна при наведении на любую область этой карточки'); 
console.log('[+2] плавная прокрутка по якорям');
console.log('[+2] выполняются все ссылочные связи согласно Перечню ссылочных связей для страницы Pets');
console.log('[+2] выполнена интерактивность ссылок и кнопок.');
console.log('[+2] обязательное требование к интерактивности: плавное изменение внешнего вида элемента при наведении и клике, не влияющее на соседние элементы');


const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector(".nav");
const popup = document.querySelector(".fixed-overlay");
const mwnd = document.querySelector(".modal-window");
const slider = document.querySelector(".slider");
const slides = document.querySelector(".slides");
const btnclose = document.querySelector(".btn-close");
const larrow = document.querySelector(".arrow.left");
const rarrow = document.querySelector(".arrow.right");
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

