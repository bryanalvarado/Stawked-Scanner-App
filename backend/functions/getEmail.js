exports = async function(id) {
    const collection = context.services.get("mongodb-atlas").db("tracker").collection("User");
    const filter = {_id: id};
    const member = await collection.findOne(filter);
    
    
    if (member == null) {
      return {error: `User ${id} not found`};
    }
  
    try {
      return  member.name;
    } catch (error) {
      return {error: error.toString()};
    }
  };