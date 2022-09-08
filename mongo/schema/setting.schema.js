var settings_schema = {};
settings_schema.settings = {
    alias: String,
    title: String,
    email: String,
    phone: Number,
    url: String,
    branchs: [],
    positions: [],
    reminder: String,

};

settings_schema.languages = {
    name: String,
    code: { type: String, unique: true },
    translation: Object,
    default: Number,
    status: Number
};

settings_schema.currency = {
    name: String,
    code: { type: String, unique: true },
    symbol: String,
    value: Number,
    featured: String,
    default: Number,
    status: Number
};

module.exports = settings_schema;
