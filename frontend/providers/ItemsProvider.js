import React, { useContext, useState, useEffect, useRef } from "react";
import Realm from "realm";
import { Item } from "../schemas";
import { useAuth } from "./AuthProvider";
import makeCancelable from "makecancelable";
import { State } from "react-native-gesture-handler";
import PushNotification from "react-native-push-notification";
const ItemsContext = React.createContext(null);

const ItemsProvider = ({ children, projectPartition }) => {
  const [items, setItems] = useState([]);
  const { user, updateProjectData } = useAuth();
  const tempArray = ["Deleted An Item", "Added An Item"]; 

  // Use a Ref to store the realm rather than the state because it is not
  // directly rendered, so updating it should not trigger a re-render as using
  // state would.
  const realmRef = useRef(null);

  useEffect(() => {
    // Enables offline-first: opens a local realm immediately without waiting
    // for the download of a synchronized realm to be completed.
    const OpenRealmBehaviorConfiguration = {
      type: "openImmediately",
    };
    const config = {
      schema: [Item.schema],
      sync: {
        user: user,
        partitionValue: projectPartition,
        newRealmFileBehavior: OpenRealmBehaviorConfiguration,
        existingRealmFileBehavior: OpenRealmBehaviorConfiguration,
      },
    };
    //const cancelablePromise = makeCancelable(
    // open a realm for this particular project
    Realm.open(config).then((projectRealm) => {
      realmRef.current = projectRealm;

      const syncItems = projectRealm.objects("Item");
      let sortedItems = syncItems.sorted("name");
      setItems([...sortedItems]);
      sortedItems.addListener(() => {
        setItems([...sortedItems]);
      });
    });

    // return () => {
    //   console.log("cleanup");
    //   cancelablePromise();
    // };

    return () => {
    //   // cleanup function
    //   const projectRealm = realmRef.current;
    //   console.log("cleanup #2");
    //   if (projectRealm) {
    //     projectRealm.close();
    //     realmRef.current = null;
        setItems([]);
    //   }
    };
  }, [user, projectPartition]);

  const createItem = async (name, image, brand, date) => {
    let itemExists = await user.functions.doesItemExist(name);
    if (itemExists) {
      await user.functions.addOneToQuantityAndTotalItems(name, user.id);
    } else {
      await user.functions.addOneToUniqueItems(user.id);
      await user.functions.addOneToTotalItems(user.id);
      const projectRealm = realmRef.current;
      projectRealm.write(() => {
        projectRealm.create(
          "Item",
          new Item({
            name: name || "N/A",
            image: image || "N/A",
            brand: brand || "N/A",
            date: date,
            quantity: 1,
            partition: projectPartition,
          })
        );
      });
    }
    updateProjectData();
    // notifyUsersOnAdd(name);
  };

  const deleteItem = async (item) => {
    let isQuantityGreaterThanTwo = await user.functions.isItemQuantityGreaterThanTwo(
      item.name,
      user.id
    );
    if (isQuantityGreaterThanTwo) {
      await user.functions.subtractOneFromQuantityAndTotalItems(item.name, user.id);
      notifyUsersOnDelete(item.name);
    } else {
      await user.functions.subtractOneFromQuantityAndTotalItems(item.name, user.id);
      await user.functions.subtractOneFromUniqueItems(user.id);
      notifyUsersOnDelete(item.name);
      const projectRealm = realmRef.current;
      projectRealm.write(() => {
        projectRealm.delete(item);
        setItems([...projectRealm.objects("Item").sorted("name")]);
      });
    }
    updateProjectData();
  };

  const notifyUsersOnAdd = async (itemName) => {
    try {
      await user.functions.notifyUsersOnAdd(user.id, itemName);
      const nickname = await user.functions.getNickname(user.id)
      handleNotifications(itemName, nickname + " " + tempArray[1]);
    } catch (err) {
      console.log(err.message);
    }
  };

  const notifyUsersOnDelete = async (itemName) => {
    try {
      await user.functions.notifyUsersOnDelete(user.id, itemName);
      const nickname = await user.functions.getNickname(user.id)
      handleNotifications(itemName, nickname + " " + tempArray[0]);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleNotifications = (item, action) => {
    console.log(item)
    console.log(action)
    PushNotification.localNotification({
      channelId: "test-channel",
      title: item, //"Fridge Alert, ",
      message: action,
      bigPictureUrl: "https://cdn-icons-png.flaticon.com/512/291/291893.png",
      color: "white",
      largeIcon: "ic_cart",
      smallIcon: "ic_cart",
    });
  };

  const setItemStatus = (item, status) => {
    // One advantage of centralizing the realm functionality in this provider is
    // that we can check to make sure a valid status was passed in here.
    if (
      ![
        Item.STATUS_OPEN,
        Item.STATUS_IN_PROGRESS,
        Item.STATUS_COMPLETE,
      ].includes(status)
    ) {
      throw new Error(`Invalid status: ${status}`);
    }
    const projectRealm = realmRef.current;

    projectRealm.write(() => {
      item.status = status;
    });
  };

  // Render the children within the ItemsContext's provider. The value contains
  // everything that should be made available to descendants that use the
  // useItems hook.
  return (
    <ItemsContext.Provider
      value={{
        createItem: createItem,
        deleteItem: deleteItem,
        setItemStatus: setItemStatus,
        items,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};

// The useItems hook can be used by any descendant of the ItemsProvider. It
// provides the items of the ItemsProvider's project and various functions to
// create, update, and delete the items in that project.
const useItems = () => {
  const item = useContext(ItemsContext);
  if (item == null) {
    throw new Error("useItems() called outside of a ItemsProvider?"); // an alert is not placed because this is an error for the developer not the user
  }
  return item;
};

export { ItemsProvider, useItems };
