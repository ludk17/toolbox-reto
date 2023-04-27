import { expect } from "chai";
import { getFormattedFiles } from "../../services/fileService.js";

describe("getFormattedFiles function", () => {
  it("should return array of files", async () => {
    const result = await getFormattedFiles({});
    expect(result).to.be.an("array");
    expect(result[0]).to.have.property("file");
    expect(result[0]).to.have.property("lines");
    expect(result[0].lines[0]).to.have.property("text");
    expect(result[0].lines[0]).to.have.property("number");
    expect(result[0].lines[0]).to.have.property("hex");
  });
});
