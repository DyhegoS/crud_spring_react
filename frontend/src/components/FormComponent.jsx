import { Box, TextField, Button, Stack, CardMedia } from "@mui/material";
import "./Modal.css";

function FormComponent({
  button,
  updatePerson,
  insert,
  update,
  deletePerson,
  person,
  showModal,
  closeForm,
}) {
  return (
    <div>
      {showModal && (
        <div className="overlay">
          {
            <div className="modal">
              <form>
                <input
                  type="number"
                  defaultValue={person.id}
                  onChange={updatePerson}
                  name="id"
                  placeholder="ID"
                  className="form-control"
                  readOnly
                />
                <input
                  type="text"
                  defaultValue={person.name}
                  onChange={updatePerson}
                  name="name"
                  placeholder="Digite seu Nome"
                  className="form-control"
                />
                <input
                  type="text"
                  defaultValue={person.city}
                  onChange={updatePerson}
                  name="city"
                  placeholder="Digite sua Cidade"
                  className="form-control"
                />

                {button ? (
                  <div>
                    <input
                      type="button"
                      onClick={insert}
                      value="Cadastrar"
                      className="btn btn-primary"
                    />
                    <input
                      type="button"
                      onClick={closeForm}
                      value="Cancelar"
                      className="btn btn-primary"
                    />
                  </div>
                ) : (
                  <>
                    <input
                      type="button"
                      onClick={update}
                      value="Alterar"
                      className="btn btn-warning"
                    />
                    <input
                      type="button"
                      value="Remover"
                      onClick={deletePerson}
                      className="btn btn-danger"
                    />
                    <input
                      type="button"
                      onClick={closeForm}
                      value="Cancelar"
                      className="btn btn-primary"
                    />
                  </>
                )}
              </form>
            </div>
          }
        </div>
      )}
    </div>
  );
}

export default FormComponent;
