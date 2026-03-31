import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";

const Movies = sequelize.define(
  "Movies",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    tmdb_id: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    poster_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    runtime: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    overall_rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  },
);

export default Movies;
