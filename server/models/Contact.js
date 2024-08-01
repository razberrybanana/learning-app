module.exports = (sequelize, DataTypes) => {
    const Contact = sequelize.define("Contact", {
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
            type: DataTypes.STRING(100),
            allowNull: false
        },
        reason: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        detail: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        tableName: 'contacts'
    });
    return Contact;
}
