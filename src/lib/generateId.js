import {v4} from "uuid"

function generateID(){
    return v4()
}

export {generateID}