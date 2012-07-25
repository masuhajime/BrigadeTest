function Chara() {
    this.initialize.apply(this, arguments);
}
Chara.prototype = {
    initialize: function() {},
    lv: 0,
    atk: 0,
    def: 0,
    g: 0,
    lp: 0,
    bp: 0,
    num_ability: 0,
    num_weapon: 0,
    echoStatus: function() {
        var c = this;
        casper.then(function() {
            this.echo(
                d()
                +'CharaStatus Lv:'+c.lv
                +' / LP:'+c.lp
                +' / BP:'+c.bp
                +' / G:'+c.g
                +' / ATK:'+c.atk
                +' / DEF:'+c.def,
            'PARAMETER');
        });
    },
    getStatus: function() {
        var c = this;
        casper.thenOpen(URL.ffb_my(), function(){
            c.lp = this.evaluate(function(){
                var v = $('li.pt10:first').text();
                return v.substring(0, v.indexOf('/'));
            });
            c.bp = this.evaluate(function(){
                var v = $('li.pt10:eq(1)').text();
                return v.substring(0, v.indexOf('/'));
            });
            c.g = this.evaluate(function(){
                return $('ul.menu_status > li:first').text();
            });
            c.lv = this.evaluate(function(){
                return $('ul.menu_status > li:eq(1)').text();
            });
        });
    },
    getNumAbility: function() {
        var c = this
        casper.thenOpen(URL.ffb_shop_sell_ability(), function(){
            c.num_ability = this.evaluate(function() {
                var v = $('section.status > div:first').text();
                return v.substring(0, v.indexOf('/'));
            })
            this.echo(d()+'AbilityNum:'+c.num_ability, 'PARAMETER');
        });
    },
    getNumWeapon: function() {
        var c = this
        casper.thenOpen(URL.ffb_shop_sell_weapon(), function(){
            c.num_weapon = this.evaluate(function() {
                var v = $('section.status > div:first').text();
                return v.substring(0, v.indexOf('/'));
            })
            this.echo(d()+'WeaponNum:'+c.num_weapon, 'PARAMETER');
        });
    },
    sellAutoAbility: function() {
        casper.thenOpen(URL.ffb_shop_sell_ability(), function(){
            this.evaluate(function() {
                return $("form[action='./_ffjm_sell_auto']").submit();
            });
        });
        Util.sleep(1000)
        casper.then(function(){
            this.evaluate(function() {
                return $("form[action='./_ffjm_sell_exec']").submit();
            });
        })
        Util.sleep(1000)
    },
    sellAutoWeapon: function() {
        casper.thenOpen(URL.ffb_shop_sell_weapon(), function(){
            this.evaluate(function() {
                return $("form[action='./_ffjm_sell_auto']").submit();
            });
        });
        Util.sleep(1000)
        casper.then(function(){
            this.evaluate(function() {
                return $("form[action='./_ffjm_sell_exec']").submit();
            });
        })
        Util.sleep(1000)
    }
};
