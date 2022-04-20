exports = async function(id) {
    const collection = context.services.get("mongodb-atlas").db("tracker").collection("User");
    const filter = {_id: id};
    const currentUser = await collection.findOne(filter);
  
    currentUser.memberOf.map(async (part) => {
      const collectionItem = context.services.get("mongodb-atlas").db("tracker").collection("Item");
      const filterItem = {_partition: part.partition};
      const numberOfItemsForUser = await collectionItem.count(
        filterItem ,
        { _id:0, image:0, status:0, _partition:0})
      const numberOfItems = parseInt(numberOfItemsForUser.toString());
  
      await collection.updateOne(
        {_id: currentUser._id, "memberOf.partition": part.partition },
        {$set: {"memberOf.$.totalItems": numberOfItems }
        });
  
    })
    
    return await currentUser;
  }
    