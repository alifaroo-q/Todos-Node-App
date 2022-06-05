
async function fetchData() {
    const response = await fetch('http://localhost:8080/Users', {method: 'GET'});
    return await response.json();
}

fetchData().then(data => {
   console.log(data);
});