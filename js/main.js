window.onload = (event) => {
    document.getElementById("mainTitle").innerText = "Point and Click Adventure!";

    //game window reference
    const gameWindow = document.getElementById("gameWindow");

    //main character
    const hero = document.getElementById("Hero");
    const offsetcharacter = 16;


    //extra's
    const doorKey = document.getElementById("key");
    const wizardDoor = document.getElementById("doorWizardHut");

    //inventory
    const inventoryList = document.getElementById("inventoryList");
    let inventory = [];

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
            case "mushroom":
                getItem("apple", "apple");
                break;
            case "doorWizardHut":
                if (checkItem("rusty key")) {
                    removeItem("rusty key", "rustyKey");
                    console.log("You opened the door!");
                }
                else if (checkItem("apple")) {
                    removeItem("apple", "apple");
                    console.log("The apple is smushed and dirty, uneatable. That was a stupid decision");
                }
                else {
                    console.log("The door is locked dumbass");
                }
                break;
            default:
        }
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
    }
};
