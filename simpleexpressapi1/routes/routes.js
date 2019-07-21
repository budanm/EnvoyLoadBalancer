var appRouter = function (app) {

    app.get("/service/1", function (req, res) {
        res.send("Hello I am a simeple express api service 1");
    });

}

module.exports = appRouter;