var appRouter = function (app) {

    app.get("/service/1", function (req, res) {
        res.send("Hello I am a simeple express api service 1");
    });

    app.get("/service/1/subpath", function (req, res) {
        res.send("Hello I am a simeple express api service 1 subpath");
    });

}

module.exports = appRouter;