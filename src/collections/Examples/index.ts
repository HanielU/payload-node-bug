import { CollectionConfig } from "payload/types";
import bunny from "../../bunny";
import CustomTextField from "./elements/Test";

// Example Collection - For reference only, this must be added to payload.config.ts to be used.
const Examples: CollectionConfig = {
  slug: "examples",
  admin: {
    useAsTitle: "someField"
  },
  fields: [
    {
      name: "someField",
      type: "text"
    }
  ],
  endpoints: [
    {
      method: "post",
      path: "/create-new-video",
      handler: async (req, res) => {
        if (req.user && req.body) {
          const directUpload = await bunny.createDirectUpload(
            { title: "" },
            new Date(Date.now() + 60000)
          );
        }
      }
    }
  ],
  hooks: {
    afterDelete: [
      async ({ req, id, doc }) => {
        console.log("deleteFilesFromBunny", doc);
        const deleteResult = await bunny.deleteVideo(doc.id);
        console.log("deleteResult", deleteResult);
      }
    ]
  }
};

export default Examples;
