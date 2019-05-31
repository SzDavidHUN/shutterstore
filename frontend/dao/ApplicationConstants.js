module.exports = {
    dbURL: 'mongodb://localhost:27017',
    dbName : 'shutter',
    collections : {
        orders : {
            collectionName: 'orders'
        },
        parts: {
            collectionName: 'parts'
        }
    }
};