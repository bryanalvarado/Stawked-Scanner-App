import { ObjectId } from "bson";

class Item {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    name,
    image, 
    partition,
    status = Item.STATUS_OPEN,
    id = new ObjectId(),
  }) {
    this._partition = partition;
    this._id = id;
    this.name = name;
    this.image = image;
    this.status = status;
  }

  static STATUS_OPEN = "Open";
  static STATUS_IN_PROGRESS = "InProgress";
  static STATUS_COMPLETE = "Complete";
  static schema = {
    name: "Item",
    properties: {
      _id: "objectId",
      name: "string",
      image: "string",
      status: "string",
    },
    primaryKey: "_id",
  };
}

export { Item };
