let chapter = 0;
const buttons = document.getElementById("tools").getElementsByClassName("buttons")[0]
const nextSlide = document.getElementById("nextSlide");
const previousSlide = document.getElementById("previousSlide");
const nextChapter = document.getElementById("nextChapter");
const previousChapter = document.getElementById("previousChapter");
const restart = document.getElementById("restart");
const presentation = document.getElementById("presentation");
const chapters = document.getElementsByClassName("chapter")
const chapterArr = Array.from(chapters);
const chapterLengths = chapterArr.map((chapter) => parseInt(chapter.style.width.slice(0, -4)));
const slides = chapterArr.map((chapter) => 0);
const titles = document.querySelectorAll("#titles > span");


function moveChapter(amount) {
    titles[chapter].style.display = "none";
    chapter += amount;
    if (chapter <= 0) {
        previousChapter.disabled = true;
        chapter = 0;
    } else if (chapter >= chapterLengths.length - 1) {
        nextChapter.disabled = true;
        chapter = chapterLengths.length - 1;
    } else {
        nextChapter.disabled = false;
        previousChapter.disabled = false;
    }
    if (!(slides[chapter] <= 0)) {
        previousSlide.disabled = false;
    } if (!(slides[chapter] >= chapterLengths[chapter] - 1)) {
        nextSlide.disabled = false;
    }
    titles[chapter].querySelector(".position").innerHTML = slides[chapter] + 1;
    titles[chapter].style.display = "inline";
    if (amount != 0) {
        slides[chapter] = 0;
        titles[chapter].querySelector(".position").innerHTML = slides[chapter] + 1;
    }
    presentation.style.translate = "-" + slides[chapter] + "00vw -" + chapter + "00vh";
    presentation.style.transition = "500ms all ease-out";
}


function moveSlide(amount) {
    slides[chapter] += amount;
    if (slides[chapter] <= 0) {
        previousSlide.disabled = true;
        slides[chapter] = 0;
    } else if (slides[chapter] >= chapterLengths[chapter] - 1) {
        nextSlide.disabled = true;
        slides[chapter] = chapterLengths[chapter] - 1;
    } else {
        previousSlide.disabled = false;
        nextSlide.disabled = false;
    }
    moveChapter(0);
}

function fadeButtons() {
    buttons.style.opacity = 0.35;
}

function unfadeButtons() {
    clearTimeout(t);
    buttons.style.opacity = 1;
}



nextSlide.addEventListener("click", (e) => { moveSlide(1) });
previousSlide.addEventListener("click", (e) => { moveSlide(-1) });
nextChapter.addEventListener("click", (e) => { moveChapter(1);  });
previousChapter.addEventListener("click", (e) => { moveChapter(-1); });
restart.addEventListener("click", (e) => { moveChapter(-chapter); moveSlide(-slides[chapter]); });
buttons.addEventListener("mouseenter", unfadeButtons);
buttons.addEventListener("mouseleave", fadeButtons);

titles[chapter].style.display = "inline";
const t = setTimeout(fadeButtons, 2500);
moveSlide(0);

document.addEventListener("keydown", (e) => { keyPressed(e); unfadeButtons(); });

function keyPressed(e) {
    let keynum = e.keyCode;
    if (keynum == 39) {
        moveSlide(1);
    } else if (keynum == 37) {
        moveSlide(-1);
    } else if (keynum == 40) {
        moveChapter(1);
    } else if (keynum == 38) {
        moveChapter(-1);
    } else if (keynum == 72) {
        moveChapter(- chapter); 
        moveSlide(-slides[chapter]);
    }
}