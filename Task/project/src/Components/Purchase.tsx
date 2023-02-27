import { useEffect, useState } from "react"
import { IPurchase } from "../models/IPurchase"
import { PurchaseService } from "../services/PurchaseService"
import "../Styles/style.css"
import { useParams } from "react-router-dom";
import allItems from '../purchases.json'
export const Purchase=()=>{
    interface IState{
        items:IPurchase[]
        errorMsg:string
    }
    const [state,setState]=useState<IState>({
        items:[] as IPurchase[],
        errorMsg:""
    })
    const routeParams = useParams();
    useEffect(()=>{
        const item = "items"+routeParams.id;
    
        PurchaseService.getPurchase(item).then(res=>{
            console.log(res)
            setState({...state,items:res.data})
        }
           
        ).catch(err=>
            setState({...state,errorMsg:err.message})
        )
            console.log(allItems)
    },[])
    const{items,errorMsg}=state
    const totalItems=items.map((a)=>a.Quantity).reduce((acc,curr)=>acc+curr,0)
    const totalPrice=items.map((a)=>a.Quantity*a.unitPrice).reduce((acc,curr)=>acc+curr,0)
    const [Shipping,setShipping]=useState(200)
    const total=totalPrice+Shipping
       
    const num=Number(routeParams.id)
    return(
        <>
          <div className="container ">
            <div className="content">
                  <div className="left">
                    {num===1 ?  <h1 className="heading">Invoice:#1</h1> : <h1 className="heading">Invoice:#2</h1>} 
                    <p>Bill To: <br />
                    [Client Name/Company Name] <br />
                   [Address] <br />
                   [City],[State],[Zipcode] <br />
                   [Phone]
                   </p>
                 </div>
                 <div className="right">
                    {num==1 ? <h6>Date:28-01-2023</h6>: <h6>Date:08-02-2023</h6>}
                    <h6>Invoice:</h6>
                    <p>Ship To: (If Different)<br />
                    [Client Name/Company Name] <br />
                   [Address] <br />
                   [City],[State],[Zipcode] <br />
                   [Phone]
                   </p>
                  </div>
            </div>
           <div className="table">
           <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Item Name</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {items.length>0 && items.map((item)=>
                    <tr key={item.Item}>
                        <td>{item.Item}</td>
                        <td>{item.itemName}</td>
                        <td>{item.Quantity}</td>
                        <td>{item.unitPrice}</td>
                        <td>{item.Quantity*item.unitPrice}</td>
                    </tr>)}
                    <tr>
                       
                        <td className="total" colSpan={5}>Total Items :
                        <span className="tItems" >{totalItems}</span>
                        Sub Total:
                        <span className="tPrice">{totalPrice}</span></td>
                        </tr>
                        <tr>
                        <td className="total"colSpan={5}>Shipping charges:
                        <span className="tPrice">{Shipping}</span></td>
                        </tr>
                        <tr>
                        <td className="total"colSpan={5}>TOTAL: 
                        <span className="tPrice">{total}</span></td>
                        </tr>
                </tbody>
            </table>
           </div>
          </div>
        </>
    )
}