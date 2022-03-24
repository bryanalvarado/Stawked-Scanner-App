exports = async function(currentUserId) {
    let tempArray = [];
    const cluster = context.services.get("mongodb-atlas");
    const collection = cluster.db("tracker").collection("User");
    const filter = {_id:currentUserId}; 
    const currentUser = await collection.findOne(filter);
    
    const requests = collection.find(
     filter ,
     { _id:0, _partition:0, name: 0, nickname:0, canReadPartitions:0, canWritePartitions:0, memberOf:0}
    )
    const requestField = currentUser.requestFrom; 
    
    requestField.map(async (id) => {
      let tempObject = {};
      const filter = {_id:id}; 
      const currentUser = await collection.findOne(filter);
      tempObject.id = id;
      tempObject.email = currentUser.name;
      tempObject.nickname = currentUser.nickname;
      tempArray.push(tempObject);
    })
    
    return await tempArray;
  };