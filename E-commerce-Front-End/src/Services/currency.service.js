import http from "../http-common";
import {fixerKey} from "../Environement"

class CurrencyService{

    convertToEuro = async (amount,curr) =>{
       const res = await http.get(`http://data.fixer.io/api/latest?access_key=${fixerKey}&symbols=${curr}`)
        if(res.data.success)
          return Number(amount/res.data.rates[curr]).toFixed(2)
        else {
            alert(res.data.error.info)
            return null 
        }
            
    }

    // i would've used the api that convert the amount directly but it's not accessible using the free subscription plan 
    // since the value of currencies is changing unexpectedly,  we are going to call the "convertToEuro(amount , curr)" everytime we create a product
    
}

export default new CurrencyService()