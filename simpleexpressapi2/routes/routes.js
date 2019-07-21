var appRouter = function (app) {

    app.get("/service/2", function (req, res) {
        res.send("Hello I am a simeple express api service 2");
    });

}

module.exports = appRouter;