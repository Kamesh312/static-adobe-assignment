function attachMenuStyles() {
    var menuItems = [].slice.call($('.menu__item')),
        menuSubs = [].slice.call($('.dropdown-menu')),
        closeDropdownTimeout;

        startCloseTimeout = function() {
            closeDropdownTimeout = setTimeout(function() { closeDropdown(); }, 50);
        }

        stopCloseTimeout = function() {
            clearTimeout(closeDropdownTimeout);
        }

        openDropdown = function(el) {
            var menuSub = $('.dropdown-menu[data-sub="' + $(el).attr('data-sub') + '"]')[0],
             menuSubCnt = menuSub.querySelector('.dropdown-menu__content'),
             menuSubTop = menuSubCnt.querySelector('.top-section').getBoundingClientRect(),
             menuMeta = el.getBoundingClientRect(),
             subMeta = menuSubCnt.getBoundingClientRect();

            //- Remove active Menu
            $(el).addClass('active');
            menuSubs.forEach(function(el) { $(el).removeClass('active') } );
            $(menuSub).addClass('active');

            $('.dropdown__bg').css({
                    'opacity': 1,
                    'left': menuMeta.left - (subMeta.width / 2 - menuMeta.width / 2) + 'px'
                })
                .width(subMeta.width + 'px').height(subMeta.height + 'px').offset({
                    top: menuSubTop.height + 'px'
                });
            $('.dropdown__arrow').css({
                'opacity': 1,
                'left': menuMeta.left + menuMeta.width / 2 - 10 + 'px'
            });
            $('.dropdown__wrap').css({
                    'opacity': 1,
                    'left': menuMeta.left - (subMeta.width / 2 - menuMeta.width / 2) + 'px'
                })
                .width(subMeta.width + 'px').height(subMeta.height + 'px').offset({
                    top: menuSubTop.height + 'px'
                });

            $(menuSub).css({
                'opacity': 1
            });
            $('.main-header').addClass('dropdown-active');
        },
        closeDropdown = function() {
            menuItems.forEach(function(el) { el.classList.remove('active')});
            menuSubs.forEach(function(el) {
                el.classList.remove('active');
                el.style.opacity = 0;
            });
            $('.dropdown__bg, .dropdown__arrow').css({
                'opacity': 0
            });
            $('.main-header').removeClass('dropdown-active');
        };

    menuItems.forEach(function(el) {
        //- mouse enter event
        el.addEventListener('mouseenter', function() {
            stopCloseTimeout();
            openDropdown(this);
        }, false);
        el.addEventListener('mouseleave', function() { startCloseTimeout() }, false);
    });

    //- Binding mouse event to each sub menus
    menuSubs.forEach(function(el) {
        el.addEventListener('mouseenter', function() { stopCloseTimeout() }, false);
        el.addEventListener('mouseleave', function() { startCloseTimeout() }, false);
    });
}