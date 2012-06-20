define('b', ['presenter', 'b.1'], function (presenter, b1) {
    var show = function () {
        presenter.show("Showing 'b'");
        presenter.show(b1.value);
    };

    return {
        show: show,
        b1: b1
    };
});