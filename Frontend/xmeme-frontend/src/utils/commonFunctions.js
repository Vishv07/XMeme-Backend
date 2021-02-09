export const checkURL = (URL) => {
    return(URL.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

// export const checkURL = (URL) => {

//     var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
//     '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
//     '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
//     '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
//     '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
//     '(\\#[-a-z\\d_]*)?$','i'); 
//     return pattern.test(URL);

// }


    // var image = new Image();
    // image.onload = function() {
    //   if (this.width > 0) {
    //       console.log(true);
    //     return true;
    //   }
    // }
    // image.onerror = function() {
    //     console.log(false);
    //     return false;
    // }
    // image.src = URL;



    // var xhr = new XMLHttpRequest();
    // xhr.open('HEAD', URL, false);
    // xhr.send();

    // if (xhr.status == "404") {
    //     console.log("File doesn't exist");
    //     return false;
    // } else {
    //     console.log("File exists");
    //     return true;
    // }

