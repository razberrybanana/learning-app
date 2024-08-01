module.exports = (sequelize, DataTypes) => {
    const Suggestion = sequelize.define("Suggestion", {
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        salutation: {
            type: DataTypes.STRING(3),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        phone_no: {
            type: DataTypes.STRING(15),
            allowNull: false
        },
        type_of_activity: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        duration: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        detail: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
    }, {
        tableName: 'suggestions'
    });
    return Suggestion;
}
