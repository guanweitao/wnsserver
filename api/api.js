const _model = module.exports = {};

_model.findAndCountAll =  function (sequelize, options) {
  return  sequelize.findAndCountAll(options);
}

_model.findAll =  function (sequelize, options) {
  return  sequelize.findAll(options);
}

_model.findOne =  function (sequelize, options) {
  return  sequelize.findOne({
    where: options
  })
}

_model.findOrCreate = (sequelize, options) => {
  return sequelize.findOrCreate({
    where: options
  })
}

_model.findById =  function (sequelize, id) {
  return  sequelize.findOne({
    where: {
      id: id
    }
  });
};
_model.create =  function (sequelize, model) {
  return  sequelize.create(model);
};

// UPDATE bannars_bannar SET rank=2 WHERE id IN ('0','1')
_model.update =  function (sequelize, setStatement, options) {
  return  sequelize.update(setStatement, options);
}

_model.deleteAll =  function (sequelize, options) {
  return  sequelize.destroy(options);
}

_model.insertAll =  function (sequelize, articles) {
  return  sequelize.bulkCreate(articles);
}
_model.count=  function (sequelize, options) {
  return  sequelize.count(options);
}

_model.build = function (sequelize,articles) {
  return sequelize.build(articles);
}
