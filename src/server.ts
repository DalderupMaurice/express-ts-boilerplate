import * as fs from "fs";
import * as https from "https";
import app from "./app";
const PORT = 3000;

const httpsOptions = {
  cert: fs.readFileSync("./config/certificates/cert.pem"),
  key: fs.readFileSync("./config/certificates/key.pem")
};

https.createServer(httpsOptions, app).listen(PORT, () => {
  console.log("Express server listening on port " + PORT);
});
