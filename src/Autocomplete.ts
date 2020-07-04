export class Autocomplete {

    autocomplete(input: HTMLInputElement | null, countries: string[]) {
        /*the autocomplete function takes two arguments,
        the text field element and an array of possible autocompleted values:*/
        let currentFocus: number;
        /*execute a function when someone writes in the text field:*/
        input?.addEventListener("input", () => {
            let rootDiv, matchingItemDiv, index, inputText = input.value;
            /*close any already open lists of autocompleted values*/
            closeAllLists(null);
            if (!inputText) { return false; }
            currentFocus = -1;
            /*create a DIV element that will contain the items (values):*/
            rootDiv = document.createElement("DIV");
            rootDiv.setAttribute("id", input.id + "autocomplete-list");
            rootDiv.setAttribute("class", "autocomplete-items");
            /*append the DIV element as a child of the autocomplete container:*/
            input.parentNode?.appendChild(rootDiv);
            /*for each item in the array...*/
            for (index = 0; index < countries.length; index++) {
                /*check if the item starts with the same letters as the text field value:*/
                if (countries[index].substr(0, inputText.length).toUpperCase() == inputText.toUpperCase()) {
                    /*create a DIV element for each matching element:*/
                    matchingItemDiv = document.createElement("DIV");
                    /*make the matching letters bold:*/
                    matchingItemDiv.innerHTML = "<strong>" + countries[index].substr(0, inputText.length) + "</strong>";
                    matchingItemDiv.innerHTML += countries[index].substr(inputText.length);
                    /*insert a input field that will hold the current array item's value:*/
                    matchingItemDiv.innerHTML += "<input type='hidden' value='" + countries[index] + "'>";
                    /*execute a function when someone clicks on the item value (DIV element):*/
                    matchingItemDiv.addEventListener("click", function (e) {
                        /*insert the value for the autocomplete text field:*/
                        input.value = this.getElementsByTagName("input")[0].value;
                        /*close the list of autocompleted values,
                        (or any other open lists of autocompleted values:*/
                        closeAllLists(null);
                    });
                    rootDiv.appendChild(matchingItemDiv);
                }
            }
        });
        /*execute a function presses a key on the keyboard:*/
        input?.addEventListener("keydown", (event) => {
            let divElementOfMatchingItems: any = document.getElementById(input.id + "autocomplete-list");
            // console.log(x instanceof HTMLDivElement);
            if (divElementOfMatchingItems) divElementOfMatchingItems = divElementOfMatchingItems.getElementsByTagName("div");
            if (event.keyCode == 40) {
                /*If the arrow DOWN key is pressed,
                increase the currentFocus variable:*/
                currentFocus++;
                /*and and make the current item more visible:*/
                addActive(divElementOfMatchingItems);
            } else if (event.keyCode == 38) { //up
                /*If the arrow UP key is pressed,
                decrease the currentFocus variable:*/
                currentFocus--;
                /*and and make the current item more visible:*/
                addActive(divElementOfMatchingItems);
            } else if (event.keyCode == 13) {
                /*If the ENTER key is pressed, prevent the form from being submitted,*/
                event.preventDefault();
                if (currentFocus > -1) {
                    /*and simulate a click on the "active" item:*/
                    if (divElementOfMatchingItems) divElementOfMatchingItems[currentFocus].click();
                }
            }
        });
        function addActive(divElementOfMatchingItems: any) {
            /*a function to classify an item as "active":*/
            if (!divElementOfMatchingItems) return false;
            /*start by removing the "active" class on all items:*/
            removeActive(divElementOfMatchingItems);
            if (currentFocus >= divElementOfMatchingItems.length) currentFocus = 0;
            if (currentFocus < 0) currentFocus = (divElementOfMatchingItems.length - 1);
            /*add class "autocomplete-active":*/
            divElementOfMatchingItems[currentFocus].classList.add("autocomplete-active");
        }
        function removeActive(divElementOfMatchingItems: any) {
            /*a function to remove the "active" class from all autocomplete items:*/
            for (var i = 0; i < divElementOfMatchingItems.length; i++) {
                divElementOfMatchingItems[i].classList.remove("autocomplete-active");
            }
        }
        function closeAllLists(elmnt: any) {
            /*close all autocomplete lists in the document,
            except the one passed as an argument:*/
            var autocompleteItems = document.getElementsByClassName("autocomplete-items");
            for (var i = 0; i < autocompleteItems.length; i++) {
                if (elmnt != autocompleteItems[i] && elmnt != input) {
                    autocompleteItems[i].parentNode?.removeChild(autocompleteItems[i]);
                }
            }
        }
        /*execute a function when someone clicks in the document:*/
        document.addEventListener("click", (event) => {
            closeAllLists(event.target);
        });
    }

}