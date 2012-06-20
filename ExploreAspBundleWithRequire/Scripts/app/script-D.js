// Module 'd' is in a file named 'script-D', not in the expected file name, 'd.js'
define('d', ['presenter'], function (presenter) {
    var show = function () {
        presenter.show("Showing 'd' in 'script-D");
    };

    return {
        show: show
    };
});