
vue = (id) ->
  new Vue
    el: '#'+id
    data:
      nb : 3,
      locked: true,
      stars: 0
    methods:
      getTitle:->
        $(this.$el).parent().parent().find('p').text()
      go: (e)->
        this.locked = !this.locked
        if this.locked
          work = $(e.target).parent().parent().parent().find('p').text()
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
          this.colorize(nb)
      colorize: (nb)->
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

colorize = (stars) ->
  $('.stars').each ->
    if this.id != "undefined"
      v = vue(this.id)
      title = v.getTitle()
      if stars[title]
        v.colorize(stars[title])

$.get '/users/stars', (data) ->
  stars = data
  colorize(data)
