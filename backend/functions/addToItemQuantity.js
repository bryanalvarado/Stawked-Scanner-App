exports = async function(nameOfItem, loggedInUserId) {
    const collectionItem = context.services.get("mongodb-atlas").db("tracker").collection("Item");
    const partition = `project=${loggedInUserId}`
    const filterItem = {name: nameOfItem, _partition: partition};
    const numberOfItemsForUser = await collectionItem.count(filterItem, { _id:0, image:0, status:0, _partition:0})
    
    if(numberOfItemsForUser > 0) {
      const item = await collectionItem.findOne(filterItem)
      const quantity = item.quantity; 
      await collectionItem.updateOne(
        {name: nameOfItem,_partition: partition },
        {$set: {"quantity": quantity + 1 }
        });
      return true; 
    }
      
    else {
      return false; 
    }
  }