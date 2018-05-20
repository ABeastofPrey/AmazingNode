// const isPresent = (...args) => !require('lodash/isEmpty')(...args);
// const isNotNil = (...args) => !require('lodash/isNil')(...args);

module.exports.resolver = {
    Query: {
        async user(root, { _id }, context) {
            const { User } = context.mongoose.models;
            return await User.findById(_id);
        },
        async users(root, { roles, disabled }, context) {
            const { User } = context.mongoose.models;
            let query = User.find();
            //   isPresent(roles) && (query = query.find({ roles: { $in: roles }}));
            //   isNotNil(disabled) && (query = query.find({ disabled }));
            return await query;
        }
    },
    Mutation: {
        async createUser(root, { input }, context) {
            const { User } = context.mongoose.models;
            return await User.create(input);
        },
        async updateUser(root, { _id, input }, context) {
            const { User } = context.mongoose.models;
            return await User.update({ _id }, input);
        },
        async deleteUser(root, { _id }, context) {
            const { User } = context.mongoose.models;
            return await User.findByIdAndDelete(_id);
        }
    }
};
