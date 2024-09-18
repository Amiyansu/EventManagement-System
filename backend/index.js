import express, { Router } from "express"
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';
import { userInfo } from "os"
import { stringify } from "querystring"

const app = express();
app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());


mongoose.set('debug', true);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000
})
.then(() => {
    console.log('MongoDB connected successfully');
})
.catch(err => {
    console.error('MongoDB connection error:', err.message);
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/images', express.static(path.join(__dirname, 'images')));

const volSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    address: String,
    city: String,
    state: String,
    gender: String,
    pnumber: Number,
    email: String,
    passwd: String,
    cart: { type: Array, default: [] },
    history: { type: Array, default: [] },
    tokens: [{ token: { type: String, required: true } }]
});

volSchema.pre('save', async function (next) {
    if (this.isModified('passwd')) {
        this.passwd = await bcrypt.hash(this.passwd, 12);
    }
    next();
});

volSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token });
        return token;
    } catch (err) {
        console.log(err);
    }
}

volSchema.statics.findByToken = function (token, cb) {
    var user = this;

    jwt.verify(token, process.env.SECRET_KEY, function (err, decode) {
        user.findOne({ "_id": decode, "token": token }, function (err, user) {
            if (err) return cb(err);
            cb(null, user);
        })
    })
}

const ngoSchema = new mongoose.Schema({
    name: String,
    address: String,
    city: String,
    state: String,
    NGOID: String,
    pnumber: Number,
    email: { type: String, unique: true },
    passwd: String,
    tokens: [{ token: { type: String, required: true } }]
});

ngoSchema.pre('save', async function (next) {
    if (this.isModified('passwd')) {
        this.passwd = await bcrypt.hash(this.passwd, 12);
    }
    next();
});

ngoSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token });
        return token;
    } catch (err) {
        console.log(err);
    }
}

ngoSchema.statics.findByToken = function (token, cb) {
    var user = this;

    jwt.verify(token, process.env.SECRET_KEY, function (err, decode) {
        user.findOne({ "_id": decode, "token": token }, function (err, user) {
            if (err) return cb(err);
            cb(null, user);
        })
    })
}

const eventSchema = new mongoose.Schema({
    name: String,
    organizer: String,
    ngoid: String,
    edate: Date,
    etime: String,
    address: String,
    city: String,
    state: String,
    category: String,
    contact: Number,
    email: String,
    description: String,
    images: String,
    feedback: { type: Array, default: [] },
    participants: { type: Array, default: [] },
    suggestion: { type: Array, default: [] },
});

const Volunteer = mongoose.model('Volunteer', volSchema);
const NGO = mongoose.model('NGO', ngoSchema);
const Events = mongoose.model('Events', eventSchema);

app.post("/loginvol", async (req, res) => {
    console.log("logged in as a User")
    const { email, passwd } = req.body
    const user = await Volunteer.findOne({ email: email })


    if (user) {
        const isMatch = await bcrypt.compare(passwd, user.passwd)
        if (isMatch) {
            const token = await user.generateAuthToken();
            console.log(user.email)
            const final = user._id
            res.send({ message: "Login Successful", token, user })
            
        } else {
            res.send({ message: "Password incorrect" })
        }
    } else {
        res.send({ message: "User not Registered. Please Register" })
    }

})

app.post("/loginngo", async (req, res) => {

    const { email, passwd } = req.body
    const user = await NGO.findOne({ email: email })

    if (user) {
        const isMatch = await bcrypt.compare(passwd, user.passwd)

        // console.log(token);

        if (isMatch) {
            const token = await user.generateAuthToken();
            res.send({ message: "Login Successful", token, user })
            // user:user
        } else {
            res.send({ message: "Password incorrect" })
        }
    } else {
        res.send({ message: "User not Registered. Please Register" })
    }

})

