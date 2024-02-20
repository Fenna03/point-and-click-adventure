window.onload = (event) => {
    document.getElementById("mainTitle").innerText = "Point and Click Adventure!";

    //game window reference
    const gameWindow = document.getElementById("gameWindow");

    //main character
    const hero = document.getElementById("Hero");
    const offsetcharacter = 16;


    //extra's
    const tree1 = document.getElementById("squareTree");
    const doorKey = document.getElementById("key");

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
            case "squareTree":
                tree1.style.opacity = 0.5;
                break;
            case "key":
                getItem("rusty key", "rustyKey");
                break;
            case "mushroom":
                getItem("apple", "apple");
                break;
            default:
                tree1.style.opacity = 1;
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

        function removeItem(itemName, itemId) {

        }
    }
};
