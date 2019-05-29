$.fn.showMenuItems = function(options) {
  var elems = $(this);
  $.ajax({
      type: "GET",
      url: options.url,
      dataType: "json",
      async: true,
      success: function(data) {
          //console.log(data)
          elems.displayMenuList(data);
      }
  });
};

$.fn.displayMenuList = function(responseObj) {
  $.each(responseObj, function(key, value) {

      var li = $("<li class='menu__item' data-sub=" + key + "/>").appendTo(".menu");
      $("<a />")
          .text(key)
          .attr("href", "#")
          .appendTo(li);
      var sub_ul = $("<ul>").appendTo(li);
      $.each(this, function(k, v) {
          var sub_li = $("<li/>").appendTo(sub_ul);
          $("<a />")
              .text(v.title)
              .attr("href", "#")
              .appendTo(sub_li);
      });
      var dpmenu = $('<div class="dropdown-menu" data-sub="' + key + '"/>');
      var dpmenuContent = $('<div class="dropdown-menu__content" />');
      var dpTopSection = $('<div class="top-section" />');
      var dpBottomSection = $('<div class="bottom-section" />');
      sub_ul.appendTo(dpTopSection);
      dpTopSection.appendTo(dpmenuContent);
      dpBottomSection.appendTo(dpmenuContent);
      dpmenuContent.appendTo(dpmenu);
      dpmenu.appendTo('.dropdown__wrap');

  });
  attachMenuStyles();
};