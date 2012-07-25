var URL = {
    mbga_login : function () {
        return 'https://ssl.sp.mbga.jp/_lg'
    },
    mbga_top : function () {
        return 'http://sp.mbga.jp/'
    },
    ffb_top : function () {
        return 'http://ff.sp.mbga.jp/_ffjm_top'
    },
    ffb_my : function () {
        return 'http://ff.sp.mbga.jp/_ffjm_my'
    },
    ffb_quest : function (id) {
        return 'http://ff.sp.mbga.jp/_ffjm_qst_expl?quest_id='+id
    },
    ffb_shop_sell_ability : function () {
        return 'http://ff.sp.mbga.jp/_ffjm_sell_select?it=1&st=pk_desc&from=shop'
    },
    ffb_shop_sell_weapon : function () {
        return 'http://ff.sp.mbga.jp/_ffjm_sell_select?it=2&st=pk_desc&from=shop'
    },
    ffb_get_ability : function() {
        return 'http://ff.sp.mbga.jp/_ffjm_feed_get_ability'
    },
    ffb_get_ability_rare : function() {
        return 'http://ff.sp.mbga.jp/_ffjm_feed_send_see_info_select'
    },
    ffb_battle_encount : function() {
        return 'http://ff.sp.mbga.jp/_ffjm_swf_intrpt'
    },
    ffb_box_treasure : function () {
        return 'http://ff.sp.mbga.jp/_ffjm_present_list?p_cond=301'
    },
    ffb_box_chocobo : function () {
        return 'http://ff.sp.mbga.jp/_ffjm_present_list?p_cond=302'
    },
    ffb_box_other : function () {
        return 'http://ff.sp.mbga.jp/_ffjm_present_list?p_cond=-1'
    },
    ffb_chocobo_feed_fla : function(){
        return 'http://ff.sp.mbga.jp/_ffjm_feed_chocobo_capture_fla_see_info'
    },
    ffb_battle_top: function() {
        return 'http://ff.sp.mbga.jp/_ffjm_team_top'
    },
    ffb_attack_url: function(chk_id, bp) {
        return 'http://ff.sp.mbga.jp/_ffjm_team_btl?chk='+chk_id+'&use_bp='+bp+'&t='+(Date.now());
    }
}