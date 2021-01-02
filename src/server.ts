import * as express from "express";
require("express-async-errors");
import * as bodyParser from "body-parser"; // pull information from HTML POST (express4)
import * as compression from "compression";
import * as dotenv from "dotenv";
import * as helmet from "helmet"; // Security
import * as l10n from "jm-ez-l10n";
import * as methodOverride from "method-override"; // simulate DELETE and PUT (express4)
import * as morgan from "morgan"; // log requests to the console (express4)
import * as path from "path";
import { DB } from "./database";
import { Log } from "./helpers/logger";
import { Routes } from "./routes";

dotenv.config();
// initialize database
DB.init();
export class App {
  protected app: express.Application;
  private logger = Log.getLogger();
  constructor() {
    const NODE_ENV = process.env.NODE_ENV;
    const PORT = process.env.PORT as string;
    this.app = express();
    this.app.use(helmet());
    this.app.all("/*", (req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Request-Headers", "*");
      // tslint:disable-next-line: max-line-length
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Access-Control-Allow-Headers, x-device-type, x-app-version, x-build-number, uuid, x-l10n-locale");
      res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");
      if (req.method === "OPTIONS") {
        res.writeHead(200);
        res.end();
      } else {
        next();
      }
    });

    if (NODE_ENV === "development") {
      this.app.use(express.static(path.join(process.cwd(), "public")));
      // set the static files location of bower_components
      this.app.use(morgan("dev")); // log every request to the console
    } else {
      this.app.use(compression());
      // set the static files location /public/img will be /img for users
      this.app.use(express.static(path.join(process.cwd(), "dist"), { maxAge: "7d" }));
    }
    l10n.setTranslationsFile("en", "src/language/translation.en.json");
    this.app.use(l10n.enableL10NExpress);
    this.app.use(bodyParser.json({ limit: "50mb" }));
    this.app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
    this.app.use(bodyParser.json(), (error, req, res, next) => {
      if (error) {
        return res.status(400).json({ error: req.t("ERR_GENRIC_SYNTAX") });
      }
      next();
    });
    this.app.use(bodyParser.json({ type: "application/vnd.api+json" })); // parse application/vnd.api+json as json
    this.app.use(methodOverride());
    const routes = new Routes(NODE_ENV);
    this.app.use("/api", routes.path());
    this.app.use((err: any, req: any, res: any, next: () => void) => {
      if (err) {
        // tslint:disable-next-line: no-console
        console.log(err);
        return res.status(400).json({ error: req.t("SOMETHING_WENT_WRONG") });
      }
    });
    this.app.listen(PORT, () => {
      this.logger.info(`The server is running in port localhost: ${process.env.PORT}`);
    });
  }
}
