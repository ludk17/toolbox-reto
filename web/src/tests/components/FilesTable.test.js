import { render, fireEvent, screen } from "@testing-library/react";
import { create } from "react-test-renderer";

import { configure, mount, unmount } from "enzyme";
import Adapter from "@cfaester/enzyme-adapter-react-18";

import FilesTable from "../../components/FilesTable";

configure({ adapter: new Adapter() });

describe("FilesTable Component test", () => {
  it("FilesTable component", () => {
    const files = [];
    const wrapper = mount(<FilesTable files={files} />);
    const table = wrapper.find("table");
    const rows = table.find("tr");
    expect(rows).toHaveLength(1);
    wrapper.unmount();
  });
  it("table has two rows", () => {
    const files = [{ key: 0 }, { key: 1 }];
    const wrapper = mount(<FilesTable files={files} />);
    const table = wrapper.find("table");
    const rows = table.find("tr");
    expect(rows).toHaveLength(3);
    wrapper.unmount();
  });
});
