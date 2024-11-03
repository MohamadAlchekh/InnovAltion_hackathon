const buttons = document.querySelectorAll('.button');
const infoCards = document.querySelectorAll('.info-card');

buttons.forEach((button, index) => {
    button.addEventListener('mouseover', () => {
        infoCards[index].style.visibility = 'visible'; 
        infoCards[index].style.opacity = '1'; 
        infoCards[index].style.pointerEvents = 'auto'; 
    });

    button.addEventListener('mouseout', () => {
        infoCards[index].style.visibility = 'hidden';  
        infoCards[index].style.opacity = '0'; 
        infoCards[index].style.pointerEvents = 'none'; 
    });

    infoCards[index].addEventListener('mouseover', () => {
        infoCards[index].style.visibility = 'visible';
        infoCards[index].style.opacity = '1';
        infoCards[index].style.pointerEvents = 'auto';
    });

    infoCards[index].addEventListener('mouseout', () => {
        infoCards[index].style.visibility = 'hidden';
        infoCards[index].style.opacity = '0';
        infoCards[index].style.pointerEvents = 'none';
    });
});
    document.addEventListener("DOMContentLoaded", function () {
        const howToUseLink = document.getElementById("how-to-use");
        const howToUseCard = document.querySelector(".how-to-use-card");
    
        howToUseLink.addEventListener("mouseenter", function () {
            howToUseCard.style.display = "block";
        });
    
        howToUseLink.addEventListener("mouseleave", function () {
            setTimeout(function () {
                if (!howToUseCard.matches(":hover")) {
                    howToUseCard.style.display = "none";
                }
            }, 100); 
        });
    
        howToUseCard.addEventListener("mouseleave", function () {
            howToUseCard.style.display = "none";
        });
    });

    