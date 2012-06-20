requirejs.config({

    // by default load
    baseUrl: 'scripts/app',

    // shim in the libs that don't know define.amd
    shim: {
    },

    paths: {
        'jquery': '../lib/jquery-1.7.2',
    }
});


requirejs(['a'], function (a) {
    a.show();
})