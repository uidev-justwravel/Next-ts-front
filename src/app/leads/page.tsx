import LeadsList from '@/components/leads/LeadsList'
import { getAllLeads } from '@/restAPIs/leads'
import React from 'react'

const getAllInitialLeads = async () => {
  try {
    const res = await getAllLeads()
    return res.data;
  } catch (error) {
    console.log(error)
  }
}
async function page() {
  const initialLeads: Lead[] = await getAllInitialLeads()
  return (
    <LeadsList initialLeads={initialLeads}/>
  )
}

export default page