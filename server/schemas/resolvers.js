const { AuthenticationError } = require('apollo-server-express');
const { Book, User } = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const foundUser = await User.findOne({
                    $or: [{ _id: context.user._id }, { username: context.user.username }],
                });
                return foundUser;
            } else {
                throw new AuthenticationError('You need to be logged in!');
            }
        }
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
            const updatedUser = await User.findOneAndUpdate(
                { _id: context._id },
                { $addToSet: { savedBooks: context.savedBooks } },
                { new: true, runValidators: true }
            );
            if (!updatedUser) {
                throw new AuthenticationError('No user found with this id');
            }
            return updatedUser;
        },
        deleteBook: async (parent, args, context) => {
            const updatedUser = await User.findOneAndUpdate(
                { _id: user._id },
                { $pull: { savedBooks: { bookId: context.bookId } } },
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