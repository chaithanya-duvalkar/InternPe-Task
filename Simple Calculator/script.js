let input = document.querySelector("input"); 
let buttons = document.querySelectorAll("button"); 
let string = ""; 
 
for(button of buttons){ 
    button.addEventListener("click",(e) =>{ 
        if(e.currentTarget.innerText === "="){ 
            if(string !== ""){ 
                string = eval(string); 
                input.value = string; 
            } 
            return; 
        } 
        else if(e.currentTarget.innerText === "AC"){ 
            string = ""; 
            input.value = string; 
            return; 
        } 
        else if(e.currentTarget.innerText === "DEL"){ 
            string = string.substring(0,string.length-1); 
            input.value = string; 
            return; 
        } 
         
        string += e.currentTarget.innerText; 
        input.value = string; 
    }) 
} 