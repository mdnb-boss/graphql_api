const User = require("./User");

module.exports = {
    Query: {
        users: (_, { page, per_page, filters }) => {

            page = Math.max(0, page);

            return User.find().limit(per_page).skip(per_page * page).where();
        },

        user: (_, { id }) => User.findById(id)
    },

    Mutation: {
        createUser: (_, { name, email }) => User.create({ name, email }),
        
        updateUser: (_, {id, user }) => {
            return User.findByIdAndUpdate(id, user , {
                new :true
            });
        },
    }
};