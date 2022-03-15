import React, { useContext, useState, useEffect, useRef } from "react";
import Realm from "realm";
import { Item } from "../schemas";
import { useAuth } from "./AuthProvider";
import makeCancelable from "makecancelable";


const ItemsContext = React.createContext(null);

const ItemsProvider = ({ children, projectPartition }) => {
  const [items, setItems] = useState([]);
  const { user } = useAuth();

  // Use a Ref to store the realm rather than the state because it is not
  // directly rendered, so updating it should not trigger a re-render as using
  // state would.
  const realmRef = useRef(null);

  useEffect(() => {
    // Enables offline-first: opens a local realm immediately without waiting 
    // for the download of a synchronized realm to be completed.
    const OpenRealmBehaviorConfiguration = {
      type: 'openImmediately',
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

    // return () =>{
    //   console.log('cleanup');
    //   cancelablePromise();
    // }

    // return () => {
    //   // cleanup function
    //   const projectRealm = realmRef.current;
    //   if (projectRealm) {
    //     projectRealm.close();
    //     realmRef.current = null;
    //     setTasks([]);
    //   }
    // };
    
  }, [user, projectPartition]);

  const createItem = (newItemName, image) => {
    
    const projectRealm = realmRef.current;
    projectRealm.write(() => {
      // Create a new task in the same partition -- that is, in the same project.
      projectRealm.create(
        "Item",
        new Item({
          name: newItemName || "Not Scanned",
          image: image || "No Image",
          partition: projectPartition,
        })
      );
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

  // Define the function for deleting an item.
  const deleteItem = (item) => {
    const projectRealm = realmRef.current;
    projectRealm.write(() => {
      projectRealm.delete(item);
      setItems([...projectRealm.objects("Item").sorted("name")]);
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
