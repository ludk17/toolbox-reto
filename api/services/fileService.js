import axios from "../libs/axios.js";
import csv from "csvtojson";

const getFileContent = async (filename) => {
  const response = await axios.get(`/v1/secret/file/${filename}`);
  return response.data;
};

const hasValidContent = (content) => {
  try {
    return (
      content.text &&
      content.number &&
      Number(content.number) &&
      content.hex &&
      content.hex.length === 32
    );
  } catch (err) {
    return false;
  }
};

const csvToJson = async (content) => {
  const lines = await csv().fromString(content);
  const file = lines.length > 0 ? lines[0].file : null;
  return {
    file,
    lines: lines
      .filter((line) => hasValidContent(line))
      .map((line) => {
        return {
          text: line.text,
          number: line.number,
          hex: line.hex,
        };
      }),
  };
};

export const getFormattedFiles = async ({ fileName }) => {
  const result = await axios.get("/v1/secret/files");

  const promises = result.data.files
    .filter((file) => (fileName ? file == fileName : true))
    .map((file) => getFileContent(file));

  let results = await Promise.allSettled(promises);
  results = results.filter((o) => o.status === "fulfilled");

  const values = await Promise.all(
    results.map(async (result) => {
      return await csvToJson(result.value);
    })
  );

  return values.filter((o) => o.file && o.lines.length > 0);
};

export const getFiles = async () => {
  const result = await axios.get("/v1/secret/files");
  return result.data;
};
