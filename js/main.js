window.onload = (event) => {
    document.getElementById("mainTitle").innerText = "Point and Click Aventure!";

    //game window reference
    const gameWindow = document.getElementById("gameWindow");

    //main character
    const hero = document.getElementById("Hero");
    const offsetcharacter = 16;

    gameWindow.onclick = function (e) {
        var rect = gameWindow.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;

        hero.style.left = x - offsetcharacter + 'px';
        hero.style.top = y - offsetcharacter + 'px';


        //console.log(x + ", " + y);
    }
};