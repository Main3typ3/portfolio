import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Initialize Supabase client
const supabaseUrl = 'https://bozinsjycznqmzyzsxbw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvemluc2p5Y3pucW16eXpzeGJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgzNDYxNzgsImV4cCI6MjA0MzkyMjE3OH0.43fHDg7EDqzymr6Ac4MLodvQEJxXUNj1huI59wyDVcA';
const supabase = createClient(supabaseUrl, supabaseKey);

document.getElementById("contact_button").addEventListener("click",function(){

let firstname = document.getElementById("firstName").value;

let lastname = document.getElementById("lastName").value;
let email = document.getElementById("email").value;
let message = document.getElementById("message").value;
if (firstname == "" || lastname == "" || email == "" || message == ""){
    
    return;
}
if (email.indexOf("@") == -1 || email.indexOf(".") == -1){
    return;
}
addtoDB(firstname, lastname, email, message);

});




async function addtoDB(firstname,lastname,email,message){

    const {data, error } = await supabase.from('Contact_me').insert({
            First_name: firstname,
            Last_name: lastname,
            Email: email, 
            Message: message  
        });
        let messagerrr = document.getElementById("update_contact");

        

        if (error){
            messagerrr.textContent = ("Error Sending Message Please Try Again or Email me directly");
            return;
        }
        else{
            messagerrr.textContent = ("Message successfully Sent");
            document.getElementById("firstName").value = "";
            document.getElementById("lastName").value = ""; 
            document.getElementById("email").value = "";
            document.getElementById("message").value = "";

            

            return;
        }
        
    }