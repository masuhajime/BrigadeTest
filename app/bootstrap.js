phantom.injectJs('./config/app.js');
phantom.injectJs('./config/user.js');
phantom.injectJs('./config/game.js');
phantom.injectJs('./lib/d.js');
phantom.injectJs(DIR.HELPER+'/Util.js');
phantom.injectJs(DIR.HELPER+'/URL.js');
phantom.injectJs(DIR.HELPER+'/Click.js');
phantom.injectJs(DIR.HELPER+'/Chocobo.js');
phantom.injectJs(DIR.MODEL+'/Chara.js');
phantom.injectJs(DIR.MODEL+'/Loop.js');

if (ConfigApp.IS_INJECT_CASPERJS) {
    phantom.casperPath = ConfigApp.CASPER_PATH;
    phantom.injectJs(ConfigApp.CASPER_BOOTSTRAP);
}

// creating casper js
var casper = require('casper').create(ConfigApp.CASPER_INIT);