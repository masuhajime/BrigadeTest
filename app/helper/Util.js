var Util = {
    sleep : function(milisec) {
        casper.then(function() {
            this.wait(milisec);
        });
    },
    open : function(url) {
        casper.open(url).then(function(){
            this.echo(d()+'open: '+this.getCurrentUrl())
        });
    },
    echo : function(str) {
        casper.then(function(){
            this.echo(d()+str);
        });
    },
    stop : function() {
        casper.then(function(){
            this.echo(d()+'stop', 'INFO');
            this.exit();
        });
    },
    debug : function() {
        casper.then(function() {
            this.debugHTML();
        });
    },
    capture : function(str) {
        casper.then(function() {
            this.capture('capture/'+str+'.png');
        });
    },
    captureNow : function() {
        casper.then(function() {
            this.capture('capture/'+Date.now()+'.png');
        });
    },
    echoUrl : function() {
        casper.then(function() {
            this.echo(d()+'At: '+this.getCurrentUrl());
        });
    },
    urlEqual : function(url, func_match, func_fail) {
        casper.then(function() {
            var reg = new RegExp("^"+url+"$", "i");
            var current_url = this.getCurrentUrl();
            if (current_url.match(reg)) {
                func_match();
            } else {
                func_fail();
            }
        });
    },
    urlMatch : function(string) {
        return -1 !== casper.getCurrentUrl().search(string);
    }
}
