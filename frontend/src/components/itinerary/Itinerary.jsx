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
import Comment from '../comments/Comments';

function Itinerary() {

  const { id } = useParams()
  const [reload, setReload] = useState(false);//para lieks

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(itinerariesActions.getItineraries())
    dispatch(itinerariesActions.getItinerariesByCity(id))

  }, [id, reload])
  const itineraries = useSelector(store => store.itinerariesReducer.getItinerariesByCity)
  console.log(itineraries)
  const user = useSelector(store => store.usersReducer.user); //traigo el user del reducer,para saber si esta o no logueado
  console.log(user)

  async function likeOrDislike(props) {
    await dispatch(itinerariesActions.likeDislike(props))
    setReload(!reload)
  } //traigo el action de likes

  return (
    <>
      {itineraries?.map(itinerary =>
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
                      height={50}
                      width={70}
                      alt="Name User"
                      className='img'
                    /></Row>
                </Col>
                <div className="icono">Duration⌛:{itinerary.duration}</div>
                <div className="icono">Price💲:{itinerary.price}</div>
              </div>
            </Text>
            <Text color="black" size={14}>
              <div className="contenedorIconos"><div className='icono'>Hashtags💭:{itinerary.hashtags}</div></div>
            </Text>
            {user ?
              (<div onClick={() =>
                likeOrDislike(itinerary._id)}>
                {itinerary.likes?.includes(user.id) ?
                  <span style={{ "color": "red", "fontSize": 30, "backgroundColor": "white" }} className="material-icons corazon"><FavoriteIcon /></span>
                  :
                  <span style={{ "fontSize": 30 }} className="material-icons"><FavoriteBorderIcon /></span>}
              </div>)
              :
              (<div style={{ " fontSize": 30 }} className="material-icons coraBlue"><FavoriteBorderIcon />
              </div>
              )
            }
            <p style={{ "color": "black ", "fontSize": 30 }} className=''>{itinerary.likes?.length}</p>
          </Col>
          <Collapse.Group>
            <Collapse title={itinerary.name} subtitle={itinerary.description}>
              <Card css={{ w: "100%", h: "500px", paddingBottom: "0.5em" }} >
                {/* <Card.Header css={{ position: "absolute", zIndex: 1, top: 3 }}>
                  <div>
                    <Text size={12} weight="bolder" transform="uppercase" className='textoItinerario'>
                    </Text>
                    <Text h3 color="black" className='textoIt'>
                      Activities ⬇
                    </Text>
                  </div>
                </Card.Header> */}
                {/* <Card.Body css={{ p: 0 }} className="bodyItineraries">
                </Card.Body> */}
                <div
                  isBlurred
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
                  <div>
                    <div>
                      <div>
                        <h1>Actividades</h1>
                        <div className="colActividades">
                          {itinerary.activities?.map(act =>
                            <div key={act._id}>
                              <Text size={12} weight="bolder" transform="uppercase" className='textoItinerario'>
                                {act.names}
                              </Text>
                              <Col>
                                <img
                                  src={act.imageActivity}
                                  height={70}
                                  width={100}
                                  className="fotoActividad"
                                />
                              </Col>
                            </div>
                          )
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Collapse>
          </Collapse.Group>
        </div>
      )
      }
      {/* <Comment /> */}
    </>
  );
}

export default Itinerary