phantom.injectJs('app/bootstrap.js');

function Main(){}
Main.prototype = new Loop();
var m = new Main();
var chara = new Chara();
var chocobo_url = new Array
Chocobo.set_casper_callback()
m.init = function() {
    Util.echo("init")
    Util.open(URL.ffb_box_chocobo())
}
m.controller = function () {
    if (0 < chocobo_url.length) {
        Util.open(chocobo_url[0])
        chocobo_url = chocobo_url.slice(1)
        return
    }
    if (0 == chocobo_url.length) {
        Util.open(URL.ffb_box_chocobo())
    }
    if (0 == chocobo_url.length) {
        Util.stop()
    }
}
m.main = function() {
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
    casper.then(m.controller)
}

m.start();