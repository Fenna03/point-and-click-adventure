window.onload = (event) => {
    document.getElementById("mainTitle").innerText = "Point and Click Adventure!";

    //game window reference
    const gameWindow = document.getElementById("gameWindow");

    //main character
    const hero = document.getElementById("Hero");
    const offsetcharacter = 16;


    //extra's
    const tree1 = document.getElementById("squareTree");
    const door = document.getElementById("door");
    const doorKey = document.getElementById("key");

    // Store the current position of the hero
    let heroX = 0;
    let heroY = 0;

    // Store the movement state
    const movement = {
        up: false,
        down: false,
        left: false,
        right: false
    };

    // Function to move the hero
    function moveHero() {
        let dx = 0;
        let dy = 0;
        if (movement.up) dy -= 2;
        if (movement.down) dy += 2;
        if (movement.left) dx -= 2;
        if (movement.right) dx += 2;
        heroX += dx;
        heroY += dy;
        hero.style.left = heroX + 'px';
        hero.style.top = heroY + 'px';
        requestAnimationFrame(moveHero);
    }

    // Add event listeners for keydown and keyup events
    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'w':
                movement.up = true;
                break;
            case 'a':
                movement.left = true;
                break;
            case 's':
                movement.down = true;
                break;
            case 'd':
                movement.right = true;
                break;
        }
    });

    document.addEventListener('keyup', (event) => {
        switch (event.key) {
            case 'w':
                movement.up = false;
                break;
            case 'a':
                movement.left = false;
                break;
            case 's':
                movement.down = false;
                break;
            case 'd':
                movement.right = false;
                break;
        }
    });

    // Game loop to continuously move the hero
    requestAnimationFrame(moveHero);

    // Handle click events
    gameWindow.onclick = function (e) {
        var rect = gameWindow.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;

        // Set the position of the hero
        heroX = x - offsetcharacter;
        heroY = y - offsetcharacter;

        // Move the hero
        hero.style.left = heroX + 'px';
        hero.style.top = heroY + 'px';

        //making things happen when you touch one of the objects
        switch (e.target.id) {
            case "squareTree":
                tree1.style.opacity = 0.5;
                break;
            case "door":
                door.style.opacity = 0.5;
                break;
            case "key":
                console.log("You\'ve found a key!");
                doorKey.remove();
                break;
        }
        //making the tree and door be able to change opacity back
        if (e.target.id == "squareTree") {
            tree1.style.opacity = 0.5;
        } else {
            tree1.style.opacity = 1;
        }

        if (e.target.id == "door") {
            door.style.opacity = 0.5;
        } else {
            door.style.opacity = 1;
        }
    }
};
