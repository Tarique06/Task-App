const { Token } = require("../models");

Token.findAll = ({
    include: [{
        model: User,
        where: {
            id: 1
        }
    }]
})