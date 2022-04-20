exports = async function(loggedInUserId) {
    let total_items = 0; 
    const collection = context.services.get("mongodb-atlas").db("tracker").collection("User");
    const filter = {_id: loggedInUserId};
    const user = await collection.findOne(filter)
    
    user.memberOf.map((inventory) => {
      if(inventory.partition === `project=${loggedInUserId}`){
        total_items = inventory.totalItems;
      }
    })
    
    await collection.updateOne(
        {_id: loggedInUserId, "memberOf.partition": `project=${loggedInUserId}` },
        {$set: {"memberOf.$.totalItems": total_items + 1}
        });
  }