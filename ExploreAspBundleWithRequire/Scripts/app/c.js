define('c', ['presenter', 'b'], function(presenter, b) {
    var show = function () {
        b.show();
        presenter.show("Showing 'c'");
        b.b1.show_d(); // relies on b's chain of dependency resolutions.
    };

    return {
        show: show
    };
});