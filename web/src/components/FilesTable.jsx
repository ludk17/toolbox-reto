import Table from "react-bootstrap/Table";

const FilesTable = ({ files }) => {
  return (
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
            <tr key={file.key}>
              <td>{file.name}</td>
              <td>{file.text}</td>
              <td>{file.number}</td>
              <td>{file.hex}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default FilesTable;
