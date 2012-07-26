// 配置ディレクトリ
var DIR_BASE = '/Users/*/phantomjs';

var DIR = {
    BASE: DIR_BASE,
    APP: DIR_BASE+'/app',
    MODEL: DIR_BASE+'/app/model',
    CONTROLLER: DIR_BASE+'/app/controller',
    HELPER: DIR_BASE+'/app/helper',
    CONFIG: DIR_BASE+'/config',
    LIB: DIR_BASE+'/lib'
}

var ConfigApp = {
    IS_INJECT_CASPERJS: false,
    CASPER_PATH: DIR.BASE+'/casperjs',
    CASPER_BOOTSTRAP: DIR.BASE+'/casperjs/bin/bootstrap.js',
    CASPER_INIT: {
        verbose: 0,
        logLevel: "debug",
        clientScripts:  [
        'lib/jquery.js'
        ],
        viewportSize: {width: 320, height: 416},
        pageSettings: {
            userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 5_0_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Mobile/9A405 Safari/7534.48.3'
        }
    }
}
