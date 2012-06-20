define('a',['presenter', 'c'], function (presenter, c) {

    var show = function () {
        presenter.show("Showing 'a'");
        c.show();
    };

    return {
        show: show
    };
});

