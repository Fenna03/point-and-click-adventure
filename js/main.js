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

        //avatar
        const counterAvatar = document.getElementById("CounterAvatar");

        //audio for dialog
        const heroAudio = document.getElementById("heroAudio");
        const counterAudio = document.getElementById("counterAudio");

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



            if (counterSpeech.style.opacity == 0 && heroSpeech.style.opacity == 0) {

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
                        showMessage(heroSpeech, "I found a key!", heroAudio);
                        document.getElementById("key").remove();
                        changeInventory('key', "add");
                        break;
                    case "well":
                        if (gameState.coinPickedUp == false) {
                            showMessage(heroSpeech, "I found a coin!", heroAudio);
                            changeInventory("coin", "add");
                            gameState.coinPickedUp = true;
                        } else {
                            showMessage(heroSpeech, "seems like I got all the coins from here", heroAudio);
                        }
                        break;
                    case "doorWizardHut":
                        if (checkItem("key")) {
                            showMessage(heroSpeech, "I opened the cave!", heroAudio);
                            // changeInventory('key', 'remove');
                        } else if (checkItem("coin")) {
                            showMessage(heroSpeech, "I press the coin against the stone and it disappears. damn", heroAudio);
                            changeInventory('coin', 'remove');
                        } else {
                            showMessage(heroSpeech, "The cave seems to be locked", heroAudio);
                        }
                        break;
                    case "statue":
                        showMessage(heroSpeech, "huh, a barrel.", heroAudio);
                        setTimeout(function () { counterAvatar.style.opacity = 1; }, 4 * sec);
                        setTimeout(showMessage, 4 * sec, counterSpeech, "I'm not a barrel! I'm hiding IN A barrel!", counterAudio);
                        setTimeout(showMessage, 8 * sec, heroSpeech, "From the thing in the cave? I'll kill it.", heroAudio);
                        setTimeout(showMessage, 12 * sec, counterSpeech, "check the boxes for the key to get in the cave! just save me!!!", counterAudio);
                        setTimeout(showMessage, 16 * sec, heroSpeech, "No questions asked huh... damnn", heroAudio);
                        setTimeout(function () { counterAvatar.style.opacity = 0; }, 18 * sec);
                        break;
                    default:
                        break;
                }
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
         * it will show dialog and trigger sound
         * @param {getElementById} targetBubble 
         * @param {string} message 
         * @param {getElementById} targetSound
         */
        function showMessage(targetBubble, message, targetSound) {
            targetSound.currentTime = 0;
            targetSound.play();
            targetBubble.innerText = message;
            targetBubble.style.opacity = 1;
            setTimeout(hideMessage, 4 * sec, targetBubble, targetSound);
        }

        /**
         * hides dialog and pauses sound.
         * @param {getElementById} targetBubble 
         * @param {getElementById} targetSound 
         */
        function hideMessage(targetBubble, targetSound) {
            targetSound.pause();
            targetBubble.innerText = "... ";
            targetBubble.style.opacity = 0;
        }
    }
    runGame();
};


