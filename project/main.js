//Window Scroll
window.addEventListener("scroll", function () {
  enterCheck(); //fade active
  toTopCheck(); //to top and nav shadow
});

//Window Load
window.addEventListener("load", workStep); //Section.stop arrow
//Window resize
window.addEventListener("resize", workStep); //Section.stop arrow

//---【Animation】 ---
//fade
const advantages = document.querySelectorAll(".fade");
function enterCheck() {
  const windowHigh = window.innerHeight;
  advantages.forEach((advantage) => {
    const toTopHight = advantage.getBoundingClientRect().y;
    let fadeDelay = 0
    if (toTopHight < windowHigh / 1.25) {
      if(advantage.getAttribute('data-fade-delay')){
        fadeDelay = advantage.getAttribute('data-fade-delay');
      }
      setTimeout(function(){
        advantage.classList.add("active");
      },fadeDelay);
    
    } else {
      advantage.classList.remove("active");
    }
  });
}
enterCheck();


//---【Section-work step】 ---
function workStep() {
  let workStepToTop = document.querySelector("section.section-workstep").getBoundingClientRect().y;
  const arrowBox = document.querySelector(".arrow-box");

  function getItem(topItem, bottomItem, item) {
    //top-item
    const topItemW = topItem.offsetWidth;
    const topItemH = topItem.offsetHeight;
    const topItemX = topItem.getBoundingClientRect().x + topItemW / 2;
    const topItemY = topItem.getBoundingClientRect().y + topItemH / 2;

    //bottom-item
    const bottomItemW = bottomItem.offsetWidth;
    const bottomItemH = bottomItem.offsetHeight;
    const bottomItemX = bottomItem.getBoundingClientRect().x + bottomItemW / 2;
    const bottomItemY = bottomItem.getBoundingClientRect().y + bottomItemH / 2;

    //this-item
    //--set X
    const itemX = Math.min(topItemX, bottomItemX);
    //--set Y
    const itemY = Math.min(topItemY, bottomItemY) - workStepToTop;
    //--set W
    const itemW = Math.abs(topItemX - bottomItemX);
    //--set H
    const itemH = Math.abs(topItemY - bottomItemY);
    arrowBoxSet(item, itemX, itemY, itemW, itemH);
  }

  function arrowBoxSet(item, x, y, w, h) {
    item.style.left = x + "px";
    item.style.top = y + "px";
    item.style.width = w + "px";
    item.style.height = h + "px";
  }

  const itemOrder = document.querySelectorAll("[data-relative]");
  const itemCenter = document.querySelectorAll("div[data-position]");
  if (itemOrder.length - 1 == itemCenter.length) {
    let itemOrderNum = itemOrder.length;
    for (let i = 0; i < itemOrderNum - 1; i++) {
      getItem(itemOrder[i], itemOrder[i + 1], itemCenter[i]);
    }
  }
}

//---【Section-result】 ---
const counters = document.querySelectorAll("[data-end]");
const speed = 500;

counters.forEach((counter) => {
  const animate = () => {
    const value = +counter.getAttribute("data-end");
    const data = +counter.innerText;

    const time = value / speed;
    if (data < value) {
      counter.innerText = Math.ceil(data + time);
      setTimeout(animate, 1);
    } else {
      counter.innerText = value;
    }
  };

  animate();
})


//---【Base-to top】 ---
const body = document.querySelector('body')
//add .no-top class while page not on top
function toTopCheck(){
  const bodyToTop = document.querySelector('body').getBoundingClientRect().y;
  if (bodyToTop < -50){
    body.classList.add('no-top');
  }else{
    body.classList.remove('no-top');
  }
}

//back to top function
function backToTop(){
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}