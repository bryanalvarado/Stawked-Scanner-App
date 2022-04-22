exports = async function(nameOfItem, loggedInUserId) {
    const collectionItem = context.services.get("mongodb-atlas").db("tracker").collection("Item");
    const partition = `project=${loggedInUserId}`
    const filterItem = {name: nameOfItem, _partition: partition};
    const numberOfItemsForUser = await collectionItem.count(filterItem, { _id:0, image:0, status:0, _partition:0})
    const item = await collectionItem.findOne(filterItem)
    const quantity = item.quantity;
    const collection = context.services.get("mongodb-atlas").db("tracker").collection("User");
    const filter = {_id: loggedInUserId};
    const user = await collection.findOne(filter)
    let total_items = 0;
    let unique_items = 0; 
    
    user.memberOf.map((inventory) => {
      if(inventory.partition === `project=${loggedInUserId}`){
        total_items = inventory.totalItems;
        unique_items = inventory.uniqueItems;
      }
    })
    
    await collection.updateOne(
        {_id: loggedInUserId, "memberOf.partition": `project=${loggedInUserId}` },
        {$set: {"memberOf.$.totalItems": total_items - 1}
        });
    
    if(quantity > 1) {
        await collectionItem.updateOne(
        {name: nameOfItem,_partition: partition },
        {$set: {"quantity": quantity - 1 }
        });
      return true; 
    }
    else {
      await collection.updateOne(
        {_id: loggedInUserId, "memberOf.partition": `project=${loggedInUserId}` },
        {$set: {"memberOf.$.uniqueItems": unique_items - 1}
        });
      return false; 
    }
  }