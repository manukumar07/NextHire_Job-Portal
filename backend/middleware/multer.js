import multer from "multer";
import DataURIParser from "datauri/parser.js";

//
const storage = multer.memoryStorage();
export const singleUpload = multer({ storage }).single("file");
