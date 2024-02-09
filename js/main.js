window.onload = (event) => {
    document.getElementById("mainTitle").innerText = "Point and Click Aventure!";

    //game window reference
    const gameWindow = document.getElementById("gameWindow");

    //main character
    const hero = document.getElementById("Hero");
    const offsetcharacter = 16;

    const tree1 = document.getElementById("squareTree");
    const door = document.getElementById("door");
    const key = document.getElementById("key");

    gameWindow.onclick = function (e) {
        var rect = gameWindow.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;

        //No anim first tap
        //char out of bounds
        //TODO: use fancy way with style to get the ofset right
        hero.style.left = x - offsetcharacter + 'px';
        hero.style.top = y - offsetcharacter + 'px';

        switch (e.target.id) {
            case "squareTree":
                tree1.style.opacity = 0.5;
                break;
            case "door":
                door.style.opacity = 0.5;
                break;
            case "key":
                console.log("You\'ve found a key!");
                document.getElementById("key").remove;
                break;
        }
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