var originalFetch = window.fetch;
var user_data=JSON.parse(localStorage.getItem('user_data'));
window.fetch = function (input, init) {
    if (!init) {
        init = {};
    }
    if (!init.headers) {
        init.headers = new Headers();
    }

    // init.headers could be: 
    //   `A Headers object, an object literal, 
    //    or an array of two-item arrays to set request’s headers.`
    if (init.headers instanceof Headers) {
        init.headers.append('tenant-code', user_data.data.tenant);
    } else if (init.headers instanceof Array) {
        init.headers.push(['tenant-code', user_data.data.tenant]);
    } else {
        // object ?
        init.headers['tenant-code'] = user_data.data.tenant;
    }
    return originalFetch(input, init);
};