exports = async function(email, id) {
    const collection = context.services.get("mongodb-atlas").db("tracker").collection("User");
    const filter = {name: email};
    const memberToRemove = await collection.findOne(filter);
    
    const filter2 = {_id: id};
    const currUser = await collection.findOne(filter2);
    
    if (currUser == null) {
      return {error: `User ${email} not found`};
    }
    const callingUser = context.user;
    
    const {canWritePartitions} = currUser;
    
    const projectPartition = `project=${memberToRemove._id}`;
  
    if ((canWritePartitions == null) || !canWritePartitions.includes(projectPartition)) {
      return {error: `User ${email} is not a member of your Family`};
    }
    
    try {
      return await collection.updateOne(
        {_id: currUser._id},
        {$pull: {
            canWritePartitions: projectPartition,
            memberOf: {
                partition: projectPartition,
            }
          }
        });
    } catch (error) {
      return {error: error.toString()};
    }
  };