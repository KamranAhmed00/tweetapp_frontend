const reducer=(state,action)=>{
    switch(action.type){
        case "GET_TWEETS":
            return {
                ...state,
                content:action.payload.content,
                // totalPages:action.payload.totalPages,
            };
    }
    return state;
};
export default reducer;