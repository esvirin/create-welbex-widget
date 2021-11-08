define(['http://localhost:5000/bundle.js'], context => {
    return function () {
        return context(this)
    }
});
