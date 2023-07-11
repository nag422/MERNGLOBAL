var User = require('../models/user.model');

exports.isExistedUser = async function (query, callback) {
    return await User.findOne(query).then((userDoc) => {
        if (userDoc) {
          return 401;
        }
        return 201;
      });
}