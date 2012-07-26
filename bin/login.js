phantom.injectJs('app/bootstrap.js');

function Login(){}
Login.prototype = new Loop();
var login = new Login();
login.main = function() {
    casper.thenOpen(URL.ffb_my(), function() {
        var title = this.getTitle();
        if (!title.match('ログイン - モバゲー')) {
            this.echo(d()+'login success!');
            this.exit();
        }
    });
    Util.echo('try to login ...');
    casper.then(function(){
        this.fill('form', {
            'login_id' : ConfigUser.MAIL,
            'login_pw' : ConfigUser.PASSWORD
        }, true);
    });
    Util.urlEqual(URL.ffb_my(), login.mbga_login_success, login.mbga_login_fail);
}
login.mbga_login_fail = function() {
    Util.echo("Fail");
    Util.stop();
}
login.mbga_login_success = function() {
    Util.echo("Success");
    Util.echo("copy SP_LOGIN_SESSION to [ff.sp.mbga.jp] of cookie.txt");
    Util.stop();
}

login.start();