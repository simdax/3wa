var colorize, vue;

vue = function(id) {
  return new Vue({
    el: '#' + id,
    data: {
      nb: 3,
      locked: true,
      stars: 0
    },
    methods: {
      getTitle: function() {
        return $(this.$el).parent().parent().find('p').text();
      },
      go: function(e) {
        var stars, work;
        this.locked = !this.locked;
        if (this.locked) {
          work = $(e.target).parent().parent().parent().find('p').text();
          stars = this.stars;
          return $.ajax({
            type: "POST",
            url: "/rateWork",
            data: {
              work: work,
              stars: stars
            },
            success: function(data) {
              return console.log("succes?", data);
            }
          });
        }
      },
      rate: function(e) {
        var a, b, c, nb, percent;
        if (!this.locked) {
          a = e.pageX;
          b = $(this.$el).offset().left;
          c = this.$el.scrollWidth;
          percent = (a - b) / c;
          nb = Math.ceil(this.nb * percent);
          this.stars = nb;
          return this.colorize(nb);
        }
      },
      colorize: function(nb) {
        return $(this.$el).children().each(function(i) {
          if (i < nb) {
            return $(this).css("color", "yellow");
          } else {
            return $(this).css("color", "green");
          }
        });
      }
    },
    computed: {
      opacity: function() {
        if (this.locked) {
          return 0.5;
        } else {
          return 1;
        }
      }
    }
  });
};

colorize = function(stars) {
  return $('.stars').each(function() {
    var title, v;
    if (this.id !== "undefined") {
      v = vue(this.id);
      title = v.getTitle();
      if (stars[title]) {
        return v.colorize(stars[title]);
      }
    }
  });
};

$.get('/users/stars', function(data) {
  var stars;
  stars = data;
  return colorize(data);
});
