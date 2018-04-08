// Exemple :

const update = async (id, toUpdate) => {
  try {
    const filter = {
      _id: ObjectID(id),
    };
    return mongo.update(database, collection, filter, toUpdate); //to be changed!
  } catch (e) {
    throw throwError(__filename, update.name, database, collection, e.message, null, e); // to be changed
  }
};