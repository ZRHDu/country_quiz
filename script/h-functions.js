function countryEqual(country, str) {
    const toModified = (aString) => {
        return aString.toUpperCase().replace(/\s/g, '');
    }

    return toModified(str) === toModified(country.name.common) || 
    toModified(str) === toModified(country.name.official) || 
    country.altSpellings.some(x => toModified(x) === toModified(str))
}

export { countryEqual };