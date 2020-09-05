document.addEventListener('DOMContentLoaded', () => {

    // mobile menu

    const humb = document.querySelector('.humb'),
          menu = document.querySelector('.menu');

    humb.addEventListener('click', () => {
        menu.classList.toggle('menu_active');
        
        humb.classList.toggle('menu-btn_active');
    });

    // tabs

    let tabs = document.querySelectorAll('.portfolio_projects-tab'),
        tabsContent = document.querySelectorAll('.portfolio_projects'),
        tabsParent = document.querySelector('.portfolio_main');

	function hideTabContent() {
        
        tabsContent.forEach(item => {
            item.classList.add('hideTab', 'fade');
            item.classList.remove('showTab');
        });

        tabs.forEach(item => {
            item.classList.remove('tab_active');
        });
	}

	function showTabContent(i = 0) {
        tabs[i].classList.add('tab_active');
        tabsContent[i].classList.add('showTab');
        tabsContent[i].classList.remove('hideTab', 'fade');
    }
    
    hideTabContent();
    showTabContent();

	tabsParent.addEventListener('click', function(event) {
		const target = event.target;
		if(target && target.classList.contains('portfolio_projects-tab')) {
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
});