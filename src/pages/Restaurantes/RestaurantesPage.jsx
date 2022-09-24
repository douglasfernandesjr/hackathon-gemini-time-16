import { Container, Grid, Typography, CircularProgress } from "@material-ui/core";
import { useEffect, useState } from "react";
import { getRestaurantes } from "../../services/restaurantes.service";
import { useNavigate, useParams } from "react-router-dom";
// import { useParams } from "react-router-dom"; 
import "./style.css";

function RestaurantesPage() {
  const navigate = useNavigate();
  const [nomerestaurante, setNomerestaurante] = useState([]);
  const [restaurantesBaratinho, setRestaurantesBaratinho] = useState([]);
  const [restaurantesNoPreco, setRestaurantesNoPreco] = useState([]);
  const [restaurantesCaro, setRestaurantesCaro] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    getRestaurantes(params.id).then((response) => {
      setNomerestaurante(response.restaurante)
      setRestaurantesBaratinho(response.baratinho);
      setRestaurantesNoPreco(response.no_preco);
      setRestaurantesCaro(response.caro);
      setLoading(false);
    })
  }, []);

  const mapBaratinho = () => {
    return restaurantesBaratinho.map((restaurante) => (
      <Grid item xs={4} key={restaurante.id}>
          <div onClick={() => navigate(`/detalhes/${restaurante.id}`)}>{restaurante.nome}</div>
      </Grid>
      ));
  };

  const mapNoPreco = () => {
    return restaurantesNoPreco.map((restaurante) => (
      <Grid item xs={4} key={restaurante.id}>
          <div onClick={() => navigate(`/detalhes/${restaurante.id}`)}>{restaurante.nome}</div>
      </Grid>
      ));
  };

  const mapCaro = () => {
    return restaurantesCaro.map((restaurante) => (
      <Grid item xs={4} key={restaurante.id}>
          <div onClick={() => navigate(`/detalhes/${restaurante.id}`)}>{restaurante.nome}</div>
      </Grid>
      ));
  };

  return (
    <Container class="restaurantes">
      <Typography variant="h5" align="center" color="primary" className="title">
        RESTAURANTES: {nomerestaurante}
      </Typography>
      {loading && (
        <div className="loading">
          <CircularProgress color="primary" />
        </div>
      )}
      <div className="sub-header">
      {restaurantesBaratinho ? 
        <Typography variant="body1" color="primary">
            Baratinho <span>(</span>$ <span>$ $ $ $)</span>
            <div>
              { mapBaratinho() }
            </div>
        </Typography>
        : <></>}
      </div>

      <div className="sub-header">
        {
          restaurantesNoPreco ?
          <Typography variant="body1" color="primary">
            No preço <span>(</span>$ $ $<span> $ $ $)</span>
            <div>
              { mapNoPreco() }
            </div>
          </Typography>
          : <></>
        }
      </div>
      
      <div className="sub-header">
        {
          restaurantesCaro ?
          <Typography variant="body1" color="primary">
            Caro, mas vale a pena <span>(</span>$ $ $ $ $ $<span>)</span>
            <div>
              { mapCaro() }
            </div>
          </Typography>
          : <></>
        }
      </div>
      
    </Container>
  )
}

export default RestaurantesPage;