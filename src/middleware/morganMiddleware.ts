import morgan, { StreamOptions } from "morgan";

import logger from "../service/logger";

const rTracer = require("cls-rtracer");
const rid = rTracer.id();
const stream: StreamOptions = {
  write: (message) => logger.http(`[request-id:${rid}],${message}`),
};
const morganMiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  { stream }
);

export default morganMiddleware;
