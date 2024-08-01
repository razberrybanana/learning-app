module.exports = (sequelize, DataTypes) => {
    const Survey = sequelize.define("Survey", {
        name_prog: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        schedule_timing: {
            type: DataTypes.STRING(3),
            allowNull: false
        },
        participation: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        effectiveness: {
            type: DataTypes.STRING(15),
            allowNull: false
        },
        good_effective: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        need_improvement: {
            type: DataTypes.STRING(50),
            allowNull: true
        },

    }, {
        tableName: 'surveys'
    });
    return Survey;
}
