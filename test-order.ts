import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";

const def = protoLoader.loadSync(path.resolve(__dirname, "proto/order.proto"));
const proto = grpc.loadPackageDefinition(def) as any;
const client = new proto.OrderService("0.0.0.0:50052", grpc.credentials.createInsecure());

console.log("Querying OrderService directly...");
client.GetOrdersByUser({ userId: "650b8b8a0f9b8c001c8e4b1a" }, (err: any, res: any) => {
  if (err) console.error("Error:", err);
  else console.log("Response:", JSON.stringify(res, null, 2));
});
