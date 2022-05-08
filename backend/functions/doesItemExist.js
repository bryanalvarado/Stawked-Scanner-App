exports = async function(itemName, userId) {
  const collectionItem = context.services.get("mongodb-atlas").db("tracker").collection("Item");
  const filterItem = {name: itemName, _partition: `project=${userId}` }
  const item_count = await collectionItem.count(filterItem)
  
  if(item_count > 0){
    return true; 
  }
  else {
    return false; 
  }
}