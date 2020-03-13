const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')


// ADmin --------------->
const adminRouter = require('./routes/admin/index');
const addUserRouter = require('./routes/admin/add-user');
const addCompanyRouter = require('./routes/admin/add-company');
const editUserRouter = require('./routes/admin/edit-user');
const editCompanyRouter = require('./routes/admin/edit-company');
const viewCompaniesRouter = require('./routes/admin/view-companies');
const viewUsersRouter = require('./routes/admin/view-users');
//End ADMin ------------>

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login')
const logoutRouter = require('./routes/logout')
const laserStatusRouter = require('./routes/laser-status');


const addOperatorRouter = require('./routes/add-operator');

const editLaserRouter = require('./routes/edit-laser');
const editOperatorRouter = require('./routes/edit-operator');

const viewLasersRouter = require('./routes/view-lasers');
const viewLaserStatusRouter = require('./routes/view-laser-status');
const viewLaserStatusRouter2 = require('./routes/view-laser-status2');
const viewIdleTime = require('./routes/view-idle-time');
const viewJobsRouter = require('./routes/view-jobs');
const viewOperatorsRouter = require('./routes/view-operators');

const usersTableApi = require('./api/table-users');
const companyTableApi = require('./api/table-companies');
const jobsTableApi = require('./api/table-jobs');
const laserTableApi = require('./api/table-lasers');
const laserStatusTableApi = require('./api/table-laser-status');
const laserStatusTableApi2 = require('./api/table-laser-status2');
const idleTimeTableApi = require('./api/table-idle-time');
const userInfoApi = require('./api/userinfo');
const companyListApi = require('./api/list-companies');
const operatorTableApi = require('./api/table-operators');
const jobsListApi = require('./api/jobs');
const apiTokenApi = require('./api/apitoken');
const apiLasers = require('./api/lasers');
const apiLaserStatus = require('./api/laserstatus');
const apiLaserStatus2 = require('./api/laserstatus2');
const apiIdleTime = require('./api/idletime');
const apiPlayVoiceAnnouncements = require('./api/playvoiceannouncements');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: '3k8VGmcphRgC1LeWG2'
}));

app.use('/laser-status', laserStatusRouter);
app.use('/login', loginRouter);
app.use('/list-companies', companyListApi);
app.use('/jobs', jobsListApi);
app.use('/lasers', apiLasers);
app.use('/laserstatus', apiLaserStatus);
app.use('/laserstatus2', apiLaserStatus2);
app.use('/apitoken', apiTokenApi);
app.use('/idletime', apiIdleTime);
app.use('/playvoiceannouncements', apiPlayVoiceAnnouncements);

app.all(['/admin', '/admin/*'], function (req, res, next) {
  if (req.session.user && req.session.user.Admin === 0 && process.env.NODE_ENV !== 'development') {
    return res.redirect('/');
  }
  next();
})

app.all('/*', function (req, res, next) {
  if (!req.session.user && process.env.NODE_ENV !== 'development') {
    return res.redirect('/login');
  }
  next();
}); 


app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/logout', logoutRouter);


app.use('/admin/add-user', addUserRouter);
app.use('/admin/add-company', addCompanyRouter);
app.use('/admin/edit-company', editCompanyRouter);
app.use('/admin/edit-user', editUserRouter);
app.use('/admin/view-companies', viewCompaniesRouter);
app.use('/admin/view-users', viewUsersRouter);


app.use('/add-operator', addOperatorRouter);
app.use('/edit-laser', editLaserRouter);
app.use('/edit-operator', editOperatorRouter);
app.use('/view-lasers', viewLasersRouter);
app.use('/view-laser-status', viewLaserStatusRouter);
app.use('/view-laser-status2', viewLaserStatusRouter2);
app.use('/view-idle-time', viewIdleTime);
app.use('/view-jobs', viewJobsRouter);
app.use('/view-operators', viewOperatorsRouter);

app.use('/userinfo', userInfoApi)
app.use('/table-users', usersTableApi);
app.use('/table-companies', companyTableApi);
app.use('/table-jobs', jobsTableApi);
app.use('/table-lasers', laserTableApi);
app.use('/table-laser-status', laserStatusTableApi);
app.use('/table-laser-status2', laserStatusTableApi2);
app.use('/table-idle-time', idleTimeTableApi);
app.use('/table-operators', operatorTableApi);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
