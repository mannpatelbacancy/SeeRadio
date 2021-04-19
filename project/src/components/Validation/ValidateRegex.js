const regex_nonempty = /^(?!\s*$).+$/;
const regex_email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regex_password = /^[a-zA-Z0-9]{3,8}$/;
const regex_phone= /^(\+?1 ?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/    
export const regex={
    companyname: regex_nonempty,
    companywebsiteaddress:regex_nonempty,
    industrycategory:regex_nonempty,
    firstname:regex_nonempty,
    lastname:regex_nonempty,
    email:regex_email,
    mobilenumber:regex_phone,
    firstnameoptional:regex_nonempty,
    lastnameoptional:regex_nonempty,
    emailoptional:regex_email,
    mobilenumberoptional:regex_phone,
    address1:regex_nonempty,
    address2:regex_nonempty,
    city:regex_nonempty,
    country:regex_nonempty,
    state:regex_nonempty,
    postal:regex_nonempty,
    address1optional:regex_nonempty,
    address2optional:regex_nonempty,
    cityoptional:regex_nonempty,
    countryoptional:regex_nonempty,
    stateoptional:regex_nonempty,
    postaloptional:regex_nonempty,
    industrycategoryorderform:regex_nonempty,
    title:regex_nonempty,
    price:regex_nonempty,
    landingpage:regex_nonempty,
    description:regex_nonempty,
    budget:regex_nonempty,
    targetmarket:regex_nonempty,
    password:regex_password,
    currentPassword:regex_password,
    newPassword:regex_password,
    confirmPassword:regex_password
    
    
   

}