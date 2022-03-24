exports = async function(requestUserId, currentUserId) {
  const collection = context.services.get("mongodb-atlas").db("tracker").collection("User");
  const filter = {_id: requestUserId};
  const newMember = await collection.findOne(filter);
  
  const projectPartition = `project=${newMember._id}`;

  try {
    return await collection.updateOne(
      {_id: currentUserId},
      {$addToSet: {
          canWritePartitions: projectPartition,
          memberOf: {
            name: `${newMember.nickname}`.charAt(0).toUpperCase() + `${newMember.nickname}`.slice(1) + "'s Inventory",
            partition: projectPartition,
          }
        }
      });
  } catch (error) {
    return {error: error.toString()};
  }
};
  