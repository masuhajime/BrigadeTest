phantom.injectJs('app/bootstrap.js');

function Main(){}
Main.prototype = new Loop();
var m = new Main();
var chara = new Chara();
m.main = function() {
    chara.getStatus()
    chara.echoStatus()
    Util.stop()
}

m.start();