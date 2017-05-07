new Vue
  el: '.stars'
  data:
    nb : 3,
    locked: true,
    stars: 0
  methods:
    go: (e)->
      this.locked = !this.locked
      if this.locked
        work = $(e.target).closest('.sitesBadge').find('p').text()
        stars = this.stars
        $.ajax
          type: "POST",
          url: "/rateWork"
          data: {work,stars}
          success: (data) -> console.log "succes?",data
    rate : (e) ->
      if !this.locked
        a = e.pageX
        b = $(this.$el).offset().left
        c = this.$el.scrollWidth
        percent = (a - b) / c
        nb = Math.ceil (this.nb * percent)
        this.stars = nb
        #colorize
        $(this.$el).children().each (i)->
          if i < nb
            $(this).css("color", "yellow")
          else
            $(this).css("color", "green")
  computed:
    opacity: ()->
      if this.locked 
        return 0.5
      else
        return 1

