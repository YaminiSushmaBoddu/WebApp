import axios from "axios";
export class PurchaseService{
  
    public static getPurchase(item:any){
        console.log(item)
        const URL:string="http://localhost:3031/"+item

        return axios.get(URL)
    }
}