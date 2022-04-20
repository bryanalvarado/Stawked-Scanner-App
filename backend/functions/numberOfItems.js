exports = async function(currentUserId) {
    const collection = context.services.get("mongodb-atlas").db("tracker").collection("User");
    const filter = {_id: currentUserId};
    const newMember = await collection.findOne(filter);
    
    const collectionItem = context.services.get("mongodb-atlas").db("tracker").collection("Item");
    const partition = `project=${currentUserId}`
    const filterItem = {_partition: partition};
    const allItemsForThatUser = await collectionItem.find(filterItem);
    
    
    return allItemsForThatUser;
  };