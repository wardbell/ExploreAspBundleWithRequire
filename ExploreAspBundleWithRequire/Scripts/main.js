requirejs.config({

    // by default load
    baseUrl: 'scripts/app',

    // shim in the libs that don't know define.amd
    shim: {
        // A jquery extension that must be shimmed because
        // it does not implement AMD/require.js
        'jquery.some-extension': { deps: ['jquery'] }
    },

    paths: {
        'jquery': '../lib/jquery-1.7.2',
        'jquery.some-extension': '../lib/jquery.some-extension'
    }
});


requirejs([ 'a', 'jquery.some-extension'], function (a) {
    a.show();
})