phantom.injectJs('app/bootstrap.js');

function Main(){}
Main.prototype = new Loop()
var m = new Main()
var chara = new Chara();
Chocobo.set_casper__callback()
m.init = function() {
    m.item_checked = 0;
}
m.get_treasure = function() {
    if (80 < chara.num_weapon) {
        Util.echo('selling weapon')
        chara.sellAutoWeapon();
        return;
    }
    Util.echo('get treasure box');
    Util.open(URL.ffb_box_treasure())
    casper.then(function(){
        var v = casper.evaluate(function(){
            return $('input').length
        })
        // treasure empty
        if (0 == v) {
            m.item_checked = 1
            Util.echo('empty: treasure box')
            return
        }
        casper.then(function(){
            this.click('input.button-tap')
        })
        Util.sleep(2000)
    })
}
m.get_other = function () {
    Util.echo('get other item');
    Util.open(URL.ffb_box_other())
    casper.then(function(){
        var v = casper.evaluate(function(){
            return $('input').length
        })
        // item empty
        if (0 == v) {
            m.item_checked = 3
            Util.echo('empty: other item box')
            return
        }
        casper.then(function(){
            this.click('input.button-tap')
        })
        Util.sleep(2000)
    })
}
var chocobo_url = new Array
m.get_chocobo = function () {
    
    if (Util.urlMatch(URL.ffb_chocobo_feed_fla())) {
        Click.quest()
        return;
    }
    // rare get
    if (Util.urlMatch('_ffjm_feed_send_see_info_select')) {
        Util.echo('get rare')
        Chocobo.send_rand()
        Util.sleep(2000)
        return
    }
    casper.then(function(){
        if (0 < chocobo_url.length) {
            Util.open(chocobo_url[0])
            chocobo_url = chocobo_url.slice(1)
            return
        }
        if (0 == chocobo_url.length) {
            Util.open(URL.ffb_box_chocobo())
        }
        if (0 == chocobo_url.length) {
            m.item_checked = 2
            Util.echo('empty: chocobo box')
            return
        }
    })
}
m.main = function() {
    if (0 == m.item_checked) {
        // check weapon num
        chara.getNumWeapon()
        casper.then(m.get_treasure)
    } else if (1 == m.item_checked) {
        casper.then(m.get_chocobo)
    } else if (2 == m.item_checked) {
        casper.then(m.get_other)
    } else if (3 == m.item_checked) {
        Util.stop();
    }
}

m.start()