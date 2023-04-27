import { useEffect, useState } from "react";
import "./App.css";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

function App() {
  const [fileName, setFileName] = useState(null);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/files/data?fileName=${fileName}`).then(
      async (res) => {
        const data = await res.json();
        let newFiles = [];
        for (const file of data) {
          newFiles = newFiles.concat(
            file.lines.map((line) => {
              return {
                name: file.file,
                text: line.text,
                number: line.number,
                hex: line.hex,
              };
            })
          );
        }
        setFiles(newFiles);
      }
    );
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

      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>File Name</th>
            <th>Text</th>
            <th>Number</th>
            <th>Hex</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => {
            return (
              <tr>
                <td>{file.name}</td>
                <td>{file.text}</td>
                <td>{file.number}</td>
                <td>{file.hex}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
