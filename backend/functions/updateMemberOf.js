exports = async function(currUserID) {
    const collection = context.services.get("mongodb-atlas").db("tracker").collection("User");
    const filter = {_id: currUserID};
    const currentUser = await collection.findOne(filter);
    let ids = []
    
    currentUser.canWritePartitions.map((project) => {
      if(project !== `project=${currUserID}`){
        ids.push(project.substring(8))
      }
    });
    
    ids.map(async (id) => {
      const filter = {_id: id};
      const otherUser = await collection.findOne(filter);
      const projectPartition = `project=${otherUser._id}`;
      await collection.updateOne(
        {_id: currentUser._id, "memberOf.partition": projectPartition },
        {$set: {"memberOf.$.name": `${otherUser.nickname}`.charAt(0).toUpperCase() + `${otherUser.nickname}`.slice(1) + "'s Inventory"}
        });
    });
    
  
    try {
      return await ids;
    } catch (error) {
      return {error: error.toString()};
    }
  };