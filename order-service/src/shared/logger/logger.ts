import pino from "pino";
import "dotenv/config";

const ENV = { NODE_ENV: process.env.NODE_ENV || "development" };

export const logger = pino({
	level: ENV.NODE_ENV === "production" ? "info" : "debug",
	...(ENV.NODE_ENV !== "production"
		? {
				transport: {
					target: "pino-pretty",
					options: {
						colorize: true,
					},
				},
			}
		: {}),
});
