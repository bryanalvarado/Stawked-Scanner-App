exports = async function(nameOfItem, loggedInUserId) {
    const collectionItem = context.services.get("mongodb-atlas").db("tracker").collection("Item");
    const partition = `project=${loggedInUserId}`
    const filterItem = {name: nameOfItem, _partition: partition};
    const item = await collectionItem.findOne(filterItem)
    const quantity = item.quantity; 
    
    if(quantity > 1) {
      return true; 
    }
    else {
      return false; 
    }
      
  }