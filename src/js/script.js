"use strict";

document.addEventListener('DOMContentLoaded', () => {

    // mobile menu

    const humb = document.querySelector('.humb'),
          menu = document.querySelector('.menu');

    humb.addEventListener('click', () => {
        menu.classList.toggle('menu_active');
        
        humb.classList.toggle('menu-btn_active');
    });

    // tabs

    let tabs = document.querySelectorAll('.skills_tab'),
        tabsContent = document.querySelectorAll('.skills_blocks'),
        tabsParent = document.querySelector('.skills_tab-wrapper');

	function hideTabContent() {
        
        tabsContent.forEach(item => {
            item.classList.add('hideTab', 'fade');
            item.classList.remove('showTab');
        });

        tabs.forEach(item => {
            item.classList.remove('skills_active');
        });
	}

	function showTabContent(i = 0) {
        tabs[i].classList.add('skills_active');
        tabsContent[i].classList.add('showTab');
        tabsContent[i].classList.remove('hideTab', 'fade');
    }
    
    hideTabContent();
    showTabContent();

	tabsParent.addEventListener('click', function(event) {
		const target = event.target;
		if(target && target.classList.contains('skills_tab')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
		}
    });
    
    // modal window

    const modalTrigger = document.querySelector('.aboutMe_btn'),
          modal = document.querySelector('.resume'),
          modalCloseBtn = document.querySelectorAll('.closeBtn');

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

    // slider
    
    const slides = document.querySelectorAll('.portfolio_projects'),
          prev = document.querySelector('.portfolio_prev'),
          next = document.querySelector('.portfolio_next'),
          slidesWrapper = document.querySelector('.portfolio_main'),
          slidesField = document.querySelector('.portfolio_inner'),
          width = window.getComputedStyle(slidesWrapper).width;

    let offset = 0;

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    next.addEventListener('click', function() {
        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2)
        }

        slidesField.style.transform = `translateX(-${offset}px)`;
    });

    prev.addEventListener('click', function() {
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1)
        } else {
            offset -= +width.slice(0, width.length - 2)
        }

        slidesField.style.transform = `translateX(-${offset}px)`;
    });
});