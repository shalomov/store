$(document).ready(function(){

    // toggle form

    $('.search-btn').click(function(){
        toggleForm();
    });

    $('.search-form_close').click(function(){
        toggleForm();
    })

    let toggleForm = () => {
        $('#search-form').toggleClass('active-search');
    }

    // toggle form

    $('.mobile-menu_btn').click( function(){
        $('.main-nav').toggleClass('active-mobile_menu');
        $('#search-form').removeClass('active-search');
        $('.mobile-menu_btn i').toggle();
    });

    $('.mobile-submenu_btn').click( function(){
        $('.header-menu_nav').toggleClass('active-mobile_submenu');
    });
    if (window.matchMedia('(max-width: 1200px)').matches) { 
        $('.main-nav_item').click( function( event ){
            let targetItem = $(event.target);
            console.log(targetItem);
            targetItem.next('.main-nav_sublist').slideToggle('active-mobile_submenu');
        });

        $('.delete-event').click( function(e){
            e.preventDefault();
        });
    }

    if (window.matchMedia('(max-width: 767px)').matches) { 
        $('.second-header_item').click( function(e){
            event.preventDefault();
            $(this).find('.second-header_sublist').toggle();
            $(this).find('.fa-chevron-down').toggleClass('icon-toggle_style');
        });
    }


});