import * as network from './Network';


export const login = (data) => network.publicPost('/pub/login',data)
export const changePassword = (data) => network.post('/api/person/changePassword',data)
export const uploadFile = (data) => network.post('/api/campaign/upload',data, true)
export const getPersonById = (id) => network.get(`/api/person/get/${id}?`) 
export const createClient = (data) => network.post('/api/company/client',data)
export const getCountries = () => network.publicGet('/pub/country/')
export const getIndustries = () => network.get('/api/wholesalepricing/getIndustries')
export const getStates = (country) => network.publicGet(`/pub/states/${country}`)
export const getMarkets = () => network.get('/api/wholesalepricing/getMarkets')
export const getClients = () => network.get('/api/company/clients')
export const createCampaign = (data) => network.post('/api/campaign/',data)
export const getAllCampaign = () => network.post('/api/campaign/getAllcampaigns/')
export const getCampaign=(id)=>network.get(`/api/campaign/${id}`)