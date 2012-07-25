function Loop(){}
Loop.prototype =
{
    init : function(){},
    // edit this
    main : function(){
        casper.then(function(){
            this.echo(d()+'main');
        });
    },
    // dont change this
    loop : function(){
        var loop = this;
        casper.then(function() {
            loop.main();
            loop.loop();
        });
    },
    // call this
    start : function(){
        casper.start();
        var loop = this;
        casper.then(function(){
            loop.init();
        })
        casper.then(function(){
            this.echo(d()+"Start", 'COMMENT');
            this.then(function() {
                loop.loop();
            });
        });
        casper.run();
    }
};
