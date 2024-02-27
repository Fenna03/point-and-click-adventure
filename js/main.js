window.onload = () => {
    document.getElementById("mainTitle").innerText = "Point and Click Adventure!";


    let gameState = {
        "inventory": [],
        "coinPickedUp": false
    }

    function runGame() {
        //game window reference
        const gameWindow = document.getElementById("gameWindow");
        const inventoryList = document.getElementById("inventoryList");
        const sec = 1000;

        //main character
        const hero = document.getElementById("Hero");
        const offsetcharacter = 16;

        //speech Bubbles
        const heroSpeech = document.getElementById("heroSpeech");
        const counterSpeech = document.getElementById("counterSpeech");

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
                    console.log("pick up key")
                    changeInventory('key', "add");
                    break;
                case "well":
                    if (gameState.coinPickedUp == false) {
                        showMessage(heroSpeech, "I found a coin!"); 8
                        console.log("you found a coin!");
                        changeInventory("coin", "add");
                        gameState.coinPickedUp = true;
                    } else {
                        showMessage(heroSpeech, "seems like I got all the coins from here");
                    }
                    break;
                case "doorWizardHut":
                    if (checkItem("key")) {
                        showMessage(heroSpeech, "I opened the cave!");
                        // changeInventory('key', 'remove');
                    } else if (checkItem("coin")) {
                        showMessage(heroSpeech, "I press the coin against the stone and it disappears. damn")
                        changeInventory('coin', 'remove');
                    } else {
                        showMessage(counterSpeech, "The cave seems to be locked");
                    }
                    break;
                case "statue":
                    showMessage(counterSpeech, "Hello you want to get in the cave? look in the boxes");
                    break;
                default:
                    break;
            }

            /**
             * 
             * @param {string} itemName 
             * @param {string} action 
             * @returns 
             */
            function changeInventory(itemName, action) {
                if (itemName == null || action == null) {
                    console.error("Wrong parameters given to changeInventory()");
                    return;
                }
                console.log(itemName);
                switch (action) {
                    case 'add':
                        gameState.inventory.push(itemName);
                        break;
                    case 'remove':
                        gameState.inventory = gameState.inventory.filter(function (newInventory) {
                            return newInventory !== itemName;
                        });
                        document.getElementById(itemName).remove();
                        break;

                }
                updateInventory(gameState.inventory, inventoryList);
            }

            /**
             * 
             * @param {string} itemName 
             * @returns 
             */
            function checkItem(itemName) {
                return gameState.inventory.includes(itemName);
            }

            function updateInventory(inventory, inventoryList) {
                inventoryList.innerHTML = '';
                inventory.forEach(function (item) {
                    const inventoryItem = document.createElement("li");
                    inventoryItem.id = item;
                    inventoryItem.innerText = item;
                    inventoryList.appendChild(inventoryItem);
                });
            }
        }
        /**
         * it will show dialog
         * @param {getElementById} targetBubble 
         * @param {string} message 
         */
        function showMessage(targetBubble, message) {
            targetBubble.innerText = message;
            targetBubble.style.opacity = 1;
            setTimeout(hideMessage, 4 * sec, targetBubble);
        }
        /**
         * 
         * @param {*} targetBubble 
         */
        function hideMessage(targetBubble) {
            targetBubble.innerText = "... ";
            targetBubble.style.opacity = 0;
        }

        showMessage(heroSpeech, "ello!");
        showMessage(counterSpeech, "wassup");
    }
    runGame();
};


