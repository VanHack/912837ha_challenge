$(document).ready(function(){
    setTimeout(function(){
      var accordions = $(".accordions");

      activePanel = $(".accordions div.accordion:first");
        $(activePanel).addClass('active');
    /* setTimeout(function(){
        activePanel = $("#accordions div.accordion:first");
        $(activePanel).addClass('active');
      },500); */
      
  
      accordions.delegate('.accordion', 'click', function(e){
        var $self = $(this);
        
          if(!$self.is('.active')){
            //$(activePanel).animate({width: "44px"}, 300);
            $($self).parent().find('.active').animate({width: "44px"}, 300);
            //$(this).first().animate({width: "44px"}, 300);
            $($self).animate({width: "800px"}, 300);
            $($self).parent().find('.accordion').removeClass('active');
            $($self).addClass('active');
          };
      });
    }, 500);
});