import { useEffect, useState } from "react";
import "./App.css";
import Form from "react-bootstrap/Form";
import FilesTable from "./components/FilesTable";

function App() {
  const [fileName, setFileName] = useState("");
  const [files, setFiles] = useState([]);

  const buildFiles = (data) => {
    let newFiles = [];
    for (const file of data) {
      newFiles = newFiles.concat(
        file.lines.map((line, index) => {
          return {
            key: file.file + index,
            name: file.file,
            text: line.text,
            number: line.number,
            hex: line.hex,
          };
        })
      );
    }
    return newFiles;
  };

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_BASE_API_URL}/files/data?fileName=${fileName}`
    ).then(async (res) => {
      const data = await res.json();
      setFiles(buildFiles(data));
    });
  }, [fileName]);

  const handleInputChange = (event) => {
    setFileName(event.target.value);
  };

  return (
    <div className="App text-left">
      <h5 className="bg-danger p-2 text-white">React Test App</h5>

      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter file name"
          value={fileName}
          onChange={handleInputChange}
        />
      </Form.Group>
      <FilesTable files={files} />
    </div>
  );
}

export default App;
