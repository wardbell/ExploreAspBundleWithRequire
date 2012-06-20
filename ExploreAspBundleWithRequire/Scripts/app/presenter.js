define('presenter',['jquery','config'], function ($, config) {

    var show = function (text) {
        $(config.contentSelector).append('<li>'+text+'</li>');
    };

    return {
       show: show 
    };
});

