import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link as LinkRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import itinerariesActions from '../../redux/actions/itinerariesActions';
import { Card, Col, Row, Button, Text, Collapse } from "@nextui-org/react";
import { Animated } from "react-animated-css";
import likeDislike from '../../redux/actions/usersActions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SignIn from '../login/SignIn';
import Comments from '../comments/Comments';

function Itinerary() {

  const { id } = useParams()
  const [reload, setReload] = useState(false);//para likes
  const [comments, setComments] = useState();
  const [itinerario, setItinerario] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(itinerariesActions.getItineraries())
    dispatch(itinerariesActions.getItinerariesByCity(id))
      .then(res => setItinerario(res.data.response.itineraries))

  }, [id, reload])

  // const itineraries = useSelector(store => store.itinerariesReducer.getItinerariesByCity)

  const user = useSelector(store => store.usersReducer.user); //traigo el user del reducer,para saber si esta o no logueado
  console.log(user)

  async function likeOrDislike(props) {
    await dispatch(itinerariesActions.likeDislike(props))
    setReload(!reload)
  } //traigo el action de likes

  return (
    <>
      {itinerario ? (itinerario.map(itinerary =>

        <div key={itinerary._id} className="itinerarios" >
          <Col>
            <Text color="black" size={14}>
              <div className="contenedorIconos">
                <Col>
                  <Row justify="center">
                    <div className="icono">User:{itinerary.nameUser}</div>
                  </Row>
                </Col>
                <Col>
                  <Row className="imagenUser">
                    <Card.Image
                      src={itinerary.image}
                      css={{ bg: "black", br: "60%" }}
                      height={70}
                      width={70}
                      alt="Name User"
                      className='img' />
                  </Row>
                </Col>
                <Text color="black" size={14}>
                  <div className="icono">Duration⌛:{itinerary.duration}</div>
                </Text>
                <Text color="black" size={14}>
                  <div className="icono">Price💲:{itinerary.price}</div>
                </Text>
              </div>
            </Text>
            <Text color="black" size={14}>
              <div className="contenedorIconos"><div className='icono'>Hashtags💭:{itinerary.hashtags}</div></div>
            </Text>
            {user ?
              (<div className="likes" onClick={() =>
                likeOrDislike(itinerary._id)}>
                {itinerary.likes?.includes(user.id) ?

                  <span style={{ "color": "red", "fontSize": 30, "backgroundColor": "white" }} className="material-icons corazon"><FavoriteIcon /></span>
                  :
                  <span style={{ "fontSize": 30 }} className="material-icons"><FavoriteBorderIcon /></span>}
              </div>)
              :
              (<div style={{ " fontSize": 0 }} className="material-icons coraBlue"><FavoriteBorderIcon />
              </div>
              )
            }
            <div><p style={{ "color": "black ", "fontSize": 20 }}>{itinerary.likes?.length}</p></div>

          </Col>
          <Collapse.Group>
            <Collapse title={itinerary.name} subtitle={itinerary.description} className="tituloSub">
              <Card css={{ w: "100%", h: "500px", paddingBottom: "0.7em" }} >
                <div
                  isblurred
                  css={{
                    position: "absolute",
                    bgBlur: "#0f111466",
                    borderTop: "$borderWeights$light solid $gray800",
                    bottom: 0,
                    zIndex: 1,
                    paddingTop: "2em",
                    className: "actividades",
                  }}
                >
                  <div className='actividad'>
                    <div>
                      <div className="colAct">
                        <h2>Activities</h2>
                        <div className="colActividades">

                          {itinerary.activities?.map(act =>

                            <div key={act._id} className="activities">
                              <Text size={14} weight="bolder" className='textoItinerario'>
                                {act.names}
                              </Text>

                              <div>
                                <img
                                  src={act.imageActivity}
                                  // height={70}
                                  // width={100}
                                  className="fotoActividad"
                                />
                              </div>

                            </div>
                          )
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              <Comments idItinerary={itinerary._id} id={id} coment={itinerary.comments} reload={reload} setReload={setReload} />
            </Collapse>

          </Collapse.Group>



        </div>
      ))
        :
        (<h2>There're not Itineraries here yet</h2>)
      }

    </>

  );

}

export default Itinerary