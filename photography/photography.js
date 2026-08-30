const animatedItems = document.querySelectorAll(".animate");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  },
  {
    threshold: 0.2
  }
);

animatedItems.forEach(item => {
  observer.observe(item);
});



// ADD 33 - DISABLE RIGHT CLICK + IMAGE DRAG

document.addEventListener("contextmenu", event => {
  if (event.target.tagName === "IMG") {
    event.preventDefault();
  }
});

document.querySelectorAll("img").forEach(img => {
  img.setAttribute("draggable", "false");
});


/* =====================================================
   ADD 41
   EVENT PHOTOGRAPHY COLLECTION SYSTEM
===================================================== */


/*
FOLDER STRUCTURE:

images/
    photography/
        collections/
            all-white-party/
                cover.jpg
                1.jpg
                2.jpg
                3.jpg

            seattle-skyline/
                cover.jpg
                1.jpg
                2.jpg

            etc...

*/


const photographyCollections = [

    {
        title: "All White Party",
        date: "August 22, 2026",
        folder: "all-white-party",
        imageCount: 35
    },

    {
        title: "Seattle Skyline",
        date: "August 20, 2026",
        folder: "seattle-skyline",
        imageCount: 16
    },

    {
        title: "Back to School Barbering Event",
        date: "August 7, 2026",
        folder: "back-to-school-barbering",
        imageCount: 11
    },

    {
        title: "Pinky Promise",
        date: "June 15, 2026",
        folder: "jasmine-ethan",
        imageCount: 20
    },

    {
        title: "Duo High School Graduation",
        date: "June 13, 2026",
        folder: "duo-high-school-grad",
        imageCount: 21
    },

    {
        title: "Boardwalk",
        date: "May 25, 2026",
        folder: "everett-boardwalk",
        imageCount: 10
    },

    {
        title: "Ife Graduation",
        date: "May 20, 2026",
        folder: "ife-grad",
        imageCount: 12
    },

    {
        title: "Couple Graduation",
        date: "May 18, 2026",
        folder: "couple-grad",
        imageCount: 23
    },

    {
        title: "Cesar Graduation",
        date: "May 16, 2026",
        folder: "cesar-grad",
        imageCount: 10
    },

    {
        title: "WSU Student Regent Graduation",
        date: "May 14, 2026",
        folder: "student-regent-grad",
        imageCount: 20
    },

    {
        title: "Pico Graduation",
        date: "May 7, 2026",
        folder: "rico-grad",
        imageCount: 9
    },

    {
        title: "Grace Graduation",
        date: "April 28, 2026",
        folder: "grace-grad",
        imageCount: 19
    },

    {
        title: "AMDT Fashion Show",
        date: "April 18, 2026",
        folder: "amdt-collections",
        imageCount: 70
    },

    {
        title: "Murrow 50th Symposium",
        date: "April 6–8, 2026",
        folder: "murrow-50",
        imageCount: 11
    },

    {
        title: "Art Exhibit",
        date: "March 31, 2026",
        folder: "art-show",
        imageCount: 19
    },

    {
        title: "SEB Fashion Show",
        date: "March 11, 2026",
        folder: "seb-fashion-show",
        imageCount: 17
    },

    {
        title: "Filipino Culture Night",
        date: "March 8, 2026",
        folder: "filipino-culture-night",
        imageCount: 11
    },

    {
        title: "A Day In Spokane",
        date: "March 6, 2026",
        folder: "spokane-spence",
        imageCount: 14
    },

    {
        title: "Cowboy Night",
        date: "January 22, 2026",
        folder: "cowboy-night",
        imageCount: 9
    },

    {
        title: "Ethan Graduation",
        date: "November 16, 2025",
        folder: "ethan-graduation",
        imageCount: 6
    },

    {
        title: "Corvette Corvette",
        date: "October 29, 2025",
        folder: "corvette",
        imageCount: 10
    },

    {
        title: "Dirt Rider",
        date: "September 19, 2025",
        folder: "bmw-dirt-rider",
        imageCount: 10
    },

    {
        title: "Dark Academia",
        date: "September 9, 2025",
        folder: "dark-academia",
        imageCount: 10
    },

    {
        title: "Sports Collection",
        date: "2024 — 2026",
        folder: "wsu-sports",
        imageCount: 34
    },

    {
        title: "Nature Collection",
        date: "2024 — 2026",
        folder: "nature",
        imageCount: 13
    }

];



