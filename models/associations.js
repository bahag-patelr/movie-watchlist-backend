import Users from "./Users.js";
import Movies from "./Movies.js";
import WatchList from "./WatchLists.js";
import Comments from "./Comments.js";

// WatchList relations
export const applyAssociations = () => {
  Users.hasMany(WatchList, { foreignKey: "user_id" });
  WatchList.belongsTo(Users, { foreignKey: "user_id" });

  Movies.hasMany(WatchList, { foreignKey: "movie_id" });
  WatchList.belongsTo(Movies, { foreignKey: "movie_id" });

  // Comments relations
  Users.hasMany(Comments, { foreignKey: "user_id" });
  Comments.belongsTo(Users, { foreignKey: "user_id" });

  Movies.hasMany(Comments, { foreignKey: "movie_id" });
  Comments.belongsTo(Movies, { foreignKey: "movie_id" });
}

export { Users, Movies, WatchList, Comments };
