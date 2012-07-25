function d()
{
    var d = new Date();
    return '['+
        (d.getYear()+1900)+
        '-'+
        _d(d.getMonth()+1)+
        '-'+
        _d(d.getDate())+
        ' '+
        _d(d.getHours())+
        ':'+
        _d(d.getMinutes())+
        ':'+
        _d(d.getSeconds())+
        '] ';
}

function _d(s)
{
    if (10 > s) {
        return '0'+s;
    }
    return s;
}

