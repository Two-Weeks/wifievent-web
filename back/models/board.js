module.exports = (sequelize, DataTypes) => {
    const board = sequelize.define('board', {
        name: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        version: {
            type: DataTypes.STRING(10),
            aloowNull: false,
        },
        os: {
            type: DataTypes.STRING(10),
            aloowNull: false,
        },
    }, {
        timestamps: true,
    });
    return board;
}