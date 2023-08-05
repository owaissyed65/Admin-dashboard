"use client"
import React from 'react'
import ApiAlert from '@/components/ui/api-alert'
import useOrigin from '@/hooks/use-Origin'
import { useParams } from 'next/navigation'

const ApiList = ({entityName,entityNameId}) => {
    const origin = useOrigin()
    const params = useParams()
    const baseURl = `${origin}/api/${params.storId}`
  return (
    <>
    <ApiAlert title={'GET'} variant='public' desc={`${baseURl}/${entityName}`}/>
    <ApiAlert title={'GET'} variant='public' desc={`${baseURl}/${entityName}/{${entityNameId}}`}/>
    <ApiAlert title={'POST'} variant='admin' desc={`${baseURl}/${entityName}`}/>
    <ApiAlert title={'PATCH'} variant='admin' desc={`${baseURl}/${entityName}/{${entityNameId}}`}/>
    <ApiAlert title={'DELETE'} variant='admin' desc={`${baseURl}/${entityName}/{${entityNameId}}`}/>
    </>
  )
}

export default ApiList