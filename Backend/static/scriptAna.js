function generateRoadmap(field) {
    console.log('Generating roadmap for:', field); // Debug log
    $.ajax({
        url: '/generate_roadmap',
        type: 'POST',
        data: { 'field': 'veri_yapilari' }, // Explicitly set the field
        success: function(response) {
            console.log('Received response:', response); // Debug log
            if (response.roadmap) {
                sessionStorage.setItem('roadmap', response.roadmap);
                console.log('Stored in sessionStorage:', sessionStorage.getItem('roadmap')); // Debug log
                window.location.href = '/yolharitasi';
            } else {
                console.error('No roadmap in response');
                alert('Failed to generate roadmap. Please try again.');
            }
        },
        error: function(error) {
            console.error('Error generating roadmap:', error);
            alert('Error generating roadmap. Please try again.');
        }
    });
}

ScrollReveal().reveal('.reveal', {
    distance: '50px',
    duration: 1000,
    easing: 'ease-in-out',
    origin: 'bottom',
    opacity: 0,
    scale: 0.9
});


