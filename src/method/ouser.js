import vld from 'validator';

module.exports=function(done){
$.method('adduser').check({
name:{required:true},
email:{required:true},
password:{required:true,validate:(v)=>vld.isLength(v,{min:7})}
});
$.method('adduser').register(async function (params){
    params.name = params.name.toLowerCase();
    {
      const user = await $.method('getuser').call({name: params.name});
      if (user) throw new Error(`user ${params.name} already exists`);
    }
    {
      const user = await $.method('getuser').call({email: params.email});
      if (user) throw new Error(`user ${params.email} already exists`);
    }

    params.password = $.utils.encryptPassword(params.password.toString());
    const user = new $.model.user(params);
    return user.save();
  });


  $.method('getuser').check({
    _id: {validate: (v) => vld.isMongoId(v)},
  });
  $.method('getuser').register(async function (params) {

    const query = {};
    if (params._id) {
      query._id = params._id;
    } else if (params.name) {
      query.name = params.name;
    } else if (params.email) {
      query.email = params.email;
    } else {
      throw new Error('missing parameter _id|name|email');
    }

    return $.model.user.findOne(query);

  });


  $.method('upuser').check({
    _id: {validate: (v) => vld.isMongoId(v)},
  });
  $.method('upuser').register(async function (params) {

    const user = await $.method('getuser').call(params);
    if (!user) {
      throw new Error('user does not exists');
    }

    const update = {};
    if (params.name && user.name !== params.name) update.name = params.name;
    if (params.email && user.email !== params.email) update.email = params.email;
    if (params.password) update.password = params.password;
    if (params.nickname) update.nickname = params.nickname;
    if (params.about) update.about = params.about;

    return $.model.user.update({_id: user._id}, {$set: update});

  });
done();
};