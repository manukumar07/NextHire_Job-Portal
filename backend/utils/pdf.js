import pdfParse from "pdf-parse";

export const extractTextFromPDF = async (buffer) => {
    const data = await pdfParse(buffer);
    return data.text;
};
