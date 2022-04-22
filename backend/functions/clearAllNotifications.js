exports = async function(currentUserId) {
    const collection = context.services.get("mongodb-atlas").db("tracker").collection("User");
    const findCurrentUser = {_id: currentUserId}
    const currentUser = await collection.findOne(findCurrentUser);
    let blankArray = []
  
    
    await collection.updateOne(
      {_id: currentUserId},
      {$set: {
        myNotifications: blankArray
      }}
    );
  };