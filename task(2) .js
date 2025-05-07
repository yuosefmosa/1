// عناصر DOM
const countriesContainer = document.getElementById('countries-container');
const searchInput = document.getElementById('search');
const loadingElement = document.getElementById('loading');

//
let allCountries = [];

// API
async function fetchCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        allCountries = data;
        displayCountries(data);
        loadingElement.style.display = 'none';
    } catch (error) {
        console.error('حدث خطأ في جلب البيانات:', error);
        loadingElement.textContent = 'حدث خطأ في جلب البيانات. يرجى المحاولة لاحقًا.';
    }
}

// عرض الدول في الصفحة
function displayCountries(countries) {
    countriesContainer.innerHTML = '';
    
    countries.forEach(country => {
        const countryCard = document.createElement('div');
        countryCard.className = 'country-card';
        
      
        const flagUrl = country.flags?.png || country.flags?.svg || '';
        
     
        const countryName = country.name?.common || 'غير معروف';
        
    
        const capital = country.capital?.[0] || 'غير معروف';
        const population = country.population?.toLocaleString() || 'غير معروف';
        
        countryCard.innerHTML = `
            <img src="${flagUrl}" alt="علم ${countryName}" class="country-flag">
            <div class="country-name">${countryName}</div>
            <div class="country-info">العاصمة: ${capital}</div>
            <div class="country-info">عدد السكان: ${population}</div>
        `;
        
        countriesContainer.appendChild(countryCard);
    });
}

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredCountries = allCountries.filter(country => {
        const countryName = country.name?.common?.toLowerCase() || '';
        return countryName.includes(searchTerm);
    });
    displayCountries(filteredCountries);
});
fetchCountries();
