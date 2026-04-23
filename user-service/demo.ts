import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";

const userProtoPath = path.resolve(__dirname, "../proto/user.proto");

const def = protoLoader.loadSync(userProtoPath);
const proto = grpc.loadPackageDefinition(def) as any;

const client = new proto.UserService("0.0.0.0:50051", grpc.credentials.createInsecure());

console.log("Fetching User with ID: 650b8b8a0f9b8c001c8e4b1a...");
client.GetUser({ id: "650b8b8a0f9b8c001c8e4b1a" }, (error: any, response: any) => {
  if (error) {
    console.error("Error fetching user u1:", error);
  } else {
    console.log("Response for u1:");
    console.log(JSON.stringify(response, null, 2));
  }

  console.log("\nFetching User with ID: 650b8b8a0f9b8c001c8e4b1b...");
  client.GetUser({ id: "650b8b8a0f9b8c001c8e4b1b" }, (error: any, response: any) => {
    if (error) {
      console.error("Error fetching user u2:", error);
    } else {
      console.log("Response for u2:");
      console.log(JSON.stringify(response, null, 2));
    }
    
    process.exit(0);
  });
});
