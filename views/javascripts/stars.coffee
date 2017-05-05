new Vue
  el: '.stars'
  data:
    nb : 3,
    locked: true
  methods:
    go: ()->
      this.locked = !this.locked
      console.log this.locked
    rate : (e) ->
      if !this.locked
        a = e.pageX
        b = $(this.$el).offset().left
        c = this.$el.scrollWidth
        percent = (a - b) / c
        nb = Math.ceil (this.nb * percent)
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