/* =====================================================
   ELEMENTS
===================================================== */


const collectionsGrid =
    document.getElementById("eventCollectionsGrid");


const collectionModal =
    document.getElementById("collectionModal");


const collectionImage =
    document.getElementById("collectionImage");


const collectionTitle =
    document.getElementById("collectionTitle");


const collectionDate =
    document.getElementById("collectionDate");


const collectionPhotoCount =
    document.getElementById("collectionPhotoCount");


const collectionCounter =
    document.getElementById("collectionCounter");


const collectionClose =
    document.getElementById("collectionClose");


const collectionPrev =
    document.getElementById("collectionPrev");


const collectionNext =
    document.getElementById("collectionNext");

const previousCollectionButton =
    document.getElementById("previousCollection");

const nextCollectionButton =
    document.getElementById("nextCollection");


const collectionLoader =
    document.getElementById("collectionLoader");



let activeCollection = null;

let currentPhotoIndex = 1;



/* =====================================================
   BUILD COLLECTION CARDS
===================================================== */


photographyCollections.forEach((collection) => {

    const card =
        document.createElement("div");


    card.className =
        "event-collection-card";


    card.innerHTML = `

        <div class="event-collection-cover">

            <img
                src="/images/photography/collections/${collection.folder}/cover.jpg"
                alt="${collection.title}"
                loading="lazy"
            >

            <div class="collection-hover-text">
                VIEW COLLECTION
            </div>

        </div>


        <div class="event-collection-info">

            <h3>
                ${collection.title}
            </h3>

            <p>
                ${collection.date}
            </p>

        </div>

    `;


    card.addEventListener(
        "click",
        () => openCollection(collection)
    );


    collectionsGrid.appendChild(card);

});



/* =====================================================
   OPEN COLLECTION
===================================================== */


function openCollection(collection) {

    activeCollection = collection;

    currentPhotoIndex = 1;


    collectionTitle.textContent =
        collection.title;


    collectionDate.textContent =
        collection.date;


    collectionPhotoCount.textContent =
        `${collection.imageCount} PHOTOS`;


    collectionModal.classList.add(
        "active"
    );


    document.body.style.overflow =
        "hidden";


    showCollectionPhoto();

}



/* =====================================================
   SHOW IMAGE
===================================================== */


function showCollectionPhoto() {

    if (!activeCollection) return;


    collectionLoader.classList.add(
        "active"
    );


    collectionImage.classList.add(
        "loading"
    );


    const imagePath =

        `/images/photography/collections/${activeCollection.folder}/${currentPhotoIndex}.jpg`;


    collectionImage.onload = () => {

        collectionLoader.classList.remove(
            "active"
        );


        collectionImage.classList.remove(
            "loading"
        );

    };


    collectionImage.src =
        imagePath;


    collectionImage.alt =

        `${activeCollection.title} photo ${currentPhotoIndex}`;


    collectionCounter.textContent =

        `${currentPhotoIndex} / ${activeCollection.imageCount}`;


    preloadNearbyPhotos();

}



/* =====================================================
   NEXT PHOTO
===================================================== */


function nextCollectionPhoto() {

    if (!activeCollection) return;


    currentPhotoIndex++;


    if (
        currentPhotoIndex >
        activeCollection.imageCount
    ) {

        currentPhotoIndex = 1;

    }


    showCollectionPhoto();

}



/* =====================================================
   PREVIOUS PHOTO
===================================================== */


function previousCollectionPhoto() {

    if (!activeCollection) return;


    currentPhotoIndex--;


    if (
        currentPhotoIndex < 1
    ) {

        currentPhotoIndex =
            activeCollection.imageCount;

    }


    showCollectionPhoto();

}



/* =====================================================
   CLOSE COLLECTION
===================================================== */


function closeCollection() {

    collectionModal.classList.remove(
        "active"
    );


    document.body.style.overflow =
        "";


    activeCollection = null;


    collectionImage.src = "";

}



