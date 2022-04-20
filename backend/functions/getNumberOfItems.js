exports = async function(id) {
    let count = 0; 
    const collection = context.services.get("mongodb-atlas").db("tracker").collection("User");
    const filter = {_id: id};
    const member = await collection.findOne(filter);
    
    
    const partition = `project=${id}`
    const collectionItem = context.services.get("mongodb-atlas").db("tracker").collection("Item");
    const filterItem = {_partition: partition};
    const numberOfItemsForUser = await collectionItem.count(
     filterItem ,
     { _id:0, image:0, status:0, _partition:0}
    )
    
    const numberOfItems = parseInt(numberOfItemsForUser.toString());
    
    
    if (member == null) {
      return {error: `User ${id} not found`};
    }
  
    try {
      return await collection.updateOne(
        { _id: id},
        {$set: {
          quantityOfItems: numberOfItems
        }})
    } catch (error) {
      return {error: error.toString()};
    }
  };