phantom.injectJs('app/bootstrap.js');

function Main(){}
Main.prototype = new Loop()
var m = new Main()
var chara = new Chara()
m.quest_count = 0
m.init = function() {
}
m.main = function() {
    // in quest
    if (Util.urlMatch('_ffjm_qst_expl')) {
        Util.echo('quest click:'+this.quest_count)
        if (30 < m.quest_count) {
            Util.echo('quit quest for looping')
            Util.open(URL.ffb_my())
            return
        }
        this.quest_count++;
        casper.then(m.quest_click)
        Util.sleep(300)
        return
    }
    this.quest_count = 0
    // ability get scene
    if (Util.urlMatch('_ffjm_feed_get_ability') 
        && !Util.urlMatch('_ffjm_feed_get_ability_result')
    ) {
        Util.echo('getting ability')
        Util.echoUrl()
        casper.then(m.quest_click)
        Util.sleep(300)
        return
    }
    // rare get
    if (Util.urlMatch('_ffjm_feed_send_see_info_select')) {
        Util.echo('get rare')
        Chocobo.send_rand()
        Util.sleep(2000)
        return
    }
    // get stat
    chara.getStatus()
    chara.echoStatus()
    chara.getNumAbility()
    // action decide
    casper.then(m.controller)
}
m.controller = function() {
    // check ability
    if (70 < chara.num_ability) {
        casper.then(m.sell_ability)
        return
    }
    // go quest
    if (4 < chara.lp) {
        casper.then(m.quest_go)
    } else {
        casper.then(m.wait_recover)
    }
}
m.sell_ability = function() {
    Util.echo('sell ability')
    chara.sellAutoAbility()
}
m.quest_click = function() {
    Click.quest()
}
m.quest_go = function() {
    Util.echo('starting quest')
    Util.open(URL.ffb_quest(101001));
}
m.wait_recover = function() {
    Util.echo('waiting LP recover')
    Util.sleep(600*1000)
    casper.then(m.main)
}

m.start()
