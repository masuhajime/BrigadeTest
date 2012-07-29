function Boss() {
    this.initialize.apply(this, arguments)
}
Boss.prototype = {
    hp: 0,
    hp_max: 0,
    lv: 0,
    name: 0,
    minutes: 0,
    is_attacked: false,
    initialize: function() {
        is_attacked = false
        hp = 0
        hp_max = 0
        lv = 0
        name = ''
        minutes = 0
        is_attacked = false
    },
    isAlive : function() {
        return 0 < this.hp;
    },
    echoStatus: function() {
        var boss = this
        casper.then(function(){
            this.echo(d()+"Boss Lv:"+boss.lv+" / "+boss.name+" / "
                +boss.hp+"/"
                +boss.hp_max+"("+(boss.hp/boss.hp_max*100).toFixed(1)+"%)"
                +" left:"+boss.minutes+"min"
                +" / Attacked["+(boss.is_attacked?"YES":"NO")+"]"
                , 'PARAMETER'
            )
        })
    },
    getStatus: function(){
        var boss = this
        casper.thenOpen(URL.ffb_battle_top(), function(){
            if (Util.urlMatch('_ffjm_swf_intrpt')) {
                this.echo(d()+"New Enemy appered.")
                boss.initialize.apply(this, arguments)
                return
            }
            // enemy stat get start
            var s = this.evaluate(function(){
                return $('section.team-top-status').text();
            });
            s = s.replace(/[\s ]/gi,"");
            //this.echo(s)
            //var r = s.match(/(.*)? (\d{1,2})HP:(\d+)\/(\d+)/i);
            //ｶｰﾊﾞﾝｸﾙ36HP:205316/2641548逃亡まであと13分58秒××詳細
            //ｷﾞﾙｶﾞﾒｯｼｭ(FFV)7HP:3997483/10000000逃亡まであと26分29秒×詳細
            //var r = s.match(/(.+[^\d])?([0-9]{1,2})HP:(\d+)\/(\d+).+([0-9]{2})分/i);
            var r = s.match(/(.*)HP:(.*)/i)
            if (r == null) {
                this.echo(d()+"Cant found enemy info")
                boss.initialize.apply(this, arguments)
                return;
            }
            var name_and_lv = RegExp.$1// ｶｰﾊﾞﾝｸﾙ36
            var other_info = RegExp.$2// 205316/2641548逃亡まであと13分58秒××詳細
            name_and_lv.match(/^(.+?)(Lv)?(\d+)$/i)
            boss.name = RegExp.$1
            boss.lv = RegExp.$3
            other_info.match(/(\d+)\/(\d+).+?([0-9]+)分/)
            var boss_hp = parseInt(RegExp.$1)
            if (boss.hp != 0 && boss.hp < boss_hp) {
                boss.initialize.apply(this, arguments)
                return
            }
            boss.hp = boss_hp
            var boss_hp_max = parseInt(RegExp.$2)
            if (boss.hp_max != 0 && boss.hp_max != boss_hp_max) {
                boss.initialize.apply(this, arguments)
                return
            }
            boss.hp_max = boss_hp_max;
            boss.minutes = RegExp.$3;
        })
    }
}