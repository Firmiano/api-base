import { IController } from "./base/controller.interface";
import * as restify from "restify";

export class ApiStartup {

    private restifyServer: restify.Server;
    public port: number = 3000;

    public controllers(): Array<IController> {
        const controllers: Array<IController> = new Array<IController>();
        return controllers;
    }

    async Run(): Promise<any> {

        this.restifyServer = restify.createServer();
        this.restifyServer.use(restify.plugins.acceptParser(this.restifyServer.acceptable));
        this.restifyServer.use(restify.plugins.authorizationParser());
        this.restifyServer.use(restify.plugins.dateParser());
        this.restifyServer.use(restify.plugins.queryParser());
        this.restifyServer.use(restify.plugins.jsonp());
        this.restifyServer.use(restify.plugins.gzipResponse());
        this.restifyServer.use(restify.plugins.bodyParser({ mapParams: true }));

        this.controllers().forEach(element => {
            element.register(this.restifyServer);
        });

        return new Promise((resolve, reject) => {
            this.restifyServer.listen(this.port, () => {
                resolve();
            });
        });
    }
}