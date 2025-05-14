const express = require('express')
const conn = require('./db/connection') //conexão com banco
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const cors = require('cors');

// Models
const User = require('./models/User')
const Project = require('./models/Project')
const Review = require('./models/Review')
const ProjectItem = require('./models/ProjectItem')
const UserFollowProject = require('./models/UserFollowProject')
const UserFollowUser = require('./models/UserFollowUser')

//import routes
const authRoutes = require('./routes/authRoutes')
const homeRoutes = require('./routes/homeRoutes')
const profileRoutes = require('./routes/profileRoutes')
const projectItemRoutes = require('./routes/projectItemRoutes')
const projectRoutes = require('./routes/projectRoutes')
const reviewRoutes = require('./routes/reviewRoutes')
const userRoutes = require('./routes/userRoutes')
const notificationRouter = require('./routes/notificationRoutes')

//import controller
const HomeController = require('./controllers/HomeController')

// -- CONFIGURAÇÕES --

//servidor
const app = express()
const port = 3000

app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true
}));

//public path: css e js
app.use(express.static('public'))

//ler o body de requisições post
app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use(express.json())

//session middleware, onde a aplicação grava as sessões
app.use(
    session({
        name: "session",
        secret: "_5h56GqS<;O1",
        resave: false,
        saveUninitialized: false,
        rolling: true,
        store: new FileStore({
            logFn: function () { },
            path: require('path').join(require('os').tmpdir(), 'sessions'),
        }),
        cookie: {
            secure: false,
            maxAge: 3600000,
            httpOnly: true
        }
    })
)

//Set session to res
app.use((req, res, next) => {

    //usuario logado 
    if (req.session.userid) {
        //atribuir os dados do usuario da requisição para a resposta
        res.locals.session = req.session
    }

    //caso não logado passar direto
    next()

})

// -- ROTAS --
app.use('/user', userRoutes)
app.use('/review', reviewRoutes)
app.use('/project-item', projectItemRoutes)
app.use('/profile', profileRoutes)
app.use('/project', projectRoutes)
app.use('/notification', notificationRouter)
app.use('/home', homeRoutes)
app.use('/auth', authRoutes)

app.get('/', HomeController.getHome)

//realizar conexão permanente
conn
    .sync()
    //.sync({ force: true })
    .then(() => {
        // rodar aplicação
        app.listen(port, () => {
            console.log('Aplicação rodando')
        })
    })
    .catch((err) => console.log(err))