app.post("/registervol", (req, res) => {

    const { firstname, lastname, address, city, state, gender, pnumber, email, passwd } = req.body
    Volunteer.findOne({ email: email }, (err, user) => {
        if (user) {
            res.send({ message: "User Already Registered. Please use another Email Id." })
        } else {
            const volunteer = new Volunteer({
                firstname,
                lastname,
                address,
                city,
                state,
                gender,
                pnumber,
                email,
                passwd
            })

            volunteer.save(err => {
                if (err) {
                    res.send(err)
                } else {
                    res.send({ message: "Successfully Registered. Please login now." })
                }

            })
        }
    })
})


app.post("/registerngo", (req, res) => {


    const { name, address, city, state, NGOID, pnumber, email, passwd } = req.body
    NGO.findOne({ email: email }, (err, user) => {
        if (user) {
            res.send({ message: "User Already Registered. Please use another Email Id." })
        } else {
            const ngo = new NGO({
                name,
                address,
                city,
                state,
                NGOID,
                pnumber,
                email,
                passwd
            })

            ngo.save(err => {
                if (err) {
                    res.send(err)
                } else {
                    res.send({ message: "Successfully Registered. Please login now." })
                }

            })
        }
    })
})

app.post("/updatengo", (req, res) => {
    console.log("visited")

    var oldngostatus = NGO.findOne({ NGOID: req.body.NGOID })
    NGO.findOneAndUpdate({ NGOID: req.body.NGOID },
        {
            name: req.body.name || oldngostatus.name,
            address: req.body.address || oldngostatus.address,
            city: req.body.city || oldngostatus.city,
            state: req.body.state || oldngostatus.state,
            NGOID: req.body.NGOID,
            pnumber: req.body.pnumber || oldngostatus.pnumber,
            email: req.body.email || oldngostatus.email

        },
        { new: true },
        (err, user) => {
            // console.log(user)
            if (req.body.email != null && req.body.email.length > 0 && req.body.email)
                if (err) return res.json({ success: false, err });
            res.status(200).json({ user, message: "Admin Details Updated Successfully." })
        }
    )

})

app.post("/updatevol", (req, res) => {
    console.log("visited")

    var oldvolstatus = Volunteer.findById(req.body.ID)
    Volunteer.findOneAndUpdate({ _id: req.body.ID },
        {
            firstname: req.body.firstname || oldvolstatus.firstname,
            lastname: req.body.lastname || oldvolstatus.lastname,
            address: req.body.address || oldvolstatus.address,
            city: req.body.city || oldvolstatus.city,
            state: req.body.state || oldvolstatus.state,
            pnumber: req.body.pnumber || oldvolstatus.pnumber,
            email: req.body.email || oldvolstatus.email

        },
        { new: true },
        (err, user) => {
            // console.log(user)
            if (req.body.email != null && req.body.email.length > 0 && req.body.email)
                if (err) return res.json({ success: false, err });
            res.status(200).json({ user, message: "User Details Updated Successfully. " })
        }
    )

})

app.post("/addevents", (req, res) => {

    const { name, organizer, ngoid, edate, etime, address, city, state, category, contact, email, description, Image } = JSON.parse(req.body.Data)


    const events = new Events({
        name,
        organizer,
        ngoid,
        edate,
        etime,
        address,
        city,
        state,
        category,
        contact,
        email,
        description,
        images: Image,
    })

    events.save(err => {
        if (err) {
            res.send(err)
        } else {
            res.send({ message: "Event added successfully." })
        }

    })

})

app.post("/events", (req, res) => {

    let event = req.body.event ? req.body.event : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};
    let term = req.body.Searchterms;

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    console.log(term);


    for (let key in req.body.filters) {

        if (req.body.filters[key].length > 0) {
            findArgs[key] = req.body.filters[key];

            console.log(findArgs)
        }
    }

    if (term) {
        Events
            .find(
                {
                    $and: [findArgs, { edate: { $gt: today.toISOString() } }, {
                        $or:
                            [{ name: { $regex: term } }, { city: { $regex: term } }, { category: { $regex: term } }, { state: { $regex: term } }, { organizer: { $regex: term } }]
                    }
                    ]
                }
            )
            .populate("organizer")
            .sort([[sortBy, event]])
            .skip(skip)
            .limit(limit)
            .exec((err, events) => {
                if (err) return res.status(400).json({ success: false, err })
                res.status(200).json({ success: true, events, Postsize: events.length })
            })
    } else {
        Events
            .find({ $and: [findArgs, { edate: { $gt: today.toISOString() } }] })
            .populate("organizer")
            .sort([[sortBy, event]])
            .skip(skip)
            .limit(limit)
            .exec((err, events) => {
                if (err) return res.status(400).json({ success: false, err })
                res.status(200).json({ success: true, events, Postsize: events.length })
            })
    }

});


