define('a', ['jquery', 'presenter', 'c'], function ($, presenter, c) {

    var show = function () {
        presenter.show("Showing 'a'");
        c.show();
        presenter.show($.someExtensionForTestPurposes());
    };

    return {
        show: show
    };
});

