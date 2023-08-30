async function omniBox(query) {
    let results;
    if (query.startsWith("http:") || query.startsWith("https:")) {
        results = [[], []];
    }
    else {
        results = await fetch(`/search=${query}`).then((res) => res.json()).catch((err) => console.log("OmniBox Error ignoring..."));
    }
    document.getElementById("omnibox-list").innerHTML = '';
    document.getElementById("uv-form").style.marginTop = "120px";
    document.getElementById("omnibox").removeAttribute("class", "dnone");
    try {
        await results[1].forEach((result) => {
            //the only issue is that this passes passed the height of the omnibox and so it needs to be fixed 
            document.getElementById("omnibox-list").innerHTML += `
                <li class="omniBoxResult" onclick="omniBoxSelect('${result}')">${result}</li> 
                <div id="seperator"></div>
            `
        });
    }
    catch (err) {
        results = [[], []];
    }
    if (results[1].length == 0) {
        document.getElementById("omnibox-list").innerHTML = ''
        document.getElementById("uv-form").style.marginTop = "20px";
        document.getElementById("omnibox").setAttribute("class", "dnone");
    }
}
function omniBoxSelect(value) {
    document.getElementById("uv-address").value = value;
    document.getElementById("uv-form").style.marginTop = "20px";
    document.getElementById("omnibox").setAttribute("class", "dnone");
    document.getElementById("omnibox-list").innerHTML = ''
    document.getElementById("uv-address").focus();
    document.getElementById("uv-form").dispatchEvent(new Event('submit'));
}
function resetOmniBox() {
    document.getElementById("uv-form").style.marginTop = "20px";
    document.getElementById("omnibox").setAttribute("class", "dnone");
    document.getElementById("omnibox-list").innerHTML = ''
}