const url = process.env.DATABASE_URL
const options = {
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}

if (!url) throw new Error('Missing environment variable: DATABASE_URL')

module.exports = {
    options,
    url
}