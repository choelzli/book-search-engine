const { User, Book } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        getSingleUser: async (parent, args) => {
            return User.findOne({
                email: args.email
            });
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({
                    _id: context.userId
                });
            }
            throw AuthenticationError;
        },
    },

    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email: email });

            if (!user) {
                throw AuthenticationError;  
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);
            return { token, user };
        },

        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);

            return {token, user };
        },

        saveBook: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: args.book 
                    }},
                    { new: true }
                );

                return user;
            }
            throw AuthenticationError;
        },

        removeBook: async (parent, args, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: context.user._id },
                    { 
                        $pull: {
                        savedBooks: {
                            bookId: args.deleteBook
                            },
                        },
                    },
                    { new: true }
                );
            }
            throw AuthenticationError;
        },
    },
};

module.exports = resolvers;