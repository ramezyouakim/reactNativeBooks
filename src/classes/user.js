
export default User = (function () {
    let instance;

    function createInstance(username, id) {
        let object = new Object({
            username: username,
            id: id
        });
        return object;
    }

    return {
        removeInstance: function () {
            instance = null
            return instance;
        },
        getInstance: function (username, id) {
            if (!instance) {
                instance = createInstance(username, id);
            }
            return instance;
        }
    };
})();