app.get("/events/events_by_id", (req, res) => {
    let type = req.query.type

    let eventId = req.query.id


    if (type === "array") {


    }

    Events.find({ '_id': { $in: eventId } })
        .populate('organizer')
        .exec((err, event) => {
            if (err) return res.status(400).send(err);
            return res.status(200).send(event);
        })


});

app.post("/events/revents_by_id", (req, res) => {
    let type = req.query.type

    let eventId = req.query.id


    if (type === "array") {
        let ids = req.query.id.split(',');
        eventId = []
        eventId = ids.map(item => {
            return item
        })

    }

    Events.find({ '_id': { $in: eventId } })
        .populate('organizer')
        .exec((err, event) => {
            if (err) return req.status(400).send(err);
            return res.status(200).json({ event, Postsize: event.length });
        })


});


app.post("/addToCart/:id/:id1", (req, res) => {

    Volunteer.findById(req.params.id1).then(
        (user) => {
            // console.log(userInfo.email)
            Events.findById(req.params.id)
            let duplicate = false;
            user.cart.forEach((cartInfo) => {

                if (cartInfo.id == req.params.id) {
                    duplicate = true;
                }

            })
            if (duplicate) {
                res.send({ user, message: "Already registered for this event." })
            } else {
                Volunteer.findOneAndUpdate({ _id: req.params.id1 },
                    {
                        $push: {
                            cart: {
                                id: req.params.id,
                                date: Date.now()
                            }
                        }
                    },
                    { new: true },
                    (err, user) => {
                        // console.log(user)
                        if (err) return res.json({ success: false, err });
                        Events.findOneAndUpdate({ _id: req.params.id },
                            {
                                $push: {
                                    participants: {
                                        id: req.params.id1,
                                        firstname: req.body.firstname,
                                        lastname: req.body.lastname,
                                        email: req.body.email,
                                        pnumber: req.body.pnumber,
                                        date: Date.now()
                                    }
                                }
                            },
                            { new: true },
                            (err, user1) => {
                                // console.log(user)
                                if (err) return res.json({ success: false, err });


                                res.status(200).json({ user, message: "Successfully Registered." })
                            }
                        )
                    }

                )


            }

        })

})

app.post("/removeregevent/:eid/:volid", (req, res) => {

    Volunteer.findById(req.params.volid).then(
        (userInfo) => {
            Volunteer.findOneAndUpdate(
                { _id: req.params.volid },
                {
                    "$pull":
                        { "cart": { "id": req.params.eid } }
                },
                { new: true },
                (err, user) => {
                    let cart = user.cart;
                    let array = cart.map(item => {
                        return item.id
                    })
                    Events.findOneAndUpdate(
                        { _id: req.params.eid },
                        {
                            "$pull":
                                { "participants": { "id": req.params.volid } }
                        },
                        { new: true },

                        (err, user1) => {
                            // console.log(user)
                            if (err) return res.json({ success: false, err });


                            Events.find({ '_id': { $in: array } })
                                .populate('organizer')
                                .exec((err, cart) => {
                                    return res.status(200).json({ user, cart, message: "Registration canceled successfully, please reload. " })
                                })
                        })
                }
            )

        })
})


