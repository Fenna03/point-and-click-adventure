window.onload = () => {
    document.getElementById("mainTitle").innerText = "Point and Click Adventure!";


    let gameState = {
        "inventory": [],
        "apples": 1,
        "arrows": 1,
        "coinPickedUp": false,
        "hasSpoken": false,
        "applesGiven": false
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
        const counterAvatar2 = document.getElementById("CounterAvatar2");

        //audio for dialog
        const heroAudio = document.getElementById("heroAudio");
        const counterAudio = document.getElementById("counterAudio");

        //speech Bubbles
        const heroSpeech = document.getElementById("heroSpeech");
        const counterSpeech = document.getElementById("counterSpeech");

        let doorUnlocked = false;
        // Store the current position of the hero
        let heroX = 0;
        let heroY = 0;

        function delay(time) {
            return new Promise(resolve => setTimeout(resolve, time));
        }

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
                    case "box1":
                        if (gameState.apples <= 5) {
                            showMessage(heroSpeech, "I found an apple!", heroAudio);
                            changeInventory("apple", "add");
                            gameState.apples++;
                            console.log(gameState.apples);
                        }
                        break;
                    case "box2":
                        if (gameState.apples <= 5) {
                            showMessage(heroSpeech, "I found an apple!", heroAudio);
                            changeInventory("apple", "add");
                            gameState.apples++;
                            console.log(gameState.apples);
                        }
                        break;
                    case "box3":
                        if (gameState.arrows <= 8) {
                            showMessage(heroSpeech, "I found an arrow!", heroAudio);
                            changeInventory("arrow", "add");
                            gameState.arrows++;
                            // console.log(gameState.arrows);
                        }
                        break;
                    case "doorWizardHut": //going from 1 to 2
                        if (doorUnlocked) {
                            // Change worlds
                            delay(600).then(() => map1.style.display = 'none'); // Hide world1
                            delay(600).then(() => map2.style.display = 'block'); // Show world2
                            delay(500).then(() => document.getElementById("Hero").style = "transition: none; left: 112px; top: 520px;");
                            delay(600).then(() => document.getElementById("Hero").style = "transition: all 1s ease-in-out; left: 112px; top: 520px;");
                        } else if (checkItem("key")) {
                            showMessage(heroSpeech, "I opened the cave!", heroAudio);
                            doorUnlocked = true;
                        } else if (checkItem("coin")) {
                            showMessage(heroSpeech, "I press the coin against the stone and it disappears. damn", heroAudio);
                            changeInventory('coin', 'remove');
                        } else {
                            showMessage(heroSpeech, "The cave seems to be locked", heroAudio);
                            doorUnlocked = false;
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

                    case "entrance": //going from 2 to 3
                        delay(1200).then(() => map2.style.display = 'none'); // Hide world2
                        delay(1200).then(() => map3.style.display = 'block'); // Show world3
                        delay(1100).then(() => document.getElementById("Hero").style = "transition: none; left: 15px; top: 211px;");
                        delay(1200).then(() => document.getElementById("Hero").style = "transition: all 1s ease-in-out; left: 15px; top: 211px;");
                        break;
                    case "goBack": //going from 2 to 1
                        //console.log("switch maps!");
                        delay(1200).then(() => map2.style.display = 'none'); // Hide world2
                        delay(1200).then(() => map1.style.display = 'block'); // Show world3
                        delay(1100).then(() => document.getElementById("Hero").style = "transition: none; left: 138px; top: 95px;");
                        delay(1200).then(() => document.getElementById("Hero").style = "transition: all 1s ease-in-out; left: 138px; top: 95px;");
                        break;
                    case "stone":
                        if (gameState.apples <= 5) {
                            showMessage(heroSpeech, "I found an apple!", heroAudio);
                            changeInventory("apple", "add");
                            gameState.apples++;
                            console.log(gameState.apples);
                        }
                        break;
                    case "stone1":
                        if (gameState.apples <= 5) {
                            showMessage(heroSpeech, "I found an apple!", heroAudio);
                            changeInventory("apple", "add");
                            gameState.apples++;
                            console.log(gameState.apples);
                        }
                        break;
                    case "waterStone":
                        if (gameState.apples <= 5) {
                            showMessage(heroSpeech, "I found an apple!", heroAudio);
                            changeInventory("apple", "add");
                            gameState.apples++;
                            console.log(gameState.apples);
                        }

                        break;
                    case "SKELLY":
                        if (gameState.apples < 5 && gameState.applesGiven == false) {
                            showMessage(heroSpeech, "Ello skeleton.", heroAudio);
                            setTimeout(function () { counterAvatar2.style.opacity = 1; }, 2 * sec);
                            setTimeout(showMessage, 4 * sec, counterSpeech, "Oh hi Hero, my name is SKELLY.", counterAudio);
                            setTimeout(showMessage, 8 * sec, heroSpeech, "Why did you scream your name?", heroAudio);
                            setTimeout(showMessage, 12 * sec, counterSpeech, "Sorry, that's how you have to say it. What do you need?", counterAudio);
                            setTimeout(showMessage, 16 * sec, heroSpeech, "Oh you're scaring the peeps so you gotta leave.", heroAudio);
                            setTimeout(showMessage, 20 * sec, counterSpeech, "Oh damn, I really wanted apples, could you help me with that before I go?", counterAudio);
                            setTimeout(showMessage, 24 * sec, heroSpeech, "Yeah sure man, be right back", heroAudio);
                            setTimeout(function () { counterAvatar2.style.opacity = 0; }, 26 * sec);
                            gameState.hasSpoken = true;
                        } else if (gameState.apples == 6 && gameState.hasSpoken == true) {
                            showMessage(heroSpeech, "Ello skeleton.", heroAudio);
                            setTimeout(function () { counterAvatar2.style.opacity = 1; }, 2 * sec);
                            setTimeout(showMessage, 4 * sec, counterSpeech, "Oh hi Hero, You're back! do you have the apples?", counterAudio);
                            setTimeout(showMessage, 8 * sec, heroSpeech, "I do! here you go buddy!", heroAudio);
                            setTimeout(showMessage, 12 * sec, counterSpeech, "JAAAJJ, THANK YOU!!!", counterAudio);
                            setTimeout(showMessage, 16 * sec, heroSpeech, "No problem SKELLY, so you're going home now?", heroAudio);
                            setTimeout(showMessage, 20 * sec, counterSpeech, "I will go away now! Thank!!", counterAudio);
                            setTimeout(showMessage, 24 * sec, heroSpeech, "Bye!", heroAudio);
                            setTimeout(function () { counterAvatar2.style.opacity = 0; }, 26 * sec);
                            changeInventory('5 apple', 'remove');
                            gameState.apples = 1;
                            gameState.applesGiven = true;
                        } else if (gameState.apples == 6 && gameState.hasSpoken == false) {
                            showMessage(heroSpeech, "Ello skeleton.", heroAudio);
                            setTimeout(function () { counterAvatar2.style.opacity = 1; }, 2 * sec);
                            setTimeout(showMessage, 4 * sec, counterSpeech, "Oh hi Hero, my name is SKELLY.", counterAudio);
                            setTimeout(showMessage, 8 * sec, heroSpeech, "Why did you scream your name?", heroAudio);
                            setTimeout(showMessage, 12 * sec, counterSpeech, "Sorry, that's how you have to say it. What do you need?", counterAudio);
                            setTimeout(showMessage, 16 * sec, heroSpeech, "Oh you're scaring the peeps so you gotta leave.", heroAudio);
                            setTimeout(showMessage, 20 * sec, counterSpeech, "Oh damn, I really wanted apples, could you help me with that before I go?", counterAudio);
                            setTimeout(showMessage, 24 * sec, heroSpeech, "Oh I already got some apples! you want them?", heroAudio);
                            setTimeout(showMessage, 28 * sec, counterSpeech, "YEAH! Thank you Hero! I will leave now!", counterAudio);
                            setTimeout(function () { counterAvatar2.style.opacity = 0; }, 30 * sec);
                            changeInventory('5 apple', 'remove');
                            gameState.apples = 1;
                            gameState.applesGiven = true;

                        } else if (gameState.applesGiven == true) {
                            showMessage(heroSpeech, "Ello skeleton.", heroAudio);
                            setTimeout(function () { counterAvatar2.style.opacity = 1; }, 2 * sec);
                            setTimeout(showMessage, 4 * sec, counterSpeech, "Hi Hero! I will leave now!", counterAudio);
                            setTimeout(showMessage, 8 * sec, heroSpeech, "alright cool, thank you for being nice.", heroAudio);
                            setTimeout(showMessage, 12 * sec, counterSpeech, "I don't like fighting, just wanted apples.", counterAudio);
                            setTimeout(showMessage, 16 * sec, heroSpeech, "I'll leave you and your apples alone then.", heroAudio);
                            setTimeout(showMessage, 20 * sec, counterSpeech, "Bye!", counterAudio);
                            setTimeout(function () { counterAvatar2.style.opacity = 0; }, 22 * sec);
                        }
                        break;

                    case "Exit": //going from 3 to 2
                        delay(1200).then(() => map3.style.display = 'none'); // Hide world3
                        delay(1200).then(() => map2.style.display = 'block'); // Show world2
                        delay(1000).then(() => document.getElementById("Hero").style = "transition: none; left: 774px; top: 434px;");
                        delay(1200).then(() => document.getElementById("Hero").style = "transition: all 1s ease-in-out; left: 774px; top: 434px;");
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
                        if (itemName == "apple") {
                            if (gameState.apples > 1) {
                                gameState.inventory.splice(gameState.inventory.indexOf(gameState.apples - 1 + " " + itemName), 1);
                            }
                            gameState.inventory.push(gameState.apples + " " + itemName);

                        } else if (itemName == "arrow") {
                            if (gameState.arrows > 1) {
                                gameState.inventory.splice(gameState.inventory.indexOf(gameState.arrows - 1 + " " + itemName), 1);
                            }
                            gameState.inventory.push(gameState.arrows + " " + itemName);

                        }
                        else {
                            gameState.inventory.push(itemName);
                        }
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


