const mongoose = require('mongoose');

const listSchema = new mongoose.Schema(
    {
        name: 'String',
        category: 'String',
        creatorData: 'Object',
        isActive: 'Boolean',
        itens: 'Array'
    },
    {
        timestamps: true
    }
);

const List = mongoose.model('List', listSchema);

module.exports = List;