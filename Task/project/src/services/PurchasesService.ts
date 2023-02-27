import axios from 'axios'
export class PurchaseService{
    private static URL:string="http://localhost:3005/purchases"
    public static getAllPurchases(){
        return axios.get(this.URL)
    }
}