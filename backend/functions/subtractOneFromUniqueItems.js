exports = async function(loggedInUserId) {
    const collection = context.services.get("mongodb-atlas").db("tracker").collection("User");
    const filter = {_id: loggedInUserId};
    const user = await collection.findOne(filter)
    let unique_items = 0; 
    
    user.memberOf.map((inventory) => {
      if(inventory.partition === `project=${loggedInUserId}`){
        unique_items = inventory.uniqueItems;
      }
    })
    
    await collection.updateOne(
        {_id: loggedInUserId, "memberOf.partition": `project=${loggedInUserId}` },
        {$set: {"memberOf.$.uniqueItems": unique_items - 1}
        });
        
    user.memberOf.map(async (inventory) => {
      if(inventory.partition !== `project=${loggedInUserId}`){
        const userId = inventory.partition.substring(8); 
        await collection.updateOne(
        {_id: userId, "memberOf.partition": `project=${loggedInUserId}` },
        {$set: {"memberOf.$.uniqueItems": unique_items - 1}
        });
        
      }
    })
  }