"use strict";

window.addEventListener('DOMContentLoaded', () => {

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

    new ProjectItem(
        'img/portfolio/uber.png',
        'uber',
        'Uber',
        'Descr Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam magni adipisci quibusdam ut neque suscipit quos nemo provident ipsa? Odit ducimus voluptatem placeat, quis reiciendis iusto quo dolore. Vitae, corporis.',
        '.portfolio__inner'
    ).render();

    new ProjectItem(
        'img/portfolio/uber.png',
        'uber',
        'Uber',
        'Descr Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam magni adipisci quibusdam ut neque suscipit quos nemo provident ipsa? Odit ducimus voluptatem placeat, quis reiciendis iusto quo dolore. Vitae, corporis.',
        '.portfolio__inner'
    ).render();

    new ProjectItem(
        'img/portfolio/uber.png',
        'uber',
        'Uber',
        'Descr Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam magni adipisci quibusdam ut neque suscipit quos nemo provident ipsa? Odit ducimus voluptatem placeat, quis reiciendis iusto quo dolore. Vitae, corporis.',
        '.portfolio__inner'
    ).render();

    new ProjectItem(
        'img/portfolio/uber.png',
        'uber',
        'Uber',
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
            background-color: #4a998a;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .2;
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

    const form = document.querySelector('form'),
          name = form.elements[0],
          email = form.elements[1],
          subject = form.elements[2],
          message = form.elements[3];

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        if (document.querySelector('.validate')) {
            document.querySelector('.validate').remove();
        }

        if (name.value && email.value && subject.value && message.value) {
            const checkName = /^[A-Za-z]{3,16}$/;
            const checkEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            if (checkName.test(name.value) && checkEmail.test(email.value)) {

                let success = document.createElement('div');
                success.classList.add('validate');
                success.innerHTML = `<span style="color: green;">Сообщение успешно отправлено</span>`;

                form.append(success);
            } else {

                let error = document.createElement('div');
                error.classList.add('validate');
                error.innerHTML = `<span style="color: red;">Не корректно заполнены поля</span>`;

                form.append(error);
            }
        } else {
            let error = document.createElement('div');
            error.classList.add('validate');
            error.innerHTML = `<span style="color: red;">Не все поля заполнены</span>`;

            form.append(error);
        }
        form.reset();
    });

    const anchor = document.querySelectorAll('a[href^="#"]');

    anchor.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const linkId = link.getAttribute('href');
            document.querySelector(linkId).scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });
});