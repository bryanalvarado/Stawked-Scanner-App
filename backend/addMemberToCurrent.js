exports = async function(email, id) {
    const collection = context.services.get("mongodb-atlas").db("tracker").collection("User");
    const filter = {name: email};
    const filter2 = {_id: id}
    const newMember = await collection.findOne(filter);
    const currUser = await collection.findOne(filter2);
    if (newMember == null) {
      return {error: `User ${email} not found`};
    }
    const callingUser = context.user;
    
    if (newMember._id === callingUser.id) {
      return {error: "You are already on your own household!"};
    }
    
    const projectPartition = `project=${callingUser.id}`;
  
    if (newMember.canWritePartitions && newMember.canWritePartitions.includes(projectPartition)) {
       return {error: `User ${email} is already a member of your household`};
    }
  
    try {
      return await collection.updateOne(
        {_id: newMember._id},
        {$addToSet: {
            canWritePartitions: projectPartition,
            memberOf: {
              name: `${currUser.nickname}`.charAt(0).toUpperCase() + `${currUser.nickname}`.slice(1) + "'s Inventory",
              partition: projectPartition,
            }
          }
        });
    } catch (error) {
      return {error: error.toString()};
    }
  };
  
  