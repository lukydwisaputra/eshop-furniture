export const productAction = (data) => {
    // console.log('Data dari productAction', data)
    return {
        type: "PRODUCT_DETAILS", 
        payload: data
    }
}