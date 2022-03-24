exports = async function(id) {
    const collection = context.services.get("mongodb-atlas").db("tracker").collection("User");
    const filter = {_id: id}
    const currUser = await collection.findOne(filter);
    
    const memberOfUser = collection.findOne(
     { _id: currUser._id },
     { _id:0, _partition:0, name: 0, nickname:0, canReadPartitions:0, canWritePartitions:0, requestFrom:0}
  )
  
    try {
      return await memberOfUser; 
    } catch (error) {
      return {error: error.toString()};
    }
  };