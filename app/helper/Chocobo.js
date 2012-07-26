// 非常に辛いコード
var Chocobo = {
    set_casper_callback : function() {
        // gettig chocobo url before run js
        casper.on('http.status.200', function() {
            if (-1 == this.getCurrentUrl().match(new RegExp("p_cond=302$", "i"))) {
                //this.echo(this.getCurrentUrl())
                return;
            }
            chocobo_url = this.evaluate(function() {
                var v = new Array
                var e = document.querySelectorAll('li.button-tap-link a')
                for (var i = 0; i < e.length; i++) {
                    v.push(e[i].href)
                }
                return v
            })
        })
    },
    send_rand : function () {
        casper.then(function(){
            var check_count, i, n, checked = 0;
            casper.echo(d()+"Start selecting user to send chocobo info.", "COMMENT");
            check_count = casper.evaluate(function() {
                return $("input[type='checkbox']:checked").length;
            });
            casper.echo(d()+"Sending chocobo info to "+check_count+" people.", "COMMENT");
            casper.echo(d()+"users: "+getCheckedUser());
            casper.evaluate(function() {
                $("input[type='checkbox']:checked").removeAttr('checked');
            });
            casper.echo(d()+"Check reset. counts "+casper.evaluate(function(){return $("input[type='checkbox']:checked").length;})+" people.", "COMMENT");
            casper.echo(d()+"users: "+getCheckedUser());
            while (true) {
                if (checked >= check_count) {
                    break;
                }
                casper.evaluate(function() {
                    var e, n;
                    e = $("input[type='checkbox']:not(:checked)");
                    n = e.length;
                    e.eq(Math.floor(Math.random()*n)).attr('checked','checked');
                });
                checked++;
                casper.echo(d()+"Check random. counts "+casper.evaluate(function(){return $("input[type='checkbox']:checked").length;})+" people.", "COMMENT");
                casper.echo(d()+"users: "+getCheckedUser());
            }
            casper.evaluate(function() {
                $("form:first").submit();
            });
        })
    },
    send_rand2 : function () {
        if(!Util.urlMatch(URL.ffb_get_ability_rare())) {
            return;
        }
        casper.echo(d()+"Start selecting [RANDOM] user to send chocobo info.", "COMMENT");
        var check_count = c.evaluate(function() {
            return $("input[type='checkbox']:checked").length;
        });
        casper.echo(d()+"Sending chocobo info to "+check_count+" people.", "COMMENT");
        var chosen = get_random_send_user(check_count, Config.send_chocobo_random_user);
        var url = build_query_send_chocobo(chosen);
        casper.echo(d()+"Query: "+url, "COMMENT");   
        casper.thenOpen(url);
        casper.then(function() {
            this.echo(d()+"url: "+this.getCurrentUrl());
        });
    }
}

function build_query_send_chocobo(users) {
    var url = 'http://ff.sp.mbga.jp/_ffjm_feed_send_see_info_exec?ck=mIerPsEA';
    var query = '';
    for (var i=0; i<users.length; i++) {
        query += '&check_'+users[i]+"=1";
    }
    return url + query;
}

function get_random_send_user(num, users) {
    var a,i,chosen = [];
    for (i=0; i<num; i++) {
        a = Math.floor(Math.random()*users.length);
        chosen.unshift(users[a]);
        users.splice(a, 1);
    }
    return chosen;
}

function getCheckedUser() {
    return casper.evaluate(function() {
        var r = "";
        $("input[type='checkbox']:checked").each(function(){
            r += $(this).attr("name")+":";
        });
        return r;
    });
}