var touchstartX = 0;
var touchstartY = 0;
var touchendX = 0;
var touchendY = 0;

const obj = document.querySelector(".thing");
if (screen.width < 1000) {

    document.querySelector(".remark").innerHTML = "Oops, you are on mobile,Try swiping Up or Down";
}
window.addEventListener('keydown', handleKeyResponse);



window.addEventListener('touchstart', function (event) {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
    // console.log("Touch Start::i m working check ");
}, false);

window.addEventListener('touchend', function (event) {
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    // console.log("Touch end::i m working check ");

    handleGesture();
}, false);

function handleGesture() {
    // console.log("handle gesture::i have been called check ");

    if (touchendY === touchstartY && touchendX=== touchstartX) {
        //'Tap'
    }
    else if (Math.abs(touchendX - touchstartX) > Math.abs(touchendY - touchstartY)) {
        if (touchendX < touchstartX) {
            //'Swiped left'
            moveObj('ArrowLeft');
        }
        
        else if (touchendX > touchstartX) {
            //'Swiped right'
            moveObj('ArrowRight');
        }
    }
    else {


        if (touchendY < touchstartY) {
            //'Swiped up'
            moveObj('ArrowUp');

        }

        else if (touchendY > touchstartY) {
            //'Swiped down'
            moveObj('ArrowDown');

        }
    }
}
function handleKeyResponse(e) {
    moveObj(e.key);
}

function moveObj(d) {
    var x = parseInt(obj.style.left);
    var y = parseInt(obj.style.top);
    var yh = screen.height - 315;
    var xw = screen.width;

    if (!x)
        x = 0;
    if (!y)
        y = 0;
    if (d) {
        switch (d) {
            case "ArrowUp": if (y > -50) obj.style.top = y - 50 + 'px'; else obj.style.top = -85 + 'px'; break;
            case "ArrowDown":
                if (y < yh) {
                    obj.style.top = y + 50 + 'px';
                    console.log("if triggered");
                }
                break;
            case "ArrowLeft": if (x - 50 >= 16) {
                obj.style.left = x - 50 + 'px';
            } else {
                obj.style.left = 16 + 'px';
            }
                break;
            case "ArrowRight":
                if (x < (xw - 100)) {
                    obj.style.left = x + 50 + 'px';
                }
                break;
        }
    }
}
