phantom.injectJs('app/bootstrap.js');
phantom.injectJs(DIR.MODEL+'/Boss.js');

function Main(){}
Main.prototype = new Loop()
var m = new Main()
var chara = new Chara()
var boss = new Boss()

var ATTACK_WAIT = 0;
var ATTACK_FULL = 3;
var ATTACK_NORMAL = 1;
function attack_type(bp, hp, is_attacked) {
    if (500000 < hp && bp == 3) {
        return ATTACK_FULL;
    }
    if (!is_attacked && bp > 0) {
        return ATTACK_NORMAL;
    }
    if (bp == 3) {
        return ATTACK_NORMAL;
    }
    return ATTACK_WAIT;
}
var chk_id = null;
casper.on('http.status.200', function() {
    if (chk_id == null) {
        return
    }
    if (-1 == this.getCurrentUrl().match(new RegExp("*************", "i"))) {
        return
    }
    chk_id = this.evaluate(function() {
        var e = document.querySelectorAll('li.button-tap-link a')
        return v
    })
})
m.controller_attack = function() {
    var attack_type = attack_type(chara.bp, boss.hp, boss.is_attacked)
    var type = 'WAIT'
    if (attack_type == ATTACK_FULL) {
        type = 'FULL'
    } else if (attack_type == ATTACK_NORMAL) {
        type = 'NORMAL'
    }
    Util.echo('AttackType:['+type+']:'+attack_type)
    if (ATTACK_WAIT == attack_type) {
        return
    }
    c.thenOpen(URL.ffb_attack_url('chk_id', attack_type), function(){
        boss.is_attacked = true
    });
}
m.main = function() {
    boss.getStatus()
    casper.then(function(){
        var is_alive = boss.isAlive()
        if (is_alive) {
            boss.echoStatus()
            chara.getStatus()
            chara.echoStatus()
            m.controller_attack()
        }
    })
    Util.sleep(30*1000)
}
m.start();