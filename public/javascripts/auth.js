new Vue({
  el:"#tabs",
  data:{
    name:"",
    mail:"",
    nameRegexp:/^[A-Za-z][A-Za-z0-9]*$/,
    mailRegexp:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    ok: { "border-color":'blue'},
    notOk: { "border-color":'red'},
    valid:false
  },
  methods:{
    check:function(type){
      verif='this["'+type+'"].match(this["'+type+'Regexp"])';
      return eval(verif);
    },
    submit:function(e) {
      if (this.valid) {e.target.submit()}
    }
  },
  computed:{
    style:function(){
      if(this.check("mail")) {this.valid=true; return this.ok } else {this.valid=false; return this.notOk}
    },
    style2:function(){
      if(this.check("name")) {this.valid=true; return this.ok } else {this.valid=false; return this.notOk}
    }
  }
})

