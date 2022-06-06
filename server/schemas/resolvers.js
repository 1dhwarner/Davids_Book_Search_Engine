const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const foundUser = await User.findOne({
                    $or: [{ _id: context.user._id }],
                });
                return foundUser;
            } else {
                throw new AuthenticationError('You need to be logged in!');
            }
        },

    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            console.log('resolver mutation: ', username, email, password);
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            console.log(token);
            return { token, user };
        },
        saveBook: async (parent, args, context) => {
            console.log('args, context: ', args);
            console.log('context: ', context.user);
            console.log('context.user._id: ', context.user._id);
            console.log('context.user._id: ', context._id);
            if (context.user) {
                if (context.user) {
                    const updatedUser = await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $addToSet: { savedBooks: args.input } },
                        { new: true, runValidators: true }
                    );
                    return updatedUser;
                }
            }

            if (!updatedUser) {
                throw new AuthenticationError('No user found with this id');
            }

        },
        deleteBook: async (parent, args, context) => {
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId: args.bookId } } },
                { new: true }
            );
            if (!updatedUser) {
                throw new AuthenticationError('No user found with this id');
            }
            return updatedUser;
        },

        login: async (parent, { username, email, password }) => {
            console.log('enterting login');
            const user = await User.findOne({ $or: [{ username: username }, { email: email }] });
            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            console.log('exiting login');
            return { token, user };

        },
    },
};

module.exports = resolvers; 