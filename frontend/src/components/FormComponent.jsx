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
              <Box
                component="form"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  maxWidth: 700,
                  margin: "0 auto",
                }}
              >
                {person.id && (
                  <CardMedia
                    component="img"
                    src={`http://localhost:8080/persons/image/${person.id}`}
                    alt="Imagem da pessoa"
                    sx={{
                      width: 200,
                      height: 200,
                      objectFit: "cover",
                      borderRadius: 2,
                      margin: "0 auto",
                    }}
                  />
                )}

                {person.img && typeof person.img !== "string" && (
                  <CardMedia
                    component={"img"}
                    src={URL.createObjectURL(person.img)}
                    alt="Preview da pessoa"
                    sx={{
                      width: 200,
                      height: 200,
                      objectFit: "cover",
                      borderRadius: 2,
                      margin: "0 auto",
                    }}
                  />
                )}

                <TextField
                  label="Nome"
                  name="name"
                  value={person.name}
                  onChange={updatePerson}
                  variant="outlined"
                />
                <TextField
                  label="Cidade"
                  name="city"
                  value={person.city}
                  onChange={updatePerson}
                  variant="outlined"
                />

                {button && (
                  <Button
                    variant="outlined"
                    component="label"
                    sx={{ height: 56 }}
                  >
                    Selecionar Imagem
                    <input
                      type="file"
                      hidden
                      onChange={updatePerson}
                      name="img"
                      accept="image/png, imag/jpeg"
                    />
                  </Button>
                )}

                <Stack
                  direction="row"
                  spacing={2}
                  justifycontent="center"
                  marginbottom={5}
                >
                  {button ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={insert}
                    >
                      Cadastrar
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={update}
                      >
                        Alterar
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={deletePerson}
                      >
                        Remover
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={closeForm}
                      >
                        Cancelar
                      </Button>
                    </>
                  )}
                </Stack>
              </Box>
            </div>
          }
        </div>
      )}
    </div>
  );
}

export default FormComponent;
