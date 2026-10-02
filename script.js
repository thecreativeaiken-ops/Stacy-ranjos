document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const lockScreen = document.getElementById("lockScreen");
    const website = document.getElementById("website");

    const passwordInput = document.getElementById("passwordInput");
    const unlockButton = document.getElementById("unlockButton");
    const errorMessage = document.getElementById("errorMessage");

    const backgroundMusic =
        document.getElementById("backgroundMusic");

    const musicButton =
        document.getElementById("musicButton");

    const startButton =
        document.getElementById("startButton");

    const revealButton =
        document.getElementById("revealButton");

    const secretMessage =
        document.getElementById("secretMessage");

    const restartButton =
        document.getElementById("restartButton");

    const openingTransition =
        document.getElementById("openingTransition");

    const finalSurprise =
        document.getElementById("finalSurprise");

    const finalSurpriseClose =
        document.getElementById("finalSurpriseClose");


    /* =====================================================
       PASSWORD
    ===================================================== */

    const SECRET_CODE = "Aikens Wrld";


    function unlockWebsite() {

        const entered =
            passwordInput.value.trim();

        if (
            entered.toLowerCase() !==
            SECRET_CODE.toLowerCase()
        ) {

            errorMessage.classList.add("show");

            passwordInput.value = "";

            passwordInput.focus();

            return;
        }

        errorMessage.classList.remove("show");

        lockScreen.classList.add("unlocking");


        setTimeout(() => {

            lockScreen.style.display = "none";

            website.classList.remove("hidden");

            window.scrollTo(0, 0);


            /* Opening animation */

            if (openingTransition) {

                openingTransition.classList.add("show");

                setTimeout(() => {

                    openingTransition.classList.remove("show");

                }, 1800);

            }


            /*
             IMPORTANT:
             Do NOT autoplay music here.
             Phones/browsers often block autoplay.
             The music starts when the user presses
             the Music button.
            */

        }, 650);

    }


    unlockButton.addEventListener(
        "click",
        unlockWebsite
    );


    passwordInput.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Enter") {

                event.preventDefault();

                unlockWebsite();

            }

        }
    );


    /* =====================================================
       MUSIC
    ===================================================== */

    if (backgroundMusic && musicButton) {

        backgroundMusic.volume = 0.45;


        musicButton.addEventListener(
            "click",
            async () => {

                try {

                    if (backgroundMusic.paused) {

                        await backgroundMusic.play();

                        musicButton.innerHTML =
                            "🎵 <span>Music On</span>";

                        musicButton.classList.add(
                            "playing"
                        );

                    } else {

                        backgroundMusic.pause();

                        musicButton.innerHTML =
                            "🔇 <span>Music Off</span>";

                        musicButton.classList.remove(
                            "playing"
                        );

                    }

                } catch (error) {

                    console.error(
                        "Music could not play:",
                        error
                    );

                }

            }
        );


        backgroundMusic.addEventListener(
            "play",
            () => {

                musicButton.innerHTML =
                    "🎵 <span>Music On</span>";

                musicButton.classList.add(
                    "playing"
                );

            }
        );


        backgroundMusic.addEventListener(
            "pause",
            () => {

                musicButton.innerHTML =
                    "🔇 <span>Music Off</span>";

                musicButton.classList.remove(
                    "playing"
                );

            }
        );

    }


    /* =====================================================
       HERO BUTTON
    ===================================================== */

    if (startButton) {

        startButton.addEventListener(
            "click",
            () => {

                const letter =
                    document.getElementById("letter");

                if (letter) {

                    letter.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                }

            }
        );

    }


    /* =====================================================
       NEXT BUTTONS
    ===================================================== */

    document
        .querySelectorAll(".next-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const targetId =
                        button.dataset.target;

                    if (!targetId) return;

                    const target =
                        document.getElementById(
                            targetId
                        );

                    if (target) {

                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "center"
                        });

                    }

                }
            );

        });


    /* =====================================================
       LOVE NOTES
    ===================================================== */

    const notes = [

        {
            title: "Your smile",
            text:
                "Somehow it makes ordinary days feel a little less ordinary."
        },

        {
            title: "Your heart",
            text:
                "There is something about the way you care that I never want to take for granted."
        },

        {
            title: "Your presence",
            text:
                "Even the quiet moments feel special when you're there."
        },

        {
            title: "The way you are",
            text:
                "I wouldn't trade the person you are for anyone else."
        },

        {
            title: "Our memories",
            text:
                "The little moments with you are the ones I want to remember forever."
        },

        {
            title: "Simply you",
            text:
                "Out of everyone in this world, I'm grateful that I get to love you."
        }

    ];


    let noteIndex = 0;

    const anotherNote =
        document.getElementById("anotherNote");

    const noteNumber =
        document.getElementById("noteNumber");

    const noteTitle =
        document.getElementById("noteTitle");

    const noteText =
        document.getElementById("noteText");


    if (
        anotherNote &&
        noteNumber &&
        noteTitle &&
        noteText
    ) {

        anotherNote.addEventListener(
            "click",
            () => {

                noteIndex =
                    (noteIndex + 1) %
                    notes.length;

                const note =
                    notes[noteIndex];

                noteTitle.textContent =
                    note.title;

                noteText.textContent =
                    note.text;

                noteNumber.textContent =
                    String(noteIndex + 1)
                        .padStart(2, "0");

            }
        );

    }


    /* =====================================================
       OPEN MY HEART
    ===================================================== */

    if (revealButton && secretMessage) {

        revealButton.addEventListener(
            "click",
            () => {

                secretMessage.classList.add(
                    "show"
                );

                revealButton.style.display =
                    "none";


                setTimeout(() => {

                    secretMessage.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                }, 300);


                createHeartBurst();


                /* Final surprise after 7 seconds */

                if (finalSurprise) {

                    setTimeout(() => {

                        finalSurprise.classList.add(
                            "show"
                        );

                        document.body.style.overflow =
                            "hidden";

                        createHeartBurst();

                    }, 7000);

                }

            }
        );

    }


    /* =====================================================
       FULLSCREEN PHOTOS
    ===================================================== */

    const photoImages =
        document.querySelectorAll(
            ".photo-card img"
        );


    if (photoImages.length > 0) {

        const viewer =
            document.createElement("div");

        viewer.className =
            "photo-viewer";


        viewer.innerHTML = `

            <button
                class="photo-viewer-close"
                type="button"
            >
                ×
            </button>

            <img
                class="photo-viewer-image"
                src=""
                alt=""
            >

            <div
                class="photo-viewer-counter"
            >
                1 / 1
            </div>

        `;


        document.body.appendChild(viewer);


        const viewerImage =
            viewer.querySelector(
                ".photo-viewer-image"
            );

        const closeButton =
            viewer.querySelector(
                ".photo-viewer-close"
            );

        const counter =
            viewer.querySelector(
                ".photo-viewer-counter"
            );


        let currentPhoto = 0;


        function openPhoto(index) {

            currentPhoto = index;

            const image =
                photoImages[index];

            viewerImage.src =
                image.src;

            viewerImage.alt =
                image.alt || "Memory";

            counter.textContent =
                `${index + 1} / ${photoImages.length}`;

            viewer.classList.add("active");

            document.body.style.overflow =
                "hidden";

        }


        function closePhoto() {

            viewer.classList.remove(
                "active"
            );

            document.body.style.overflow =
                "";

        }


        photoImages.forEach(
            (image, index) => {

                const card =
                    image.closest(
                        ".photo-card"
                    );

                if (!card) return;


                card.addEventListener(
                    "click",
                    () => {

                        openPhoto(index);

                    }
                );

            }
        );


        closeButton.addEventListener(
            "click",
            closePhoto
        );


        viewer.addEventListener(
            "click",
            (event) => {

                if (
                    event.target === viewer
                ) {

                    closePhoto();

                }

            }
        );


        document.addEventListener(
            "keydown",
            (event) => {

                if (
                    !viewer.classList.contains(
                        "active"
                    )
                ) return;


                if (event.key === "Escape") {

                    closePhoto();

                }


                if (event.key === "ArrowRight") {

                    openPhoto(
                        (currentPhoto + 1) %
                        photoImages.length
                    );

                }


                if (event.key === "ArrowLeft") {

                    openPhoto(
                        (
                            currentPhoto -
                            1 +
                            photoImages.length
                        ) %
                        photoImages.length
                    );

                }

            }
        );

    }


    /* =====================================================
       FLOATING HEARTS
    ===================================================== */

    function createFloatingHeart() {

        const heart =
            document.createElement("div");

        heart.className =
            "floating-heart";

        heart.textContent =
            Math.random() > 0.5
                ? "♥"
                : "♡";

        heart.style.left =
            `${Math.random() * 100}%`;

        heart.style.fontSize =
            `${10 + Math.random() * 12}px`;

        heart.style.animationDuration =
            `${5 + Math.random() * 4}s`;

        document.body.appendChild(
            heart
        );


        setTimeout(() => {

            heart.remove();

        }, 10000);

    }


    setInterval(
        createFloatingHeart,
        3500
    );


    /* =====================================================
       HEART BURST
    ===================================================== */

    function createHeartBurst() {

        for (
            let i = 0;
            i < 15;
            i++
        ) {

            setTimeout(() => {

                createFloatingHeart();

            }, i * 100);

        }

    }


    /* =====================================================
       FINAL SURPRISE CLOSE
    ===================================================== */

    if (finalSurpriseClose && finalSurprise) {

        finalSurpriseClose.addEventListener(
            "click",
            () => {

                finalSurprise.classList.remove(
                    "show"
                );

                document.body.style.overflow =
                    "";

            }
        );

    }


    /* =====================================================
       ESC CLOSE FINAL SURPRISE
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                finalSurprise
            ) {

                finalSurprise.classList.remove(
                    "show"
                );

                document.body.style.overflow =
                    "";

            }

        }
    );


    /* =====================================================
       RESTART
    ===================================================== */

    if (restartButton) {

        restartButton.addEventListener(
            "click",
            () => {

                if (backgroundMusic) {

                    backgroundMusic.pause();

                    backgroundMusic.currentTime =
                        0;

                }

                location.reload();

            }
        );

    }

});
