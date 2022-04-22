exports = async function(nameOfItem, loggedInUserId) {
    // Setting up everything regarding to the User Collection
    let total_items = 0; 
    const collection = context.services.get("mongodb-atlas").db("tracker").collection("User");
    const filter = {_id: loggedInUserId};
    const user = await collection.findOne(filter)
    
    // Setting up everything regarding to the Item Collection
    const collectionItem = context.services.get("mongodb-atlas").db("tracker").collection("Item");
    const partition = `project=${loggedInUserId}`
    const filterItem = {name: nameOfItem, _partition: partition};
    const item = await collectionItem.findOne(filterItem)
    const quantity = item.quantity; 
    
    // Finding the total items for the logged in users inventory 
    user.memberOf.map((inventory) => {
      if(inventory.partition === `project=${loggedInUserId}`){
        total_items = inventory.totalItems;
      }
    })
    
    //  Adding one to the total items for the logged in users inventory 
    await collection.updateOne(
        {_id: loggedInUserId, "memberOf.partition": `project=${loggedInUserId}` },
        {$set: {"memberOf.$.totalItems": total_items - 1}
        });
    
    //  Updating this change to all inventories that can view logged in user inventory 
    user.memberOf.map(async (inventory) => {
      if(inventory.partition !== `project=${loggedInUserId}`){
        let userId = inventory.partition.substring(8); 
        await collection.updateOne(
          {_id: userId, "memberOf.partition": `project=${loggedInUserId}` },
          {$set: {"memberOf.$.totalItems": total_items - 1}
        });
      }
    })
  
    await collectionItem.updateOne(
        {name: nameOfItem, _partition: partition },
        {$set: {"quantity": quantity - 1 }
        });
    
    
  }