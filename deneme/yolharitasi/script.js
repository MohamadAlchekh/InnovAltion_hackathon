const buttons = document.querySelectorAll('.button');
const infoCards = document.querySelectorAll('.info-card');

buttons.forEach((button, index) => {
    button.addEventListener('mouseover', () => {
        infoCards[index].style.visibility = 'visible'; // Kartı görünür yap
        infoCards[index].style.opacity = '1'; // Şeffaflığı artır
        infoCards[index].style.pointerEvents = 'auto'; // Etkileşime aç
    });

    button.addEventListener('mouseout', () => {
        infoCards[index].style.visibility = 'hidden'; // Kartı görünmez yap
        infoCards[index].style.opacity = '0'; // Şeffaflığı azalt
        infoCards[index].style.pointerEvents = 'none'; // Etkileşimi kapat
    });

    // Kartın üzerinde durulduğunda kartın görünür kalmasını sağla
    infoCards[index].addEventListener('mouseover', () => {
        infoCards[index].style.visibility = 'visible';
        infoCards[index].style.opacity = '1';
        infoCards[index].style.pointerEvents = 'auto';
    });

    // Kartın dışına çıkıldığında kartı gizle
    infoCards[index].addEventListener('mouseout', () => {
        infoCards[index].style.visibility = 'hidden';
        infoCards[index].style.opacity = '0';
        infoCards[index].style.pointerEvents = 'none';
    });
});
    document.addEventListener("DOMContentLoaded", function () {
        const howToUseLink = document.getElementById("how-to-use");
        const howToUseCard = document.querySelector(".how-to-use-card");
    
        // Linkin üzerine gelindiğinde kartı göster
        howToUseLink.addEventListener("mouseenter", function () {
            howToUseCard.style.display = "block";
        });
    
        // Kartın dışına çıkıldığında kartı gizle
        howToUseLink.addEventListener("mouseleave", function () {
            setTimeout(function () {
                if (!howToUseCard.matches(":hover")) {
                    howToUseCard.style.display = "none";
                }
            }, 100); 
        });
    
        // Kartın dışına çıkıldığında kartı gizle
        howToUseCard.addEventListener("mouseleave", function () {
            howToUseCard.style.display = "none";
        });
    });