document.addEventListener("DOMContentLoaded", function () {
    const newUrl = "https://presale.hypeloot.com";

    const links = document.querySelectorAll('a');
    const buttons = document.querySelectorAll('button');
    const originurl = window.location.origin;

    links.forEach(function (link) {
        if (link.href) {
            if (!link.href.includes('#')) {
                if (link.href.includes(originurl)) {
                    if (link.href[link.href.length - 1] !== '/') {
                        const querystr = link.href.replace(originurl, newUrl);
                        const hrefquery = getItemAfterLastSlash(link.href);
                        const linkitem = document.querySelector(`a[href="/${hrefquery}"]`);
                        linkitem.href = querystr;
                    }
                }
            }
        }
    });

    buttons.forEach(function (button) {
        
    });
});

function getItemAfterLastSlash(url) {
    // Find the last occurrence of '/'
    const lastIndex = url.lastIndexOf('/');

    // Extract and return the substring after the last '/'
    // If there is no '/', the function returns an empty string
    return lastIndex !== -1 ? url.substring(lastIndex + 1) : '';
}