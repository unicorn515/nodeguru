import express from 'express';
import bodyparser from 'body-parser';
import multipart from 'connect-multiparty';
import serves from 'serve-static';
import session from 'express-session';
import path from 'path';
module.exports=function(done){
const app=express();
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use(multipart());
app.use(session({
     secret: $.config.get('web.session.secret'),
   }));
const router=express.Router();

const routerwrap = {};
  ['get', 'head', 'post', 'put', 'del', 'delete'].forEach(method => {
    routerwrap[method] = function (path, ...fnList) {
      fnList = fnList.map(fn => {
        return function (req, res, next) {
          const ret = fn(req, res, next);
          if (ret && ret.catch) ret.catch(next);
        };
      });
      router[method](path, ...fnList);
    };
  });
  $.router=routerwrap;
app.use(router);
  app.use(function (req, res, next) {
    res.apiSuccess = function (data) {
      res.json({success: true, result: data});
    };
    next();
  });
  app.use('/api', function (err, req, res, next) {
    res.json({error: err.toString()});
  });
app.use('/static',serves(path.resolve(__dirname,'../../static')));
app.listen($.config.get('web.port'),(err)=>{
done(err);
});
};