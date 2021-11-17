const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String
    },
    avatar: {
        type: String
    },
    banner: {
        type: String
    },
    partners: {
        type: Array
    },
    title: {
        type: String
    },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    scores: {
        difficult: { type: Number },
        skills: { type: Number },
        attack: { type: Number },
        survive: { type: Number }
    },
    skills: [{
        icon: {
            type: String
        },
        delay: {
            type: String
        },
        cost: {
            type: String
        },
        name: {
            type: String
        },
        description: {
            type: String
        },
        tips: {
            type: String
        }
    }],
    item1: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
    item2: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
    usageTips: { type: String },
    battleTips: { type: String },
    teamTips: { type: String },
    partners: [{
        hero: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hero'
        },
        description: {
            type: String
        }
    }]

})

schema.virtual('catelink', {
    localField: 'categories',
    foreignField: '_id',
    justOne: false,
    ref: 'Category'
})

module.exports = mongoose.model('Hero', schema, 'heroes')
