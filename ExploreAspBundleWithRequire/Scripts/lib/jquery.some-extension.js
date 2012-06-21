// An arbitrary extension to jQuery that
// (a) doesn't return an object and
// (b) doesn't conform to AMD and must be shimmed.

(function($) {

    $.someExtensionForTestPurposes = function() {
        return "Hi! I'm a useless jQuery extension, shimmed into the app in main.js";
    };
    
})(jQuery);
