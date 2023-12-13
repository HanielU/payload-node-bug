import { buildConfig } from "payload/config";
import path from "path";
// import Examples from './collections/Examples';
import Users from "./collections/Users";
import { slateEditor } from "@payloadcms/richtext-slate";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import Examples from "./collections/Examples";

const dev = process.env.NODE_ENV !== "production";
const mockModulePath = path.resolve(__dirname, "emptyObject.ts");

export default buildConfig({
  serverURL: "http://localhost:3000",
  editor: slateEditor({}),
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    webpack: config => ({
      ...config,
      resolve: {
        ...(config.resolve || {}),
        alias: {
          ...(config.resolve.alias || {}),
          fs: mockModulePath,
          "node:crypto": mockModulePath
        }
      }
    })
  },
  collections: [
    Users,
    Examples
    // Add Collections here
    // Examples,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts")
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql")
  },
  db: mongooseAdapter({
    url: process.env.MONGO_URL
  })
});
