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
function decide_attack_type(bp, hp, is_attacked) {
    if (ConfigGame.ENEMY_HP_BORDER_FULL_ATTACK < hp && bp == 3) {
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
// to get chk_id for attack
casper.on('http.status.200', function() {
    if (chk_id != null) {
        return
    }
    if (-1 == this.getCurrentUrl().search(/_ffjm_team_btl_rdy/)) {
        return
    }
    //casper.echo(this.getCurrentUrl())
    chk_id = this.evaluate(function() {
        var v = document.querySelector('ul.t_center a').href
        if (v.match(/chk=(\w+)&/)) {
            return RegExp.$1
        }
        return null
    })
    casper.echo(d()+"got chk_id: "+chk_id)
})
m.controller_attack = function() {
    // chk_id が取得できていないならば取得しようとする
    // 初回の取得処理では攻撃できないため、一度sellナシで終了させる
    if (chk_id == null) {
        Util.open(URL.ffb_team_btl_rdy())
        return
    }
    var attack_type = decide_attack_type(chara.bp, boss.hp, boss.is_attacked)
    var type = 'WAIT'
    if (attack_type == ATTACK_FULL) {
        type = 'FULL'
    } else if (attack_type == ATTACK_NORMAL) {
        type = 'NORMAL'
    }
    Util.echo('AttackType:['+type+']:'+attack_type)
    if (ATTACK_WAIT == attack_type) {
        Util.sleep(ConfigGame.INTERVAL_ENEMY_CHECK)
        return
    }
    // 攻撃してくれない様なら、ここのコメントアウト外して調べる
    Util.echo(URL.ffb_attack_url(chk_id, attack_type))
    casper.thenOpen(URL.ffb_attack_url(chk_id, attack_type), function(){
        boss.is_attacked = true
    });
    Util.sleep(ConfigGame.INTERVAL_ENEMY_CHECK)
}
m.main = function() {
    var hour = (new Date()).getHours()
    if (1 <= hour && hour <= 3) {
        Util.sleep(5*60*1000)
    }
    boss.getStatus()
    chara.getStatus()
    casper.then(function(){
        var is_alive = boss.isAlive()
        if (is_alive) {
            boss.echoStatus()
            chara.echoStatus()
            if (0 == chara.bp) {
                Util.sleep(ConfigGame.INTERVAL_ENEMY_CHECK)
            } else {
                m.controller_attack()
            }
        } else {
            Util.sleep(ConfigGame.INTERVAL_ENEMY_CHECK)
        }
    })
}
m.start();
