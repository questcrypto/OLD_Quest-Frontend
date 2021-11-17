import { apiBaseUrl } from "services/global-constant";
import axios from "axios";

export const getPropertiesList = async (setNewPropertyLoading: Function, setNewPropertiesList: Function, userInfo: any) => {
    try {
        setNewPropertyLoading(true)
        const res = await axios.get(`${apiBaseUrl}/properties/GetProperty/${userInfo.publicaddress}`)
        setNewPropertiesList(res.data)
    } catch (error) {
        setNewPropertiesList([])
    } finally {
        setNewPropertyLoading(false)
    }
}

export const getApproveProperties = async (setApprovedLoading: Function, setApprovedProperties: Function, userInfo: any) => {
    try {
        setApprovedLoading(true)
        const res = await axios.get(`${apiBaseUrl}/properties/GetApprovedPropertyOwner/${userInfo.publicaddress}`)
        setApprovedProperties(res.data)
    } catch (error) {
        setApprovedProperties([])
    } finally {
        setApprovedLoading(false)
    }
}

export const getPublishedProperties = async (setPublishedLoading: Function, setPublishedProperties: Function, userInfo: any) => {
    try {
        setPublishedLoading(true)
        const res = await axios.get(`${apiBaseUrl}/properties/GetPublishedPropertyOwner/${userInfo.publicaddress}`)
        setPublishedProperties(res.data)
    } catch (error) {
        setPublishedProperties([])
    } finally {
        setPublishedLoading(false)
    }
}

export const getPreAuctionProperties = async (setPreAuctionLoading: Function, setPreAuctionProperties: Function, userInfo: any) => {
    try {
        setPreAuctionLoading(true)
        const res = await axios.get(`${apiBaseUrl}/auction/ListofNewAuction/${userInfo.publicaddress}`)
        setPreAuctionProperties(res.data)
    } catch (error) {
        setPreAuctionProperties([])
    } finally {
        setPreAuctionLoading(false)
    }
}

export const getOnAuctionProperties = async (setOnAuctionLoading: Function, setOnAuctionProperties: Function, userInfo: any) => {
    try {
        setOnAuctionLoading(true)
        const res = await axios.get(`${apiBaseUrl}/auction/myListOfActiveAuction/${userInfo.publicaddress}`)
        setOnAuctionProperties(res.data)
    } catch (error) {
        setOnAuctionProperties([])
    } finally {
        setOnAuctionLoading(false)
    }
}

export const getPostAuctionProperties = async (setPostAuctionLoading: Function, setPostAuctionProperties: Function, userInfo: any) => {
    try {
        setPostAuctionLoading(true)
        const res = await axios.get(`${apiBaseUrl}/auction/getPostAuctionListUser/${userInfo.publicaddress}`)
        setPostAuctionProperties(res.data)
    } catch (error) {
        setPostAuctionProperties([])
    } finally {
        setPostAuctionLoading(false)
    }
}

export const refreshPublishedPropertiesList = async (setPublishedLoading: Function, setPublishedProperties: Function, userInfo: any) => {
    try {
        setPublishedLoading(true)
        const res = await axios.get(`${apiBaseUrl}/properties/GetPublishedPropertyOwner/${userInfo.publicaddress}`)
        setPublishedProperties(res.data)
    } catch (error) {
        setPublishedProperties([])
    } finally {
        setPublishedLoading(false)
    }
}