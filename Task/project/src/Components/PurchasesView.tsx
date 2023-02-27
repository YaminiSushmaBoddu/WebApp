import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { IPurchases } from "../models/IPurchases"
import { PurchaseService } from "../services/PurchasesService"
import { Purchase } from "./Purchase"
export const PurchasesView = () => {
    interface IState {
        purchases: IPurchases[]
        errorMsg: string
    }
    const [state, setState] = useState<IState>({
        purchases: [] as IPurchases[],
        errorMsg: ""
    })
    const usenavigate = useNavigate()
    const [displayusername, displayusernameupdate] = useState("")

    useEffect(() => {
        let userName = sessionStorage.getItem('userName')
        if (userName === "" || userName === null) {
            usenavigate('/Login')
        } else {
            displayusernameupdate(userName);
        }
    }, [])

    useEffect(() => {
        setState({ ...state })
        PurchaseService.getAllPurchases().then(res =>
            setState({ ...state, purchases: res.data })).catch(err =>
                setState({ ...state, errorMsg: err.message })
            )
    }, [])
    const { purchases, errorMsg } = state;
    const purchaseDetails = (purchase: any) => {
        {

            usenavigate('/Purchase/' + purchase.id)


        }
    }
    return (
        <>
            <div className="">
                <h1>Customer Purchases List</h1>
                {errorMsg && <p>{errorMsg}</p>}
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Purchase</th>
                            <th>ID</th>
                            <th>Date</th>
                            <th>UserId</th>
                            <th>Purchase Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchases.length > 0 && purchases.map((purchase, id) =>
                            <tr key={purchase.id}>
                                <td>{purchase.Purchase}</td>
                                <td>{purchase.id}</td>
                                <td>{purchase.Date}</td>
                                <td>{purchase.UserId}</td>
                                <td><button className="btn btn-primary" type="button" onClick={() => { purchaseDetails(purchase) }}>Details</button></td>
                            </tr>)}
                    </tbody>
                </table>
            </div>
        </>
    )
}
