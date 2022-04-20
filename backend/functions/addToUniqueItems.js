exports = async function(loggedInUserId) {
    let total_items = 0; 
    const collection = context.services.get("mongodb-atlas").db("tracker").collection("User");
    const filter = {_id: loggedInUserId};
    const user = await collection.findOne(filter)
    
    const collectionItem = context.services.get("mongodb-atlas").db("tracker").collection("Item");
    const filterItem = {_partition: `project=${loggedInUserId}`}
    const unique_items = await collectionItem.count(filterItem)
    
    await collection.updateOne(
        {_id: loggedInUserId, "memberOf.partition": `project=${loggedInUserId}` },
        {$set: {"memberOf.$.uniqueItems": unique_items}
        });
  }