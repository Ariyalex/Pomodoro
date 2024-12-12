const btn_container = document.getElementById('focused_btn');
const buttons = Array.from(btn_container.getElementsByClassName('btn_2'));

let focused_btn = null;

document.addEventListener('click', function(event) {
    if (!btn_container.contains(event.target) && focused_btn) {
        focused_btn.classList.add('focused');
    }
});

buttons.forEach(button => {
    button.addEventListener('click', function() {
        if (focused_btn) {
            focused_btn.classList.remove('focused');
        }
        this.classList.add('focused');
        focused_btn = this;
    });
});

