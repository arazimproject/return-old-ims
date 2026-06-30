(async function init() {
    const tdMenu = document.getElementById("tdmenu");
    
    if (!tdMenu) {
        console.warn("Return Old IMS: couldn't find sidebar.");
        return;
    }

    try {
        const htmlURL = chrome.runtime.getURL("new_sidebar.html");
        const response = await fetch(htmlURL);
        
        if (!response.ok) {
            throw new Error(`Failed to load new_sidebar.html: ${response.status}`);
        }
        
        let newSidebarHtml = await response.text();
        
        let urlParams = window.location.search;
        urlParams = urlParams.startsWith("?") ? urlParams.substring(1) : urlParams;
        
        newSidebarHtml = newSidebarHtml.split("(*PARAMS*)").join(urlParams);
        tdMenu.innerHTML = newSidebarHtml;

    } catch (error) {
        console.error("Return Old IMS Error:", error);
    }
})();
