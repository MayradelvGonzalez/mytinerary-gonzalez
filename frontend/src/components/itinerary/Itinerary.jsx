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

function Itinerary() {

  const { id } = useParams()
  const [reload, setReload] = useState(false);//para lieks
  // const [inputText, setInputText] = useState("");// para comments
  // const [itinerary, setItinerary] = useState();
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(itinerariesActions.getItinerariesByCity(id))
    dispatch(itinerariesActions.getItineraries())
  }, [id])
  const user = useSelector((store) => store.usersReducer.user); //traigo el user del reducer,para saber si esta o no logueado
  const itineraries = useSelector(store => store.itinerariesReducer.getItinerariesByCity)

  async function likeOrDislike(props) { //con _id???
    await dispatch(itinerariesActions.likeDislike(props))
    setReload(!reload)
  } //traigo el action de likes


  // async function Comments(event){
  //   const commentData = { itinerary: itinerary._id , comment: inputText,}

  //   await props.addComment(commentData)
  //   .then(response => setItinerary(response.data.response.nuevoComment), setInputText(""))
  //   document.querySelector("#nuevoComment").textContent = ""
  // }



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
                {itinerary.likes?.includes(user.userData.id) ?
                  <span style={{ "color": "red", "fontSize": 30, "backgroundColor": "white" }} className="material-icons corazon"><FavoriteIcon /></span>
                  :
                  <span style={{ "fontSize": 30 }} className="material-icons"><FavoriteBorderIcon /></span>}
              </div>)
              :
              (<div style={{ " fontSize": 30 }} className="material-icons coraBlue"><FavoriteBorderIcon /><LinkRouter to={<SignIn />}>You need to sign in, please click here!</LinkRouter></div>)

            }

            {/* <Text color="black" size={14}>
              <div className="contenedorIconos"><div className="icono">Likes💖{itinerary.likes}</div></div>
            </Text> */}
          </Col>
          <Collapse.Group>
            <Collapse title={itinerary.name} subtitle={itinerary.description}>
              <Card css={{ w: "100%", h: "400px", paddingBottom: "0.5em" }} >
                <Card.Header css={{ position: "absolute", zIndex: 1, top: 3 }}>
                  <Col>
                    <Text size={12} weight="bolder" transform="uppercase" className='textoItinerario'>

                    </Text>

                    <Text h3 color="black" className='textoIt'>
                      {/* <p>Description:</p> */}

                      {/* {itinerary.description} */}
                      {/* {itineraries.activities} */}
                    </Text>
                  </Col>
                </Card.Header>

                <Card.Body css={{ p: 0 }} className="bodyItineraries">
                </Card.Body>
                <Card.Footer
                  isBlurred
                  css={{
                    position: "absolute",
                    bgBlur: "#0f111466",
                    borderTop: "$borderWeights$light solid $gray800",
                    bottom: 0,
                    zIndex: 1,
                    paddingTop: "0.8em",
                  }}
                >
                  <Row>
                    <Col>
                      <Row>
                        <Col className="colActividades">
                          {itinerary.activities?.map(act =>

                            <>

                              <Text size={12} weight="bolder" transform="uppercase" className='textoItinerario'>
                                {act.names}
                              </Text>

                              <Col>
                                <Card.Image
                                  src={act.image}
                                  css={{ bg: "black", br: "50%" }}
                                  height={100}
                                  width={100}
                                  className="fotoActividad"
                                /></Col>
                            </>

                          )



                          }



                        </Col>
                      </Row>
                    </Col>


                  </Row>
                </Card.Footer>

              </Card>

            </Collapse>
          </Collapse.Group>
        </div>
      )
      }
    </>



  );

}

export default Itinerary