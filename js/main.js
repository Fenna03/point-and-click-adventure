window.onload = (event) => {
    document.getElementById("mainTitle").innerText = "Point and Click Adventure!";


    let gameState = {
        "inventory": [],
        "coinPickedUp": false
    }

    //load data from save file
    // fetch("data/save.json").then((response) => {
    //     if (response.status == 404) {
    //         alert('file not found!');
    //     } else {
    //         return response.json();
    //     }
    // }).then((resJson) => {
    //     gameState = resJson;
    //     runGame();
    // }).catch((error) => {
    //     console.error(error)
    // })


    //function runGame() {
    //game window reference
    const gameWindow = document.getElementById("gameWindow");
    const inventoryList = document.getElementById("inventoryList");

    //main character
    const hero = document.getElementById("Hero");
    const offsetcharacter = 16;


    //extra's
    const doorKey = document.getElementById("key");
    const wizardDoor = document.getElementById("doorWizardHut");

    // Store the current position of the hero
    let heroX = 0;
    let heroY = 0;

    // Handle click events
    gameWindow.onclick = function (e) {
        var rect = gameWindow.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;

        if (e.target.id !== "HeroImage") {
            // Set the position of the hero
            heroX = x - offsetcharacter;
            heroY = y - offsetcharacter;

            // Move the hero
            hero.style.left = heroX + 'px';
            hero.style.top = heroY + 'px';
        }
        //making things happen when you touch one of the objects
        switch (e.target.id) {
            case "key":
                getItem("rusty key", "rustyKey");
                break;
            case "well":
                getItem("coin", "coin");
                break;
            case "doorWizardHut":
                if (checkItem("rusty key")) {
                    removeItem("rusty key", "rustyKey");
                    console.log("You opened the cave!");
                }
                else if (checkItem("coin")) {
                    removeItem("coin", "coin");
                    console.log("You press the coin against the stone and it disappears. Cave didn't open.");
                }
                else {
                    console.log("The cave is locked dumbass");
                }
                break;
            case "statue":
                console.log("Hello, it's been ages since someone has come here. You want to get in the cave? look in the boxes")
                break;
            default:
                break;
        }

        function changeInventory(itemName, action) {
            if (itemName == null || action == null) {
                console.error("Wrong parameters given to changeInventory()");
                return;
            }

            //   switch (action) {
            //       case 'add':
            //           gameState.inventory.push(itemName);
            //          break;
            //      case 'remove':
            //          gameState.inventory = gameState.inventory.filter(function (newInventory) {
            //        return newInventory !== itemName;
            //         });
            //       document.getElementById("inv-" + itemName).remove();
            //         break;

            //   }
            //   updateInventory(gameState.inventory, inventoryList);
            // }

            /**
             * checks if the value existswithin the array
             * if not then it adds value to the array and use showItem function
             * @param {string} itemName 
             * @param {string} itemId 
             */
            function getItem(itemName, itemId) {
                if (!checkItem(itemName)) {
                    inventory.push(itemName);
                    showItem(itemName, itemId);
                }
                console.log(inventory);
            }
            /**
             * 
             * @param {string} itemName 
             * @returns 
             */
            function checkItem(itemName) {
                return inventory.includes(itemName);
            }
            /**
             * Needs a name for displaying item and a  html id name
             * @param {string} itemName 
             * @param {string} itemId 
             */
            function showItem(itemName, itemId) {
                console.log('You\'ve found ' + itemName + '!');

                const keyElement = document.createElement("li");
                keyElement.id = itemId;
                keyElement.innerText = itemName;
                inventoryList.appendChild(keyElement);
            }

            /**
             * removes item from array and the element within the html
             * @param {string} itemName 
             * @param {string} itemId 
             */
            function removeItem(itemName, itemId) {
                //remove item in array
                inventory = inventory.filter(function (newInventory) {
                    return newInventory !== itemName;
                });
                document.getElementById(itemId).remove();
            }

            //function updateInventory(inventory, inventoryList) {
            //    inventoryList.innerHTML = '';
            //  inventory.forEach(function (item) {
            //      const inventoryItem = document.createElement("li");
            //      inventoryItem.id = 'inv-' + item;
            //      inventoryItem.innerText = item;
            //      inventoryList.appendChild(inventoryItem);
            //  })
            //}
        }
    }

};
