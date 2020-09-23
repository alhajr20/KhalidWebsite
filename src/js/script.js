"use strict";

document.addEventListener('DOMContentLoaded', () => {

    // mobile menu

    const humb = document.querySelector('.header__hamburger'),
          menu = document.querySelector('.header__menu');

    humb.addEventListener('click', () => {
        menu.classList.toggle('header__menu_active');
        
        humb.classList.toggle('header__hamburger_active');
    });

    // tabs

    let tabs = document.querySelectorAll('.skills__tab'),
        tabsContent = document.querySelectorAll('.skills__wrapper'),
        tabsParent = document.querySelector('.skills__tabs');

	function hideTabContent() {
        
        tabsContent.forEach(item => {
            item.classList.add('hideTab', 'fade');
            item.classList.remove('showTab');
        });

        tabs.forEach(item => {
            item.classList.remove('skills__tab_active');
        });
	}

	function showTabContent(i = 0) {
        tabs[i].classList.add('skills__tab_active');
        tabsContent[i].classList.add('showTab');
        tabsContent[i].classList.remove('hideTab', 'fade');
    }
    
    hideTabContent();
    showTabContent();

	tabsParent.addEventListener('click', function(event) {
		const target = event.target;
		if(target && target.classList.contains('skills__tab')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
		}
    });
    
    // modal window

    const modalTrigger = document.querySelector('.about__button'),
          modal = document.querySelector('.resume'),
          modalCloseBtn = document.querySelectorAll('.close__button');

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    modalTrigger.addEventListener('click', openModal);

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    modalCloseBtn.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // Использую классы для создания блока проектов

    class ProjectItem {
        constructor(src, altImg, title, descr, parentSelector, ...classes) {
            this.src = src;
            this.altImg = altImg;
            this.title = title;
            this.descr = descr;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = "portfolio__item";
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <div class="portfolio__img">
                    <img src="${this.src}" alt="${this.altImg}">
                </div>
                <div class="portfolio__info">
                    <div class="info card">
                        <h5 class="title">${this.title}</h5>
                        <p>${this.descr}</p>
                        <a href="#" class="btn">VIEW LIFE</a>
                    </div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    // const url = 'http://localhost:3000/items';

    // function getResource(method, url, body = null) {
    //     return fetch(url, {
    //         method: method
    //     })
    //         .then(response => {
    //             if (response.ok) {
    //                 return response.json();
    //             }

    //             return response.json().then(error => {
    //                 const e = new Error(`Could not fetch ${url}, status: ${response.status}`);
    //                 e.data = error;
    //                 throw e;
    //             });
    //         });
    // }

    // getResource('GET', url)
    //     .then(data => {
    //         data.forEach(({src, altImg, title, descr}) => {
    //             new ProjectItem(src, altImg, title, descr, ".portfolio__inner").render();
    //         });
    //     });

    // const getResource = (url) => {
    //     let res = fetch(url);
    
    //     if (!res.ok) {
    //         throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    //     }
    
    //     return res.json();
    // };

    // getResource('http://localhost:3000/items')
    //     .then(data => {
    //         data.forEach(({src, altImg, title, descr}) => {
    //             new ProjectItem(src, altImg, title, descr, ".portfolio__inner").render();
    //         });
    //     });

    new ProjectItem(
        'img/tribute-teaser.png',
        'twenty one pilots',
        'TWENTY ONE PILOTS',
        'Descr Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam magni adipisci quibusdam ut neque suscipit quos nemo provident ipsa? Odit ducimus voluptatem placeat, quis reiciendis iusto quo dolore. Vitae, corporis.',
        '.portfolio__inner'
    ).render();

    new ProjectItem(
        'img/tribute-teaser.png',
        'twenty one pilots',
        'TWENTY ONE PILOTS',
        'Descr Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam magni adipisci quibusdam ut neque suscipit quos nemo provident ipsa? Odit ducimus voluptatem placeat, quis reiciendis iusto quo dolore. Vitae, corporis.',
        '.portfolio__inner'
    ).render();

    new ProjectItem(
        'img/tribute-teaser.png',
        'twenty one pilots',
        'TWENTY ONE PILOTS',
        'Descr Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam magni adipisci quibusdam ut neque suscipit quos nemo provident ipsa? Odit ducimus voluptatem placeat, quis reiciendis iusto quo dolore. Vitae, corporis.',
        '.portfolio__inner'
    ).render();

    new ProjectItem(
        'img/tribute-teaser.png',
        'twenty one pilots',
        'TWENTY ONE PILOTS',
        'Descr Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam magni adipisci quibusdam ut neque suscipit quos nemo provident ipsa? Odit ducimus voluptatem placeat, quis reiciendis iusto quo dolore. Vitae, corporis.',
        '.portfolio__inner'
    ).render();

    // slider

    let offset = 0;
    let slideIndex = 1;
    
    const slides = document.querySelectorAll('.portfolio__item'),
          slider = document.querySelector('.portfolio'),
          prev = document.querySelector('.portfolio__prev'),
          next = document.querySelector('.portfolio__next'),
          slidesWrapper = document.querySelector('.portfolio__wrapper'),
          slidesField = document.querySelector('.portfolio__inner'),
          width = window.getComputedStyle(slidesWrapper).width;


    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const dots = document.createElement('ol'),
          arrDots = [];

    dots.classList.add('slider-dots');
    dots.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 5%;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(dots);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        dots.append(dot);
        arrDots.push(dot);
    }

    next.addEventListener('click', function() {
        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        arrDots.forEach(dot => dot.style.opacity = '.5');
        arrDots[slideIndex - 1].style.opacity = 1; 
    });

    prev.addEventListener('click', function() {
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        arrDots.forEach(dot => dot.style.opacity = '.5');
        arrDots[slideIndex - 1].style.opacity = 1; 
    });

    arrDots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            arrDots.forEach(dot => dot.style.opacity = '.5');
            arrDots[slideIndex - 1].style.opacity = 1;
        });
    });

    // Form

    // const form = document.querySelector('form');

    // const message = {
    //     loading: 'Загрузка...',
    //     success: 'Спасибо! Ждите ответа',
    //     failure: 'Что-то пошло не так...'
    // };

    // const postData = async (url, data) => {
    //     let res = await fetch(url, {
    //         method: "POST",
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: data
    //     });
    
    //     return await res.json();
    // };

    // function bindPostData(form) {
    //     const formData = new FormData(form);

    //     const json = JSON.stringify(Object.fromEntries(formData.entries()));

    //     postData('http://localhost:3000/requests', json)
    //         .then(data => {
    //             showThanksModal(message.success);
    //         }).catch(() => {
    //             showThanksModal(message.failure);
    //         }).finally(() => {
    //             form.reset();
    //         });
    // }

    // function showThanksModal(message) {
    //     alert(message);
    // }

    // $('#form').validate({
    //     rules: {
    //         name: {
    //             required: true
    //         },
    //         email: {
    //             required: true,
    //             email: true
    //         },
    //         subject: {
    //             required: true,
    //             minlength: 7
    //         },
    //         message: {
    //             required: true,
    //             minlength: 15
    //         }
    //     },
    //     messages: {
    //         name: {
    //             required: "Пожалуйста, заполните поле \"Name\""
    //         },
    //         email: {
    //             required: "Пожалуйста, заполните поле \"Email\"",
    //             email: "Пожалуйста, введите корректный email адрес"
    //         },
    //         subject: {
    //             required: "Пожалуйста, заполните поле \"Subject\"",
    //             minlength: jQuery.format('Длина темы должно быть не менее {0}-х символов')
    //         },
    //         message: {
    //             required: "Пожалуйста, заполните поле \"Message\"",
    //             minlength: jQuery.format('Длина сообщения должно быть не менее {0}-х символов')
    //         }
    //     },
    //     submitHandler: function() {
    //         bindPostData(form);
    //     }
    // });

});