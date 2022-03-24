exports = async function(currentUserId, emailOfUserToRequest) {
    const collection = context.services.get("mongodb-atlas").db("tracker").collection("User");
    const findRequestedUser = {name: emailOfUserToRequest};
    const findCurrentUser = {_id: currentUserId}
    const userToRequest = await collection.findOne(findRequestedUser);
    const currentUser = await collection.findOne(findCurrentUser);
    
    // Check to see if the requested user exists 
    if (userToRequest == null) {
      return {error: `User ${emailOfUserToRequest} not found`};
    }
    
    // Make sures the user is not requesting himself/herself
    if (currentUser._id === userToRequest._id) {
      return {error: "You are already on your own household!"};
    }
    
    const projectPartition = `project=${currentUser.id}`;
    
    if (userToRequest.canWritePartitions && userToRequest.canWritePartitions.includes(projectPartition)) {
         return {error: `User ${email} is already a member of your household`};
      }
    
    const checker = currentUser._id;
    
    // Makes sure the current user is not already a part of the requested users household
    if (userToRequest.requestFrom && userToRequest.requestFrom.includes(checker)) {
       return {error: `User ${emailOfUserToRequest} has already been requested!`};
    }
  
    // TESTING 
    // Current user id: 6239033601c8336ed861ceab
    // Requested User Email: alex.furmuzan@gmial.com
  
    try {
      return await collection.updateOne(
        {_id: userToRequest._id},
        {$push: { requestFrom: currentUser._id}});
    } catch (error) {
      return {error: error.toString()};
    }
  };
  