import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Button,
} from "@mui/material";

function TableComponent({ registries, fn, openForm }) {
  return (
    <div>
      <Button onClick={openForm} size="small" variant="contained">
        Nova Pessoa
      </Button>

      <Grid container spacing={2}>
        {registries.map((obj, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={obj.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={`http://localhost:8080/persons/image/${obj.id}`}
                alt={`Imagem da ${obj.name}`}
                sx={{
                  objectFit: "contain",
                  backgroundColor: "#f0f0f0",
                  padding: 2,
                }}
              />

              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Typography variant="h6">{obj.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {obj.city}
                </Typography>

                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => {
                      fn(index);
                      openForm();
                    }}
                  >
                    Selecionar
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default TableComponent;
