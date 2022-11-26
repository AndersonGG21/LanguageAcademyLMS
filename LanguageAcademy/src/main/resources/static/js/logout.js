$("#logout").click(function (e) { 
    e.preventDefault();
    localStorage.clear();
    location.href = 'index.html'
});