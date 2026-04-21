function TableComponent({ registries, fn, openForm }) {
  return (
    <div>
      <button onClick={openForm} className="btn btn-primary mb-5 mt-5 ms-3">
        Nova Pessoa
      </button>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Cidade</th>
            <th>Selecionar</th>
          </tr>
        </thead>

        <tbody>
          {registries.map((obj, index) => (
            <tr key={index}>
              <td>{obj.id}</td>
              <td>{obj.name}</td>
              <td>{obj.city}</td>
              <td>
                <button
                  onClick={() => {
                    fn(index);
                    openForm();
                  }}
                  className="btn btn-primary"
                >
                  Selecionar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableComponent;
