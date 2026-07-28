var swiper = new Swiper(".popular-content", {
    slidesperview:1,
    spaceBetween:10,
    autoplay: {
      delay: 5500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints:{
      280: {
        slidesperview:1,
        spaceBetween:10,
      },
      320: {
        slidesperview: 2,
        spaceBetween: 10,
      },
      510: {
        slidesperview: 2,
        spaceBetween: 10,
      },
      758: {
        slidesperview: 3,
        spaceBetween: 15,
      },
      900: {
        slidesperview: 4,
        spaceBetween: 20,
      },
    },
});
let playbutton = document.querySelector('.play-movie');
let video = document.querySelector('.video-container');
let myvideo = document.querySelector('#myvideo');
let closebtn = document.querySelector('.close-video');

playbutton.onclick = () =>{
  video.classList.add('show-video');
  myvideo.play();
};
closebtn.onclick = () =>{
  video.classList.remove('show-video');
  myvideo.pause();
};