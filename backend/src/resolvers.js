const User = require("./User");

module.exports = {
    Query: {
        users: (_, { page, per_page, filters }) => {

            page = Math.max(0, page);

            return User.find().limit(per_page).skip(per_page * page).where();
        },

        user: (_, { id }, { pubsub }) => {

            const user = User.findById(id);
            
            pubsub.publish('USER_CHANNEL', { 
                userAdded: user 
            })

            return user
        }
    },

    Mutation: {
        createUser: (_, { name, email }, { pubsub }) => {
        
            // pubsub.publish('CHAT_CHANNEL', { messageSent: chat })

            return User.create({ name, email })
        },
        
        updateUser: (_, {id, user }) => {
            return User.findByIdAndUpdate(id, user , {
                new :true
            });
        },
    },

    Subscription: {
        userAdded: {
            subscribe: (parent, args, { pubsub }) => {
                return pubsub.asyncIterator('USER_CHANNEL')
            },
        }
    }
};