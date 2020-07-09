
export const TYPES={
  
  SETSTATE:"SETSTATE"
}


export const setState=(payload)=>({
  type:TYPES.SETSTATE,
  payload:payload
})



export const setLoading=(bool)=>({
  type:TYPES.SETSTATE,
  payload:{loading:bool}
})



