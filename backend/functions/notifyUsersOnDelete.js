exports = async function(currentUserId, itemName, idOfNotification) {
    const collection = context.services.get("mongodb-atlas").db("tracker").collection("User");
    const findCurrentUser = {_id: currentUserId}
    const currentUser = await collection.findOne(findCurrentUser);
    const notificationText = `${currentUser.nickname} deleted an Item`
    var dt = new Date();
    year  = dt.getFullYear();
    month = (dt.getMonth() + 1).toString().padStart(2, "0");
    day   = dt.getDate().toString().padStart(2, "0");
    let formattedDate =  month + '/' + day + '/' + year
  
    
    currentUser.memberOf.map(async (inventory) => {
      if(inventory.partition !== `project=${currentUserId}`){
        let userId = inventory.partition.substring(8)
        try {
          await collection.updateOne(
            {_id: userId},
            {$addToSet: {
              myNotifications: { 
                id: idOfNotification, 
                title: itemName, 
                action: notificationText, 
                date: formattedDate
              }
            }
          });
        } catch (error) {
        return {error: error.toString()};
        }
      }
    })
  };
  
  
  // 624e06f31bd681ebdee03264