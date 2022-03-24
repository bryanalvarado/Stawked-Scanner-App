exports = async function(currentUserId, requestedUserId) {
    const collection = context.services.get("mongodb-atlas").db("tracker").collection("User");
    
    try {
      return await collection.updateOne(
        {_id: currentUserId},
        {$pull: { requestFrom: requestedUserId}});
    } catch (error) {
      return {error: error.toString()};
    }
  };