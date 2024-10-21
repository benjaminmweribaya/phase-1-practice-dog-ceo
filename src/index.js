console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', () => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    const breedList = document.getElementById('dog-breeds');
    const breedDropdown = document.getElementById('breed-dropdown');
    let allBreeds = [];

    // Fetch images and display them
    fetch(imgUrl)
        .then(response => response.json())
        .then(data => {
            const imageContainer = document.createElement('div');
            imageContainer.id = 'image-container';

            data.message.forEach(imgUrl => {
                const imgElement = document.createElement('img');
                imgElement.src = imgUrl;
                imgElement.alt = "A cute dog";
                imgElement.style.width = "200px";
                imgElement.style.margin = "10px";
                imageContainer.appendChild(imgElement);
            });

            document.body.appendChild(imageContainer);
        })
        .catch(error => console.error('Error fetching images:', error));

    // Fetch breeds and display them
    fetch(breedUrl)
        .then(response => response.json())
        .then(data => {
            allBreeds = Object.keys(data.message);
            renderBreeds(allBreeds);
        })
        .catch(error => console.error('Error fetching breeds:', error));

    // Function to render breeds
    function renderBreeds(breeds) {
        breedList.innerHTML = ''; // Clear the list before rendering
        breeds.forEach(breed => {
            const li = document.createElement('li');
            li.textContent = breed;

            // Add event listener to change color on click
            li.addEventListener('click', () => {
                li.style.color = 'blue'; // Change this to any color of your choice
            });

            breedList.appendChild(li);
        });
    }

    // Event listener for dropdown selection
    breedDropdown.addEventListener('change', (event) => {
        const selectedLetter = event.target.value;
        const filteredBreeds = allBreeds.filter(breed => breed.startsWith(selectedLetter));
        renderBreeds(filteredBreeds);
    });
});