app.post("/updateevents", (req, res) => {
    console.log("visited")

    const { id, name, organizer, edate, etime, address, city, state, category, contact, email, description, Image } = JSON.parse(req.body.Data)
    // console.log(name)
    // console.log(id)
    // console.log(description)
    var oldeventstatus = Events.findById(id)
    // console.log(oldeventstatus.images)
    Events.findOneAndUpdate({ _id: id },
        {
            name: name || oldeventstatus.name,
            organizer: organizer || oldeventstatus.organizer,
            edate: edate || oldeventstatus.edate,
            etime: etime || oldeventstatus.etime,
            address: address || oldeventstatus.address,
            city: city || oldeventstatus.city,
            state: state || oldeventstatus.state,
            category: category || oldeventstatus.category,
            contact: contact || oldeventstatus.contact,
            email: email || oldeventstatus.email,
            description: description || oldeventstatus.description,
            images: Image || oldeventstatus.images

        },
        { new: true },
        (err, user) => {
            // console.log(user
            if (err) return res.json({ success: false, err });
            res.status(200).json({ user, message: "Event details Updated Successfully." })
        }
    )

})


app.post("/ngoevents/:ngoid", (req, res) => {


    Events.find({ ngoid: req.params.ngoid })
        .populate("organizer")
        .exec((err, event) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, event, Postsize: event.length })
        })
    Events.find({ ngoid: req.params.ngoid })
        .then
});

app.post("/addToFeedback/:eventid/:userid", (req, res) => {
    // console.log("Hello")

    Events.findById(req.params.eventid).then(
        (event) => {


            Events.findOneAndUpdate({ _id: req.params.eventid },
                {
                    $push: {
                        feedback: {
                            id: req.params.userid,
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            rate: req.body.rate,
                            message: req.body.feedback,
                            date: Date.now()
                        }
                    }
                },
                { new: true },
                (err, event) => {
                    // console.log(event)
                    if (err) return res.json({ success: false, err });
                    res.status(200).json({ event, message: "Feedback Submitted Successfully." })
                }
            )
        }

    )

})

app.post("/removefeedback/:eventId", (req, res) => {

    Events.findById(req.params.eventId).then(
        (userInfo) => {
            Events.findOneAndUpdate(
                { _id: req.params.eventId },
                {
                    "$pull":
                        { "feedback": { "id": req.body.id, "date": req.body.date, "message": req.body.message } }
                },
                { new: true },
                (err, user) => {
                    let feedback = user.feedback;
                    let array = feedback.map(item => {
                        return item.id
                    })
                    Events.find({ 'id': { $in: array } })
                        .populate('organizer')
                        .exec((err, feedback) => {
                            return res.status(200).json({ user, feedback, mess: "Feedback Removed Successfully, please refresh to view the changes." })
                        })
                }
            )

        })
})

app.post("/addToSuggestion/:eventid/:userid", (req, res) => {
    // console.log("Hello")

    Events.findById(req.params.eventid).then(
        (event) => {

            Events.findOneAndUpdate({ _id: req.params.eventid },
                {
                    $push: {
                        suggestion: {
                            id: req.params.userid,
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            suggestion: req.body.suggestion,
                            date: Date.now()
                        }
                    }
                },
                { new: true },
                (err, event) => {
                    // console.log(event)
                    if (err) return res.json({ success: false, err });
                    res.status(200).json({ event, message: "Suggestion Submitted Successfully. " })
                }
            )
        }

    )

})

app.delete("/deleteevent/:eventId", async (req, res) => {
    try {
        const eventId = req.params.eventId;

        
        const event = await Events.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: "Event not found." });
        }

        // Delete the event
        await Events.deleteOne({ _id: eventId });

        res.status(200).json({ message: "Event deleted successfully." });
    } catch (error) {
        console.error("Error deleting event:", error);
        res.status(500).json({ message: "Failed to delete event. Please try again." });
    }
})

app.get('/allevents', async (req, res) => {
    try {
        const events = await Events.find();
        res.status(200).json({ events });
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ message: 'Failed to fetch events. Please try again.' });
    }
});

app.listen(9002, () => {
    console.log('server started at port 9002');
});