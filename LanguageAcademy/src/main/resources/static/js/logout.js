$("#logout").click(function (e) { 
    e.preventDefault();
    alert("Dolor")
    localStorage.clear();
    location.href = 'index.html'
});