import Table from "react-bootstrap/Table";

const FilesTable = ({ files }) => {
  const rows = files.map((file) => (
    <tr key={file.key}>
      <td>{file.name}</td>
      <td>{file.text}</td>
      <td>{file.number}</td>
      <td>{file.hex}</td>
    </tr>
  ));

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
      <tbody>{rows}</tbody>
    </Table>
  );
};

export default FilesTable;
