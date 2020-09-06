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

    // slider 

    const slider = tns({
        container: '.portfolio_main',
        items: 1,
        slideBy: 'page',
        autoplay: false,
        controls: false
    });
    
    document.querySelector('.prev').addEventListener('click', function() {
        slider.goTo('prev');
    });
    
    document.querySelector('.next').addEventListener('click', function() {
        slider.goTo('next');
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
});