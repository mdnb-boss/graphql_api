const User2 = require("./User");

const { User } = require('../app/models');

module.exports = {
    Query: {
        users: (_, { page, per_page, filters }) => {

            page = Math.max(0, page);

            //return User2.find().limit(per_page).skip(per_page * page).where();

            return User.findAll({
                limit: per_page,
                offset: per_page * page
            })
        },

        user: (_, { id }, { pubsub }) => {

            const user = User2.findById(id);
            
            pubsub.publish('USER_CHANNEL', { 
                userAdded: user 
            })

            return user
        }
    },

    Mutation: {
        createUser: (_, { name, email, password }, { pubsub }) => {
        
            // pubsub.publish('CHAT_CHANNEL', { messageSent: chat })

            //return User2.create({ name, email })
            return User.create({name, email, password})
        },
        
        updateUser: async (_, {id, user }) => {

            let aUser;

            await User.update(user, {
                where: {
                    id: id
                }
            }).then(() => {
                aUser = User.findOne({
                    where: {
                        id: id
                    }
                })
            })
            
            return aUser
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