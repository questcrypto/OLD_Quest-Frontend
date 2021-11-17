import { apiBaseUrl } from "services/global-constant";
import axios from "axios";

export const getAllPropertiesList = async (setNewPropertyLoading: Function, setAllPropertiesList: Function) => {
    try {
        setNewPropertyLoading(true)
        const res = await axios.get(`${apiBaseUrl}/properties/Getallproperties`)
        setAllPropertiesList(res.data)
    } catch (error) {
        setAllPropertiesList([])
    } finally {
        setNewPropertyLoading(false)
    }
}

export const getNewPropertiesList = async (setNewPropertyLoading: Function, setNewPropertiesList: Function) => {
    try {
        setNewPropertyLoading(true)
        const res = await axios.get(`${apiBaseUrl}/properties/GetAllProperty`)
        setNewPropertiesList(res.data)
    } catch (error) {
        setNewPropertiesList([])
    } finally {
        setNewPropertyLoading(false)
    }
}

export const getApproveProperties = async (setApprovedLoading: Function, setApprovedProperties: Function) => {
    try {
        setApprovedLoading(true)
        const res = await axios.get(`${apiBaseUrl}/properties/GetApprovedPropertyHOA`)
        setApprovedProperties(res.data)
    } catch (error) {
        setApprovedProperties([])
    } finally {
        setApprovedLoading(false)
    }
}

export const getPublishedProperties = async (setPublishedLoading: Function, setPublishedProperties: Function) => {
    try {
        setPublishedLoading(true)
        const res = await axios.get(`${apiBaseUrl}/properties/GetPublishedProperty`)
        setPublishedProperties(res.data)
    } catch (error) {
        setPublishedProperties([])
    } finally {
        setPublishedLoading(false)
    }
}

export const getPreAuctionProperties = async (setPreAuctionLoading: Function, setPreAuctionProperties: Function) => {
    try {
        setPreAuctionLoading(true)
        const res = await axios.get(`${apiBaseUrl}/auction/listOfAllNewAuction`)
        setPreAuctionProperties(res.data)
    } catch (error) {
        setPreAuctionProperties([])
    } finally {
        setPreAuctionLoading(false)
    }
}

export const getOnAuctionProperties = async (setOnAuctionLoading: Function, setOnAuctionProperties: Function) => {
    try {
        setOnAuctionLoading(true)
        const res = await axios.get(`${apiBaseUrl}/auction/listOfAllActiveAuction`)
        setOnAuctionProperties(res.data)
    } catch (error) {
        setOnAuctionProperties([])
    } finally {
        setOnAuctionLoading(false)
    }
}

export const getEndAuctionProperties = async (setEndAuctionLoading: Function, setEndAuctionProperties: Function) => {
    try {
        setEndAuctionLoading(true)
        const res = await axios.get(`${apiBaseUrl}/auction/getlistofendauction`)
        setEndAuctionProperties(res.data)
    } catch (error) {
        setEndAuctionProperties([])
    } finally {
        setEndAuctionLoading(false)
    }
}

export const getPostAuctionProperties = async (setPostAuctionLoading: Function, setPostAuctionProperties: Function) => {
    try {
        setPostAuctionLoading(true)
        const res = await axios.get(`${apiBaseUrl}/auction/getPostAuctionList`)
        setPostAuctionProperties(res.data)
    } catch (error) {
        setPostAuctionProperties([])
    } finally {
        setPostAuctionLoading(false)
    }
}

export const updateApprovedProperty = async (setApprovedProperties: Function) => {
    try {
        const res = await axios.get(`${apiBaseUrl}/properties/GetApprovedPropertyHOA`)
        setApprovedProperties(res.data)
    } catch (error) { }
}

export const updatePublishedProperty = async (setPublishedProperties: Function) => {
    try {
        const res = await axios.get(`${apiBaseUrl}/properties/GetPublishedProperty`)
        setPublishedProperties(res.data)
    } catch (error) { }
}

export const updateOnAuction = async (setOnAuctionProperties:Function) => {
    try {
        const res = await axios.get(`${apiBaseUrl}/auction/listOfAllActiveAuction`)
        setOnAuctionProperties(res.data)
    } catch (error) { }
}

export const updatePreAuction = async (setPreAuctionProperties:Function) => {
    try {
        const res = await axios.get(`${apiBaseUrl}/auction/listOfAllNewAuction`)
        setPreAuctionProperties(res.data)
    } catch (error) { }
}