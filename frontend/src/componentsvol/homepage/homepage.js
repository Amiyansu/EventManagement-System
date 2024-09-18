import React, { useState, useEffect, useReducer } from "react";
import "./homepage.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import img1 from "../../firstpage//images/output-onlinepngtools.png";
import img2 from "../../firstpage//images/bg.jpg";
import img3 from "../../firstpage//images/NGO_MANAGE.png";
import "antd/dist/antd"
import Searchfeature from "./Components/search";
import Filter from "./Components/filter";
import ImageSlider from "./Components/ImageSlider";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "../../commoncomponent/footer/footer2/footer2";
import Googlemap from "../../commoncomponent/Googlemap/googlemap";
import PaymentPage from "../../paymentpage/PaymentPage";



import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';





const Homepage = () => {

    const history = useHistory();
    const [Events, setevents] = useState([]);
    const user = JSON.parse(localStorage.getItem("currentUser"))
    const [Skip, setskip] = useState(0);
    const [Limit, setlimit] = useState(4);
    const [Postsize, setPostsize] = useState(0);
    const [Searchterms, setSearch] = useState("");
    const [Filters, setFilters] = useState({
        category: [],
    })
    const category = [
        {
            "_id": "Human"
        },
        {
            "_id": "Animal",
        },
        {
            "_id": "Nature",
        },
        {
            "_id": "Birds",
        },
        {
            "_id": "Social Services",
        }
    ]

    const redirectToPayment = () => {
        history.push('/payment');
    };
    useEffect(() => {
        const variables = {
            skip: Skip,
            limit: Limit,
        }

        console.log(user)
        getevent(variables)

    }, []);

    const getevent = (variables) => {
        axios
            .post('http://localhost:9002/events', variables)
            .then(res => {
                console.log(res)

                if (res.data.success) {
                    if (variables.loadMore) {
                        setevents([...Events, ...res.data.events])
                    } else {
                        setevents(res.data.events)
                    }
                    setPostsize(res.data.Postsize)
                } else {
                    alert('Failed to fetch product datas')
                }

            })
    }

    const updateSearch = (newSearch) => {


        const variables = {
            skip: 0,
            limit: Limit,
            Searchterms: newSearch
        }
        setskip(0);
        setSearch(newSearch);


        getevent(variables)
    }

    const onloadmore = () => {

        let skip = Skip + Limit;

        const variables = {
            skip: skip,
            limit: Limit,
            loadMore: true,
            filters: Filters,
            SearchTerm: Searchterms
        }
        getevent(variables)
        setskip(skip)

        return (
            <br />
        )

    }


    const handleFilters = (filters, category) => {


        const newFilters = { ...Filters }

        newFilters[category] = filters

        console.log(newFilters)

        showFilteredResults(newFilters)
        setFilters(newFilters)
    }


    const showFilteredResults = (filters) => {

        const variables = {
            skip: 0,
            limit: Limit,
            filters: filters

        }
        getevent(variables)
        setskip(0)

    }

    const logout = () => {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("currentRegUser");
        history.push("/loginvol")
    }

    let count = 0;
    const rendercards = Events.map((event, index) => {

        return (
            <>
                <div class="col-3 mx-auto mm">
                    <Card
                        style={{
                            width: 320,
                            height: 380,
                            borderRadius: 10,
                            backgroundColor: "#F5F5F5",
                            boxShadow: '0px 0px 10px 5px rgba(36, 38, 69, 0.37)'
                        }}
                    >
                        <CardContent>
                            <Typography
                                style={{ fontSize: 24, display: 'flex', justifyContent: 'center' }}
                                color="textSecondary"
                                gutterBottom
                            >
                                <img src={event.images} alt={event.images} class="rounded" style={{ height: '130px',width:'200px' }}></img>

                            </Typography>
                            <Typography variant="h6" component="h2">
                                Name: {event.name}
                            </Typography>
                            <Typography

                                color="textSecondary"
                            >
                                Date: {event.edate.substr(0, 10)}
                            </Typography>
                            <Typography variant="body2" component="p">
                                Organizer Name: {event.organizer}
                            </Typography>
                            <Typography style={{ marginTop: '20px', textAlign: 'center' }}>
                <button
                    onClick={redirectToPayment}
                    style={{
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        padding: '7px 16px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Make Payment
                </button>
            </Typography>
                        </CardContent>
                        
                        <CardActions>
                            <Button size="small" style={{ alignself: 'left' }}><a href={`/Event/${event._id}`}><button className="btn btn-outline-info" >More</button></a></Button>
                        </CardActions>
                    </Card>
                    <br />
                    <br />

                </div>
              
            </>

        )

    }
    )

    return (
        <div className="homepage">

            <div class="mainheadervol">
                <div class="logo">
                <a href="/"><img src={img1} alt="logo"></img></a>
                </div>

                <nav>
                    <a href="/homepage">Home</a>
                    <a href="/contactus">Contact</a>
                    <a onClick={() => history.push("/updatevol")} style={{ cursor: "pointer" }}>Update Profile </a>
                    <a style={{ cursor: 'pointer' }} onClick={() => history.push("/registeredevents")} >Registered Events</a>
                    <button className="btn btn-outline-danger " onClick={logout}>Logout</button>

                </nav>
            </div>

            <br></br><br></br>
            <h1 style={{ display: 'flex', justifyContent: 'center' }}>Hello {user.user.firstname} {user.user.lastname} !!!</h1>
            <br></br><br></br>

            <h1 style={{ display: 'flex', justifyContent: 'center', textDecoration: 'underline' }}>List of Events:</h1>
            <br></br>

            <Filter
                handleFilters={filters => handleFilters(filters, "category")}
            />

            <br />
            <Searchfeature
                refreshFunction={updateSearch}
            />

            <div style={{ width: '90%', margin: '3rem auto' }}>

                {Events.length === 0 ?
                    <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                        <h2>No post yet....</h2>
                    </div> :
                    <div className="row">

                        {rendercards}


                    </div>
                }

            </div>
           
            {Postsize >= Limit &&
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button className="btn btn-outline-dark btn-lg" onClick={onloadmore}>Load more</button>
                </div>
            }
            <br />

        </div>

    )
}

export default Homepage