/* =====================================================
   PRELOAD ONLY NEARBY PHOTOS
===================================================== */


function preloadNearbyPhotos() {

    if (!activeCollection) return;


    let nextIndex =
        currentPhotoIndex + 1;


    let previousIndex =
        currentPhotoIndex - 1;


    if (
        nextIndex >
        activeCollection.imageCount
    ) {

        nextIndex = 1;

    }


    if (
        previousIndex < 1
    ) {

        previousIndex =
            activeCollection.imageCount;

    }


    const nextImage =
        new Image();


    nextImage.src =

        `/images/photography/collections/${activeCollection.folder}/${nextIndex}.jpg`;


    const previousImage =
        new Image();


    previousImage.src =

        `/images/photography/collections/${activeCollection.folder}/${previousIndex}.jpg`;

}

/* =====================================================
   SWITCH BETWEEN COLLECTIONS
===================================================== */

function switchCollection(direction) {

    if (!activeCollection) return;

    const currentCollectionIndex =
        photographyCollections.indexOf(activeCollection);

    let newCollectionIndex =
        currentCollectionIndex + direction;

    if (newCollectionIndex >= photographyCollections.length) {
        newCollectionIndex = 0;
    }

    if (newCollectionIndex < 0) {
        newCollectionIndex =
            photographyCollections.length - 1;
    }

    openCollection(
        photographyCollections[newCollectionIndex]
    );

}

/* =====================================================
   BUTTON CONTROLS
===================================================== */


collectionNext.addEventListener(
    "click",
    nextCollectionPhoto
);


collectionPrev.addEventListener(
    "click",
    previousCollectionPhoto
);


collectionClose.addEventListener(
    "click",
    closeCollection
);

previousCollectionButton.addEventListener(
    "click",
    () => switchCollection(-1)
);


nextCollectionButton.addEventListener(
    "click",
    () => switchCollection(1)
);


/* =====================================================
   KEYBOARD CONTROLS
===================================================== */


document.addEventListener(
    "keydown",
    (event) => {

        if (
            !collectionModal.classList.contains(
                "active"
            )
        ) return;


        if (event.key === "ArrowRight") {

            nextCollectionPhoto();

        }


        if (event.key === "ArrowLeft") {

            previousCollectionPhoto();

        }


        if (event.key === "Escape") {

            closeCollection();

        }

    }
);



/* =====================================================
   CLICK BACKGROUND TO CLOSE
===================================================== */


collectionModal.addEventListener(
    "click",
    (event) => {

        if (
            event.target === collectionModal
        ) {

            closeCollection();

        }

    }
);



/* =====================================================
   MOBILE SWIPE
===================================================== */


let touchStartX = 0;

let touchStartY = 0;

let touchEndX = 0;

let touchEndY = 0;



collectionModal.addEventListener(
    "touchstart",
    (event) => {

        touchStartX =
            event.changedTouches[0].screenX;


        touchStartY =
            event.changedTouches[0].screenY;

    },
    { passive: true }
);



collectionModal.addEventListener(
    "touchend",
    (event) => {

        touchEndX =
            event.changedTouches[0].screenX;


        touchEndY =
            event.changedTouches[0].screenY;


        handleCollectionSwipe();

    },
    { passive: true }
);



function handleCollectionSwipe() {

    const horizontalDistance =

        touchEndX -
        touchStartX;


    const verticalDistance =

        touchEndY -
        touchStartY;



    /* SWIPE LEFT */

    if (
        horizontalDistance < -50 &&
        Math.abs(horizontalDistance) >
        Math.abs(verticalDistance)
    ) {

        nextCollectionPhoto();

        return;

    }



    /* SWIPE RIGHT */

    if (
        horizontalDistance > 50 &&
        Math.abs(horizontalDistance) >
        Math.abs(verticalDistance)
    ) {

        previousCollectionPhoto();

        return;

    }



    /* SWIPE DOWN TO CLOSE */

    if (
        verticalDistance > 100 &&
        Math.abs(verticalDistance) >
        Math.abs(horizontalDistance)
    ) {

        closeCollection();

    }

}